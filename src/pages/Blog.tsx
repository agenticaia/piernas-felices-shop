import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import Footer from "@/components/Footer";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Clock, ArrowRight } from "lucide-react";

const Blog = () => {
  const articles = [
    {
      title: "¿Cómo elegir la talla correcta de medias de compresión?",

      excerpt:
        "Guía completa paso a paso para medir tus piernas y elegir la talla perfecta que te brinde el máximo alivio sin incomodidad.",
      url: "/blog/como-elegir-talla-correcta",
      readTime: "5 min",

      category: "Guías",
    },

    {
      title: "Várices: 7 señales de que necesitas medias de compresión YA",

      excerpt:
        "Descubre los síntomas tempranos que indican que es momento de empezar a usar compresión para prevenir que empeoren.",
      url: "/blog/medias-elasticas-para-varices",
      readTime: "4 min",

      category: "Salud",
    },

    {
      title: "¿Por qué se hinchan las piernas al trabajar de pie? La ciencia detrás",

      excerpt:
        "Entiende qué le pasa a tu circulación cuando estás de pie muchas horas y por qué la compresión es la solución.",
      url: "/blog/tipos-de-medias-de-compresion",
      readTime: "6 min",

      category: "Educación",
    },

    {
      title: "Medias de compresión en el embarazo: Todo lo que necesitas saber",

      excerpt:
        "Cómo las medias de compresión pueden aliviar las molestias del embarazo y prevenir complicaciones vasculares.",
      url: "/blog/medias-antiembolicas",
      readTime: "7 min",

      category: "Embarazo",
    },

    {
      title: "¿Dan calor las medias de compresión? Mitos y realidades",

      excerpt: "Desmontamos el mito más común sobre las medias de compresión y te damos opciones para clima cálido.",

      readTime: "4 min",

      category: "Mitos",
    },

    {
      title: "Cómo cuidar tus medias de compresión para que duren más",

      excerpt:
        "Técnicas de lavado y cuidado que prolongarán la vida útil de tus medias manteniendo la compresión efectiva.",

      readTime: "5 min",

      category: "Cuidados",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <WhatsAppFloat />

      {/* Header */}

      <section className="bg-gradient-hero text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Blog: Todo sobre medias de compresión</h1>

            <p className="text-lg text-primary-foreground/90">
              Guías, consejos y información para que tomes la mejor decisión para tu salud
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* --- 3. ENLAZAR LAS TARJETAS --- */}
          {articles.map((article, index) => (
            // Envolvemos toda la tarjeta en un Link
            <Link to={article.url} key={index} className="block no-underline text-current">
              <Card className="border-border hover:shadow-card transition-shadow group h-full flex flex-col">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </CardHeader>
                {/* Hacemos que el contenido crezca para alinear el "Leer más" abajo */}
                <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground">{article.excerpt}</p>
                  {/* Reemplazamos el <Button> por un div con el mismo estilo */}
                  <div className="pt-2 text-primary font-medium flex items-center">
                    Leer más
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* --- 4. SECCIÓN "PRÓXIMAMENTE" ELIMINADA --- */}
        {/* Ya no es necesaria porque los artículos están enlazados */}
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
