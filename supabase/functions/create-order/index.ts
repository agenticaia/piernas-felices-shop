import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const orderSchema = z.object({
  customer_name: z.string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  customer_lastname: z.string()
    .trim()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras'),
  customer_phone: z.string()
    .regex(/^9\d{8}$/, 'El teléfono debe ser un número móvil válido (9 dígitos comenzando con 9)'),
  customer_district: z.string()
    .trim()
    .min(3, 'El distrito debe tener al menos 3 caracteres')
    .max(50, 'El distrito no puede exceder 50 caracteres'),
  product_code: z.string()
    .regex(/^\d{3,4}[A-Z]?$/, 'Código de producto inválido'),
  product_name: z.string()
    .min(5, 'El nombre del producto debe tener al menos 5 caracteres')
    .max(200, 'El nombre del producto no puede exceder 200 caracteres'),
  product_color: z.string()
    .min(2, 'El color debe tener al menos 2 caracteres')
    .max(50, 'El color no puede exceder 50 caracteres'),
  product_price: z.number()
    .positive('El precio debe ser mayor a 0')
    .max(1000, 'El precio no puede exceder S/. 1000'),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();

    // Validate input using Zod schema
    let validatedData;
    try {
      validatedData = orderSchema.parse(requestData);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const errorMessages = validationError.errors.map(err => err.message).join(', ');
        return new Response(
          JSON.stringify({ error: `Validación fallida: ${errorMessages}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw validationError;
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit (5 orders per IP per hour)
    const { data: rateLimitOk, error: rateLimitError } = await supabase
      .rpc('check_order_rate_limit', { 
        client_ip: clientIp,
        max_attempts: 5,
        window_hours: 1
      });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      // Don't block if rate limit check fails, but log it
    } else if (!rateLimitOk) {
      return new Response(
        JSON.stringify({ 
          error: 'Has excedido el límite de pedidos. Por favor intenta más tarde.' 
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generar código de pedido
    const { data: codeData, error: codeError } = await supabase
      .rpc('generate_order_code');

    if (codeError) throw codeError;

    const order_code = codeData;

    // Insert order with validated data
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        order_code,
        customer_name: validatedData.customer_name,
        customer_lastname: validatedData.customer_lastname,
        customer_phone: validatedData.customer_phone,
        customer_district: validatedData.customer_district,
        product_code: validatedData.product_code,
        product_name: validatedData.product_name,
        product_color: validatedData.product_color,
        product_price: validatedData.product_price,
        status: 'recibido',
      }])
      .select()
      .maybeSingle();

    if (orderError) throw orderError;

    console.log('Pedido creado:', order_code);

    return new Response(
      JSON.stringify({ 
        success: true, 
        order_code,
        order 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error al crear pedido:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Error desconocido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
