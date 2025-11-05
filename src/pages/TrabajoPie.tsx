import Navigation from "@/components/Navigation";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Scissors, ShoppingBag, Check } from "lucide-react";
import { getProductsByCategory } from "@/data/products";

const TrabajoPie = () => {
  const trabajoPieProducts = getProductsByCategory("trabajo-pie");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <WhatsAppFloat />

      {/* Header */}
      <section className="bg-gradient-hero text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Medias para Trabajo de Pie
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Energía que dura todo el turno. Di adiós a las piernas hinchadas y cansadas al final del día
            </p>
          </div>
        </div>
      </section>

      {/* El problema */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              El problema de estar de pie todo el día
            </h2>
            <p className="text-muted-foreground mb-6">
              Cuando pasas muchas horas de pie, la gravedad dificulta que la sangre regrese desde tus pies hasta tu corazón. Esto causa:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Hinchazón progresiva</h3>
                  <p className="text-sm text-muted-foreground">Tus piernas y tobillos se hinchan cada vez más conforme pasa el día</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Dolor y pesadez</h3>
                  <p className="text-sm text-muted-foreground">Sensación de piernas pesadas que duelen y arden al final del turno</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Fatiga extrema</h3>
                  <p className="text-sm text-muted-foreground">Te sientes agotada, sin energía para nada más después del trabajo</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Riesgo de várices</h3>
                  <p className="text-sm text-muted-foreground">Con el tiempo, pueden aparecer várices por la mala circulación crónica</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">
              La solución: Compresión 20-30 mmHg
            </h3>
            <p className="text-sm text-muted-foreground">
              Las medias de compresión ayudan a empujar la sangre hacia arriba constantemente, previniendo la acumulación. Resultado: llegas a casa con las piernas tan ligeras como cuando empezaste tu turno.
            </p>
          </div>
        </div>
      </section>

      {/* Por profesión */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Profesiones que más se benefician
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border hover:shadow-card transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Enfermeras y Personal de Salud
                </h3>
                <p className="text-sm text-muted-foreground">
                  Turnos de 12 horas, caminando constantemente entre pacientes. Las medias te dan la energía que necesitas para cuidar a otros sin descuidarte a ti misma.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Reduce la hinchazón después del turno</li>
                  <li>• Previene várices laborales</li>
                  <li>• Más energía durante todo el día</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-card transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Vendedoras y Cajeras
                </h3>
                <p className="text-sm text-muted-foreground">
                  Horas de pie atendiendo clientes, muchas veces sin poder sentarte. La compresión mantiene tus piernas ligeras incluso en los días más ocupados.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Menos dolor al estar parada</li>
                  <li>• Adiós a los tobillos hinchados</li>
                  <li>• Discretas bajo el uniforme</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-card transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Peluqueras y Esteticistas
                </h3>
                <p className="text-sm text-muted-foreground">
                  De pie cortando, peinando, atendiendo clienta tras clienta. Las medias te permiten concentrarte en tu trabajo sin pensar en el dolor de piernas.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Comodidad todo el día</li>
                  <li>• Previene fatiga muscular</li>
                  <li>• Cómodas y transpirables</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
          Medias recomendadas para trabajo de pie
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trabajoPieProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrabajoPie;
