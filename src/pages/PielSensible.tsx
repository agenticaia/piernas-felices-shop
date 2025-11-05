import Navigation from "@/components/Navigation";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Thermometer, Droplets, Shield, Check } from "lucide-react";
import { getProductsByCategory } from "@/data/products";

const PielSensible = () => {
  const pielSensibleProducts = getProductsByCategory("piel-sensible");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <WhatsAppFloat />

      {/* Header */}
      <section className="bg-gradient-hero text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Medias para Piel Sensible
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Máxima transpirabilidad y confort. Alivio terapéutico sin irritación ni incomodidad
            </p>
          </div>
        </div>
      </section>

      {/* Explicación */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              ¿Por qué elegir medias especiales para piel sensible?
            </h2>
            <p className="text-muted-foreground mb-6">
              Si tienes piel sensible, vives en clima cálido o simplemente sudas mucho, necesitas medias diseñadas específicamente para ti. Las medias convencionales pueden:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Check className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Causar irritación</h3>
                  <p className="text-sm text-muted-foreground">Enrojecimiento, picazón o erupciones en pieles sensibles</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Check className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Dar demasiado calor</h3>
                  <p className="text-sm text-muted-foreground">Sudoración excesiva e incomodidad en clima tropical</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Check className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Ser incómodas</h3>
                  <p className="text-sm text-muted-foreground">Sensación de opresión o asfixia en los pies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">
              Nuestras soluciones especiales
            </h3>
            <p className="text-sm text-muted-foreground">
              Ofrecemos medias con punta abierta (dedos libres para máxima ventilación) y opciones en materiales hipoalergénicos ultra-transpirables. Mismo efecto terapéutico, máximo confort.
            </p>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Características que marcan la diferencia
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border hover:shadow-card transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Thermometer className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Punta Abierta
                </h3>
                <p className="text-sm text-muted-foreground">
                  Los dedos quedan libres, permitiendo mejor ventilación y evitando sensación de asfixia. Perfecto para clima cálido o si tienes los pies sensibles.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Máxima transpirabilidad</li>
                  <li>• Cero irritación entre dedos</li>
                  <li>• Ideal para verano o clima tropical</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-card transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Hipoalergénicas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tejidos especiales que minimizan el riesgo de reacciones alérgicas. Sin componentes que irriten la piel sensible.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Materiales testados dermatológicamente</li>
                  <li>• Sin látex ni irritantes comunes</li>
                  <li>• Aptas para pieles atópicas</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-card transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Ultra Transpirables
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tejidos técnicos que permiten la evaporación del sudor, manteniendo tus piernas secas y cómodas todo el día.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Regulación natural de temperatura</li>
                  <li>• Control de humedad</li>
                  <li>• Frescura durante horas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            ¿Son para ti?
          </h2>

          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-3">Eres candidata perfecta si:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Tu piel se irrita fácilmente con telas sintéticas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Vives en una ciudad calurosa o clima tropical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Sudas mucho en los pies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Has probado medias de compresión antes y te dieron mucho calor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Tienes dermatitis, eczema o piel atópica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Prefieres materiales naturales como el algodón</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Importante: Mismo efecto terapéutico
              </h3>
              <p className="text-sm text-muted-foreground">
                Aunque estas medias son más transpirables y suaves, mantienen la misma compresión graduada 20-30 mmHg efectiva para várices y circulación. No sacrificas resultados por comodidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Medias recomendadas para piel sensible
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pielSensibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PielSensible;
