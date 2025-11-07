import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Ruler, Clock, CheckCircle2 } from "lucide-react";

const ComoElegirTallaCorrecta = () => {
  const relatedArticles = [
    {
      title: "Medias elásticas para várices: alivio efectivo",
      url: "/blog/medias-elasticas-para-varices",
      description: "Guía pilar completa sobre medias para várices"
    },
    {
      title: "Tipos de medias de compresión",
      url: "/blog/tipos-de-medias-de-compresion",
      description: "Conoce todos los tipos y niveles disponibles"
    },
    {
      title: "Medias Antiembólicas",
      url: "/blog/medias-antiembolicas",
      description: "Prevención de trombosis postoperatoria"
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo elegir la talla correcta de medias de compresión",
    "description": "Aprende a medir tus piernas correctamente y elegir la talla perfecta de medias de compresión.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Tomar medidas por la mañana",
        "text": "Mide tus piernas por la mañana dentro de la primera hora después de levantarte, cuando la hinchazón es mínima."
      },
      {
        "@type": "HowToStep",
        "name": "Medir circunferencia del tobillo",
        "text": "Mide la parte más estrecha del tobillo, justo por encima del hueso."
      },
      {
        "@type": "HowToStep",
        "name": "Medir circunferencia de pantorrilla",
        "text": "Mide la parte más ancha de la pantorrilla."
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Cómo Elegir la Talla de Medias de Compresión: Guía Paso a Paso</title>
        <meta name="description" content="Aprende a medir tus piernas correctamente y elegir la talla perfecta de medias de compresión. Guía práctica con tabla de tallas y consejos profesionales." />
        <meta name="keywords" content="medias de compresion medidas, como medir medias de compresion, talla de medias de compresion, guia de tallas medias compresion" />
        <link rel="canonical" href="https://plazamedik.net.pe/blog/como-elegir-talla-correcta" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navigation />
      <WhatsAppFloat />

      <article className="min-h-screen bg-background">
        <section className="bg-gradient-hero py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-medium mb-4">
              Guía Práctica
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              ¿Cómo elegir la talla correcta de medias de compresión?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Elegir la talla incorrecta puede arruinar tu experiencia. Aprende paso a paso cómo tomar las medidas correctas y elegir la talla perfecta para obtener el máximo beneficio.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <a href="https://plazamedik.net.pe/marca/relaxsan" target="_blank" rel="noopener noreferrer">
                Ver Tabla de Tallas RelaxSan
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl prose prose-lg">
            
            <h2 className="flex items-center gap-2 text-3xl font-bold mt-12 mb-6">
              <Ruler className="w-8 h-8 text-primary" />
              ¿Por qué es tan importante la talla correcta?
            </h2>
            <p>
              Las <strong>medias de compresión</strong> solo son efectivas cuando se ajustan perfectamente a tus piernas. Estas medias están diseñadas para aplicar una presión graduada específica en puntos clave de tu pierna: más fuerte en el tobillo y disminuyendo gradualmente hacia arriba.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <Card className="p-6 border-l-4 border-l-destructive">
                <h3 className="text-lg font-semibold mb-3">❌ Demasiado apretadas</h3>
                <ul className="text-sm space-y-1">
                  <li>• Cortan la circulación</li>
                  <li>• Causan dolor y marcas</li>
                  <li>• Difíciles de poner/quitar</li>
                  <li>• Irritan la piel</li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-l-muted">
                <h3 className="text-lg font-semibold mb-3">❌ Demasiado flojas</h3>
                <ul className="text-sm space-y-1">
                  <li>• Sin compresión efectiva</li>
                  <li>• Se arrugan y resbalan</li>
                  <li>• No alivian síntomas</li>
                  <li>• Desperdicio de dinero</li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-l-primary bg-primary/5">
                <h3 className="text-lg font-semibold mb-3">✅ Talla correcta</h3>
                <ul className="text-sm space-y-1">
                  <li>• Compresión precisa</li>
                  <li>• Comodidad todo el día</li>
                  <li>• Alivio efectivo</li>
                  <li>• Prevención óptima</li>
                </ul>
              </Card>
            </div>

            <p className="my-6">
              Antes de elegir, conoce: <Link to="/blog/tipos-de-medias-de-compresion" className="text-primary hover:underline font-semibold">Tipos de medias de compresión y sus beneficios</Link>
            </p>

            <h2 className="flex items-center gap-2 text-3xl font-bold mt-12 mb-6">
              <Clock className="w-8 h-8 text-accent" />
              Cuándo tomar las medidas: el momento importa
            </h2>
            
            <Card className="p-6 my-8 bg-accent/10 border-accent/20">
              <h3 className="text-xl font-semibold mb-4">Regla de oro:</h3>
              <p className="text-lg mb-4">
                Toma tus medidas <strong>por la mañana</strong>, idealmente dentro de la primera hora después de levantarte.
              </p>
              <div className="bg-background/50 p-4 rounded">
                <p className="font-semibold mb-2">¿Por qué por la mañana?</p>
                <p className="text-sm">
                  Durante la noche, tus piernas están elevadas y la hinchazón disminuye. Al estar de pie durante el día, la gravedad causa hinchazón progresiva. Si mides al final del día cuando están hinchadas, las medias quedarán flojas por la mañana.
                </p>
              </div>
            </Card>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Pasos antes de medir:</h3>
            <ol className="space-y-2">
              <li><strong>Levántate y camina</strong> 5-10 minutos para normalizar la circulación</li>
              <li><strong>Siéntate cómodamente</strong> en una silla con respaldo</li>
              <li><strong>Mantén la pierna relajada</strong>, sin tensar los músculos</li>
              <li><strong>Usa una cinta métrica flexible</strong> (de costura), no rígida</li>
            </ol>

            <h2 className="text-3xl font-bold mt-12 mb-6">
              Guía paso a paso para medir tus piernas
            </h2>

            <div className="space-y-8 my-8">
              <Card className="p-6 border-l-4 border-l-primary">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    C
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Circunferencia del tobillo</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Dónde:</strong> En la parte más estrecha del tobillo, justo por encima del hueso (maléolo).
                    </p>
                    <p className="text-sm mb-2"><strong>Cómo hacerlo:</strong></p>
                    <ol className="text-sm space-y-1 list-decimal list-inside ml-4">
                      <li>Siéntate con el pie apoyado en el suelo</li>
                      <li>Rodea el tobillo con la cinta métrica</li>
                      <li>Asegúrate de que esté horizontal y ajustada pero sin apretar</li>
                      <li>Anota la medida en centímetros</li>
                    </ol>
                    <p className="text-xs mt-2 text-muted-foreground">Medida normal: 18-28 cm</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-accent">
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    D
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Circunferencia de la pantorrilla</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Dónde:</strong> En la parte más ancha de la pantorrilla (generalmente a mitad entre tobillo y rodilla).
                    </p>
                    <p className="text-sm mb-2"><strong>Cómo hacerlo:</strong></p>
                    <ol className="text-sm space-y-1 list-decimal list-inside ml-4">
                      <li>Mantén la pierna relajada</li>
                      <li>Encuentra el punto más ancho palpando con las manos</li>
                      <li>Rodea con la cinta métrica horizontal</li>
                      <li>Anota la medida</li>
                    </ol>
                    <p className="text-xs mt-2 text-muted-foreground">Medida normal: 28-45 cm</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-secondary">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary text-secondary-foreground w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    AD
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Longitud hasta la rodilla</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Dónde:</strong> Desde el suelo hasta 2 dedos (3-4 cm) por debajo de la parte posterior de la rodilla.
                    </p>
                    <p className="text-sm mb-2"><strong>Cómo hacerlo:</strong></p>
                    <ol className="text-sm space-y-1 list-decimal list-inside ml-4">
                      <li>De pie, con peso distribuido en ambas piernas</li>
                      <li>Mide desde el suelo hasta el punto indicado</li>
                      <li>Mantén la cinta recta a lo largo de la pierna</li>
                    </ol>
                    <p className="text-xs mt-2 text-muted-foreground">Medida normal: 35-45 cm</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-accent/10 border-l-4 border-accent p-6 my-8 rounded-r">
              <p className="font-semibold mb-2">💡 Consejo profesional:</p>
              <p className="text-sm">
                Si tus medidas están en el límite entre dos tallas, elige la talla más grande para mayor comodidad, especialmente si es tu primera vez usando medias de compresión. Puedes consultarnos por WhatsApp para una recomendación personalizada.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">
              Tabla de tallas RelaxSan Basic
            </h2>
            
            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="border p-3 text-left">Talla</th>
                    <th className="border p-3">Tobillo (C) cm</th>
                    <th className="border p-3">Pantorrilla (D) cm</th>
                    <th className="border p-3">Altura (AD) cm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 font-semibold">S</td>
                    <td className="border p-3 text-center">18-20</td>
                    <td className="border p-3 text-center">28-32</td>
                    <td className="border p-3 text-center">35-38</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border p-3 font-semibold">M</td>
                    <td className="border p-3 text-center">20-22</td>
                    <td className="border p-3 text-center">32-36</td>
                    <td className="border p-3 text-center">37-40</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">L</td>
                    <td className="border p-3 text-center">22-24</td>
                    <td className="border p-3 text-center">36-40</td>
                    <td className="border p-3 text-center">39-42</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border p-3 font-semibold">XL</td>
                    <td className="border p-3 text-center">24-26</td>
                    <td className="border p-3 text-center">40-44</td>
                    <td className="border p-3 text-center">41-44</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">XXL</td>
                    <td className="border p-3 text-center">26-28</td>
                    <td className="border p-3 text-center">44-48</td>
                    <td className="border p-3 text-center">43-46</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Card className="p-6 my-8 bg-gradient-card">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Checklist final antes de comprar
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">☐</span>
                  <span>Medí mis piernas por la mañana</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">☐</span>
                  <span>Anoté las 3 medidas principales (tobillo, pantorrilla, longitud)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">☐</span>
                  <span>Comparé mis medidas con la tabla de tallas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">☐</span>
                  <span>Elegí el nivel de compresión adecuado (mmHg)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">☐</span>
                  <span>Decidí el tipo: rodilla, muslo o panty</span>
                </li>
              </ul>
            </Card>

            <div className="text-center my-12 p-8 bg-gradient-card rounded-lg">
              <h3 className="text-2xl font-bold mb-4">¿Dudas sobre tu talla?</h3>
              <p className="text-muted-foreground mb-6">
                Nuestro equipo puede ayudarte a elegir la talla perfecta basándose en tus medidas y necesidades específicas.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <a href="https://plazamedik.net.pe/categorias/medias-de-compresion" target="_blank" rel="noopener noreferrer">
                    Ver Productos
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`https://wa.me/51987654321?text=${encodeURIComponent("Hola, necesito ayuda para elegir la talla correcta de medias de compresión")}`} target="_blank" rel="noopener noreferrer">
                    Consultar por WhatsApp
                  </a>
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

export default ComoElegirTallaCorrecta;
