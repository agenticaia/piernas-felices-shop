import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, AlertCircle, Heart, Shield, Activity } from "lucide-react";

const MediasAntiembolicas = () => {
  const relatedArticles = [
    {
      title: "Tipos de medias de compresión y sus beneficios",
      url: "/blog/tipos-de-medias-de-compresion",
      description: "Conoce todos los tipos y niveles de compresión disponibles"
    },
    {
      title: "Medias elásticas para várices",
      url: "/blog/medias-elasticas-para-varices",
      description: "Guía pilar sobre tratamiento de várices"
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Medias Antiembólicas: Prevención de Coágulos y Trombosis",
    "description": "Descubre cómo las medias antiembólicas previenen coágulos y trombosis. Guía completa sobre uso postoperatorio, beneficios y diferencias.",
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
        <title>Medias Antiembólicas: Prevención de Trombosis | Guía Completa 2025</title>
        <meta name="description" content="Descubre cómo las medias antiembólicas previenen coágulos y trombosis. Guía completa sobre uso postoperatorio, beneficios y diferencias con medias de compresión." />
        <meta name="keywords" content="medias antiembolicas, medias antitromboticas, medias para pacientes, prevencion trombosis venosa profunda, medias postoperatorias, compresion graduada antiembolica" />
        <link rel="canonical" href="https://plazamedik.net.pe/blog/medias-antiembolicas" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navigation />
      <WhatsAppFloat />

      <article className="min-h-screen bg-background">
        <section className="bg-gradient-hero py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-block bg-destructive/10 text-destructive px-4 py-1 rounded-full text-sm font-medium mb-4">
              Hub - Prevención Médica
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Medias Antiembólicas: Prevención de Coágulos y Trombosis
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Las medias antiembólicas, también conocidas como medias TED, son dispositivos médicos especializados diseñados para prevenir la formación de coágulos sanguíneos en situaciones de alto riesgo como cirugías y hospitalizaciones.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <a href="https://plazamedik.net.pe/categorias/medias-antiembolicas" target="_blank" rel="noopener noreferrer">
                Ver Medias Antiembólicas
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl prose prose-lg">
            
            <h2 className="flex items-center gap-2 text-3xl font-bold mt-12 mb-6">
              <Shield className="w-8 h-8 text-destructive" />
              ¿Qué son las medias antiembólicas?
            </h2>
            <p>
              Las <strong>medias antiembólicas</strong> son un tipo especializado de medias de compresión graduada diseñadas para mejorar la circulación sanguínea en las piernas y prevenir la formación de coágulos (trombos) en pacientes con movilidad reducida o en reposo prolongado.
            </p>

            <Card className="p-6 my-8 bg-destructive/5 border-destructive/20">
              <h3 className="text-xl font-semibold mb-4">Características específicas:</h3>
              <ul className="space-y-2">
                <li>✓ <strong>Diseñadas para uso en reposo</strong> - Efectivas cuando el paciente está acostado o sentado</li>
                <li>✓ <strong>Presión específica</strong> - Generalmente 18-22 mmHg en el tobillo</li>
                <li>✓ <strong>Uso hospitalario</strong> - Común en postoperatorios y hospitalizaciones</li>
                <li>✓ <strong>Certificadas médicamente</strong> - Dispositivo médico clase I o II</li>
                <li>✓ <strong>Uso 24 horas</strong> - Pueden usarse incluso durmiendo bajo supervisión médica</li>
              </ul>
            </Card>

            <div className="bg-accent/10 border-l-4 border-accent p-6 my-8 rounded-r">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Diferencia clave:
              </p>
              <p className="text-sm">
                Las medias para várices están diseñadas para contrarrestar la gravedad cuando estás de pie, mientras que las antiembólicas funcionan efectivamente incluso en reposo.
              </p>
            </div>

            <p className="my-6">
              Compara con: <Link to="/blog/tipos-de-medias-de-compresion" className="text-primary hover:underline font-semibold">Tipos de medias de compresión y sus beneficios</Link>
            </p>

            <h2 className="flex items-center gap-2 text-3xl font-bold mt-12 mb-6">
              <Activity className="w-8 h-8 text-primary" />
              ¿Cómo funcionan las medias antiembólicas?
            </h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4">El problema: trombosis venosa profunda (TVP)</h3>
            <p>
              Cuando permaneces inmóvil por períodos prolongados (cirugía, hospitalización, viajes largos), la sangre tiende a estancarse en las venas profundas de las piernas. Este estancamiento puede provocar:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="p-6 border-l-4 border-l-destructive">
                <h4 className="font-semibold mb-2 text-destructive">🩸 Trombosis Venosa Profunda (TVP)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Formación de coágulos en venas profundas</li>
                  <li>• Dolor, hinchazón y enrojecimiento</li>
                  <li>• Riesgo de complicaciones graves</li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-l-destructive">
                <h4 className="font-semibold mb-2 text-destructive">⚠️ Embolia Pulmonar</h4>
                <ul className="text-sm space-y-1">
                  <li>• El coágulo viaja a los pulmones</li>
                  <li>• Condición potencialmente mortal</li>
                  <li>• Requiere tratamiento urgente</li>
                </ul>
              </Card>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">La solución: compresión graduada antiembólica</h3>
            <div className="bg-primary/5 p-6 rounded-lg my-8">
              <p className="font-semibold mb-4">Las medias antiembólicas funcionan mediante:</p>
              <ol className="space-y-3 list-decimal list-inside">
                <li><strong>Compresión graduada precisa (100% → 70% → 40%)</strong>
                  <p className="text-sm text-muted-foreground ml-6">Presión máxima en tobillo (18-22 mmHg), disminución gradual hacia arriba</p>
                </li>
                <li><strong>Reducción del diámetro venoso</strong>
                  <p className="text-sm text-muted-foreground ml-6">Venas más estrechas = flujo sanguíneo más rápido</p>
                </li>
                <li><strong>Mejora de la función valvular</strong>
                  <p className="text-sm text-muted-foreground ml-6">Ayuda a las válvulas venosas a cerrarse correctamente</p>
                </li>
                <li><strong>Estimulación de la circulación</strong>
                  <p className="text-sm text-muted-foreground ml-6">Efecto de "bombeo externo" incluso sin movimiento muscular</p>
                </li>
              </ol>
            </div>

            <Card className="p-6 my-8 bg-accent/10">
              <p className="font-semibold text-lg">
                <Heart className="inline w-5 h-5 mr-2" />
                Resultado: Disminución del 50-60% en el riesgo de desarrollar TVP en pacientes de alto riesgo.
              </p>
            </Card>

            <p className="my-6">
              Entiende más: <Link to="/blog/medias-elasticas-para-varices" className="text-primary hover:underline font-semibold">Medias elásticas para várices: alivio efectivo para tus piernas</Link>
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">
              Diferencias entre medias antiembólicas y medias para várices
            </h2>

            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="border p-3 text-left">Característica</th>
                    <th className="border p-3 text-left">Medias para Várices</th>
                    <th className="border p-3 text-left">Medias Antiembólicas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 font-semibold">Uso principal</td>
                    <td className="border p-3">Insuficiencia venosa, várices</td>
                    <td className="border p-3">Prevención de trombosis</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border p-3 font-semibold">Contexto</td>
                    <td className="border p-3">Ambulatorio (persona activa)</td>
                    <td className="border p-3">Hospitalario (reposo/movilidad reducida)</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Compresión típica</td>
                    <td className="border p-3">8-30 mmHg</td>
                    <td className="border p-3">18-22 mmHg</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border p-3 font-semibold">Cuándo usar</td>
                    <td className="border p-3">Durante el día (sin dormir)</td>
                    <td className="border p-3">24 horas (incluso durmiendo)</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Duración de uso</td>
                    <td className="border p-3">Largo plazo (meses/años)</td>
                    <td className="border p-3">Corto-mediano plazo (días/semanas)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-accent/10 border-l-4 border-accent p-6 my-8 rounded-r">
              <p className="font-semibold">⚠️ Importante:</p>
              <p className="text-sm">
                No son intercambiables. Cada una tiene su propósito específico según la situación clínica.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">
              ¿Cuándo se usan las medias antiembólicas?
            </h2>

            <div className="grid gap-6 my-8">
              <Card className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">1</span>
                  Postoperatorio inmediato
                </h3>
                <p className="text-sm text-muted-foreground">
                  Después de cualquier cirugía mayor, especialmente ortopédica, abdominal o cardiovascular. La inmovilidad postoperatoria aumenta dramáticamente el riesgo de TVP.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">2</span>
                  Hospitalización prolongada
                </h3>
                <p className="text-sm text-muted-foreground">
                  Pacientes que deben permanecer en cama por enfermedad, recuperación o tratamiento médico. La falta de movimiento es un factor de riesgo crítico.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">3</span>
                  Embarazo de alto riesgo
                </h3>
                <p className="text-sm text-muted-foreground">
                  En embarazos con reposo prolongado prescrito o cesárea programada. Las hormonas del embarazo aumentan la coagulabilidad sanguínea.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">4</span>
                  Viajes prolongados con movilidad limitada
                </h3>
                <p className="text-sm text-muted-foreground">
                  Vuelos largos (más de 4 horas) o viajes en bus para personas con factores de riesgo adicionales (edad, obesidad, antecedentes).
                </p>
              </Card>
            </div>

            <div className="text-center my-12 p-8 bg-gradient-card rounded-lg">
              <h3 className="text-2xl font-bold mb-4">¿Necesitas medias antiembólicas?</h3>
              <p className="text-muted-foreground mb-6">
                Consulta siempre con tu médico antes de usar medias antiembólicas. Son dispositivos médicos que requieren indicación profesional.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <a href="https://plazamedik.net.pe/categorias/medias-antiembolicas" target="_blank" rel="noopener noreferrer">
                    Ver Productos
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/blog/tipos-de-medias-de-compresion">
                    Ver Todos los Tipos
                  </Link>
                </Button>
              </div>
            </div>

            <section className="mt-16 pt-8 border-t">
              <h2 className="text-3xl font-bold mb-8">Artículos Relacionados</h2>
              <div className="grid md:grid-cols-2 gap-6">
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

export default MediasAntiembolicas;
