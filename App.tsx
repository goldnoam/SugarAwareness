
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Theme, FontSize, Language, FoodItem, HealthySwap } from './types';
import { TRANSLATIONS, SUGGESTIONS, CONSUMPTION_DATA, PREVALENCE_DATA } from './constants';
import { Search, Volume2, Trash2, Download, Sun, Moon, Palette, Languages, TextCursor, AlertTriangle, ChartBar, Activity, Share2, Info, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, Legend, AreaChart, Area 
} from 'recharts';

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
      <div className="bg-slate-900 border border-white/20 p-3 rounded-xl shadow-2xl backdrop-blur-md">
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
    bright: 'bg-white text-slate-900',
    colorful: 'bg-indigo-900 text-yellow-100'
  };

  const chartColors = {
    dark: { stroke: '#3b82f6', fill: '#1d4ed8', grid: '#334155' },
    bright: { stroke: '#2563eb', fill: '#3b82f6', grid: '#e2e8f0' },
    colorful: { stroke: '#fbbf24', fill: '#f59e0b', grid: '#4338ca' }
  };

  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl'
  };

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }, [lang]);

  const handleExport = () => {
    const data = JSON.stringify({ query: searchQuery, date: new Date().toISOString() });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sugar-search-export.json';
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
    return t.foodItems.filter(food => 
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, t.foodItems]);

  const filteredSuggestions = useMemo(() => {
    return SUGGESTIONS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div 
      className={`min-h-screen flex flex-col transition-all duration-300 ${themeClasses[theme]} ${fontSizeClasses[fontSize]}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-xl md:text-2xl">
            <AlertTriangle className="text-red-500" />
            <span className="hidden sm:inline">{t.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setTheme(prev => prev === 'dark' ? 'bright' : prev === 'bright' ? 'colorful' : 'dark')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Moon size={20} /> : theme === 'bright' ? <Sun size={20} /> : <Palette size={20} />}
            </button>

            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent border border-white/20 rounded p-1 text-sm outline-none cursor-pointer"
            >
              <option value="en" className="text-black">English</option>
              <option value="he" className="text-black">עברית</option>
              <option value="zh" className="text-black">中文</option>
              <option value="hi" className="text-black">हिन्दी</option>
              <option value="de" className="text-black">Deutsch</option>
              <option value="es" className="text-black">Español</option>
              <option value="fr" className="text-black">Français</option>
            </select>

            <div className="flex gap-1 border border-white/20 rounded p-1 ml-2">
              <button onClick={() => setFontSize('small')} className={`px-2 py-0.5 rounded ${fontSize === 'small' ? 'bg-blue-500' : ''}`}>S</button>
              <button onClick={() => setFontSize('medium')} className={`px-2 py-0.5 rounded ${fontSize === 'medium' ? 'bg-blue-500' : ''}`}>M</button>
              <button onClick={() => setFontSize('large')} className={`px-2 py-0.5 rounded ${fontSize === 'large' ? 'bg-blue-500' : ''}`}>L</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Medical Disclaimer Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs md:text-sm font-medium text-amber-500/90 italic">
          <ShieldAlert size={14} className="shrink-0" />
          <p>{t.disclaimer}</p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-24 overflow-x-hidden">
        
        {/* Hero & Search */}
        <FadeInSection>
          <section className="text-center space-y-6 py-12">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{t.title}</h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">{t.subtitle}</p>
            
            <div className="max-w-xl mx-auto relative group">
              <div className="flex items-center bg-white/5 border border-white/20 rounded-2xl p-2 gap-2 shadow-inner focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <Search className="ml-2 opacity-50" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder={t.searchPlaceholder}
                  className="bg-transparent flex-1 p-2 outline-none"
                />
                <button onClick={() => setSearchQuery('')} title={t.clearInput} className="p-2 opacity-50 hover:opacity-100">
                  <Trash2 size={18} />
                </button>
                <button onClick={handleExport} title={t.exportSearch} className="p-2 opacity-50 hover:opacity-100">
                  <Download size={18} />
                </button>
              </div>

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/20 rounded-xl overflow-hidden shadow-2xl z-40 text-left">
                  {filteredSuggestions.map((s, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-0"
                      onClick={() => setSearchQuery(s)}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </FadeInSection>

        {/* Stats Section */}
        <FadeInSection>
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <ChartBar className="text-blue-500" size={32} />
              <h2 className="text-3xl font-bold">{t.statsTitle}</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-xl font-semibold opacity-90">{t.consumptionChart}</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CONSUMPTION_DATA}>
                      <defs>
                        <linearGradient id="colorGrams" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors[theme].stroke} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={chartColors[theme].stroke} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors[theme].grid} vertical={false} />
                      <XAxis 
                        dataKey="year" 
                        stroke="currentColor" 
                        opacity={0.5} 
                        fontSize={12} 
                      />
                      <YAxis 
                        stroke="currentColor" 
                        opacity={0.5} 
                        fontSize={12} 
                      />
                      <Tooltip content={<CustomTooltip t={t} type="sugar" />} />
                      <Area 
                        type="monotone" 
                        dataKey="grams" 
                        stroke={chartColors[theme].stroke} 
                        fillOpacity={1} 
                        fill="url(#colorGrams)" 
                        strokeWidth={3} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-xl font-semibold opacity-90">{t.prevalenceChart}</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PREVALENCE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors[theme].grid} vertical={false} />
                      <XAxis 
                        dataKey="age" 
                        stroke="currentColor" 
                        opacity={0.5} 
                        fontSize={12} 
                      />
                      <YAxis 
                        stroke="currentColor" 
                        opacity={0.5} 
                        fontSize={12} 
                      />
                      <Tooltip content={<CustomTooltip t={t} type="prevalence" />} />
                      <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
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
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">{t.dangersTitle}</h2>
              <button 
                onClick={() => speak(`${t.dangersTitle}. ${t.sugarExamples.join(', ')}`)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors"
              >
                <Volume2 size={18} />
                {t.ttsButton}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredFoods.length > 0 ? filteredFoods.map((item, idx) => (
                <div key={idx} className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-1">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <button 
                      onClick={() => handleShare(item)}
                      className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-blue-600 text-white rounded-full backdrop-blur-sm transition-colors"
                      title="Share"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <div className="inline-block bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-mono">
                      {item.sugarContent}
                    </div>
                    <p className="text-sm opacity-70">{item.description}</p>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-12 opacity-50">No foods found matching your search.</div>
              )}
            </div>
          </section>
        </FadeInSection>

        {/* Healthy Swaps Section */}
        <FadeInSection>
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" size={32} />
              <h2 className="text-3xl font-bold">{t.healthySwapsTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.healthySwaps.map((item, idx) => (
                <div key={idx} className="bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col sm:flex-row gap-6 items-center hover:bg-white/10 transition-colors">
                  <div className="w-full sm:w-1/3 aspect-square rounded-2xl overflow-hidden border border-white/5">
                    <img src={item.image} alt={item.swap} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-red-400 line-through opacity-60 font-medium">{item.original}</span>
                      <ArrowRight size={16} className={isRtl ? 'rotate-180' : ''} />
                      <span className="text-green-400 font-bold text-lg">{item.swap}</span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed italic border-l-2 border-green-500/50 pl-3">
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
          <section className="bg-red-950/20 border border-red-500/20 rounded-3xl p-6 md:p-10 space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-600 rounded-full animate-pulse">
                <AlertTriangle className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-black text-red-500">{t.consequencesTitle}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Diabetes is not just about blood sugar; it's a systemic attack on your body. 
                  Excess glucose acts like glass in your bloodstream, shredding delicate vessels in your eyes, kidneys, and extremities.
                </p>
                
                <div className="bg-black/40 p-6 rounded-2xl border-l-4 border-red-600">
                  <h4 className="font-bold text-red-400 mb-2 uppercase text-xs tracking-widest">Warning: Critical Complications</h4>
                  <p className="font-medium italic">{t.amputationWarning}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...t.diabetesSymptoms, ...t.healthTerms].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-red-500/30 transition-colors">
                      <Activity className="text-red-500 shrink-0" size={16} />
                      <span className="text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
                <img src="https://picsum.photos/800/600?random=20" alt="Consequences Visual" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950 to-transparent flex items-end p-6">
                  <span className="text-xs uppercase tracking-widest font-bold text-red-400">Educational Graphic: Preventative Awareness</span>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Prevention Section */}
        <FadeInSection>
          <section className="text-center py-12 bg-green-950/10 rounded-3xl border border-green-500/20 mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Protect Yourself</h2>
            <p className="text-xl max-w-2xl mx-auto opacity-80 mb-8">{t.prevention}</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-green-900/40">
              Start Your Journey Today
            </button>
          </section>
        </FadeInSection>

      </main>

      <footer className="border-t border-white/10 bg-black/20 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm opacity-60">
          <div className="text-center md:text-left">
            <p className="font-bold mb-1">{t.footerText}</p>
            <p>Empowering lives through nutritional education.</p>
          </div>
          
          <div className="flex gap-4 items-center">
            <a href={`mailto:goldnoamai@gmail.com`} className="hover:text-blue-400 underline underline-offset-4 transition-colors">
              {t.feedbackLink}
            </a>
          </div>

          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-white">Accessibility Statement</span>
            <span className="cursor-pointer hover:text-white">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
