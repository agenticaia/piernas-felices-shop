import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Varices from "./pages/Varices";
import TrabajoPie from "./pages/TrabajoPie";
import PielSensible from "./pages/PielSensible";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import MediasElasticasParaVarices from "./pages/blog/MediasElasticasParaVarices";
import TiposMediasCompresion from "./pages/blog/TiposMediasCompresion";
import MediasAntiembolicas from "./pages/blog/MediasAntiembolicas";
import ComoElegirTallaCorrecta from "./pages/blog/ComoElegirTallaCorrecta";
import ComoElegirTallaCorrecta from "@/pages/blog/ComoElegirTallaCorrecta";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/medias-para-varices" element={<Varices />} />
          <Route path="/trabajo-de-pie" element={<TrabajoPie />} />
          <Route path="/piel-sensible" element={<PielSensible />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/medias-elasticas-para-varices" element={<MediasElasticasParaVarices />} />
          <Route path="/blog/tipos-de-medias-de-compresion" element={<TiposMediasCompresion />} />
          <Route path="/blog/medias-antiembolicas" element={<MediasAntiembolicas />} />
          <Route path="/blog/como-elegir-talla-correcta" element={<ComoElegirTallaCorrecta />} />
          <Route path="/preguntas-frecuentes" element={<FAQ />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
