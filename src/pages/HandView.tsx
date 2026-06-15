import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getCardById, CardData } from '../data';
import { CardItem } from '../components/Card';
import { LayoutGrid } from 'lucide-react';

export default function HandView() {
  const location = useLocation();

  const cards = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const idsParam = params.get('ids');
    if (!idsParam) return [];
    
    const ids = idsParam.split(',');
    const foundCards: CardData[] = [];
    
    ids.forEach(id => {
      const card = getCardById(id);
      if (card) foundCards.push(card);
    });
    
    return foundCards;
  }, [location.search]);

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-medium">No hay cartas para mostrar.</p>
      </div>
    );
  }

  const openCardInNewTab = (id: string) => {
    window.open(`/card/${id}`, '_blank');
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-slate-900 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col items-center justify-center gap-2 text-white">
          <div className="flex justify-center items-center gap-3">
             <LayoutGrid size={28} className="text-emerald-400" />
             <h1 className="text-3xl font-bold tracking-tight">Mano en Juego</h1>
          </div>
          <p className="text-slate-400 text-sm font-medium">Visualización de las cartas activas de la sesión.</p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {cards.map(card => (
            <CardItem 
              key={card.id} 
              card={card} 
              onClick={() => openCardInNewTab(card.id)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
