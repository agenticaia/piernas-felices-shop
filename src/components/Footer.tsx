import { Link } from "react-router-dom";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PL</span>
              </div>
              <span className="font-semibold text-lg text-foreground">Piernas Ligeras</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Medias de compresión Relaxsan Basic 20-30 mmHg. Alivio profesional para tus piernas.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/catalogo" className="text-sm text-muted-foreground hover:text-primary">Catálogo</Link></li>
              <li><Link to="/medias-para-varices" className="text-sm text-muted-foreground hover:text-primary">Várices</Link></li>
              <li><Link to="/trabajo-de-pie" className="text-sm text-muted-foreground hover:text-primary">Trabajo de Pie</Link></li>
              <li><Link to="/piel-sensible" className="text-sm text-muted-foreground hover:text-primary">Piel Sensible</Link></li>
              <li><Link to="/preguntas-frecuentes" className="text-sm text-muted-foreground hover:text-primary">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Productos</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-muted-foreground">Medias hasta rodilla</span></li>
              <li><span className="text-sm text-muted-foreground">Medias hasta muslo</span></li>
              <li><span className="text-sm text-muted-foreground">Panty completo</span></li>
              <li><span className="text-sm text-muted-foreground">Punta abierta</span></li>
              <li><span className="text-sm text-muted-foreground">Tallas XL y plus</span></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={getWhatsAppLink("", "Hola, necesito información")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                contacto@piernasligeras.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Colombia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Piernas Ligeras. Medias de compresión Relaxsan Basic. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
