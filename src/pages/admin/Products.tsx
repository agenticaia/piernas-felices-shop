// Archivo: src/pages/admin/Products.tsx
// Corregido para funcionar con src/data/products.ts y Supabase

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products, type Product } from '@/data/products';
import { Package, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

interface ProductWithSales extends Product {
  sales: number;
  stock: number; // Stock de Supabase
}

export default function Products() {
  const [productStats, setProductStats] = useState<ProductWithSales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProductStats();
  }, []);

  const loadProductStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Obtener todas las órdenes de Supabase
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('product_code, product_name');

      if (ordersError) throw ordersError;

      // 2. Obtener stock real de Supabase (si existe la tabla products)
      const { data: supabaseProducts } = await supabase
        .from('products')
        .select('product_code, cantidad_stock');

      // Crear mapa de stock por código
      const stockMap = new Map<string, number>();
      supabaseProducts?.forEach(p => {
        stockMap.set(p.product_code, p.cantidad_stock || 0);
      });

      // 3. Combinar datos: products.ts + ventas de orders + stock de Supabase
      const stats: ProductWithSales[] = products.map((product) => {
        const sales = orders?.filter((order) => order.product_code === product.code).length || 0;
        const stock = stockMap.get(product.code) || 0;

        return {
          ...product,
          sales,
          stock
        };
      });

      // 4. Ordenar por ventas (mayor a menor)
      stats.sort((a, b) => b.sales - a.sales);

      setProductStats(stats);
    } catch (err) {
      console.error('Error loading product stats:', err);
      setError('Error al cargar estadísticas de productos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-800 font-semibold">{error}</p>
            <button 
              onClick={loadProductStats}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reintentar
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const totalProducts = productStats.length;
  const totalSales = productStats.reduce((sum, p) => sum + p.sales, 0);
  const totalRevenue = productStats.reduce((sum, p) => sum + (p.sales * p.priceSale), 0);
  const totalStock = productStats.reduce((sum, p) => sum + p.stock, 0);

  return (
    <AdminLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Package className="w-8 h-8 mr-2 text-blue-600" />
              Gestión de Productos
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Catálogo RelaxSan y estadísticas de ventas
            </p>
          </div>
          <button
            onClick={loadProductStats}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
        </div>

        {/* KPIs Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">Total Productos</p>
                <p className="text-4xl font-bold text-blue-600">{totalProducts}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">Ventas Totales</p>
                <p className="text-4xl font-bold text-green-600">{totalSales}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">Ingresos</p>
                <p className="text-4xl font-bold text-purple-600">
                  S/ {totalRevenue.toFixed(0)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">Stock Total</p>
                <p className="text-4xl font-bold text-orange-600">{totalStock}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Productos */}
        <Card>
          <CardHeader>
            <CardTitle>Catálogo de Productos RelaxSan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Código</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Producto</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Tipo</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Compresión</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Precio</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm text-gray-700">Stock</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Ventas</th>
                  </tr>
                </thead>
                <tbody>
                  {productStats.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm font-semibold text-blue-600">
                          {product.code}
                        </span>
                      </td>
                      
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://placehold.co/100x100/e0e0e0/333333?text=Producto';
                            }}
                          />
                          <div>
                            <p className="font-medium text-sm text-gray-900 line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">{product.brand} - {product.model}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          product.type === 'rodilla' ? 'bg-blue-100 text-blue-700' :
                          product.type === 'panty' ? 'bg-purple-100 text-purple-700' :
                          'bg-pink-100 text-pink-700'
                        }`}>
                          {product.type === 'rodilla' ? '🦵 Rodilla' :
                           product.type === 'panty' ? '👖 Panty' : '🦿 Muslo'}
                        </span>
                      </td>
                      
                      <td className="py-3 px-4">
                        <span className={`text-sm font-medium ${
                          product.compression === '12-17 mmHg' ? 'text-green-600' :
                          product.compression === '18-22 mmHg' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {product.compression}
                        </span>
                      </td>
                      
                      <td className="py-3 px-4 text-right">
                        <div>
                          <p className="font-semibold text-gray-900">S/ {product.priceSale.toFixed(2)}</p>
                          <p className="text-xs text-gray-500 line-through">S/ {product.priceOriginal.toFixed(2)}</p>
                        </div>
                      </td>
                      
                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold text-lg ${
                          product.stock < 10 ? 'text-red-600' :
                          product.stock < 20 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <TrendingUp className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-900">{product.sales}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top 5 Más Vendidos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Top 5 Productos Más Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {productStats.slice(0, 5).map((product, index) => (
                <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-600' :
                    'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/100x100/e0e0e0/333333?text=P';
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.code} - {product.compression}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">{product.sales}</p>
                    <p className="text-xs text-gray-500">ventas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}