import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getSessionId } from '@/lib/sessionId';

interface Recommendation {
  product_code: string;
  nombre_producto: string;
  precio: number;
  imagen_url: string;
  similarity_score: number;
  categoria: string;
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

      // 2. Obtener productos similares
      const { data: similarProducts, error: simError } = await supabase
        .from('product_similarity')
        .select('product_id_2, similarity_score')
        .eq('product_id_1', currentProductCode)
        .order('similarity_score', { ascending: false })
        .limit(limit * 2);

      if (simError) throw simError;

      // 3. Si no hay similares, usar productos más vendidos
      if (!similarProducts || similarProducts.length === 0) {
        const { data: popularProducts } = await supabase
          .from('products')
          .select('product_code, nombre_producto, precio, imagen_url, categoria')
          .order('total_vendido', { ascending: false })
          .limit(limit);

        setRecommendations(popularProducts?.map(p => ({
          ...p,
          similarity_score: 0.5
        })) || []);
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

      // 6. Obtener detalles de los productos recomendados
      const productCodes = filteredSimilar.map(s => s.product_id_2);
      
      if (productCodes.length === 0) {
        setRecommendations([]);
        setLoading(false);
        return;
      }

      const { data: productDetails } = await supabase
        .from('products')
        .select('product_code, nombre_producto, precio, imagen_url, categoria')
        .in('product_code', productCodes);

      // 7. Combinar similitud con detalles
      const finalRecommendations = filteredSimilar.map(similar => {
        const product = productDetails?.find(p => p.product_code === similar.product_id_2);
        return product ? {
          ...product,
          similarity_score: similar.similarity_score
        } : null;
      }).filter(Boolean) as Recommendation[];

      setRecommendations(finalRecommendations);
      setError(null);

      // 8. Log consumo IA
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
      setError('Error al cargar recomendaciones');
    } finally {
      setLoading(false);
    }
  };

  const trackRecommendationClick = async (productCode: string) => {
    const sessionId = getSessionId();
    await supabase.from('user_interactions').insert({
      session_id: sessionId,
      product_code: productCode,
      action: 'click_recommendation'
    });
  };

  return { recommendations, loading, error, trackRecommendationClick };
}
