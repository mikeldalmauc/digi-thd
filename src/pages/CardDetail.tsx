import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCardById } from '../data';
import { CardItem } from '../components/Card';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const [underAttack, setUnderAttack] = useState(false);
  
  if (!id) return null;
  
  const card = getCardById(id);
  
  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-medium">{t('cardNotFound')}</p>
      </div>
    );
  }

  const isCase = card.type === 'case';

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${underAttack ? 'bg-red-950' : 'bg-slate-900 border-t border-yellow-500/20'}`}>
      
      {underAttack && (
        <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/50 via-red-950/80 to-black"></div>
           <div className="text-red-500/10 text-[20vw] font-black uppercase tracking-tighter mix-blend-overlay rotate-[-10deg]">
             HACKED
           </div>
        </div>
      )}

      <div className="max-w-md w-full relative z-10 flex flex-col items-center">
        
        <div className={`w-full transition-transform duration-300 ${underAttack ? 'scale-[1.03] rotate-1' : ''}`}>
           <CardItem card={card} onClick={() => {}} standalone={true} />
        </div>

        {isCase && (
          <div className="mt-10 w-full animate-in slide-in-from-bottom-8 opacity-0 fade-in duration-700" style={{ animationFillMode: 'forwards' }}>
            <button 
              onClick={() => setUnderAttack(!underAttack)}
              className={`w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${
                underAttack 
                  ? 'bg-red-600 text-white shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:bg-red-500' 
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 shadow-xl'
              }`}
            >
              {underAttack ? <AlertTriangle size={24} className="animate-pulse" /> : <ShieldAlert size={24} />}
              {underAttack ? t('systemCompromised') : t('cyberAttack')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
