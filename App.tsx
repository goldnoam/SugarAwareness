import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Theme, FontSize, Language, FoodItem, HealthySwap } from './types';
import { TRANSLATIONS, SUGGESTIONS, CONSUMPTION_DATA, PREVALENCE_DATA } from './constants';
import { Search, Volume2, Trash2, Download, Sun, Moon, Palette, Languages, AlertTriangle, ChartBar, Activity, Share2, Info, ArrowRight, CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, AreaChart, Area 
} from 'recharts';

/**
 * AdSlot component for Google AdSense locations.
 */
const AdSlot: React.FC<{ className?: string; slot?: string }> = ({ className, slot = "default" }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn('AdSense blocked or not loaded');
    }
  }, []);

  return (
    <div 
      className={`w-full flex flex-col items-center my-12 overflow-hidden bg-white/5 rounded-2xl border border-white/10 p-4 min-h-[100px] ${className}`}
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-widest opacity-30 mb-2 block w-full text-center">Advertisement</span>
      <ins className="adsbygoogle w-full block"
           style={{ display: 'block', textAlign: 'center' }}
           data-ad-client="ca-pub-0274741291001288"
           data-ad-slot={slot}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

/**
 * A component that adds a fade-in / slide-up animation when it enters the viewport.
 */
const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setVisible(entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    const { current } = domRef;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

const CustomTooltip = ({ active, payload, label, t, type }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    let message = "";
    
    if (type === 'sugar') {
      message = value > 50 ? t.chartTooltips.sugarLimit : "";
    } else {
      message = value > 15 ? t.chartTooltips.riskHigh : value > 5 ? t.chartTooltips.riskMedium : t.chartTooltips.riskLow;
    }

    return (
      <div className="bg-slate-900 border border-white/20 p-3 rounded-xl shadow-2xl backdrop-blur-md text-white">
        <p className="font-bold text-sm mb-1">{label}</p>
        <p className="text-xl font-black text-blue-400">
          {value}{type === 'sugar' ? 'g' : '%'}
        </p>
        {message && (
          <p className="text-xs mt-2 opacity-80 border-t border-white/10 pt-1 flex items-center gap-1">
            <Info size={12} className="text-blue-400" />
            {message}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [lang, setLang] = useState<Language>('he');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'he';

  const themeClasses = {
    dark: 'bg-slate-950 text-slate-100',
    bright: 'bg-slate-50 text-slate-900',
    colorful: 'bg-indigo-900 text-yellow-50'
  };

  const chartColors = {
    dark: { stroke: '#3b82f6', fill: '#1d4ed8', grid: '#334155' },
    bright: { stroke: '#2563eb', fill: '#3b82f6', grid: '#e2e8f0' },
    colorful: { stroke: '#fbbf24', fill: '#f59e0b', grid: '#4338ca' }
  };

  const fontSizeClasses = {
    small: 'text-sm sm:text-base',
    medium: 'text-base sm:text-lg',
    large: 'text-lg sm:text-2xl'
  };

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'he' ? 'he-IL' : (lang === 'en' ? 'en-US' : 'en');
      window.speechSynthesis.speak(utterance);
    }
  }, [lang]);

  const handleExport = () => {
    const data = JSON.stringify({ query: searchQuery, date: new Date().toISOString(), results: filteredFoods }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sugar-awareness-data-${lang}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async (item: FoodItem) => {
    const shareData = {
      title: t.shareTitle,
      text: `${t.shareText} ${item.name}: ${item.sugarContent}. ${item.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      const mailBody = encodeURIComponent(shareData.text + "\n\n" + shareData.url);
      window.location.href = `mailto:?subject=${encodeURIComponent(t.shareTitle)}&body=${mailBody}`;
    }
  };

  const filteredFoods = useMemo(() => {
    if (!searchQuery) return t.foodItems;
    return t.foodItems.filter(food => 
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, t.foodItems]);

  const filteredSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return SUGGESTIONS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text");
    if (text) setSearchQuery(text);
  };

  return (
    <div 
      className={`min-h-screen flex flex-col transition-all duration-500 ${themeClasses[theme]} ${fontSizeClasses[fontSize]}`}
      dir={isRtl ? 'rtl' : 'ltr'}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 p-4 shadow-2xl" role="navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-black text-xl md:text-3xl">
            <AlertTriangle className="text-red-500 animate-pulse-slow" />
            <span className="hidden sm:inline bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">{t.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setTheme(prev => prev === 'dark' ? 'bright' : prev === 'bright' ? 'colorful' : 'dark')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
              title="Toggle Theme"
              aria-label="Change Theme"
            >
              {theme === 'dark' ? <Moon size={22} /> : theme === 'bright' ? <Sun size={22} /> : <Palette size={22} />}
            </button>

            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
              <Languages size={18} className="mx-2 opacity-50" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent rounded-xl p-1.5 text-sm outline-none cursor-pointer font-bold"
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="he">עברית</option>
                <option value="zh">中文</option>
                <option value="hi">हिन्दी</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div className="hidden lg:flex gap-1 bg-white/5 rounded-2xl p-1 border border-white/10">
              {(['small', 'medium', 'large'] as FontSize[]).map((size) => (
                <button 
                  key={size}
                  onClick={() => setFontSize(size)} 
                  className={`px-4 py-1.5 rounded-xl transition-all font-black ${fontSize === size ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/5 opacity-50'}`}
                  aria-label={`Font size ${size}`}
                >
                  {size[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Medical Disclaimer Banner */}
      <div className="bg-red-500/10 border-b border-red-500/20 py-3 px-6" role="alert">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm md:text-base font-bold text-red-500 italic">
          <ShieldAlert size={20} className="shrink-0" />
          <p>{t.disclaimer}</p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-24 overflow-x-hidden">
        
        {/* Hero & Search */}
        <FadeInSection>
          <section className="text-center space-y-8 py-16" aria-labelledby="hero-title">
            <h1 id="hero-title" className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
              {t.title}
            </h1>
            <p className="text-2xl opacity-80 max-w-3xl mx-auto font-medium">{t.subtitle}</p>
            
            <div className="max-w-2xl mx-auto relative group pt-6">
              <div className="flex items-center bg-white/5 border border-white/20 rounded-[2rem] p-3 gap-3 shadow-2xl focus-within:ring-4 focus-within:ring-blue-500/30 transition-all backdrop-blur-md">
                <Search className="ml-3 opacity-40" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder={t.searchPlaceholder}
                  className="bg-transparent flex-1 p-3 outline-none text-xl placeholder:opacity-40"
                  aria-label="Search food and health topics"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Clear input">
                    <X size={20} />
                  </button>
                )}
                <div className="flex gap-2 border-l border-white/10 pl-2">
                  <button onClick={handleExport} className="p-3 hover:bg-white/10 rounded-2xl transition-all" title={t.exportSearch} aria-label="Export results">
                    <Download size={22} />
                  </button>
                </div>
              </div>

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-40 text-left backdrop-blur-2xl">
                  {filteredSuggestions.map((s, idx) => (
                    <button 
                      key={idx} 
                      className="w-full text-left p-4 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-0 transition-colors flex items-center gap-3 text-white"
                      onClick={() => setSearchQuery(s)}
                    >
                      <Activity size={16} className="text-blue-500" />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        </FadeInSection>

        <AdSlot slot="sugar_awareness_top" />

        {/* Stats Section */}
        <FadeInSection>
          <section className="space-y-12" aria-labelledby="stats-title">
            <div className="flex items-center gap-4">
              <ChartBar className="text-blue-500" size={40} />
              <h2 id="stats-title" className="text-4xl font-black">{t.statsTitle}</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 shadow-2xl space-y-6 backdrop-blur-md">
                <h3 className="text-2xl font-bold opacity-90">{t.consumptionChart}</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CONSUMPTION_DATA}>
                      <defs>
                        <linearGradient id="colorGrams" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors[theme].stroke} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={chartColors[theme].stroke} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors[theme].grid} vertical={false} />
                      <XAxis dataKey="year" stroke="currentColor" opacity={0.3} fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="currentColor" opacity={0.3} fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip t={t} type="sugar" />} />
                      <Area type="monotone" dataKey="grams" stroke={chartColors[theme].stroke} fillOpacity={1} fill="url(#colorGrams)" strokeWidth={4} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 shadow-2xl space-y-6 backdrop-blur-md">
                <h3 className="text-2xl font-bold opacity-90">{t.prevalenceChart}</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PREVALENCE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors[theme].grid} vertical={false} />
                      <XAxis dataKey="age" stroke="currentColor" opacity={0.3} fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="currentColor" opacity={0.3} fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip t={t} type="prevalence" />} />
                      <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                        {PREVALENCE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 3 ? '#ef4444' : chartColors[theme].fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Dangers Section */}
        <FadeInSection>
          <section className="space-y-12" aria-labelledby="dangers-title">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 id="dangers-title" className="text-4xl font-black">{t.dangersTitle}</h2>
              <button 
                onClick={() => speak(`${t.dangersTitle}. ${t.foodItems.map(f => f.name).join(', ')}`)}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-white font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                aria-label="Read section text aloud"
              >
                <Volume2 size={24} />
                {t.ttsButton}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredFoods.length > 0 ? filteredFoods.map((item, idx) => (
                <div key={idx} className="group card hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col h-full bg-white/5 rounded-3xl border border-white/10">
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                       <button 
                        onClick={() => handleShare(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold w-full justify-center transition-all"
                      >
                        <Share2 size={16} />
                        Share Awareness
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-black text-2xl group-hover:text-blue-400 transition-colors">{item.name}</h3>
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shrink-0">
                        {item.sugarContent}
                      </div>
                    </div>
                    <p className="text-lg opacity-80 leading-relaxed flex-1">{item.description}</p>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-24 opacity-40 text-2xl font-bold">
                  No items match your search. Try different terms.
                </div>
              )}
            </div>
          </section>
        </FadeInSection>

        <AdSlot slot="sugar_awareness_mid" />

        {/* Healthy Swaps Section */}
        <FadeInSection>
          <section className="space-y-12" aria-labelledby="swaps-title">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-green-500" size={40} />
              <h2 id="swaps-title" className="text-4xl font-black">{t.healthySwapsTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.healthySwaps.map((item, idx) => (
                <div key={idx} className="bg-white/5 rounded-[3rem] border border-white/10 p-8 flex flex-col lg:flex-row gap-8 items-center hover:bg-white/10 transition-all shadow-xl backdrop-blur-md">
                  <div className="w-full lg:w-40 xl:w-48 aspect-square rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl shrink-0">
                    <img src={item.image} alt={item.swap} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 space-y-4 text-center lg:text-right">
                    <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
                      <span className="text-red-400/60 line-through font-bold text-xl">{item.original}</span>
                      <ArrowRight size={20} className={isRtl ? 'rotate-180' : ''} />
                      <span className="text-green-400 font-black text-3xl">{item.swap}</span>
                    </div>
                    <p className="text-xl opacity-90 leading-relaxed italic font-medium bg-green-500/10 p-4 rounded-2xl border border-green-500/20">
                      {item.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* Consequences Section */}
        <FadeInSection>
          <section className="bg-red-950/20 border border-red-500/30 rounded-[4rem] p-8 md:p-16 space-y-12 shadow-inner relative overflow-hidden" aria-labelledby="consequences-title">
             <div className="absolute top-0 right-0 p-24 bg-red-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-4 bg-red-600 rounded-3xl shadow-2xl shadow-red-600/40">
                <AlertTriangle className="text-white" size={48} />
              </div>
              <h2 id="consequences-title" className="text-4xl md:text-6xl font-black text-red-500 tracking-tighter">{t.consequencesTitle}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-10">
                <p className="text-2xl leading-relaxed font-medium">
                  Diabetes acts like silent broken glass in your bloodstream, destroying delicate vessels in your eyes, kidneys, and extremities over time.
                </p>
                
                <div className="bg-black/60 p-8 rounded-[3rem] border-l-8 border-red-600 shadow-2xl">
                  <h4 className="font-black text-red-400 mb-4 uppercase text-sm tracking-widest">Medical Warning: Amputation Risk</h4>
                  <p className="text-xl font-bold leading-relaxed">{t.amputationWarning}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[...t.diabetesSymptoms, ...t.healthTerms].map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-5 rounded-[2rem] border border-white/10 hover:border-red-500/40 transition-all hover:translate-x-2">
                      <Activity className="text-red-500 shrink-0" size={24} />
                      <span className="text-lg font-bold">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/3] shadow-3xl group">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" alt="Clinical Awareness" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950 p-10 flex flex-col justify-end">
                   <div className="bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                      <p className="text-sm uppercase tracking-widest font-black text-red-400 mb-2">Preventative Awareness</p>
                      <p className="text-lg font-medium">Chronic high sugar levels lead to diabetic neuropathy and vascular failure.</p>
                   </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Prevention Section */}
        <FadeInSection>
          <section className="text-center py-24 bg-green-500/10 rounded-[5rem] border border-green-500/30 mb-12 shadow-2xl" aria-labelledby="prevention-title">
            <h2 id="prevention-title" className="text-5xl md:text-7xl font-black mb-8">How to Protect Yourself</h2>
            <p className="text-2xl max-w-4xl mx-auto opacity-90 mb-12 font-medium px-4">{t.prevention}</p>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-[2.5rem] text-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-green-500/40 flex items-center gap-4 mx-auto"
              onClick={() => speak(t.prevention)}
            >
              <CheckCircle2 size={32} />
              Commit to Change
            </button>
          </section>
        </FadeInSection>

        <AdSlot slot="sugar_awareness_bottom" />

      </main>

      <footer className="border-t border-white/10 bg-black/40 py-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left space-y-2">
            <p className="text-2xl font-black">{t.footerText}</p>
            <p className="text-lg opacity-60">Empowering millions through nutritional science and education.</p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <a href={`mailto:goldnoamai@gmail.com`} className="text-xl font-bold bg-white/5 px-6 py-3 rounded-2xl hover:bg-white/10 border border-white/10 transition-all text-blue-400">
              {t.feedbackLink}
            </a>
          </div>

          <div className="flex gap-8 font-black text-sm uppercase tracking-widest opacity-40">
            <button className="hover:opacity-100 transition-opacity">Accessibility</button>
            <button className="hover:opacity-100 transition-opacity">Privacy</button>
            <button className="hover:opacity-100 transition-opacity">Legal</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;