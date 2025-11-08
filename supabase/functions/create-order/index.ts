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
        !product_code || !product_name || !product_color || !product_price) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son requeridos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Crear cliente de Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('MY_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generar código de pedido
    const { data: codeData, error: codeError } = await supabase
      .rpc('generate_order_code');

    if (codeError) throw codeError;

    const order_code = codeData;

    // Insertar pedido
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        order_code,
        customer_name,
        customer_lastname,
        customer_phone,
        customer_district,
        product_code,
        product_name,
        product_color,
        product_price,
        status: 'recibido',
      }])
      .select()
      .single();

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