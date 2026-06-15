import React, { useState } from 'react';
import { CardData } from '../data';
import { 
  Factory, HeartPulse, Building2, GraduationCap, Tractor, 
  Zap, Plane, Landmark, Activity, MapPin, Tv, ShoppingBag, 
  Siren, PenTool, Cpu, Info, Target 
} from 'lucide-react';

interface CardProps {
  card: CardData;
  onClick: () => void;
  standalone?: boolean;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  industria: <Factory size={20} />,
  sanidad: <HeartPulse size={20} />,
  infraestructura: <Building2 size={20} />,
  educacion: <GraduationCap size={20} />,
  agricultura: <Tractor size={20} />,
  energia: <Zap size={20} />,
  transporte: <Plane size={20} />,
  finanzas: <Landmark size={20} />,
  salud: <Activity size={20} />,
  ciudad: <MapPin size={20} />,
  entretenimiento: <Tv size={20} />,
  comercio: <ShoppingBag size={20} />,
  servicios: <ShoppingBag size={20} />,
  emergencias: <Siren size={20} />,
  aeronautica: <Plane size={20} />,
  diseno: <PenTool size={20} />,
  // fallback
  default: <Cpu size={20} />,
};

export const CardItem: React.FC<CardProps> = ({ card, onClick, standalone }) => {
  const [showInfo, setShowInfo] = useState(false);

  const isTHD = card.type === 'thd';
  const bgColor = isTHD 
    ? 'card-thd text-white' 
    : 'card-case text-slate-900';
  
  const textColor = isTHD ? 'text-white' : 'text-slate-900';
  const subtitleColor = isTHD ? 'text-yellow-500' : 'text-slate-400 font-black';

  const icon = card.categoryId ? CATEGORY_ICONS[card.categoryId] || CATEGORY_ICONS.default : <Target size={16} />;

  return (
    <div 
      className={`relative rounded-xl flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${bgColor} ${standalone ? 'w-full max-w-sm mx-auto min-h-[500px] p-6' : isTHD ? 'p-4 min-h-[220px]' : 'aspect-[4/5] p-4'} group`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] uppercase tracking-wider ${subtitleColor}`}>
          {isTHD ? `THD ${card.id.split('-')[1].padStart(2, '0')}` : card.categoryId || 'CASO'}
        </span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isTHD ? 'bg-yellow-500/20 text-yellow-500' : 'text-slate-500'}`}>
          {icon}
        </div>
      </div>

      <div className={`flex flex-col flex-grow ${standalone ? 'justify-center items-center text-center mt-4' : ''}`}>
        <div className={`w-full ${standalone ? 'h-48' : 'h-20'} mb-3 rounded-lg bg-slate-800 relative shrink-0 overflow-hidden`}>
          <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop)' }}></div>
          {isTHD ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`${standalone ? 'text-4xl' : 'text-xl'} font-bold uppercase tracking-widest text-white/30 z-10`}>THD</span>
            </div>
          ) : standalone && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold tracking-widest text-white/30 z-10">CASO</span>
            </div>
          )}
        </div>
        <h3 className={`font-bold leading-tight ${textColor} ${standalone ? 'text-2xl mb-4' : 'text-sm mb-1 line-clamp-3'}`}>
          {card.title}
        </h3>
        
        {(!showInfo && !standalone) && (
          <p className={`text-[10px] line-clamp-2 ${isTHD ? 'text-slate-400' : 'text-slate-500'}`}>
            {card.description}
          </p>
        )}

        {showInfo && (
          <div className={`mt-2 text-xs leading-relaxed ${isTHD ? 'text-slate-300' : 'text-slate-600'} animate-in fade-in slide-in-from-bottom-2`}>
            {card.description}
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 space-y-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(!showInfo);
          }}
          className={`w-full py-1.5 rounded text-[10px] font-bold transition-colors ${
            isTHD 
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {showInfo ? 'OCULTAR INFO' : 'INFO TÉCNICA'}
        </button>
        
        {!isTHD && !standalone && card.thdId && (
          <div className="p-2 bg-slate-900 rounded text-[9px] text-slate-300 font-mono hidden group-hover:block transition-all animate-in fade-in">
            THD_LINK: {card.thdId.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};
