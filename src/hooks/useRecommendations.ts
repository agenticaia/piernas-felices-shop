// Archivo: src/hooks/useRecommendations.ts
// Hook corregido para trabajar con src/data/products.ts y Supabase

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { products, type Product } from '@/data/products';
import { getSessionId } from '@/lib/sessionId';

interface Recommendation extends Product {
  similarity_score: number;
}

export function useRecommendations(currentProductCode: string, limit: number = 4) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentProductCode) {
      fetchRecommendations();
    }
  }, [currentProductCode]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const sessionId = getSessionId();

      // 1. Registrar que el usuario vio este producto
      await supabase.from('user_interactions').insert({
        session_id: sessionId,
        product_code: currentProductCode,
        action: 'view'
      });

      // 2. Obtener productos similares desde Supabase (matriz precalculada)
      const { data: similarProducts, error: simError } = await supabase
        .from('product_similarity')
        .select('product_id_2, similarity_score')
        .eq('product_id_1', currentProductCode)
        .order('similarity_score', { ascending: false })
        .limit(limit * 2);

      if (simError) throw simError;

      // 3. Si no hay similares en Supabase, usar fallback inteligente
      if (!similarProducts || similarProducts.length === 0) {
        const fallbackRecommendations = getFallbackRecommendations(currentProductCode, limit);
        setRecommendations(fallbackRecommendations);
        setLoading(false);
        return;
      }

      // 4. Obtener historial del usuario (productos ya vistos/comprados)
      const { data: userHistory } = await supabase
        .from('user_interactions')
        .select('product_code')
        .eq('session_id', sessionId)
        .in('action', ['purchase', 'add_to_cart', 'view']);

      const viewedProductCodes = userHistory?.map(h => h.product_code) || [];

      // 5. Filtrar productos ya vistos
      const filteredSimilar = similarProducts
        .filter(s => !viewedProductCodes.includes(s.product_id_2))
        .slice(0, limit);

      // 6. Mapear con datos completos de products.ts
      const finalRecommendations: Recommendation[] = filteredSimilar
        .map(similar => {
          const product = products.find(p => p.code === similar.product_id_2);
          if (!product) return null;
          
          return {
            ...product,
            similarity_score: similar.similarity_score
          };
        })
        .filter((p): p is Recommendation => p !== null);

      setRecommendations(finalRecommendations);
      setError(null);

      // 7. Log de consumo IA
      await supabase.from('ai_consumption_logs').insert({
        feature: 'recommendations',
        operation_type: 'knn_query',
        tokens_used: 0,
        api_calls: 1,
        cost_usd: 0,
        metadata: { 
          product_code: currentProductCode,
          recommendations_count: finalRecommendations.length
        }
      });

    } catch (err) {
      console.error('Error fetching recommendations:', err);
      // En caso de error, usar fallback
      const fallbackRecommendations = getFallbackRecommendations(currentProductCode, limit);
      setRecommendations(fallbackRecommendations);
      setError(null); // No mostrar error al usuario, solo usar fallback
    } finally {
      setLoading(false);
    }
  };

  const trackRecommendationClick = async (productCode: string) => {
    const sessionId = getSessionId();
    try {
      await supabase.from('user_interactions').insert({
        session_id: sessionId,
        product_code: productCode,
        action: 'click_recommendation'
      });
    } catch (err) {
      console.error('Error tracking recommendation click:', err);
    }
  };

  return { recommendations, loading, error, trackRecommendationClick };
}

/**
 * Función de fallback inteligente basada en reglas de negocio
 * cuando no hay matriz de similitud calculada en Supabase
 */
function getFallbackRecommendations(currentCode: string, limit: number): Recommendation[] {
  const currentProduct = products.find(p => p.code === currentCode);
  if (!currentProduct) return [];

  // Reglas de recomendación:
  // 1. Misma compresión y tipo diferente
  // 2. Misma categoría y compresión diferente
  // 3. Mismo tipo (rodilla/panty/muslo)
  
  const recommendations: Recommendation[] = [];

  // Regla 1: Mismo nivel de compresión, tipo diferente
  const sameCompression = products.filter(p => 
    p.code !== currentCode &&
    p.compression === currentProduct.compression &&
    p.type !== currentProduct.type
  );

  // Regla 2: Misma categoría principal, compresión diferente
  const sameCategory = products.filter(p => 
    p.code !== currentCode &&
    p.category.some(cat => currentProduct.category.includes(cat)) &&
    p.compression !== currentProduct.compression
  );

  // Regla 3: Mismo tipo (rodilla/panty/muslo)
  const sameType = products.filter(p =>
    p.code !== currentCode &&
    p.type === currentProduct.type &&
    p.compression !== currentProduct.compression
  );

  // Combinar y asignar scores de similitud ficticios
  const combined = [
    ...sameCompression.map(p => ({ ...p, similarity_score: 0.85 })),
    ...sameCategory.map(p => ({ ...p, similarity_score: 0.70 })),
    ...sameType.map(p => ({ ...p, similarity_score: 0.60 }))
  ];

  // Eliminar duplicados (mantener el de mayor score)
  const uniqueMap = new Map<string, Recommendation>();
  combined.forEach(rec => {
    const existing = uniqueMap.get(rec.code);
    if (!existing || rec.similarity_score > existing.similarity_score) {
      uniqueMap.set(rec.code, rec);
    }
  });

  // Ordenar por score y retornar top N
  return Array.from(uniqueMap.values())
    .sort((a, b) => b.similarity_score - a.similarity_score)
    .slice(0, limit);
}