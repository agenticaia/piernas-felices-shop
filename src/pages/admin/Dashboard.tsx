import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Dashboard() {
  const [stats, setStats] = useState({
    todaySales: 0,
    todayOrders: 0,
    topProduct: '',
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get today's orders
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', today.toISOString())
      .order('created_at', { ascending: false });

    if (orders) {
      const totalSales = orders.reduce((sum, order) => sum + Number(order.product_price), 0);
      
      // Find most common product
      const productCounts = orders.reduce((acc: any, order) => {
        const code = order.product_code;
        acc[code] = (acc[code] || 0) + 1;
        return acc;
      }, {});
      
      const topProduct = Object.entries(productCounts).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || '';

      setStats({
        todaySales: totalSales,
        todayOrders: orders.length,
        topProduct,
      });
    }

    // Get recent orders (last 5)
    const { data: recent } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    setRecentOrders(recent || []);
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      'recibido': 'bg-blue-500',
      'en_preparacion': 'bg-yellow-500',
      'enviado': 'bg-purple-500',
      'entregado': 'bg-green-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    const labels: any = {
      'recibido': 'Recibido',
      'en_preparacion': 'En preparación',
      'enviado': 'Enviado',
      'entregado': 'Entregado',
    };
    return labels[status] || status;
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Resumen de operaciones</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">S/ {stats.todaySales.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Hoy</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Producto Top</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.topProduct || 'N/A'}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{order.order_code}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer_name} {order.customer_lastname}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(order.created_at), 'dd MMM yyyy, HH:mm', { locale: es })}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                    <p className="text-sm font-medium">S/ {Number(order.product_price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              {recentOrders.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No hay pedidos recientes</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
