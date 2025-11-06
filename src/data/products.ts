export interface Product {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  benefits: string[];
  specs: string[];
  idealFor: string;
  category: string[];
  type: string;
  sizes: string[];
}

export const products: Product[] = [
  {
    id: "870a",
    name: "Media Compresiva Várices Mujer Hasta Muslo 20-30 mmHg",
    subtitle: "Alivio superior para várices, sin enrollarse",
    image: "/src/assets/product-870a-1.jpg",
    benefits: [
      "Alivia el dolor y la hinchazón de várices visibles",
      "Banda de silicona antideslizante que se mantiene en su lugar",
      "Compresión graduada 20-30 mmHg certificada",
      "Reduce la fatiga incluso después de largas jornadas",
      "Discreta bajo la ropa, se ve como media normal",
    ],
    specs: [
      "Compresión: 20-30 mmHg (Clase II)",
      "Altura: Hasta muslo con banda antideslizante",
      "Tallas disponibles: S, M, L, XL",
      "Material: 80% Poliamida, 20% Elastano",
      "Punta abierta disponible",
    ],
    idealFor: "Mujeres con várices moderadas a severas que necesitan compresión hasta el muslo",
    category: ["varices", "mujer"],
    type: "muslo",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "880",
    name: "Panty Compresivo Várices 20-30 mmHg Completo",
    subtitle: "Cobertura total para várices en ambas piernas",
    image: "/src/assets/product-880.jpg",
    benefits: [
      "Compresión uniforme en ambas piernas y glúteos",
      "Alivia várices y previene nuevas apariciones",
      "Mayor comodidad sin bandas que aprietan",
      "Ideal para embarazo y postparto",
      "Se ve elegante, nadie nota que es terapéutica",
    ],
    specs: [
      "Compresión: 20-30 mmHg (Clase II)",
      "Altura: Panty completo hasta cintura",
      "Tallas: S-M-L / XL-2XL-3XL",
      "Material: Microfibra suave 75% Poliamida, 25% Elastano",
      "Con refuerzo en el área del pie",
    ],
    idealFor: "Mujeres con várices en ambas piernas o que prefieren la comodidad de un panty completo",
    category: ["varices", "mujer", "embarazo"],
    type: "panty",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "750",
    name: "Media Compresiva Trabajo de Pie Hasta Rodilla 20-30 mmHg",
    subtitle: "Piernas ligeras incluso después de un turno completo",
    image: "/src/assets/product-750-1.jpg",
    benefits: [
      "Elimina la hinchazón al final del día",
      "Previene várices por estar muchas horas de pie",
      "Aumenta tu energía durante todo el turno",
      "Banda superior suave que no marca ni aprieta",
      "Transpirable, perfecta para clima cálido",
    ],
    specs: [
      "Compresión: 20-30 mmHg (Clase II)",
      "Altura: Hasta debajo de la rodilla",
      "Tallas: S, M, L, XL, 2XL, 3XL",
      "Material: 78% Poliamida, 22% Elastano",
      "Punta cerrada reforzada",
    ],
    idealFor: "Enfermeras, vendedores, cajeras, peluqueras y cualquier persona que trabaja de pie",
    category: ["trabajo-pie", "enfermeras", "varices"],
    type: "rodilla",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "950a",
    name: "Media Compresiva Punta Abierta Piel Sensible 20-30 mmHg",
    subtitle: "Máxima transpirabilidad para clima cálido",
    image: "/src/assets/product-950a.jpg",
    benefits: [
      "Punta abierta ideal para pies sensibles o con calor",
      "No irrita la piel, hipoalergénica",
      "Perfecta para clima tropical o si sudas mucho",
      "Mantiene los dedos libres y cómodos",
      "Mismo alivio terapéutico sin incomodidad",
    ],
    specs: [
      "Compresión: 20-30 mmHg (Clase II)",
      "Altura: Hasta rodilla con punta abierta",
      "Tallas: S, M, L, XL, 2XL",
      "Material: Tejido hipoalergénico transpirable",
      "Banda de silicona suave",
    ],
    idealFor: "Personas con piel sensible, que viven en clima cálido o prefieren dedos libres",
    category: ["piel-sensible", "trabajo-pie", "clima-calido"],
    type: "rodilla",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "870",
    name: "Media Compresiva Autoreggente Várices Mujer 20-30 mmHg",
    subtitle: "Banda de encaje elegante con soporte médico",
    image: "/src/assets/product-870.jpg",
    benefits: [
      "Banda de encaje elegante que no se ve bajo la ropa",
      "Silicona de agarre suave que no irrita",
      "Compresión médica con estilo femenino",
      "Alivia várices sin sacrificar la estética",
      "Se mantiene en su lugar todo el día sin ajustes",
    ],
    specs: [
      "Compresión: 20-30 mmHg (Clase II)",
      "Altura: Hasta muslo con banda de encaje",
      "Tallas: S, M, L, XL",
      "Material: 80% Poliamida, 20% Elastano con encaje",
      "Diseño elegante y discreto",
    ],
    idealFor: "Mujeres que buscan medias terapéuticas con diseño elegante y femenino",
    category: ["varices", "mujer", "elegante"],
    type: "muslo",
    sizes: ["S", "M", "L", "XL"],
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category.includes(category));
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 3);
};

export const getWhatsAppLink = (productName: string, message?: string): string => {
  const phone = "51904541341"; // Replace with actual WhatsApp number
  const text = message || `Hola, quiero información del producto: ${productName} vengo de la web`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return `https://wa.me/?text=${encodedMessage}`;
};
