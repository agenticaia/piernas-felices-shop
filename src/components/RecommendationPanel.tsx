import React from 'react';
import { useRecommendations } from '@/hooks/useRecommendations';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp } from 'lucide-react';

interface RecommendationPanelProps {
  currentProductCode: string;
}

export default function RecommendationPanel({ currentProductCode }: RecommendationPanelProps) {
  const { recommendations, loading, error, trackRecommendationClick } = useRecommendations(currentProductCode);
  const navigate = useNavigate();

  const handleRecommendationClick = async (productCode: string) => {
    await trackRecommendationClick(productCode);
    navigate(`/catalogo?codigo=${productCode}`);
  };

  if (error) {
    return null;
  }

  return (
    <div className="border-l border-border pl-6 mt-8 lg:mt-0">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-primary" />
        Te puede interesar
      </h3>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-muted rounded animate-pulse" />
          ))}
        </div>
      ) : recommendations.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay recomendaciones disponibles</p>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.code}
              onClick={() => handleRecommendationClick(rec.code)}
              className="border border-border rounded-lg p-3 cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary"
            >
              <div className="flex gap-3">
                <div className="w-20 h-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-2 text-foreground mb-1">
                    {rec.name}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">{rec.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-primary font-bold text-lg">
                      S/ {rec.priceSale.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {Math.round(rec.similarity_score * 100)}% Compatible
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg text-xs">
        <p className="font-semibold text-primary mb-1 flex items-center">
          🤖 Recomendado por IA
        </p>
        <p className="text-primary/80">
          Basado en preferencias de clientes similares y tu historial de navegación
        </p>
      </div>
    </div>
  );
}
