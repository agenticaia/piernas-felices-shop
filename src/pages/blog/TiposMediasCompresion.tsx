import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Layers, Heart, Activity } from "lucide-react";

const TiposMediasCompresion = () => {
  const relatedArticles = [
    {
      title: "Medias elásticas para várices: alivio efectivo",
      url: "/blog/medias-elasticas-para-varices",
      description: "Guía pilar completa sobre medias para várices"
    },
    {
      title: "¿Cómo elegir la talla correcta?",
      url: "/blog/como-elegir-talla-correcta",
      description: "Aprende a medir y elegir tu talla perfecta"
    },
    {
      title: "Medias Antiembólicas",
      url: "/blog/medias-antiembolicas",
      description: "Prevención de trombosis postoperatoria"
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Tipos de Medias de Compresión y Sus Beneficios",
    "description": "Descubre los tipos de medias de compresión, niveles de compresión en mmHg, beneficios para várices e insuficiencia venosa.",
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
    }
  };

  return (
    <>
      <Helmet>
        <title>Tipos de Medias de Compresión y Sus Beneficios | Guía Completa 2025</title>
        <meta name="description" content="Descubre los tipos de medias de compresión, niveles de compresión en mmHg, beneficios para várices e insuficiencia venosa. Guía completa con productos certificados RelaxSan." />
        <meta name="keywords" content="tipos de medias de compresion, medias de compresion grados, para que sirven las medias de compresion, medias de compresion graduada, como funcionan las medias de compresion" />
        <link rel="canonical" href="https://plazamedik.net.pe/blog/tipos-de-medias-de-compresion" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navigation />
      <WhatsAppFloat />

      <article className="min-h-screen bg-background">
        <section className="bg-gradient-hero py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              Hub - Guía Completa
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tipos de medias de compresión y sus beneficios
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Las medias de compresión son mucho más que una simple prenda: son dispositivos médicos terapéuticos diseñados para mejorar la circulación sanguínea, prevenir y tratar problemas venosos.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <a href="https://plazamedik.net.pe/categorias/medias-de-compresion" target="_blank" rel="noopener noreferrer">
                Ver Catálogo RelaxSan
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl prose prose-lg">
            
            <h2 className="flex items-center gap-2 text-3xl font-bold mt-12 mb-6">
              <Heart className="w-8 h-8 text-primary" />
              ¿Qué son las medias de compresión?
            </h2>
            <p>
              Las <strong>medias de compresión</strong> son prendas elásticas especializadas que aplican presión controlada y decreciente sobre las piernas. A diferencia de las medias o calcetines regulares, están diseñadas con una tecnología específica llamada <strong>compresión graduada</strong>, que ejerce mayor presión en el tobillo y disminuye progresivamente hacia la parte superior de la pierna.
            </p>

            <Card className="p-6 my-8 bg-gradient-card">
              <h3 className="text-xl font-semibold mb-4">Principio de la compresión graduada:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span><strong>100% de compresión en el tobillo</strong> → Presión máxima donde la sangre tiende a estancarse</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span><strong>70% de compresión en la pantorrilla</strong> → Presión intermedia para facilitar el flujo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span><strong>40% de compresión en el muslo</strong> → Presión mínima para completar el retorno venoso</span>
                </li>
              </ul>
            </Card>

            <p className="my-6">
              Conoce más sobre: <Link to="/blog/medias-elasticas-para-varices" className="text-primary hover:underline font-semibold">Medias elásticas para várices: alivio efectivo para tus piernas</Link>
            </p>

            <h2 className="flex items-center gap-2 text-3xl font-bold mt-12 mb-6">
              <Activity className="w-8 h-8 text-primary" />
              ¿Cómo funcionan las medias de compresión?
            </h2>
            
            <h3 className="text-2xl font-semibold mt-8 mb-4">El problema: insuficiencia venosa</h3>
            <p>
              Tus venas tienen válvulas unidireccionales que previenen que la sangre retroceda. Cuando estás de pie, la gravedad hace que la sangre tienda a acumularse en las piernas. Si estas válvulas no funcionan correctamente, la sangre se estanca, causando:
            </p>
            <ul>
              <li>Várices (venas dilatadas y visibles)</li>
              <li>Hinchazón en tobillos y piernas</li>
              <li>Sensación de pesadez y fatiga</li>
              <li>Dolor, calambres y picazón</li>
              <li>En casos severos: úlceras y trombosis</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">La solución: compresión graduada externa</h3>
            <div className="bg-primary/5 p-6 rounded-lg my-8">
              <p className="font-semibold mb-4">Las medias de compresión actúan como un "músculo externo" que:</p>
              <ol className="space-y-2 list-decimal list-inside">
                <li><strong>Reduce el diámetro de las venas superficiales</strong> → Mejora la velocidad del flujo sanguíneo</li>
                <li><strong>Ayuda a las válvulas venosas</strong> a cerrarse correctamente</li>
                <li><strong>Disminuye la presión venosa</strong> en las piernas</li>
                <li><strong>Reduce la acumulación de líquidos</strong> en los tejidos (edema)</li>
                <li><strong>Previene la formación de coágulos</strong> al mantener la sangre en movimiento</li>
              </ol>
            </div>

            <h2 className="flex items-center gap-2 text-3xl font-bold mt-12 mb-6">
              <Layers className="w-8 h-8 text-primary" />
              Tipos de medias según nivel de compresión (mmHg)
            </h2>

            <div className="grid gap-6 my-8">
              <Card className="p-6 border-l-4 border-l-primary/30">
                <h3 className="text-xl font-semibold mb-2">Compresión muy ligera: 8-11 mmHg</h3>
                <p className="text-sm text-muted-foreground mb-4">Prevención básica</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Para qué sirven:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Prevención en personas sin síntomas visibles</li>
                    <li>Alivio de piernas cansadas por estar de pie</li>
                    <li>Viajes largos (prevención de hinchazón leve)</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-primary">
                <h3 className="text-xl font-semibold mb-2">Compresión ligera: 12-17 mmHg ⭐</h3>
                <p className="text-sm text-accent mb-4">IDEAL PARA PREVENCIÓN</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Para qué sirven:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Problemas circulatorios leves</li>
                    <li>Tendencia a várices (venas pequeñas apenas visibles)</li>
                    <li>Embarazo (todos los trimestres)</li>
                    <li>Prevención activa con antecedentes familiares</li>
                  </ul>
                  <p className="mt-4"><strong>Productos RelaxSan:</strong> Calcetines Basic 12-17 mmHg</p>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-accent">
                <h3 className="text-xl font-semibold mb-2">Compresión moderada: 18-22 mmHg ⭐⭐</h3>
                <p className="text-sm text-accent mb-4">MÁS POPULAR - VÁRICES LEVES A MODERADAS</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Para qué sirven:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Várices visibles (pequeñas a medianas)</li>
                    <li>Hinchazón frecuente de tobillos y piernas</li>
                    <li>Trabajo de pie prolongado (más de 8 horas)</li>
                    <li>Post-escleroterapia o tratamientos venosos</li>
                    <li>Prevención de trombosis en viajes largos</li>
                  </ul>
                  <p className="mt-4"><strong>Línea RelaxSan Basic:</strong> Modelos 750, 870, 880</p>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-destructive">
                <h3 className="text-xl font-semibold mb-2">Compresión fuerte: 22-27 mmHg ⭐⭐⭐</h3>
                <p className="text-sm text-destructive mb-4">VÁRICES AVANZADAS - RECOMENDACIÓN MÉDICA</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Para qué sirven:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Várices marcadas y dolorosas</li>
                    <li>Insuficiencia venosa crónica</li>
                    <li>Edema severo persistente</li>
                    <li>Post-cirugía de várices (safenectomía)</li>
                    <li>Prevención de úlceras venosas</li>
                  </ul>
                  <p className="mt-4"><strong>Productos RelaxSan:</strong> Serie 950A (puntera abierta)</p>
                </div>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">
              Tipos de medias según longitud
            </h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="p-6">
                <h3 className="font-semibold mb-3">🧦 Hasta la rodilla</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Lo más popular.</strong> Cubre desde el pie hasta justo debajo de la rodilla.
                </p>
                <p className="text-xs text-muted-foreground">
                  Ideal para várices en pantorrilla, trabajo de pie, uso diario. Fáciles de poner y quitar.
                </p>
                <p className="text-xs font-semibold mt-2">Modelos: RelaxSan 750, 950A</p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-3">🦵 Hasta el muslo (autoreggente)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Mayor cobertura.</strong> Con banda de silicona antideslizante.
                </p>
                <p className="text-xs text-muted-foreground">
                  Para várices que afectan muslo y pantorrilla. No necesita liguero.
                </p>
                <p className="text-xs font-semibold mt-2">Modelos: RelaxSan 870, 870A</p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-3">👖 Panty completo (pantimedia)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Cobertura total.</strong> Para ambas piernas con panty hasta cintura.
                </p>
                <p className="text-xs text-muted-foreground">
                  Ideal para embarazo, várices bilaterales, prevención completa.
                </p>
                <p className="text-xs font-semibold mt-2">Modelos: RelaxSan 880</p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-3">👣 Puntera abierta vs cerrada</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Abierta:</strong> Mayor ventilación, ideal para climas cálidos o pies anchos.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Cerrada:</strong> Protección completa del pie, más estética.
                </p>
              </Card>
            </div>

            <div className="text-center my-12 p-8 bg-gradient-card rounded-lg">
              <h3 className="text-2xl font-bold mb-4">¿No sabes qué tipo elegir?</h3>
              <p className="text-muted-foreground mb-6">
                Nuestros asesores te ayudarán a elegir el tipo y nivel de compresión ideal para tu caso.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <a href="https://plazamedik.net.pe/categorias/medias-de-compresion" target="_blank" rel="noopener noreferrer">
                    Ver Catálogo
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/blog/como-elegir-talla-correcta">
                    Guía de Tallas
                  </Link>
                </Button>
              </div>
            </div>

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

export default TiposMediasCompresion;
