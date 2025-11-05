import { useState } from "react";
import Navigation from "@/components/Navigation";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, getWhatsAppLink } from "@/data/products";
import { Filter } from "lucide-react";

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" || product.category.includes(selectedCategory);
    const typeMatch = selectedType === "all" || product.type === selectedType;
    return categoryMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <WhatsAppFloat />

      {/* Header */}
      <section className="bg-gradient-hero text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Catálogo de Medias de Compresión
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Encuentra la media perfecta para tus necesidades. Todas con compresión médica 20-30 mmHg
            </p>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-accent/10 border-y border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">¿No sabes qué modelo elegir?</span> Escríbenos por WhatsApp y te guiamos en 3 minutos
            </p>
            <Button
              asChild
              size="sm"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
            >
              <a
                href={getWhatsAppLink("", "Hola, necesito ayuda para elegir mis medias de compresión")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ayúdame a elegir
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Filtrar por:</h2>
        </div>

        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Problema:</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory("all")}
              >
                Todos
              </Badge>
              <Badge
                variant={selectedCategory === "varices" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory("varices")}
              >
                Várices
              </Badge>
              <Badge
                variant={selectedCategory === "trabajo-pie" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory("trabajo-pie")}
              >
                Trabajo de pie
              </Badge>
              <Badge
                variant={selectedCategory === "piel-sensible" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory("piel-sensible")}
              >
                Piel sensible
              </Badge>
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Tipo:</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedType === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedType("all")}
              >
                Todos
              </Badge>
              <Badge
                variant={selectedType === "rodilla" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedType("rodilla")}
              >
                Hasta rodilla
              </Badge>
              <Badge
                variant={selectedType === "muslo" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedType("muslo")}
              >
                Hasta muslo
              </Badge>
              <Badge
                variant={selectedType === "panty" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedType("panty")}
              >
                Panty completo
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No se encontraron productos con estos filtros
            </p>
            <Button onClick={() => { setSelectedCategory("all"); setSelectedType("all"); }}>
              Limpiar filtros
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Catalog;
