import Navigation from "@/components/Navigation";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Heart, Shield, TrendingUp, MessageCircle, Star } from "lucide-react";
import { getFeaturedProducts, getWhatsAppLink } from "@/data/products";
import heroBanner from "@/assets/hero-banner.png";

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <WhatsAppFloat />

      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroBanner} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Piernas ligeras, incluso después de un turno eterno
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Medias de compresión Relaxsan Basic 20-30 mmHg. Alivio profesional para várices, trabajo de pie y piernas cansadas. Tallas S hasta 3XL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
              >
                <a
                  href={getWhatsAppLink("", "Hola, quiero asesoría personalizada sobre medias de compresión")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Asesoría por WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground text-lg px-8"
              >
                <a href="#productos">Ver Catálogo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Es para ti? */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Estas medias son para ti?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Si te identificas con alguna de estas situaciones, nuestras medias pueden cambiar tu día a día
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-border hover:shadow-card transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Mujeres con várices
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Várices visibles que te duelen o te acomplejan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Piernas hinchadas al final del día</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Tallas grandes (XL hasta 3XL disponibles)</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <a href="/medias-para-varices">Ver medias para várices</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-card transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Trabajo de pie todo el día
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Enfermeras con turnos de 12 horas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Vendedoras, cajeras, personal de retail</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Peluqueras, esteticistas, servicios</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <a href="/trabajo-de-pie">Ver medias para trabajo</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-card transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Piel sensible o clima cálido
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Piel que se irrita fácilmente</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Vives en clima tropical o muy caluroso</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Opción en algodón o punta abierta</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <a href="/piel-sensible">Ver medias hipoalergénicas</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Productos Destacados */}
      <section id="productos" className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Productos más vendidos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estas son las medias que más han ayudado a nuestras clientas a sentir alivio real
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <a href="/catalogo">Ver catálogo completo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Por qué confiar */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por qué confiar en nuestras medias de compresión
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Compresión Médica Certificada</h3>
            <p className="text-sm text-muted-foreground">20-30 mmHg Clase II, aprobada para uso terapéutico</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Enfoque Ortopédico</h3>
            <p className="text-sm text-muted-foreground">Diseñadas específicamente para várices y circulación</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Guía de Tallas Personalizada</h3>
            <p className="text-sm text-muted-foreground">Te ayudamos a elegir tu talla exacta por WhatsApp</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Clientes Satisfechas</h3>
            <p className="text-sm text-muted-foreground">Miles de mujeres ya sienten la diferencia</p>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lo que dicen nuestras clientas
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border">
              <CardContent className="pt-6 space-y-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Trabajo 12 horas de pie como enfermera y estas medias me salvaron la vida. Ya no llego a casa con las piernas hinchadas."
                </p>
                <div>
                  <p className="font-semibold text-foreground">María González</p>
                  <p className="text-sm text-muted-foreground">Enfermera, Bogotá</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 space-y-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Soy talla XL y me costaba encontrar medias para várices que me quedaran bien. Estas son perfectas y muy cómodas."
                </p>
                <div>
                  <p className="font-semibold text-foreground">Ana Rodríguez</p>
                  <p className="text-sm text-muted-foreground">Talla XL, Medellín</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 space-y-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Como cajera paso todo el día de pie. Estas medias me dan energía y ya no me duelen las piernas al terminar el turno."
                </p>
                <div>
                  <p className="font-semibold text-foreground">Carolina Pérez</p>
                  <p className="text-sm text-muted-foreground">Cajera, Cali</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="bg-gradient-hero text-primary-foreground border-0 overflow-hidden">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Lista para sentir tus piernas más ligeras?
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Escríbenos por WhatsApp y te ayudaremos a elegir las medias perfectas para ti en menos de 3 minutos
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
            >
              <a
                href={getWhatsAppLink("", "Hola, quiero empezar a sentir alivio en mis piernas")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Hablar con un asesor
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
