import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Package, Phone, CheckCircle2, ArrowRight } from "lucide-react";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  selectedColor?: string;
}

const WHATSAPP_NUMBER = "51941941083"; // Número correcto de WhatsApp

const OrderModal = ({ open, onOpenChange, product, selectedColor }: OrderModalProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const { toast } = useToast();

  // Datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    district: "",
    color: selectedColor || product.colors[0] || "Piel",
  });

  const resetModal = () => {
    setStep(1);
    setFormData({
      name: "",
      lastname: "",
      phone: "",
      district: "",
      color: selectedColor || product.colors[0] || "Piel",
    });
    setOrderCode("");
  };

  const handleClose = () => {
    resetModal();
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.lastname || !formData.phone || !formData.district) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-order", {
        body: {
          customer_name: formData.name,
          customer_lastname: formData.lastname,
          customer_phone: formData.phone,
          customer_district: formData.district,
          product_code: product.code,
          product_name: product.name,
          product_color: formData.color,
          product_price: product.priceSale,
        },
      });

      if (error) throw error;

      setOrderCode(data.order_code);
      setStep(4);
    } catch (error) {
      console.error("Error al crear pedido:", error);
      toast({
        title: "Error",
        description: "No pudimos procesar tu pedido. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendToWhatsApp = () => {
    const message = `¡Hola! 👋

*Nuevo Pedido - ${orderCode}*

📦 *Producto:* ${product.name}
🎨 *Color:* ${formData.color}
💰 *Precio:* S/ ${product.priceSale.toFixed(2)}

👤 *Cliente:*
Nombre: ${formData.name} ${formData.lastname}
📱 Teléfono: ${formData.phone}
📍 Distrito: ${formData.district}

🔍 *Código de Seguimiento:* ${orderCode}

¡Gracias por tu compra! Pronto nos pondremos en contacto contigo. 😊`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    handleClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 py-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">¡Excelente Elección! 🎉</h3>
              <p className="text-muted-foreground text-lg">
                Las medias <span className="font-semibold text-foreground">{product.name}</span> son perfectas para{" "}
                {product.idealFor.toLowerCase()}
              </p>

              <div className="bg-accent/20 border border-accent rounded-lg p-6 mt-6">
                <p className="text-sm text-muted-foreground mb-3">
                  "Uso estas medias diariamente y me han ayudado muchísimo con la circulación. ¡Son súper cómodas!"
                </p>
                <p className="text-xs font-semibold text-foreground">— María T., Cliente satisfecha</p>
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full" size="lg">
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 py-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Pide Gratis, Paga en Casa 🏠</h3>
              <p className="text-muted-foreground text-lg">
                No pagas ahora. Solo cuando recibas tu pedido en tu domicilio.
              </p>

              <div className="bg-primary/10 border border-primary rounded-lg p-6 mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground text-left">
                    <strong>Contra entrega:</strong> Pagas cuando te entregamos el producto
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground text-left">
                    <strong>Sin riesgos:</strong> Puedes verificar el producto antes de pagar
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground text-left">
                    <strong>100% seguro:</strong> Garantía de satisfacción
                  </p>
                </div>
              </div>

              <div className="bg-accent/20 border border-accent rounded-lg p-4 mt-4">
                <Phone className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Te enviaremos un mensaje de confirmación por WhatsApp al número:
                  <span className="font-semibold text-foreground block mt-1">+{WHATSAPP_NUMBER}</span>
                </p>
              </div>
            </div>

            <Button onClick={() => setStep(3)} className="w-full" size="lg">
              Continuar con mi pedido
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 py-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Completa tus datos</h3>
              <p className="text-sm text-muted-foreground">Solo necesitamos algunos datos para procesar tu pedido</p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-foreground mb-2">Producto seleccionado:</p>
                <p className="text-sm text-muted-foreground">{product.name}</p>
                <p className="text-lg font-bold text-primary mt-1">S/ {product.priceSale.toFixed(2)}</p>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <Label htmlFor="lastname">Apellido *</Label>
                  <Input
                    id="lastname"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    placeholder="Tu apellido"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono / WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej: 987654321"
                  />
                </div>

                <div>
                  <Label htmlFor="district">Distrito (Lima) *</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="Ej: Miraflores, San Isidro..."
                  />
                </div>

                <div>
                  <Label htmlFor="color">Color *</Label>
                  <div className="flex gap-2 mt-2">
                    {product.colors.map((color) => (
                      <Badge
                        key={color}
                        variant={formData.color === color ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFormData({ ...formData, color })}
                      >
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Procesando..." : "Confirmar Pedido"}
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 py-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">¡Pedido Confirmado! 🎉</h3>

              <div className="bg-primary/10 border border-primary rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Tu código de seguimiento es:</p>
                <p className="text-3xl font-bold text-primary">{orderCode}</p>
              </div>

              <div className="space-y-3 text-left bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>¿Cómo hacer seguimiento?</strong>
                </p>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Ve a la sección de "Seguimiento" en nuestra web</li>
                  <li>
                    Ingresa tu código: <span className="font-semibold text-foreground">{orderCode}</span>
                  </li>
                  <li>Verás el estado actual de tu pedido</li>
                </ol>
              </div>

              <div className="bg-accent/20 border border-accent rounded-lg p-4">
                <Phone className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Te enviaremos la confirmación por WhatsApp</p>
                <p className="text-sm font-semibold text-foreground mt-1">+{WHATSAPP_NUMBER}</p>
              </div>
            </div>

            <Button onClick={sendToWhatsApp} className="w-full" size="lg">
              Enviar a WhatsApp
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">{renderStep()}</DialogContent>
    </Dialog>
  );
};

export default OrderModal;
