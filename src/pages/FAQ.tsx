import Navigation from "@/components/Navigation";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Cómo sé qué talla necesito?",
      answer: "Para elegir tu talla correcta, necesitas medir: circunferencia del tobillo, pantorrilla y muslo (si aplica), y la longitud de la pierna. Escríbenos por WhatsApp y te guiaremos paso a paso con fotos para que tomes tus medidas correctamente. Es súper fácil y te tomará menos de 5 minutos."
    },
    {
      question: "¿Dan mucho calor estas medias?",
      answer: "Nuestras medias Relaxsan Basic están diseñadas con tejido transpirable que permite la circulación del aire. Si vives en clima muy cálido o sudas mucho, te recomendamos las opciones con punta abierta o consultar por nuestros modelos más frescos. Escríbenos por WhatsApp y te recomendamos la mejor opción para tu clima."
    },
    {
      question: "¿Puedo usarlas todos los días?",
      answer: "Sí, estas medias están diseñadas para uso diario. De hecho, para obtener mejores resultados en el tratamiento de várices o prevención, se recomienda usarlas todos los días durante tus actividades. Puedes ponértelas por la mañana y quitártelas por la noche antes de dormir."
    },
    {
      question: "¿Cuánto tiempo duran?",
      answer: "Con cuidado adecuado (lavado a mano o en bolsa protectora, sin secar en secadora), las medias Relaxsan Basic pueden durar entre 3 y 6 meses con uso diario. La compresión se mantiene efectiva durante todo este tiempo si sigues las instrucciones de cuidado."
    },
    {
      question: "¿Son difíciles de poner?",
      answer: "Al principio puede tomar un poco de práctica, pero una vez que aprendes la técnica correcta, es muy fácil. Te enviamos instrucciones detalladas con tu pedido. Y si necesitas ayuda, escríbenos por WhatsApp y te explicamos los mejores trucos para ponértelas sin esfuerzo."
    },
    {
      question: "¿Cómo es el proceso de compra?",
      answer: "Todo el proceso se hace por WhatsApp para brindarte atención personalizada. Nos escribes, te ayudamos a elegir tu producto y talla, te enviamos el precio y formas de pago, realizas tu pedido y te lo enviamos a tu domicilio. Es rápido, fácil y con asesoría en cada paso."
    },
    {
      question: "¿Hacen envíos a toda Colombia?",
      answer: "Sí, hacemos envíos a toda Colombia. El tiempo de entrega varía según la ciudad, pero generalmente es entre 2 y 5 días hábiles. Escríbenos por WhatsApp con tu ciudad y te confirmamos costo y tiempo de envío."
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos transferencia bancaria, consignación, Nequi, Daviplata y otros métodos digitales. Te explicamos todos los detalles cuando nos contactes por WhatsApp."
    },
    {
      question: "¿Las medias tienen garantía?",
      answer: "Sí, todos nuestros productos tienen garantía de calidad. Si recibes un producto defectuoso o con algún problema de fabricación, lo cambiamos sin costo adicional. Tu satisfacción es nuestra prioridad."
    },
    {
      question: "¿Son realmente efectivas para las várices?",
      answer: "Sí, estas medias tienen compresión graduada médica certificada de 20-30 mmHg (Clase II), que es la recomendada por médicos para el tratamiento y prevención de várices. Mejoran la circulación, reducen la hinchazón y alivian el dolor. Son dispositivos médicos, no medias decorativas."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <WhatsAppFloat />

      {/* Header */}
      <section className="bg-gradient-hero text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Respuestas a las dudas más comunes sobre nuestras medias de compresión
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="mt-12 text-center space-y-6 p-8 bg-muted/30 rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground">
              ¿Sigue quedándote alguna duda?
            </h2>
            <p className="text-muted-foreground">
              Escríbenos directo por WhatsApp y te respondemos en minutos
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
            >
              <a
                href={getWhatsAppLink("", "Hola, tengo algunas preguntas sobre las medias de compresión")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Pregunta por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
