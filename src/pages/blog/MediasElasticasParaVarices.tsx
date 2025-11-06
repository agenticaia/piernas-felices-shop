import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Heart, Shield, TrendingUp } from "lucide-react";

const MediasElasticasParaVarices = () => {
  const relatedArticles = [
    {
      title: "Tipos de medias de compresión y sus beneficios",
      url: "/blog/tipos-de-medias-de-compresion",
      description: "Descubre los diferentes tipos y niveles de compresión"
    },
    {
      title: "¿Cómo elegir la talla correcta de medias de compresión?",
      url: "/blog/como-elegir-talla-correcta",
      description: "Guía paso a paso para medir y elegir tu talla perfecta"
    },
    {
      title: "Medias Antiembólicas",
      url: "/blog/medias-antiembolicas",
      description: "Prevención de trombosis y coágulos en situaciones de riesgo"
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Medias elásticas para várices: alivio efectivo para tus piernas",
    "description": "Guía completa sobre medias elásticas para várices. Descubre cómo alivian el dolor, mejoran la circulación y qué nivel de compresión necesitas.",
    "author": {
      "@type": "Organization",
      "name": "PlazaMedik"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PlazaMedik",
      "logo": {
        "@type": "ImageObject",
        "url": "https://plazamedik.net.pe/logo.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-15"
  };

  return (
    <>
      <Helmet>
        <title>Medias Elásticas para Várices: Guía Completa 2025 | RelaxSan Perú</title>
        <meta name="description" content="Guía completa sobre medias elásticas para várices. Descubre cómo alivian el dolor, mejoran la circulación y qué nivel de compresión necesitas. Calidad italiana RelaxSan en Lima." />
        <meta name="keywords" content="medias elasticas para varices, medias de compresion para varices, medias para varices 15 20 mmhg, medias compresivas varices, medias antivarices, donde comprar medias de compresion en lima" />
        <link rel="canonical" href="https://plazamedik.net.pe/blog/medias-elasticas-para-varices" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navigation />
      <WhatsAppFloat />

      <article className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-hero py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-medium mb-4">
              Artículo Pilar
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Medias elásticas para várices: alivio efectivo para tus piernas
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Las várices no solo son un problema estético; causan dolor, hinchazón y esa sensación de piernas pesadas que afecta tu calidad de vida diaria. Esta es tu guía definitiva para entender y elegir las medias de compresión correctas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <a href="https://plazamedik.net.pe/categorias/medias-de-compresion" target="_blank" rel="noopener noreferrer">
                  Ver Medias RelaxSan
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl prose prose-lg">
            
            <h2 className="flex items-center gap-2 text-3xl font-bold mt-12 mb-6">
              <Heart className="w-8 h-8 text-primary" />
              ¿Qué son las medias elásticas para várices?
            </h2>
            <p>
              Las <strong>medias elásticas para várices</strong>, también conocidas como medias de compresión graduada, son dispositivos médicos especializados diseñados para aplicar presión controlada y decreciente en las piernas. A diferencia de las medias comunes, estas prendas terapéuticas están fabricadas con fibras elásticas de alta calidad (como elastano doble) que ejercen una <strong>compresión graduada</strong>: más fuerte en el tobillo (100%) y disminuyendo progresivamente hacia arriba (70% en pantorrilla, 40% en muslo).
            </p>
            
            <Card className="p-6 my-8 bg-gradient-card border-primary/20">
              <h3 className="text-xl font-semibold mb-4">Beneficios de la compresión graduada:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Ayuda a las válvulas venosas a funcionar correctamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Facilita el retorno de la sangre al corazón</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Reduce la presión en las venas superficiales</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Previene el estancamiento sanguíneo</span>
                </li>
              </ul>
            </Card>

            <h3 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-accent" />
              La diferencia de un dispositivo médico certificado
            </h3>
            <p>
              Las <strong>medias de compresión médicas</strong> como RelaxSan (100% fabricadas en Italia) están certificadas como dispositivos médicos, lo que garantiza:
            </p>
            <ul>
              <li><strong>Compresión graduada precisa</strong> medida en mmHg (milímetros de mercurio)</li>
              <li><strong>Materiales hipoalergénicos</strong> de grado médico</li>
              <li><strong>Durabilidad garantizada</strong> con elastano doble de alta calidad</li>
              <li><strong>Talón y puntera anatómicos</strong> reforzados para ajuste perfecto</li>
              <li><strong>Costuras planas</strong> que previenen rozaduras</li>
              <li><strong>Certificación internacional</strong> de efectividad terapéutica</li>
            </ul>
            
            <p className="my-6">
              Descubre más sobre: <Link to="/blog/tipos-de-medias-de-compresion" className="text-primary hover:underline font-semibold">Tipos de medias de compresión y sus beneficios</Link>
            </p>

            <h2 className="flex items-center gap-2 text-3xl font-bold mt-12 mb-6">
              <TrendingUp className="w-8 h-8 text-primary" />
              Niveles de compresión: ¿cuál necesitas?
            </h2>
            <p>
              Las medias de compresión se clasifican por la cantidad de presión que ejercen, medida en <strong>milímetros de mercurio (mmHg)</strong>. Elegir el nivel correcto es fundamental para obtener los resultados deseados.
            </p>

            <div className="grid gap-6 my-8">
              <Card className="p-6 border-l-4 border-l-primary">
                <h3 className="text-xl font-semibold mb-2">Compresión ligera: 12-17 mmHg ⭐</h3>
                <p className="text-muted-foreground mb-4">IDEAL PARA PREVENCIÓN</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Problemas circulatorios leves</li>
                  <li>✓ Tendencia a várices (venas pequeñas visibles)</li>
                  <li>✓ Embarazo (todos los trimestres)</li>
                  <li>✓ Prevención en personas con antecedentes familiares</li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-l-accent">
                <h3 className="text-xl font-semibold mb-2">Compresión moderada: 18-22 mmHg ⭐⭐</h3>
                <p className="text-muted-foreground mb-4">MÁS POPULAR - VÁRICES LEVES A MODERADAS</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Várices visibles (pequeñas a medianas)</li>
                  <li>✓ Hinchazón frecuente de tobillos</li>
                  <li>✓ Trabajo de pie prolongado (8+ horas)</li>
                  <li>✓ Después de escleroterapia</li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-l-destructive">
                <h3 className="text-xl font-semibold mb-2">Compresión fuerte: 22-27 mmHg ⭐⭐⭐</h3>
                <p className="text-muted-foreground mb-4">VÁRICES AVANZADAS - USO MÉDICO</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Várices marcadas y dolorosas</li>
                  <li>✓ Insuficiencia venosa crónica</li>
                  <li>✓ Edema severo</li>
                  <li>✓ Post-cirugía de várices</li>
                </ul>
              </Card>
            </div>

            <div className="bg-accent/10 border-l-4 border-accent p-6 my-8 rounded-r">
              <p className="font-semibold mb-2">💡 Consejo profesional:</p>
              <p>
                Si tienes dudas sobre qué nivel de compresión elegir, consulta con tu médico o escríbenos por WhatsApp. Un nivel muy alto innecesariamente puede ser incómodo, mientras que un nivel muy bajo no dará resultados.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">
              ¿Por qué elegir RelaxSan Basic en Perú?
            </h2>
            <p>
              <strong>RelaxSan</strong> es una marca italiana líder en medias de compresión médica con más de 30 años de experiencia. La línea <strong>RelaxSan Basic</strong> está diseñada específicamente para uso diario en várices y problemas circulatorios:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="p-6">
                <h3 className="font-semibold mb-3">🇮🇹 Fabricación Italiana</h3>
                <p className="text-sm text-muted-foreground">
                  100% fabricadas en Italia con los más altos estándares de calidad europeos. Certificación CE como dispositivo médico.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-3">💪 Elastano Doble</h3>
                <p className="text-sm text-muted-foreground">
                  Tecnología de doble elastano que garantiza compresión constante durante todo el día y mayor durabilidad.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-3">🌡️ Clima Tropical</h3>
                <p className="text-sm text-muted-foreground">
                  Tejido transpirable adaptado para el clima cálido de Lima y todo Perú. No dan calor excesivo.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-3">📏 Tallas Inclusivas</h3>
                <p className="text-sm text-muted-foreground">
                  Desde S hasta 3XL. Medias diseñadas para adaptarse a todas las tallas con la misma efectividad.
                </p>
              </Card>
            </div>

            <div className="text-center my-12 p-8 bg-gradient-card rounded-lg">
              <h3 className="text-2xl font-bold mb-4">¿Lista para aliviar tus piernas?</h3>
              <p className="text-muted-foreground mb-6">
                Encuentra tu par perfecto de medias RelaxSan Basic en PlazaMedik. Envíos a todo Perú.
              </p>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <a href="https://plazamedik.net.pe/categorias/medias-de-compresion" target="_blank" rel="noopener noreferrer">
                  Ver Catálogo Completo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>

            {/* Related Articles */}
            <section className="mt-16 pt-8 border-t">
              <h2 className="text-3xl font-bold mb-8">Artículos Relacionados</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((article, index) => (
                  <Link key={index} to={article.url}>
                    <Card className="p-6 h-full hover:shadow-hover transition-shadow">
                      <h3 className="font-semibold mb-2 text-foreground hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {article.description}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
};

export default MediasElasticasParaVarices;
