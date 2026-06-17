import React, { useState, useEffect } from 'react';
import { CASE_CARDS, THD_CARDS, CardData } from '../data';
import { CardItem } from '../components/Card';
import { RefreshCcw, Hand, ExternalLink, Dices, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MasterPanel() {
  const { t, language, setLanguage } = useLanguage();
  const [handSize, setHandSize] = useState<number>(5);
  const [currentHand, setCurrentHand] = useState<CardData[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const savedHandStr = sessionStorage.getItem('currentHand');
    if (savedHandStr) {
      try {
        const parsed = JSON.parse(savedHandStr);
        setCurrentHand(parsed);
      } catch (e) {}
    }
  }, []);

  const getShownCards = (): string[] => {
    try {
      return JSON.parse(localStorage.getItem('cartasMostradas') || '[]');
    } catch {
      return [];
    }
  };

  const setShownCards = (ids: string[]) => {
    localStorage.setItem('cartasMostradas', JSON.stringify(ids));
  };

  const handleResetDeck = () => {
    localStorage.removeItem('cartasMostradas');
    setCurrentHand([]);
    sessionStorage.removeItem('currentHand');
    setMessage(t('messages.deckReset'));
    setTimeout(() => setMessage(''), 3000);
  };

  const handleGenerateHand = () => {
    const shownCards = getShownCards();
    const availableCards = CASE_CARDS.filter(c => !shownCards.includes(c.id));

    if (availableCards.length === 0) {
      setMessage(t('messages.deckExhausted'));
      return;
    }

    if (availableCards.length < handSize) {
      setMessage(t('messages.notEnoughCards').replace('{count}', availableCards.length.toString()));
    }

    const cardsToDraw = Math.min(handSize, availableCards.length);
    const drawn: CardData[] = [];
    const availableCopy = [...availableCards];

    for (let i = 0; i < cardsToDraw; i++) {
      const randIndex = Math.floor(Math.random() * availableCopy.length);
      drawn.push(availableCopy[randIndex]);
      availableCopy.splice(randIndex, 1);
    }

    setCurrentHand(drawn);
    sessionStorage.setItem('currentHand', JSON.stringify(drawn));
    
    const newShown = [...shownCards, ...drawn.map(c => c.id)];
    setShownCards(newShown);
    setMessage(t('messages.handGenerated').replace('{count}', drawn.length.toString()));
    setTimeout(() => setMessage(''), 3000);
  };

  const openHandInNewTab = () => {
    if (currentHand.length === 0) return;
    const ids = currentHand.map(c => c.id).join(',');
    const baseUrl = import.meta.env.BASE_URL || '/';
    window.open(`${baseUrl}hand?ids=${ids}`, '_blank');
  };

  const openCardInNewTab = (id: string) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    window.open(`${baseUrl}card/${id}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 lg:px-8 py-4 bg-slate-900 border-b border-slate-800 shrink-0 gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-slate-900 font-bold">D</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">{t('appTitle')}</h1>
            <p className="text-xs text-slate-400">{t('appSubtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-slate-800/50 p-2 rounded-xl border border-slate-700 w-full sm:w-auto justify-end overflow-x-auto shrink-0">
          <div className="flex items-center gap-2 px-2 shrink-0">
            <span className="text-xs font-semibold text-slate-400 uppercase">{t('handLabel')}</span>
            <input 
              type="number" 
              value={handSize} 
              min="1" 
              max="10" 
              onChange={(e) => setHandSize(Math.max(1, Math.min(10, Number(e.target.value))))}
              className="w-12 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-200 focus:outline-none focus:border-yellow-500 text-center"
            />
          </div>
          <button 
            onClick={handleGenerateHand}
            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            {t('generateHand')}
          </button>
          <button 
             onClick={handleResetDeck}
             className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            {t('resetDeck')}
          </button>
          <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                language === 'es' 
                  ? 'bg-yellow-500 text-slate-900' 
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('eu')}
              className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                language === 'eu' 
                  ? 'bg-yellow-500 text-slate-900' 
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              EU
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6 p-6 relative">
        <section className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between shrink-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500">{t('thdDeck')}</h2>
            <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/20">
              {THD_CARDS.length} {t('active')}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 pb-4">
            {THD_CARDS.map(card => (
              <CardItem 
                key={card.id} 
                card={card} 
                onClick={() => openCardInNewTab(card.id)} 
              />
            ))}
          </div>
        </section>

        <section className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between shrink-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400">{t('realCases')}</h2>
            <button 
              onClick={openHandInNewTab}
              disabled={currentHand.length === 0}
              className="text-[10px] text-emerald-400 border border-emerald-400/30 px-3 py-1 rounded-full hover:bg-emerald-400 hover:text-slate-900 font-bold transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {t('viewHand')} ↗
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
            {currentHand.length > 0 ? (
              currentHand.map(card => (
                <CardItem 
                  key={card.id} 
                  card={card} 
                  onClick={() => openCardInNewTab(card.id)} 
                />
              ))
            ) : (
              <div className="col-span-full h-40 flex items-center justify-center border-2 border-dashed border-slate-700/50 rounded-xl text-slate-500 text-sm font-medium py-12">
                {t('noCardsInHand')}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 px-8 py-3 flex items-center justify-between border-t border-slate-800 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{t('cardsInDeck')}</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-32 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500" 
                  style={{ width: `${((30 - getShownCards().length) / 30) * 100}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">{30 - getShownCards().length}/30</span>
            </div>
          </div>
          <div className="flex flex-col border-l border-slate-800 pl-6">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{t('sessionStatus')}</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] text-slate-300 uppercase">
                {message ? message : t('syncedLocalStorage')}
              </span>
            </div>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 font-medium italic hidden md:block">
          {t('designedFor')}
        </div>
      </footer>
    </div>
  );
}
