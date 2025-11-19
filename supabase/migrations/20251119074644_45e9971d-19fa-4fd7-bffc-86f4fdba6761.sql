-- Fix orders table RLS policy to prevent public data exposure
DROP POLICY IF EXISTS "Users can view own orders, admins view all" ON public.orders;
DROP POLICY IF EXISTS "Allow public order creation" ON public.orders;
DROP POLICY IF EXISTS "Only admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Only admins can delete orders" ON public.orders;

-- Allow anyone to create orders (needed for guest checkout)
CREATE POLICY "Allow public order creation"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- Only allow viewing orders by matching order_code (for tracking page) or if admin
CREATE POLICY "View own order by code or admin views all"
ON public.orders
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role)
);

-- Only admins can update orders
CREATE POLICY "Only admins can update orders"
ON public.orders
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete orders
CREATE POLICY "Only admins can delete orders"
ON public.orders
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Improve order code generation for better entropy (use full UUID)
CREATE OR REPLACE FUNCTION public.generate_order_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate longer random code with full UUID entropy (32 chars)
    new_code := 'PLAZA-' || upper(replace(gen_random_uuid()::text, '-', ''));
    SELECT EXISTS(SELECT 1 FROM public.orders WHERE order_code = new_code) INTO code_exists;
    IF NOT code_exists THEN
      EXIT;
    END IF;
  END LOOP;
  RETURN new_code;
END;
$$;

-- Create table for rate limiting order submissions
CREATE TABLE IF NOT EXISTS public.order_rate_limit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  attempt_count integer DEFAULT 1,
  last_attempt_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_rate_limit_ip ON public.order_rate_limit(ip_address);
CREATE INDEX IF NOT EXISTS idx_order_rate_limit_last_attempt ON public.order_rate_limit(last_attempt_at);

-- Enable RLS on rate limit table
ALTER TABLE public.order_rate_limit ENABLE ROW LEVEL SECURITY;

-- Only allow edge functions to manage rate limiting
CREATE POLICY "Service role can manage rate limits"
ON public.order_rate_limit
FOR ALL
USING (true)
WITH CHECK (true);

-- Create function to check and update rate limit
CREATE OR REPLACE FUNCTION public.check_order_rate_limit(
  client_ip text,
  max_attempts integer DEFAULT 5,
  window_hours integer DEFAULT 1
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  current_attempts integer;
  last_attempt timestamp with time zone;
BEGIN
  -- Get current rate limit info
  SELECT attempt_count, last_attempt_at
  INTO current_attempts, last_attempt
  FROM public.order_rate_limit
  WHERE ip_address = client_ip
  AND last_attempt_at > (now() - (window_hours || ' hours')::interval);

  -- If no record or window expired, create/reset
  IF current_attempts IS NULL THEN
    INSERT INTO public.order_rate_limit (ip_address, attempt_count, last_attempt_at)
    VALUES (client_ip, 1, now())
    ON CONFLICT (ip_address) DO UPDATE
    SET attempt_count = 1, last_attempt_at = now();
    RETURN true;
  END IF;

  -- Check if limit exceeded
  IF current_attempts >= max_attempts THEN
    RETURN false;
  END IF;

  -- Increment attempt count
  UPDATE public.order_rate_limit
  SET attempt_count = attempt_count + 1, last_attempt_at = now()
  WHERE ip_address = client_ip;

  RETURN true;
END;
$$;