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

    console.log('Starting inventory prediction...');

    // 1. Obtener todos los productos
    const { data: products, error: productsError } = await supabaseClient
      .from('products')
      .select('product_code, nombre_producto, cantidad_stock');

    if (productsError) throw productsError;
    if (!products) throw new Error('No products found');

    console.log(`Processing ${products.length} products...`);

    const today = new Date().toISOString().split('T')[0];
    const forecasts = [];

    // 2. Para cada producto, calcular predicción
    for (const product of products) {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      const { data: salesHistory, error: salesError } = await supabaseClient
        .from('orders')
        .select('created_at')
        .eq('product_code', product.product_code)
        .gte('created_at', ninetyDaysAgo.toISOString())
        .order('created_at', { ascending: true });

      if (salesError) {
        console.error(`Error fetching sales for ${product.product_code}:`, salesError);
        continue;
      }

      if (!salesHistory || salesHistory.length === 0) {
        forecasts.push({
          product_code: product.product_code,
          forecast_date: today,
          predicted_demand: 5,
          confidence_level: 'low',
          current_stock: product.cantidad_stock || 0,
          days_until_stockout: Math.floor((product.cantidad_stock || 0) / 5 * 7),
          reorder_alert: (product.cantidad_stock || 0) < 20,
          suggested_reorder_qty: 50
        });
        continue;
      }

      // Calcular ventas por día
      const salesByDay: { [key: string]: number } = {};
      salesHistory.forEach(sale => {
        const date = new Date(sale.created_at).toISOString().split('T')[0];
        salesByDay[date] = (salesByDay[date] || 0) + 1;
      });

      const dailySales = Object.values(salesByDay);
      
      // Media móvil ponderada
      const last7Days = dailySales.slice(-7);
      const last14Days = dailySales.slice(-14);
      const last30Days = dailySales.slice(-30);

      const avg7 = last7Days.length > 0 ? last7Days.reduce((a, b) => a + b, 0) / last7Days.length : 0;
      const avg14 = last14Days.length > 0 ? last14Days.reduce((a, b) => a + b, 0) / last14Days.length : 0;
      const avg30 = last30Days.length > 0 ? last30Days.reduce((a, b) => a + b, 0) / last30Days.length : 0;

      const weightedAvg = (avg7 * 0.5) + (avg14 * 0.3) + (avg30 * 0.2);
      const trendFactor = avg7 > avg14 ? 1.15 : (avg7 < avg14 ? 0.85 : 1.0);
      const predictedDailyDemand = Math.max(0.5, weightedAvg * trendFactor);
      const predicted7DayDemand = Math.round(predictedDailyDemand * 7);

      const variance = dailySales.length > 1 
        ? dailySales.reduce((sum, val) => sum + Math.pow(val - weightedAvg, 2), 0) / dailySales.length
        : 10;

      const confidenceLevel = variance < 2 ? 'high' : (variance < 5 ? 'medium' : 'low');
      const daysUntilStockout = predictedDailyDemand > 0 
        ? Math.floor((product.cantidad_stock || 0) / predictedDailyDemand)
        : 999;

      const needsReorder = daysUntilStockout < 15;
      const suggestedReorderQty = needsReorder 
        ? Math.round(predictedDailyDemand * 30) 
        : 0;

      forecasts.push({
        product_code: product.product_code,
        forecast_date: today,
        predicted_demand: predicted7DayDemand,
        confidence_level: confidenceLevel,
        current_stock: product.cantidad_stock || 0,
        days_until_stockout: daysUntilStockout,
        reorder_alert: needsReorder,
        suggested_reorder_qty: suggestedReorderQty
      });
    }

    console.log(`Generated ${forecasts.length} forecasts`);

    // 3. Limpiar predicciones anteriores de hoy e insertar nuevas
    const { error: deleteError } = await supabaseClient
      .from('inventory_forecast')
      .delete()
      .eq('forecast_date', today);

    if (deleteError) {
      console.error('Error deleting old forecasts:', deleteError);
    }

    if (forecasts.length > 0) {
      const { error: insertError } = await supabaseClient
        .from('inventory_forecast')
        .insert(forecasts);

      if (insertError) {
        console.error('Error inserting forecasts:', insertError);
        throw insertError;
      }
    }

    // 4. Log de ejecución
    await supabaseClient.from('ai_consumption_logs').insert({
      feature: 'forecast',
      operation_type: 'inventory_prediction',
      tokens_used: 0,
      api_calls: 1,
      cost_usd: 0,
      metadata: { 
        products_analyzed: products.length,
        forecasts_generated: forecasts.length,
        alerts_generated: forecasts.filter(f => f.reorder_alert).length
      }
    });

    console.log('Inventory prediction completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        products_analyzed: products.length,
        forecasts_generated: forecasts.length,
        critical_alerts: forecasts.filter(f => f.reorder_alert && f.days_until_stockout < 7).length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in predict-inventory:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
