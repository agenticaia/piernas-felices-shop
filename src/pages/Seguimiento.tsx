import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { Helmet } from "react-helmet";

const Seguimiento = () => {
  const [orderCode, setOrderCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!orderCode.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un código de seguimiento",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setOrder(null);

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("order_code", orderCode.trim().toUpperCase())
        .maybeSingle();

      if (error) {
        if (error.code === "PGRST116") {
          toast({
            title: "Pedido no encontrado",
            description: "No encontramos un pedido con ese código. Verifica e intenta nuevamente.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setOrder(data);
      }
    } catch (error) {
      console.error("Error al buscar pedido:", error);
      toast({
        title: "Error",
        description: "No pudimos buscar tu pedido. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "recibido":
        return {
          label: "Recibido",
          icon: Clock,
          color: "bg-blue-500",
          description: "Tu pedido ha sido recibido y está siendo procesado",
        };
      case "preparacion":
        return {
          label: "En Preparación",
          icon: Package,
          color: "bg-yellow-500",
          description: "Estamos preparando tu pedido para el envío",
        };
      case "enviado":
        return {
          label: "Enviado",
          icon: Truck,
          color: "bg-purple-500",
          description: "Tu pedido está en camino",
        };
      case "entregado":
        return {
          label: "Entregado",
          icon: CheckCircle2,
          color: "bg-green-500",
          description: "¡Tu pedido ha sido entregado con éxito!",
        };
      case "cancelado":
        return {
          label: "Cancelado",
          icon: Clock,
          color: "bg-red-500",
          description: "Este pedido ha sido cancelado",
        };
      default:
        return {
          label: status,
          icon: Clock,
          color: "bg-gray-500",
          description: "Estado desconocido",
        };
    }
  };

  return (
    <>
      <Helmet>
        <title>Seguimiento de Pedido | Plaza Medik - Medias de Compresión</title>
        <meta
          name="description"
          content="Rastrea tu pedido de medias de compresión RelaxSan en tiempo real. Ingresa tu código de seguimiento y conoce el estado actual de tu compra."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <WhatsAppFloat />

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-foreground mb-4">Seguimiento de Pedido</h1>
                <p className="text-lg text-muted-foreground">
                  Ingresa tu código de seguimiento para ver el estado de tu pedido
                </p>
              </div>
            </div>
          </section>

          {/* Search Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-lg mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Buscar Pedido</CardTitle>
                    <CardDescription>Ingresa el código que recibiste al confirmar tu pedido</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="orderCode">Código de Seguimiento</Label>
                      <Input
                        id="orderCode"
                        placeholder="Ej: PLAZA-1234"
                        value={orderCode}
                        onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>
                    <Button onClick={handleSearch} className="w-full" disabled={isLoading}>
                      <Search className="w-4 h-4 mr-2" />
                      {isLoading ? "Buscando..." : "Buscar Pedido"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Order Details */}
                {order && (
                  <Card className="mt-6">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Pedido {order.order_code}</CardTitle>
                        <Badge variant="outline">{new Date(order.created_at).toLocaleDateString("es-PE")}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Estado */}
                      <div className="text-center py-6 bg-muted/50 rounded-lg">
                        {(() => {
                          const statusInfo = getStatusInfo(order.status);
                          const StatusIcon = statusInfo.icon;
                          return (
                            <>
                              <div
                                className={`w-16 h-16 ${statusInfo.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                              >
                                <StatusIcon className="w-8 h-8 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-foreground mb-2">{statusInfo.label}</h3>
                              <p className="text-sm text-muted-foreground">{statusInfo.description}</p>
                            </>
                          );
                        })()}
                      </div>

                      {/* Producto */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Detalles del Producto</h4>
                        <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Producto:</span>{" "}
                            <span className="font-medium text-foreground">{order.product_name}</span>
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Color:</span>{" "}
                            <span className="font-medium text-foreground">{order.product_color}</span>
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Precio:</span>{" "}
                            <span className="font-bold text-primary">S/ {order.product_price}</span>
                          </p>
                        </div>
                      </div>

                      {/* Datos de entrega */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Datos de Entrega</h4>
                        <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Cliente:</span>{" "}
                            <span className="font-medium text-foreground">
                              {order.customer_name} {order.customer_lastname}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Teléfono:</span>{" "}
                            <span className="font-medium text-foreground">{order.customer_phone}</span>
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Distrito:</span>{" "}
                            <span className="font-medium text-foreground">{order.customer_district}</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Seguimiento;
