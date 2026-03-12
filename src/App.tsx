/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Calendar, Share2, Sparkles, ChevronRight, Info, Copy, Check, X,
  User, Briefcase, Target, Heart, ShieldAlert, Activity, TrendingUp,
  Zap, Sun, Moon, Anchor, Compass, Award, Gem, Lock
} from 'lucide-react';
import { calculateMatrix, MatrixData } from './utils/matrixUtils';
import { NATALIE_REPORT } from './constants/natalieReport';
import { ARIEL_REPORT } from './constants/arielReport';
import { TAROT_DATA, TarotCard } from './constants/tarotData';

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const WhatsAppCTA = () => (
  <div className="flex justify-center py-8">
    <a 
      href={`https://wa.me/972505213995?text=${encodeURIComponent("היי נטלי, אשמח לקבוע ייעוץ אישי \n שם:")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#128C7E] transition-all shadow-xl shadow-[#25D366]/20 group text-sm md:text-base"
    >
      <span>לקביעת פגישה אישית שלחי הודעה</span>
      <WhatsAppIcon size={20} />
    </a>
  </div>
);

export default function App() {
  const [name, setName] = useState(NATALIE_REPORT.name);
  const [dob, setDob] = useState(() => {
    const [y, m, d] = NATALIE_REPORT.dob.split('-');
    return `${d}/${m}/${y}`;
  });
  const [matrix, setMatrix] = useState<MatrixData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [selectedChakra, setSelectedChakra] = useState<any | null>(null);

  // Determine which report to use
  const currentReport = useMemo(() => {
    const normalizedName = name.trim().toLowerCase();
    if (normalizedName === 'אריאל' || normalizedName === 'ariel') {
      return ARIEL_REPORT;
    }
    return NATALIE_REPORT;
  }, [name]);

  // Auto-update DOB for known reports if not manually changed
  useEffect(() => {
    const normalizedName = name.trim().toLowerCase();
    const natalieDobFormatted = NATALIE_REPORT.dob.split('-').reverse().join('/');
    const arielDobFormatted = ARIEL_REPORT.dob.split('-').reverse().join('/');

    if (normalizedName === 'אריאל' || normalizedName === 'ariel') {
      if (dob === natalieDobFormatted) {
        setDob(arielDobFormatted);
      }
    } else if (normalizedName === 'נטלי' || normalizedName === 'natalie') {
      if (dob === arielDobFormatted) {
        setDob(natalieDobFormatted);
      }
    }
  }, [name]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { id: 'matrix', icon: <Target size={18} />, label: 'מטריצה' },
    { id: 'career', icon: <Briefcase size={18} />, label: 'קריירה' },
    { id: 'destiny', icon: <TrendingUp size={18} />, label: 'ייעוד' },
    { id: 'personal-steps', icon: <Zap size={18} />, label: 'המלצות' },
    { id: 'money-love', icon: <Heart size={18} />, label: 'זוגיות' },
    { id: 'karma', icon: <Anchor size={18} />, label: 'קרמה' },
    { id: 'health', icon: <Activity size={18} />, label: 'בריאות' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const calculateAge = (dateStr: string) => {
    if (!dateStr) return null;
    let date: Date;
    if (dateStr.includes('/')) {
      const parts = dateStr.split('/');
      if (parts.length !== 3) return null;
      const [d, m, y] = parts.map(Number);
      if (!d || !m || !y || y < 1000) return null;
      date = new Date(y, m - 1, d);
    } else {
      date = new Date(dateStr);
    }
    
    if (isNaN(date.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age;
  };

  const age = useMemo(() => calculateAge(dob), [dob]);

  // Load from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dobParam = params.get('dob');
    const nameParam = params.get('name');
    if (dobParam) {
      // If URL has YYYY-MM-DD, convert to DD/MM/YYYY
      if (dobParam.includes('-')) {
        const [y, m, d] = dobParam.split('-');
        setDob(`${d}/${m}/${y}`);
        handleAnalyze(`${d}/${m}/${y}`);
      } else {
        setDob(dobParam);
        handleAnalyze(dobParam);
      }
      if (nameParam) setName(nameParam);
    }
  }, []);

  const handleAnalyze = async (dateValue: string) => {
    if (!dateValue) return;
    
    let formattedForMatrix = dateValue;
    if (dateValue.includes('/')) {
      const [d, m, y] = dateValue.split('/');
      if (d && m && y && y.length === 4) {
        formattedForMatrix = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      }
    }

    setLoading(true);
    // Simulate a small delay for "interactive" feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const calculated = calculateMatrix(formattedForMatrix);
    setMatrix(calculated);
    setShowFullReport(true);
    setLoading(false);
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    
    let formatted = value;
    if (value.length > 2 && value.length <= 4) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else if (value.length > 4) {
      formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    }
    setDob(formatted);
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('dob', dob);
    url.searchParams.set('name', name);
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-warm text-brand-ink font-sans selection:bg-brand-accent/20 overflow-x-hidden" dir="rtl">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-50 origin-[0%]" style={{ scaleX }} />

      {/* Floating Circular Nav */}
      <AnimatePresence>
        {matrix && showFullReport && (
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-md border border-brand-accent/10 rounded-full p-2 shadow-2xl flex items-center gap-2"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-brand-ink/40 hover:text-brand-accent hover:bg-brand-accent/5 transition-all group relative"
                title={item.label}
              >
                {item.icon}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-ink text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-accent/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-gold/5 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24">
        {/* Hero Section */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-accent/10 text-brand-accent text-sm font-semibold mb-8 shadow-sm"
          >
            <Sparkles size={16} />
            <span>ניתוח מטריצת הגורל המקצועי שלך</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-brand-ink mb-6 leading-tight">
            ניתוח האישי <br />
            <span className="text-brand-accent">עפ"י קוד הלידה שלך</span>
          </h1>
          <p className="text-xl text-brand-ink/60 max-w-2xl mx-auto leading-relaxed font-light">
            שלום {name}, גלי את הקוד הייחודי המדויק שלך.
          </p>
        </motion.header>

        {/* Input Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group mb-24"
        >
          <div className="relative bg-white border border-brand-accent/10 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-brand-ink/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-ink/40 mr-2">השם שלך</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-accent/40" size={20} />
                  <input 
                    type="text" 
                    placeholder="הכניסי שם..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-warm/50 border border-brand-accent/10 rounded-2xl py-4 pr-12 pl-4 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-ink/40 mr-2">תאריך לידה</label>
                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-accent/40 font-bold text-sm min-w-[20px] flex justify-center">
                    {age ? age : <Calendar size={20} />}
                  </div>
                  <input 
                    type="text" 
                    placeholder="DD/MM/YYYY"
                    value={dob}
                    onChange={handleDobChange}
                    className="w-full bg-brand-warm/50 border border-brand-accent/10 rounded-2xl py-4 pr-12 pl-4 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                  />
                </div>
              </div>
              <button 
                onClick={() => handleAnalyze(dob)}
                disabled={loading || !dob}
                className="h-[60px] bg-brand-accent text-white hover:bg-brand-accent/90 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-lg shadow-brand-accent/20"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>הפיקי ניתוח מלא</span>
                    <ChevronRight size={20} className="group-hover:translate-x-[-4px] transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.section>

        {/* Results Content */}
        <AnimatePresence>
          {matrix && showFullReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-32"
            >
              {/* Intro Summary */}
              <section id="intro" className="bg-brand-accent/5 border border-brand-accent/10 rounded-3xl p-8 md:p-12">
                <p className="text-lg md:text-xl text-brand-ink/80 leading-relaxed italic font-serif">
                  "{currentReport.intro}"
                </p>
              </section>

              {/* 1. Matrix Visualization Section */}
              <section id="matrix" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative aspect-square max-w-[280px] md:max-w-md mx-auto w-full my-12 md:my-0">
                  <div className="absolute inset-0 border border-brand-accent/20 rounded-full" />
                  <div className="absolute inset-[10%] border border-brand-accent/10 rounded-full" />
                  <div className="absolute inset-[25%] border border-brand-accent/5 rounded-full" />
                  
                  <MatrixPoint position="top" value={matrix.b} label="רוחניות" color="olive" onClick={() => setSelectedCard(TAROT_DATA[matrix.b])} />
                  <MatrixPoint position="bottom" value={matrix.d} label="קרמה" color="accent" onClick={() => setSelectedCard(TAROT_DATA[matrix.d])} />
                  <MatrixPoint position="left" value={matrix.a} label="אישיות" color="olive" onClick={() => setSelectedCard(TAROT_DATA[matrix.a])} />
                  <MatrixPoint position="right" value={matrix.c} label="חומר" color="gold" onClick={() => setSelectedCard(TAROT_DATA[matrix.c])} />
                  <MatrixPoint position="center" value={matrix.e} label="אזור נוחות" color="gold" onClick={() => setSelectedCard(TAROT_DATA[matrix.e])} />
                </div>
                
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 text-brand-accent font-bold tracking-widest text-sm uppercase">
                    <div className="w-8 h-[1px] bg-brand-accent" />
                    {currentReport.personality.title}
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-brand-ink leading-tight">
                    הקוד הייחודי <br />
                    <span className="text-brand-accent/60">שלך נחשף</span>
                  </h2>
                  <p className="text-lg text-brand-ink/70 leading-relaxed">
                    {currentReport.personality.content}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-brand-accent/10 shadow-sm">
                      <div className="text-2xl font-serif font-bold text-brand-ink mb-1">{matrix.a}</div>
                      <div className="text-xs text-brand-ink/40 uppercase font-bold">יום לידה</div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-brand-accent/10 shadow-sm">
                      <div className="text-2xl font-serif font-bold text-brand-ink mb-1">{matrix.b}</div>
                      <div className="text-xs text-brand-ink/40 uppercase font-bold">חודש לידה</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Professional & Career Section */}
              <section id="career" className="space-y-12 scroll-mt-24">
                <SectionHeader 
                  icon={<Briefcase className="text-brand-olive" />} 
                  title={currentReport.career.title} 
                  subtitle="הפוטנציאל הכלכלי והעסקי שלך"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <BentoCard 
                    title="חוזקות מפתח" 
                    items={currentReport.career.strengths}
                    color="emerald"
                  />
                  <BentoCard 
                    title="מה דורש חיזוק" 
                    items={currentReport.career.weaknesses}
                    color="red"
                  />
                  <div className="bg-brand-accent/5 p-8 rounded-[2rem] border border-brand-accent/10 flex flex-col justify-center">
                    <h4 className="text-2xl font-serif font-bold text-brand-ink mb-4">עצמאית או שכירה?</h4>
                    <p className="text-brand-ink/70 leading-relaxed">
                      {currentReport.career.status}
                    </p>
                  </div>
                </div>
                <div className="p-8 bg-white rounded-3xl border border-brand-accent/10 shadow-sm">
                  <h4 className="text-lg font-serif font-bold text-brand-ink mb-4">המלצות מקצועיות:</h4>
                  <p className="text-brand-ink/60 leading-relaxed">{currentReport.career.recommendations}</p>
                </div>
              </section>

              {/* 3. Destiny Timeline */}
              <section id="destiny" className="space-y-16 scroll-mt-24">
                <SectionHeader 
                  icon={<TrendingUp className="text-brand-accent" />} 
                  title="ציר הזמן של הייעוד" 
                  subtitle="התפתחות הנשמה לאורך השנים"
                />
                <div className="relative space-y-12 before:absolute before:right-[23px] before:top-4 before:bottom-4 before:w-[2px] before:bg-brand-accent/10">
                  {currentReport.destiny.map((item, idx) => (
                    <TimelineItem 
                      key={idx}
                      age={item.age} 
                      title={item.title} 
                      content={item.content}
                      active={idx === 0}
                    />
                  ))}
                </div>
                <WhatsAppCTA />
              </section>

              {/* 3.5 Personal Steps */}
              <section id="personal-steps" className="space-y-12 scroll-mt-24">
                <SectionHeader 
                  icon={<Zap className="text-brand-accent" />} 
                  title={currentReport.personalSteps.title} 
                  subtitle="כלים מעשיים לאיזון וצמיחה"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <BentoCard 
                    title="תסמיני מינוס (מה לעצור)" 
                    items={currentReport.personalSteps.minusSymptoms} 
                    color="red" 
                  />
                  <BentoCard 
                    title="כלי פלוס (מה לחזק)" 
                    items={currentReport.personalSteps.plusTools} 
                    color="emerald" 
                  />
                </div>
              </section>

              {/* 4. Money & Love Grid */}
              <section id="money-love" className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-24">
                <div className="p-10 bg-white rounded-[2.5rem] border border-brand-accent/10 space-y-8 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                      <Gem size={24} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-ink">ערוץ הכסף</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">נקודת כניסה</h4>
                      <p className="text-brand-ink/60 text-sm">{currentReport.money.entry}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">האנרגיה המרכזית</h4>
                      <p className="text-brand-ink/60 text-sm">{currentReport.money.main}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">נקודת איזון</h4>
                      <p className="text-brand-ink/60 text-sm">{currentReport.money.balance}</p>
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-white rounded-[2.5rem] border border-brand-accent/10 space-y-8 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                      <Heart size={24} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-ink">ערוץ האהבה</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-brand-accent uppercase tracking-wider">נקודת כניסה</h4>
                      <p className="text-brand-ink/60 text-sm">{currentReport.love.entry}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-brand-accent uppercase tracking-wider">מהות הקשר</h4>
                      <p className="text-brand-ink/60 text-sm">{currentReport.love.main}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-brand-accent uppercase tracking-wider">נקודת איזון</h4>
                      <p className="text-brand-ink/60 text-sm">{currentReport.love.balance}</p>
                    </div>
                    {currentReport.love.correction && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-brand-accent uppercase tracking-wider">התיקון בזוגיות</h4>
                        <p className="text-brand-ink/60 text-sm">{currentReport.love.correction}</p>
                      </div>
                    )}
                    {currentReport.love.strengths && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-brand-accent uppercase tracking-wider">חוזקות בפלוס</h4>
                        <p className="text-brand-ink/60 text-sm">{currentReport.love.strengths}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <WhatsAppCTA />

              {/* 5. Karma Section */}
              <section id="karma" className="space-y-12 scroll-mt-24">
                <SectionHeader 
                  icon={<Anchor className="text-brand-accent" />} 
                  title={currentReport.karma.title} 
                  subtitle="התיקון והשיעור הקרמתי שלך"
                />
                <div className="p-10 bg-brand-accent/5 rounded-[2.5rem] border border-brand-accent/10">
                  <p className="text-lg text-brand-ink/70 leading-relaxed">
                    {currentReport.karma.content}
                  </p>
                </div>
              </section>

              {/* 6. Health & Chakras */}
              <section id="health" className="space-y-12 scroll-mt-24">
                <SectionHeader 
                  icon={<Activity className="text-brand-accent" />} 
                  title="מפת הבריאות והצ'אקרות" 
                  subtitle="הקשר בין הגוף לנפש"
                />
                <div className="bg-white rounded-[2.5rem] border border-brand-accent/10 overflow-hidden shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-accent/10">
                    {currentReport.health.chakras.map((chakra) => (
                      <ChakraCard 
                        key={chakra.id}
                        id={chakra.id} 
                        name={chakra.name} 
                        focus={chakra.focus} 
                        energy={chakra.energy} 
                        desc={chakra.desc} 
                        onClick={() => setSelectedChakra(chakra)}
                      />
                    ))}
                  </div>
                  <div className="p-8 bg-brand-accent/5 border-t border-brand-accent/10 text-center">
                    <h4 className="text-xl font-serif font-bold text-brand-ink mb-2">סיכום בריאותי כולל</h4>
                    <p className="text-brand-ink/60 max-w-2xl mx-auto">
                      {currentReport.health.summary}
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Forecast Section */}
              <section id="forecast" className="space-y-12 scroll-mt-24">
                <SectionHeader 
                  icon={<TrendingUp className="text-brand-accent" />} 
                  title="תחזית לשנתיים הקרובות" 
                  subtitle="מה מחכה לך באופק"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {currentReport.forecast.map((item, idx) => (
                    <ForecastCard 
                      key={idx}
                      year={item.year} 
                      title={item.title} 
                      content={item.content}
                      color={idx === 0 ? "purple" : "indigo"}
                    />
                  ))}
                </div>
              </section>

              {/* Personal Consultation CTA */}
              <section className="bg-brand-ink text-white rounded-[2.5rem] p-8 md:p-12 text-center space-y-8 shadow-2xl shadow-brand-ink/20">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-brand-gold text-xs font-bold uppercase tracking-widest">
                  <Sparkles size={14} />
                  <span>ייעוץ אישי ומעמיק</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold">לייעוץ אישי פרונטלי או בזום שלחי לי הודעה</h2>
                <p className="text-white/60 max-w-xl mx-auto">
                  בואי נצלול יחד לעומק המפה שלך, נבין את השיעורים הקרמתיים ונבנה תוכנית פעולה למימוש הפוטנציאל המלא שלך.
                </p>
                <div className="flex justify-center">
                  <WhatsAppCTA />
                </div>
              </section>

              {/* Final CTA & Share */}
              <section className="text-center space-y-8 py-20 border-t border-brand-accent/10">
                <h2 className="text-4xl font-serif font-bold text-brand-ink">מוכנה לצאת לדרך חדשה?</h2>
                <p className="text-brand-ink/60 max-w-xl mx-auto">
                  {currentReport.outro || `${name} האהובה, המפה שלך מציגה אישה עוצמתית, חכמה ורוחנית. יש לך את היכולת להאיר את העולם ולהוביל אנשים.`}
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-3 px-10 py-5 bg-brand-accent text-white font-bold rounded-2xl hover:bg-brand-accent/90 transition-all shadow-xl shadow-brand-accent/20"
                  >
                    {copied ? <Check size={20} /> : <Share2 size={20} />}
                    <span>{copied ? 'הלינק הועתק!' : 'שתפי את הניתוח שלך'}</span>
                  </button>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-brand-accent/10 text-center text-brand-ink/40 text-sm">
        <p>© {new Date().getFullYear()} מטריצת הגורל - ניתוח אישי אינטראקטיבי עבור {name}</p>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/972505213995?text=${encodeURIComponent("היי נטלי, אשמח לקבוע ייעוץ אישי \n שם:")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:bg-[#128C7E] transition-colors"
      >
        <WhatsAppIcon size={32} />
      </motion.a>

      {/* Tarot Modal */}
      <AnimatePresence>
        {selectedCard && (
          <TarotModal card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
      </AnimatePresence>

      {/* Chakra Modal */}
      <AnimatePresence>
        {selectedChakra && (
          <ChakraModal chakra={selectedChakra} onClose={() => setSelectedChakra(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function MatrixPoint({ position, value, label, color, onClick }: { position: string, value: number, label: string, color: string, onClick?: () => void }) {
  const positions: Record<string, string> = {
    top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
    right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  };

  const colors: Record<string, string> = {
    olive: "bg-brand-olive shadow-brand-olive/20",
    accent: "bg-brand-accent shadow-brand-accent/20",
    gold: "bg-brand-gold shadow-brand-gold/20"
  };

  const tarotCard = TAROT_DATA[value];

  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`absolute ${positions[position]} flex flex-col items-center z-20`}
    >
      <button 
        onClick={onClick}
        className={`group relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-brand-warm shadow-xl transition-transform hover:scale-110 active:scale-95 flex items-center justify-center`}
      >
        {tarotCard ? (
          <>
            <img 
              src={tarotCard.image} 
              alt={tarotCard.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className={`absolute inset-0 ${colors[color]} opacity-20 group-hover:opacity-10 transition-opacity`} />
            <span className="relative z-10 text-brand-ink font-serif font-black text-3xl md:text-4xl drop-shadow-sm">
              {value}
            </span>
          </>
        ) : (
          <div className={`w-full h-full ${colors[color]} flex items-center justify-center text-white font-serif font-black text-3xl md:text-4xl`}>
            {value}
          </div>
        )}
      </button>
      <span className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.2em] font-black text-brand-ink/40 whitespace-nowrap bg-white/60 px-2 py-0.5 rounded backdrop-blur-sm shadow-sm">
        {label}
      </span>
    </motion.div>
  );
}

function TarotModal({ card, onClose }: { card: TarotCard, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-brand-ink/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative max-w-2xl w-full bg-brand-warm border border-brand-accent/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 border border-brand-accent/10 flex items-center justify-center text-brand-ink hover:bg-brand-accent hover:text-white transition-all shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-72 md:h-auto overflow-hidden bg-white flex items-center justify-center p-4">
          <img 
            src={card.image} 
            alt={card.name} 
            className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-warm/20 via-transparent to-transparent md:hidden pointer-events-none" />
          <div className="absolute bottom-4 left-4 md:top-6 md:left-6">
            <div className="text-4xl md:text-5xl font-serif font-black text-brand-ink/10 leading-none">{card.number}</div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col h-full overflow-hidden">
          <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-brand-accent font-bold tracking-widest text-[10px] uppercase">ארכיטיפ {card.number}</div>
                <h3 className="text-lg md:text-xl font-serif font-bold text-brand-ink leading-tight">{card.name}</h3>
              </div>
              
              <div className="h-px bg-brand-accent/20 w-10" />
              
              <div className="space-y-3">
                <p className="text-brand-ink/70 leading-relaxed text-base">
                  {card.description}
                </p>
                
                <div className="pt-3 border-t border-brand-accent/5">
                  <p className="text-xs text-brand-ink/40 italic">
                    האנרגיה הזו מייצגת את הפוטנציאל הטמון בנקודה זו במטריצה שלך.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-auto">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-brand-accent text-white font-bold rounded-2xl hover:bg-brand-accent/90 transition-all shadow-lg shadow-brand-accent/20"
            >
              הבנתי, תודה
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-white rounded-xl border border-brand-accent/10 shadow-sm">
          {React.cloneElement(icon as React.ReactElement, { size: 20 })}
        </div>
        <h2 className="text-2xl font-serif font-bold text-brand-ink">{title}</h2>
      </div>
      <p className="text-brand-ink/40 font-medium mr-14 text-sm">{subtitle}</p>
    </div>
  );
}

function BentoCard({ title, items, color }: { title: string, items: string[], color: string }) {
  const colors: Record<string, string> = {
    emerald: "text-brand-olive bg-brand-olive/5",
    red: "text-brand-accent bg-brand-accent/5",
    purple: "text-brand-accent bg-brand-accent/5"
  };

  return (
    <div className="p-8 bg-white rounded-[2rem] border border-brand-accent/10 hover:shadow-lg transition-all shadow-sm">
      <h4 className="text-lg font-serif font-bold text-brand-ink mb-6">{title}</h4>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-brand-ink/60 text-sm leading-relaxed">
            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${colors[color].split(' ')[0]}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface TimelineItemProps {
  key?: React.Key;
  age: string;
  title: string;
  content: string;
  active: boolean;
}

function TimelineItem({ age, title, content, active }: TimelineItemProps) {
  return (
    <div className={`relative pr-16 group ${active ? 'opacity-100' : 'opacity-50 hover:opacity-80 transition-opacity'}`}>
      <div className={`absolute right-0 top-1 w-12 h-12 rounded-full border-4 border-brand-warm z-10 flex items-center justify-center ${active ? 'bg-brand-accent shadow-lg shadow-brand-accent/20' : 'bg-brand-accent/10'}`}>
        {active && <Zap size={20} className="text-white fill-white" />}
      </div>
      <div className="space-y-2">
        <div className="text-xs font-bold text-brand-accent uppercase tracking-widest">{age}</div>
        <h4 className="text-xl font-serif font-bold text-brand-ink">{title}</h4>
        <p className="text-brand-ink/60 text-sm leading-relaxed max-w-2xl">{content}</p>
      </div>
    </div>
  );
}

interface ChakraCardProps {
  key?: React.Key;
  id: number;
  name: string;
  focus: string;
  energy: number;
  desc: string;
}

function ChakraCard({ id, name, focus, energy, desc, onClick }: ChakraCardProps & { onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-8 bg-white hover:bg-brand-warm/50 transition-colors space-y-4 text-right w-full group"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[10px] text-brand-ink/40 font-bold uppercase mb-1">צ'אקרה {id}</div>
          <h5 className="text-lg font-serif font-bold text-brand-ink group-hover:text-brand-accent transition-colors">{name}</h5>
        </div>
        <div className="w-8 h-8 rounded-lg bg-brand-accent/5 flex items-center justify-center text-xs font-bold text-brand-accent">
          {energy}
        </div>
      </div>
      <div className="text-xs text-brand-accent font-semibold">{focus}</div>
      <p className="text-xs text-brand-ink/50 leading-relaxed line-clamp-2">{desc}</p>
    </button>
  );
}

function ChakraModal({ chakra, onClose }: { chakra: any, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-brand-ink/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative max-w-lg w-full bg-brand-warm border border-brand-accent/10 rounded-[2rem] p-8 md:p-10 shadow-2xl space-y-6"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 border border-brand-accent/10 flex items-center justify-center text-brand-ink hover:bg-brand-accent hover:text-white transition-all shadow-sm"
        >
          <X size={20} />
        </button>

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="text-brand-accent font-bold tracking-widest text-[10px] uppercase">צ'אקרה {chakra.id}</div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-ink leading-tight">{chakra.name}</h3>
            <div className="text-xs text-brand-accent font-semibold">{chakra.focus}</div>
          </div>
          
          <div className="h-px bg-brand-accent/20 w-10" />
          
          <div className="space-y-3">
            <p className="text-brand-ink/70 leading-relaxed text-base">
              {chakra.desc}
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-brand-accent/5 rounded-xl border border-brand-accent/10 text-center">
                <div className="text-[10px] font-bold text-brand-ink/40 uppercase mb-1">פיזי</div>
                <div className="text-lg font-serif font-bold text-brand-accent">{chakra.physical}</div>
              </div>
              <div className="p-3 bg-brand-accent/5 rounded-xl border border-brand-accent/10 text-center">
                <div className="text-[10px] font-bold text-brand-ink/40 uppercase mb-1">קוד ייחודי</div>
                <div className="text-lg font-serif font-bold text-brand-accent">{chakra.energetic}</div>
              </div>
              <div className="p-3 bg-brand-accent/20 rounded-xl border border-brand-accent/30 text-center">
                <div className="text-[10px] font-bold text-brand-ink/40 uppercase mb-1">שלמות</div>
                <div className="text-lg font-serif font-bold text-brand-accent">{chakra.energy}</div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-brand-accent text-white font-bold rounded-2xl hover:bg-brand-accent/90 transition-all"
        >
          סגור
        </button>
      </motion.div>
    </motion.div>
  );
}

interface ForecastCardProps {
  key?: React.Key;
  year: string;
  title: string;
  content: string;
  color: string;
}

function ForecastCard({ year, title, content, color }: ForecastCardProps) {
  const colors: Record<string, string> = {
    purple: "border-brand-accent/10 bg-white text-brand-accent",
    indigo: "border-brand-accent/10 bg-white text-brand-olive"
  };

  return (
    <div className={`p-10 rounded-[2.5rem] border ${colors[color]} space-y-6 shadow-sm`}>
      <div className="text-sm font-bold uppercase tracking-widest">{year}</div>
      <h4 className="text-2xl font-serif font-bold text-brand-ink">{title}</h4>
      <p className="text-brand-ink/60 leading-relaxed">{content}</p>
    </div>
  );
}
