import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customer_name,
      customer_lastname,
      customer_phone,
      customer_district,
      product_code,
      product_name,
      product_color,
      product_price,
    } = await req.json();

    // Validar campos requeridos
    if (!customer_name || !customer_lastname || !customer_phone || !customer_district ||
        !product_code || !product_name || !product_color || product_price === undefined) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son requeridos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validar precio
    const priceNum = Number(product_price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      return new Response(
        JSON.stringify({ error: 'Precio inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Crear cliente de Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generar código de pedido
    const { data: codeData, error: codeError } = await supabase
      .rpc('generate_order_code');

    if (codeError) throw codeError;

    const order_code = codeData;

    // Insertar pedido con límites de longitud
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        order_code,
        customer_name: String(customer_name).slice(0, 100),
        customer_lastname: String(customer_lastname).slice(0, 100),
        customer_phone: String(customer_phone).slice(0, 20),
        customer_district: String(customer_district).slice(0, 100),
        product_code: String(product_code).slice(0, 20),
        product_name: String(product_name).slice(0, 200),
        product_color: String(product_color).slice(0, 50),
        product_price: priceNum,
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
