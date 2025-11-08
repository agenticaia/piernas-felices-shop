-- Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code TEXT UNIQUE NOT NULL,
  
  -- Datos del cliente
  customer_name TEXT NOT NULL,
  customer_lastname TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_district TEXT NOT NULL,
  
  -- Datos del producto
  product_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_color TEXT NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  
  -- Estado del pedido
  status TEXT NOT NULL DEFAULT 'recibido' CHECK (status IN ('recibido', 'preparacion', 'enviado', 'entregado', 'cancelado')),
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Crear índices para mejorar búsquedas
CREATE INDEX IF NOT EXISTS idx_orders_code ON public.orders(order_code);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- Crear función para generar códigos de pedido únicos
CREATE OR REPLACE FUNCTION generate_order_code()
RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generar código tipo PLAZA-1001
    new_code := 'PLAZA-' || LPAD((FLOOR(RANDOM() * 9000) + 1000)::TEXT, 4, '0');
    
    -- Verificar si existe
    SELECT EXISTS(SELECT 1 FROM public.orders WHERE order_code = new_code) INTO code_exists;
    
    -- Si no existe, salir del loop
    IF NOT code_exists THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede crear pedidos
CREATE POLICY "Permitir inserción pública de pedidos"
  ON public.orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Política: Cualquiera puede ver sus propios pedidos usando el código
CREATE POLICY "Permitir lectura pública de pedidos"
  ON public.orders
  FOR SELECT
  TO public
  USING (true);