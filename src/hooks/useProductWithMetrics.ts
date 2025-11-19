// ============================================
// ARCHIVO 1: src/hooks/useProductWithMetrics.ts
// Hook principal refinado y optimizado
// ============================================

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { products, type Product } from '@/data/products';

export interface ProductWithMetrics extends Product {
  // Métricas de inventario
  cantidad_stock: number;
  stock_status: 'disponible' | 'bajo' | 'agotado';
  
  // Métricas de ventas
  total_vendido: number;
  ingresos_generados: number;
  
  // Métricas de popularidad
  total_views: number;
  total_recommendations: number;
  conversion_rate: number;
  
  // Predicción
  demanda_diaria: number;
  dias_restantes_stock: number;
  fecha_proximo_pedido: string | null;
  
  // Badges
  badges: string[];
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

interface UseProductMetricsOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useProductWithMetrics(options: UseProductMetricsOptions = {}) {
  const { autoRefresh = false, refreshInterval = 30000 } = options;
  
  const [productsWithMetrics, setProductsWithMetrics] = useState<ProductWithMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      
      // Obtener métricas de Supabase
      const { data: metricsData, error: metricsError } = await supabase
        .from('products')
        .select('*');

      if (metricsError) throw metricsError;

      // Combinar productos estáticos con métricas
      const enrichedProducts: ProductWithMetrics[] = products.map(product => {
        const metrics = metricsData?.find(m => m.product_code === product.code);
        
        const stockActual = metrics?.cantidad_stock || 0;
        const totalVendido = metrics?.total_vendido || 0;
        const totalViews = metrics?.total_views || 0;
        
        // Cálculos
        const stockStatus = getStockStatus(stockActual);
        const demandaDiaria = totalVendido > 0 ? totalVendido / 30 : 0.5;
        const diasRestantes = demandaDiaria > 0 ? Math.floor(stockActual / demandaDiaria) : 999;
        const fechaProximoPedido = diasRestantes < 30 && stockActual > 0
          ? new Date(Date.now() + diasRestantes * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          : null;
        
        const conversionRate = totalViews > 0 ? (totalVendido / totalViews) * 100 : 0;
        const ingresosGenerados = totalVendido * product.priceSale;
        
        const badges = generateBadges({
          totalVendido,
          stockStatus,
          conversionRate,
          createdAt: metrics?.created_at
        });

        return {
          ...product,
          cantidad_stock: stockActual,
          stock_status: stockStatus,
          total_vendido: totalVendido,
          ingresos_generados: ingresosGenerados,
          total_views: totalViews,
          total_recommendations: metrics?.total_recommendations || 0,
          conversion_rate: conversionRate,
          demanda_diaria: demandaDiaria,
          dias_restantes_stock: diasRestantes,
          fecha_proximo_pedido: fechaProximoPedido,
          badges,
          created_at: metrics?.created_at || new Date().toISOString(),
          updated_at: metrics?.updated_at || new Date().toISOString(),
        };
      });

      setProductsWithMetrics(enrichedProducts);
      setError(null);
    } catch (err) {
      console.error('Error fetching product metrics:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();

    if (autoRefresh) {
      const interval = setInterval(fetchMetrics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  // Funciones de utilidad
  const getTopSellers = (limit: number = 10) => {
    return [...productsWithMetrics]
      .sort((a, b) => b.total_vendido - a.total_vendido)
      .slice(0, limit);
  };

  const getTopRevenue = (limit: number = 10) => {
    return [...productsWithMetrics]
      .sort((a, b) => b.ingresos_generados - a.ingresos_generados)
      .slice(0, limit);
  };

  const getLowStock = (threshold: number = 10) => {
    return productsWithMetrics.filter(p => p.cantidad_stock <= threshold && p.cantidad_stock > 0);
  };

  const getOutOfStock = () => {
    return productsWithMetrics.filter(p => p.cantidad_stock === 0);
  };

  const getCriticalStock = () => {
    return productsWithMetrics.filter(p => p.dias_restantes_stock <= 7 && p.cantidad_stock > 0);
  };

  const getProductByCode = (code: string) => {
    return productsWithMetrics.find(p => p.code === code);
  };

  const getTotalMetrics = () => {
    return {
      total_productos: productsWithMetrics.length,
      total_stock: productsWithMetrics.reduce((sum, p) => sum + p.cantidad_stock, 0),
      total_vendido: productsWithMetrics.reduce((sum, p) => sum + p.total_vendido, 0),
      total_ingresos: productsWithMetrics.reduce((sum, p) => sum + p.ingresos_generados, 0),
      total_views: productsWithMetrics.reduce((sum, p) => sum + p.total_views, 0),
      productos_bajo_stock: getLowStock().length,
      productos_agotados: getOutOfStock().length,
      productos_criticos: getCriticalStock().length,
      conversion_rate_promedio: productsWithMetrics.reduce((sum, p) => sum + p.conversion_rate, 0) / productsWithMetrics.length || 0,
    };
  };

  const updateProductMetrics = async (
    productCode: string, 
    updates: Partial<Pick<ProductWithMetrics, 'cantidad_stock' | 'total_vendido' | 'total_views'>>
  ) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('product_code', productCode);

      if (error) throw error;
      await fetchMetrics();
      return { success: true };
    } catch (err) {
      console.error('Error updating product metrics:', err);
      return { success: false, error: err };
    }
  };

  const trackProductView = async (productCode: string) => {
    try {
      await supabase.rpc('increment_product_views', {
        p_product_code: productCode
      });
    } catch (err) {
      console.error('Error tracking product view:', err);
    }
  };

  return {
    products: productsWithMetrics,
    loading,
    error,
    getTopSellers,
    getTopRevenue,
    getLowStock,
    getOutOfStock,
    getCriticalStock,
    getProductByCode,
    getTotalMetrics,
    updateProductMetrics,
    trackProductView,
    refresh: fetchMetrics,
  };
}

// Funciones auxiliares
function getStockStatus(stock: number): 'disponible' | 'bajo' | 'agotado' {
  if (stock === 0) return 'agotado';
  if (stock <= 10) return 'bajo';
  return 'disponible';
}

function generateBadges(params: {
  totalVendido: number;
  stockStatus: string;
  conversionRate: number;
  createdAt?: string;
}): string[] {
  const badges: string[] = [];
  const { totalVendido, stockStatus, conversionRate, createdAt } = params;

  if (totalVendido >= 40) badges.push('🔥 Más vendido');
  if (stockStatus === 'bajo') badges.push('⚠️ Stock bajo');
  if (stockStatus === 'agotado') badges.push('❌ Agotado');
  if (conversionRate >= 5) badges.push('⭐ Alta conversión');
  
  if (createdAt) {
    const daysSinceCreated = Math.floor(
      (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceCreated <= 30) badges.push('✨ Nuevo');
  }

  return badges;
}

// ============================================
// Hook para predicciones
// ============================================
export function useInventoryPrediction() {
  const { products, loading } = useProductWithMetrics();

  const predictions = products.map(product => {
    const demanda7d = Math.ceil(product.demanda_diaria * 7);
    const confianza = calculateConfidence(product.total_vendido, product.total_views);
    const accion = getRecommendedAction(product.dias_restantes_stock, product.cantidad_stock);
    
    return {
      product_code: product.code,
      nombre_producto: product.name,
      stock_actual: product.cantidad_stock,
      demanda_7d: demanda7d,
      dias_restantes: product.dias_restantes_stock,
      confianza,
      accion,
      suggested_reorder_qty: Math.max(demanda7d * 2, 10),
    };
  });

  return {
    predictions: predictions.sort((a, b) => a.dias_restantes - b.dias_restantes),
    loading,
  };
}

function calculateConfidence(totalVendido: number, totalViews: number): number {
  if (totalVendido >= 50 && totalViews >= 100) return 0.95;
  if (totalVendido >= 30 && totalViews >= 50) return 0.85;
  if (totalVendido >= 10 && totalViews >= 20) return 0.70;
  return 0.50;
}

function getRecommendedAction(diasRestantes: number, stockActual: number): string {
  if (stockActual === 0) return '🚨 Reabastecer urgente';
  if (diasRestantes <= 7) return '⚠️ Ordenar ahora';
  if (diasRestantes <= 14) return '📋 Planificar pedido';
  return '✅ Stock suficiente';
}