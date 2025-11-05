import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

const WhatsAppFloat = () => {
  return (
    <a
      href={getWhatsAppLink("", "Hola, necesito asesoría sobre medias de compresión")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-hover transition-all hover:scale-110 animate-pulse"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppFloat;
