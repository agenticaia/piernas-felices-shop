import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting similarity calculation...');

    // 1. Obtener todos los productos
    const { data: products, error: productsError } = await supabaseClient
      .from('products')
      .select('product_code, categoria, precio');

    if (productsError) throw productsError;

    if (!products || products.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Necesitas al menos 2 productos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${products.length} products...`);

    // 2. Obtener todas las órdenes para calcular co-ocurrencias
    const { data: orders, error: ordersError } = await supabaseClient
      .from('orders')
      .select('customer_phone, product_code');

    if (ordersError) throw ordersError;

    console.log(`Analyzing ${orders?.length || 0} orders...`);

    // 3. Calcular similitud para cada par de productos
    const similarities = [];
    
    for (let i = 0; i < products.length; i++) {
      for (let j = i + 1; j < products.length; j++) {
        const productA = products[i];
        const productB = products[j];

        // Co-ocurrencias: clientes que compraron ambos productos
        const customersA = new Set(
          orders?.filter(o => o.product_code === productA.product_code)
            .map(o => o.customer_phone) || []
        );
        
        const customersB = new Set(
          orders?.filter(o => o.product_code === productB.product_code)
            .map(o => o.customer_phone) || []
        );

        const intersection = [...customersA].filter(c => customersB.has(c)).length;
        const union = new Set([...customersA, ...customersB]).size;
        
        const coOccurrenceScore = union > 0 ? intersection / union : 0;

        // Similitud por categoría
        const categoryMatch = productA.categoria === productB.categoria ? 1 : 0;

        // Similitud por precio
        const priceDiff = Math.abs(productA.precio - productB.precio);
        const priceMax = Math.max(productA.precio, productB.precio);
        const priceSimilarity = priceMax > 0 ? 1 - (priceDiff / priceMax) : 0;

        // Score final (promedio ponderado)
        const finalScore = (
          (coOccurrenceScore * 0.5) + 
          (categoryMatch * 0.3) + 
          (priceSimilarity * 0.2)
        );

        // Solo guardar si hay alguna similitud
        if (finalScore > 0.1) {
          similarities.push({
            product_id_1: productA.product_code,
            product_id_2: productB.product_code,
            similarity_score: Math.round(finalScore * 100) / 100
          });
          
          // También agregar la similitud inversa (B -> A)
          similarities.push({
            product_id_1: productB.product_code,
            product_id_2: productA.product_code,
            similarity_score: Math.round(finalScore * 100) / 100
          });
        }
      }
    }

    console.log(`Calculated ${similarities.length} similarities`);

    // 4. Limpiar tabla anterior e insertar nuevas similitudes
    const { error: deleteError } = await supabaseClient
      .from('product_similarity')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.error('Error deleting old similarities:', deleteError);
    }
    
    if (similarities.length > 0) {
      const { error: insertError } = await supabaseClient
        .from('product_similarity')
        .insert(similarities);

      if (insertError) {
        console.error('Error inserting similarities:', insertError);
        throw insertError;
      }
    }

    // 5. Log de ejecución
    await supabaseClient.from('ai_consumption_logs').insert({
      feature: 'recommendations',
      operation_type: 'similarity_calculation',
      tokens_used: 0,
      api_calls: 1,
      cost_usd: 0,
      metadata: { 
        products_processed: products.length,
        similarities_calculated: similarities.length
      }
    });

    console.log('Similarity calculation completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        products_processed: products.length,
        similarities_calculated: similarities.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in calculate-similarity:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
