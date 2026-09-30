import { useState, createContext, useContext } from 'react';

type Language = 'ar' | 'en' | 'fr' | 'es';

interface Translation {
  [key: string]: {
    ar: string;
    en: string;
    fr: string;
    es: string;
  };
}

const translations: Translation = {
  'app.title': {
    ar: 'أكاديمية الرياضات الاحترافية',
    en: 'Professional Sports Academy',
    fr: 'Académie de Sports Professionnelle',
    es: 'Academia Deportiva Profesional'
  },
  'nav.home': {
    ar: 'الرئيسية',
    en: 'Home',
    fr: 'Accueil',
    es: 'Inicio'
  },
  'nav.players': {
    ar: 'اللاعبين',
    en: 'Players',
    fr: 'Joueurs',
    es: 'Jugadores'
  },
  'nav.coaches': {
    ar: 'المدربين',
    en: 'Coaches',
    fr: 'Entraîneurs',
    es: 'Entrenadores'
  },
  'nav.tournaments': {
    ar: 'البطولات',
    en: 'Tournaments',
    fr: 'Tournois',
    es: 'Torneos'
  },
  'nav.schedule': {
    ar: 'الجدول',
    en: 'Schedule',
    fr: 'Programme',
    es: 'Horario'
  },
  'nav.contact': {
    ar: 'تواصل معنا',
    en: 'Contact Us',
    fr: 'Contactez-nous',
    es: 'Contáctenos'
  },
  'hero.title': {
    ar: 'نبني أبطال المستقبل',
    en: 'Building Future Champions',
    fr: 'Construire les Champions de Demain',
    es: 'Construyendo Campeones del Futuro'
  },
  'hero.subtitle': {
    ar: 'انضم إلى أفضل أكاديمية رياضية في المنطقة',
    en: 'Join the best sports academy in the region',
    fr: 'Rejoignez la meilleure académie de sport de la région',
    es: 'Únete a la mejor academia deportiva de la región'
  },
  'hero.cta': {
    ar: 'ابدأ الآن',
    en: 'Get Started',
    fr: 'Commencer',
    es: 'Comenzar'
  },
  'stats.players': {
    ar: 'لاعب نشط',
    en: 'Active Players',
    fr: 'Joueurs Actifs',
    es: 'Jugadores Activos'
  },
  'stats.coaches': {
    ar: 'مدرب معتمد',
    en: 'Certified Coaches',
    fr: 'Entraîneurs Certifiés',
    es: 'Entrenadores Certificados'
  },
  'stats.tournaments': {
    ar: 'بطولة سنوياً',
    en: 'Tournaments Yearly',
    fr: 'Tournois par An',
    es: 'Torneos Anuales'
  },
  'stats.years': {
    ar: 'سنة خبرة',
    en: 'Years Experience',
    fr: 'Années d\'Expérience',
    es: 'Años de Experiencia'
  },
  'pricing.title': {
    ar: 'اختر الباقة المناسبة',
    en: 'Choose the Right Plan',
    fr: 'Choisissez le Bon Forfait',
    es: 'Elige el Plan Adecuado'
  },
  'pricing.basic': {
    ar: 'الأساسية',
    en: 'Basic',
    fr: 'Basique',
    es: 'Básico'
  },
  'pricing.advanced': {
    ar: 'المتقدمة',
    en: 'Advanced',
    fr: 'Avancé',
    es: 'Avanzado'
  },
  'pricing.pro': {
    ar: 'الاحترافية',
    en: 'Professional',
    fr: 'Professionnel',
    es: 'Profesional'
  },
  'common.subscribe': {
    ar: 'اشترك الآن',
    en: 'Subscribe Now',
    fr: 'S\'abonner',
    es: 'Suscribirse'
  },
  'common.learn_more': {
    ar: 'اعرف المزيد',
    en: 'Learn More',
    fr: 'En Savoir Plus',
    es: 'Saber Más'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const languages = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
];

export default function MultiLanguage() {
  const { language, setLanguage, t } = useLanguage();
  const [showSelector, setShowSelector] = useState(false);

  const currentLang = languages.find(l => l.code === language);

  return (
    <section id="multi-language" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">متعدد اللغات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🌍 نظام <span className="gradient-text-blue">الترجمة</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            دعم 4 لغات مع تبديل فوري واتجاه تلقائي
          </p>
        </div>

        {/* Language Selector Demo */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-xl">🌐 اختر اللغة</h3>
            <div className="relative">
              <button
                onClick={() => setShowSelector(!showSelector)}
                className="flex items-center gap-2 px-4 py-2 glass-card-light rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-xl">{currentLang?.flag}</span>
                <span className="text-white text-sm">{currentLang?.name}</span>
                <span className="text-gray-400">▼</span>
              </button>

              {showSelector && (
                <div className="absolute top-full mt-2 right-0 glass-card p-2 min-w-[200px] z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setShowSelector(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        language === lang.code ? 'bg-blue-500/20' : 'hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-white text-sm flex-1 text-left">{lang.name}</span>
                      {language === lang.code && <span className="text-blue-400">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Translation Demo */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card-light p-6">
              <h4 className="text-blue-400 text-sm font-semibold mb-3">العنوان الرئيسي</h4>
              <p className="text-white text-2xl font-bold mb-2">{t('hero.title')}</p>
              <p className="text-gray-400">{t('hero.subtitle')}</p>
            </div>

            <div className="glass-card-light p-6">
              <h4 className="text-blue-400 text-sm font-semibold mb-3">زر الإجراء</h4>
              <button className="w-full py-3 bg-gradient-to-l from-blue-500 to-cyan-600 text-white font-bold rounded-lg mb-3">
                {t('hero.cta')} 🚀
              </button>
              <button className="w-full py-3 glass-card text-white font-bold rounded-lg">
                {t('common.learn_more')}
              </button>
            </div>
          </div>

          {/* Stats Translation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { value: '520+', key: 'stats.players', icon: '⚽' },
              { value: '25', key: 'stats.coaches', icon: '👨‍🏫' },
              { value: '18', key: 'stats.tournaments', icon: '🏆' },
              { value: '12', key: 'stats.years', icon: '📅' },
            ].map((stat, i) => (
              <div key={i} className="glass-card-light p-4 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-xs">{t(stat.key)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <div className="text-4xl mb-3">🌐</div>
            <h4 className="text-white font-bold mb-2">4 لغات مدعومة</h4>
            <p className="text-gray-400 text-sm">العربية، الإنجليزية، الفرنسية، الإسبانية</p>
          </div>

          <div className="glass-card p-6">
            <div className="text-4xl mb-3">🔄</div>
            <h4 className="text-white font-bold mb-2">تبديل فوري</h4>
            <p className="text-gray-400 text-sm">تغيير اللغة دون إعادة تحميل الصفحة</p>
          </div>

          <div className="glass-card p-6">
            <div className="text-4xl mb-3">↔️</div>
            <h4 className="text-white font-bold mb-2">اتجاه تلقائي</h4>
            <p className="text-gray-400 text-sm">RTL للعربية و LTR للغات الأخرى</p>
          </div>
        </div>

        {/* Language Comparison */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-white font-bold text-lg mb-4">📊 مقارنة الترجمات</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-3 text-right text-gray-400 text-sm">المفتاح</th>
                  {languages.map(lang => (
                    <th key={lang.code} className="p-3 text-center text-gray-400 text-sm">
                      {lang.flag} {lang.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(translations).slice(0, 5).map(key => (
                  <tr key={key} className="border-b border-white/5">
                    <td className="p-3 text-white text-xs font-mono">{key}</td>
                    {languages.map(lang => (
                      <td key={lang.code} className="p-3 text-gray-300 text-sm text-center">
                        {translations[key]?.[lang.code as keyof typeof translations[typeof key]]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
