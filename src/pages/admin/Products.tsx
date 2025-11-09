import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/data/products';

export default function Products() {
  const [productStats, setProductStats] = useState<any[]>([]);

  useEffect(() => {
    loadProductStats();
  }, []);

  const loadProductStats = async () => {
    const { data: orders } = await supabase
      .from('orders')
      .select('product_code, product_name');

    if (!orders) return;

    // Count sales per product
    const stats = products.map((product) => {
      const sales = orders.filter((order) => order.product_code === product.code).length;
      return {
        ...product,
        sales,
      };
    });

    // Sort by sales
    stats.sort((a, b) => b.sales - a.sales);
    setProductStats(stats);
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Productos</h1>
          <p className="text-muted-foreground">Vista de productos y ventas</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Catálogo de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Código</th>
                    <th className="text-left py-3 px-4">Nombre</th>
                    <th className="text-left py-3 px-4">Compresión</th>
                    <th className="text-left py-3 px-4">Precio</th>
                    <th className="text-right py-3 px-4">Ventas</th>
                  </tr>
                </thead>
                <tbody>
                  {productStats.map((product) => (
                    <tr key={product.code} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{product.code}</td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.compression}</td>
                      <td className="py-3 px-4">S/ {product.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right font-semibold">{product.sales || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
