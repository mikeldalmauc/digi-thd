import React, { useState } from 'react';
import { CardData } from '../data';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Factory, HeartPulse, Building2, GraduationCap, Tractor, 
  Zap, Truck, TrendingUp, Stethoscope, MapPin, Tv, ShoppingBag, 
  AlertTriangle, Palette, Briefcase, Info, Target 
} from 'lucide-react';

interface CardProps {
  card: CardData;
  onClick: () => void;
  standalone?: boolean;
}

// Mapeo de THD ID a archivo de imagen
const THD_IMAGES: Record<string, string> = {
  'thd-1': 'gemelo.png',
  'thd-2': 'blockchain.png',
  'thd-3': 'iot.png',
  'thd-4': 'ia.png',
  'thd-5': 'fabricacionaditiva.png',
  'thd-6': 'edgecomputing.png',
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  industria: <Factory size={20} />,
  sanidad: <HeartPulse size={20} />,
  infraestructura: <Building2 size={20} />,
  educacion: <GraduationCap size={20} />,
  agricultura: <Tractor size={20} />,
  energia: <Zap size={20} />,
  transporte: <Truck size={20} />,
  finanzas: <TrendingUp size={20} />,
  salud: <Stethoscope size={20} />,
  ciudad: <MapPin size={20} />,
  entretenimiento: <Tv size={20} />,
  comercio: <ShoppingBag size={20} />,
  servicios: <Briefcase size={20} />,
  emergencias: <AlertTriangle size={20} />,
  aeronautica: <Truck size={20} />,
  diseno: <Palette size={20} />,
  // fallback
  default: <Factory size={20} />,
};

export const CardItem: React.FC<CardProps> = ({ card, onClick, standalone }) => {
  const { getCardTranslation, t, language } = useLanguage();
  const [showInfo, setShowInfo] = useState(false);

  const isTHD = card.type === 'thd';
  const bgColor = isTHD 
    ? 'card-thd text-white' 
    : 'card-case text-slate-900';
  
  const textColor = isTHD ? 'text-white' : 'text-slate-900';
  const subtitleColor = isTHD ? 'text-yellow-500' : 'text-slate-400 font-black';

  const icon = card.categoryId ? CATEGORY_ICONS[card.categoryId] || CATEGORY_ICONS.default : <Target size={16} />;

  // Get translated title and description
  const cardType = isTHD ? 'thd' as const : 'cases' as const;
  const translation = getCardTranslation(card.id, cardType);
  const displayTitle = translation.title || card.title;
  const displayDescription = translation.description || card.description;

  // Get image URL for THD cards
  const baseUrl = import.meta.env.BASE_URL || '/';
  const thdImageUrl = isTHD && THD_IMAGES[card.id] 
    ? `${baseUrl}${THD_IMAGES[card.id]}`
    : '';
  
  // Get SVG URL for case cards (with language suffix)
  const caseImageUrl = !isTHD ? `${baseUrl}${card.id}${language === 'eu' ? '-eu' : ''}.svg` : '';

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
        {isTHD ? (
          // Para THD: mostrar imagen PNG
          <div className={`w-full ${standalone ? 'h-48' : 'h-20'} mb-3 rounded-lg bg-slate-800 relative shrink-0 overflow-hidden`}>
            <img 
              src={thdImageUrl} 
              alt={displayTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
              }}
            />
          </div>
        ) : (
          // Para casos: mostrar imagen SVG
          <div className={`w-full ${standalone ? 'h-48' : 'h-20'} mb-3 rounded-lg bg-slate-100 relative shrink-0 overflow-hidden`}>
            <img 
              src={caseImageUrl}
              alt={displayTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-slate-100"><div class="text-4xl text-slate-400">${icon}</div></div>`;
              }}
            />
          </div>
        )}
        <h3 className={`font-bold leading-tight ${textColor} ${standalone ? 'text-2xl mb-4' : 'text-sm mb-1 line-clamp-3'}`}>
          {displayTitle}
        </h3>
        
        {(!showInfo && !standalone) && (
          <p className={`text-[10px] line-clamp-2 ${isTHD ? 'text-slate-400' : 'text-slate-500'}`}>
            {displayDescription}
          </p>
        )}

        {showInfo && (
          <div className={`mt-2 text-xs leading-relaxed ${isTHD ? 'text-slate-300' : 'text-slate-600'} animate-in fade-in slide-in-from-bottom-2`}>
            {displayDescription}
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
          {showInfo ? t('hideInfo') : t('infoTechnical')}
        </button>
        
        {!isTHD && !standalone && card.thdId && (
          <div className="p-2 bg-slate-900 rounded text-[9px] text-slate-300 font-mono hidden group-hover:block transition-all animate-in fade-in">
            {t('thdLink')} {card.thdId.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};
