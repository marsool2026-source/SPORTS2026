import { useState } from 'react';

interface SystemModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  color: string;
  link: string;
  stats?: { label: string; value: string }[];
}

export default function SystemOverview() {
  const [selectedModule, setSelectedModule] = useState<SystemModule | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'flow'>('grid');

  const modules: SystemModule[] = [
    {
      id: 'login',
      name: 'نظام تسجيل الدخول',
      icon: '🚪',
      description: 'واجهة زجاجية عصرية مع حركات سلسة ودعم ثنائي اللغة',
      features: ['تصميم زجاجي', 'حركات سلسة', 'دعم ثنائي اللغة', 'تسجيل اجتماعي'],
      color: 'from-blue-500 to-cyan-500',
      link: '#login',
      stats: [
        { label: 'أدوار', value: '5' },
        { label: 'لغات', value: '2' },
      ]
    },
    {
      id: 'digital-card',
      name: 'الكارنيه الرقمي + QR',
      icon: '🪪',
      description: 'كارنيه رقمي ذكي مع QR Code تلقائي عند التسجيل',
      features: ['QR تلقائي', 'تجديد سنوي', 'هوية بصرية', 'قابل للمسح'],
      color: 'from-purple-500 to-violet-500',
      link: '#digital-card',
      stats: [
        { label: 'أكواد QR', value: '∞' },
        { label: 'تجديد', value: 'سنوي' },
      ]
    },
    {
      id: 'attendance',
      name: 'نظام الحضور QR',
      icon: '📱',
      description: 'تسجيل حضور فوري عبر مسح QR Code مع وضع Offline',
      features: ['مسح QR', 'Offline Mode', 'تقارير فورية', 'تحقق جغرافي'],
      color: 'from-emerald-500 to-teal-500',
      link: '#attendance',
      stats: [
        { label: 'دقة', value: '100%' },
        { label: 'سرعة', value: '<1s' },
      ]
    },
    {
      id: 'communication',
      name: 'مركز التواصل',
      icon: '💬',
      description: 'شات، مكالمات صوتية، فيديو، ومشاركة ملفات',
      features: ['شات فوري', 'مكالمات صوتية', 'فيديو كول', 'مشاركة ملفات'],
      color: 'from-pink-500 to-rose-500',
      link: '#communication',
      stats: [
        { label: 'مجموعات', value: '∞' },
        { label: 'بروتوكول', value: 'WebRTC' },
      ]
    },
    {
      id: 'tournaments',
      name: 'البطولات والمنافسات',
      icon: '🏆',
      description: 'إدارة البطولات مع لوحة متصدرين وعد تنازلي',
      features: ['عد تنازلي', 'لوحة متصدرين', 'تسجيل نتائج', 'شهادات'],
      color: 'from-amber-500 to-orange-500',
      link: '#tournaments',
      stats: [
        { label: 'بطولات', value: '18/سنة' },
        { label: 'لاعبون', value: '500+' },
      ]
    },
    {
      id: 'performance',
      name: 'تتبع الأداء',
      icon: '📈',
      description: 'قياسات بدنية ورسوم بيانية لتطور اللاعبين',
      features: ['قياسات بدنية', 'رسوم بيانية', 'مقارنات', 'تقارير'],
      color: 'from-indigo-500 to-blue-500',
      link: '#performance',
      stats: [
        { label: 'مقاييس', value: '5' },
        { label: 'تحديث', value: 'يومي' },
      ]
    },
    {
      id: 'world-records',
      name: 'الأرقام القياسية',
      icon: '🌍',
      description: 'تتبع الأرقام القياسية العالمية والشخصية',
      features: ['10 رياضات', '5 فئات', 'تتبع التطور', 'مقارنة عالمية'],
      color: 'from-yellow-500 to-amber-500',
      link: '#world-records',
      stats: [
        { label: 'رياضات', value: '10' },
        { label: 'أرقام', value: '100+' },
      ]
    },
    {
      id: 'ai-analysis',
      name: 'الذكاء الاصطناعي',
      icon: '🤖',
      description: 'تحليل ذكي للأداء مع توصيات وتنبؤات',
      features: ['تحليل تلقائي', 'توصيات ذكية', 'تنبؤ إصابات', 'دقة 94%'],
      color: 'from-violet-500 to-purple-500',
      link: '#ai-analysis',
      stats: [
        { label: 'دقة', value: '94%' },
        { label: 'تحليلات', value: '24/يوم' },
      ]
    },
    {
      id: 'live-streaming',
      name: 'البث المباشر',
      icon: '📹',
      description: 'بث التدريبات والبطولات مع دردشة مباشرة',
      features: ['بث حي', 'دردشة مباشرة', 'تسجيل', 'إعادة مشاهدة'],
      color: 'from-red-500 to-pink-500',
      link: '#live-streaming',
      stats: [
        { label: 'مشاهدون', value: '558' },
        { label: 'ساعات', value: '48+' },
      ]
    },
    {
      id: 'financial',
      name: 'النظام المالي',
      icon: '💰',
      description: 'شجرة حسابات بقيد مزدوج واعتماد مالي مزدوج',
      features: ['قيد مزدوج', 'محافظ إلكترونية', 'اعتماد مزدوج', 'تقارير'],
      color: 'from-emerald-500 to-green-500',
      link: '#financial',
      stats: [
        { label: 'حسابات', value: '4 فئات' },
        { label: 'أمان', value: 'مزدوج' },
      ]
    },
    {
      id: 'products',
      name: 'متجر المنتجات',
      icon: '🛒',
      description: 'MEGA PROTEIN، معدات، ملابس، وإكسسوارات',
      features: ['سلة مشتريات', 'خصومات', 'فئات متعددة', 'دفع آمن'],
      color: 'from-cyan-500 to-blue-500',
      link: '#products',
      stats: [
        { label: 'منتجات', value: '50+' },
        { label: 'فئات', value: '4' },
      ]
    },
    {
      id: 'buses',
      name: 'إدارة الباصات',
      icon: '🚌',
      description: 'خدمة نقل اختيارية خارج الاشتراك الشهري',
      features: ['خطوط متعددة', 'تتبع مباشر', 'سائقين معتمدين', 'اختياري'],
      color: 'from-sky-500 to-blue-500',
      link: '#buses',
      stats: [
        { label: 'خطوط', value: '3' },
        { label: 'سعة', value: '67' },
      ]
    },
    {
      id: 'schedule',
      name: 'الجدولة والتقويم',
      icon: '📅',
      description: 'تقويم تفاعلي للتدريبات وحجز حصص خاصة',
      features: ['تقويم تفاعلي', 'حجز حصص', 'تنبيهات', 'إدارة ملاعب'],
      color: 'from-teal-500 to-cyan-500',
      link: '#schedule',
      stats: [
        { label: 'حصص/أسبوع', value: '30+' },
        { label: 'مدربون', value: '25' },
      ]
    },
    {
      id: 'pricing',
      name: 'الباقات والأسعار',
      icon: '💎',
      description: '3 باقات مرنة مع حاسبة اشتراك',
      features: ['3 باقات', 'شهري/سنوي', 'حاسبة', 'خصم 15%'],
      color: 'from-purple-500 to-pink-500',
      link: '#pricing',
      stats: [
        { label: 'باقات', value: '3' },
        { label: 'خصم سنوي', value: '15%' },
      ]
    },
    {
      id: 'notifications',
      name: 'مركز الإشعارات',
      icon: '🔔',
      description: 'إشعارات مصنفة مع إعدادات مخصصة',
      features: ['4 أنواع', 'تصنيف', 'إعدادات', 'سجل كامل'],
      color: 'from-red-500 to-orange-500',
      link: '#notifications',
      stats: [
        { label: 'أنواع', value: '4' },
        { label: 'إشعارات', value: '∞' },
      ]
    },
    {
      id: 'rewards',
      name: 'نظام المكافآت',
      icon: '🏅',
      description: '4 مستويات + 8 مكافآت لتحفيز اللاعبين',
      features: ['4 مستويات', '8 مكافآت', 'نقاط', 'مزايا حصرية'],
      color: 'from-amber-500 to-yellow-500',
      link: '#rewards',
      stats: [
        { label: 'مستويات', value: '4' },
        { label: 'مكافآت', value: '8' },
      ]
    },
    {
      id: 'referrals',
      name: 'نظام الإحالات',
      icon: '🤝',
      description: 'كود إحالة فريد مع مكافآت 100 ج.م',
      features: ['كود فريد', '100 ج.م', 'مشاركة', 'تتبع'],
      color: 'from-green-500 to-emerald-500',
      link: '#referrals',
      stats: [
        { label: 'مكافأة', value: '100 ج.م' },
        { label: 'منصات', value: '4' },
      ]
    },
    {
      id: 'coupons',
      name: 'نظام الكوبونات',
      icon: '🎫',
      description: 'كوبونات خصم مع فئات مستهدفة',
      features: ['إنشاء كوبونات', 'فئات', 'تتبع', 'تقارير'],
      color: 'from-pink-500 to-fuchsia-500',
      link: '#coupons',
      stats: [
        { label: 'كوبونات', value: '∞' },
        { label: 'فئات', value: '4' },
      ]
    },
    {
      id: 'invoices',
      name: 'نظام الفواتير',
      icon: '📄',
      description: 'فواتير تلقائية مع تصدير PDF/Excel',
      features: ['فواتير تلقائية', 'تصدير', 'تتبع', 'تقارير'],
      color: 'from-blue-500 to-indigo-500',
      link: '#invoices',
      stats: [
        { label: 'حالات', value: '3' },
        { label: 'تصدير', value: 'PDF/Excel' },
      ]
    },
    {
      id: 'dashboard',
      name: 'لوحة التحكم',
      icon: '📊',
      description: 'رسوم بيانية تفاعلية مع Recharts',
      features: ['BarChart', 'LineChart', 'PieChart', 'تصدير'],
      color: 'from-purple-500 to-violet-500',
      link: '#dashboard',
      stats: [
        { label: 'رسوم', value: '3 أنواع' },
        { label: 'بيانات', value: 'Real-time' },
      ]
    },
    {
      id: 'field-booking',
      name: 'حجز الملاعب',
      icon: '🏟️',
      description: 'تقويم حجز تفاعلي للملاعب',
      features: ['تقويم', 'حجز فوري', 'تأكيد', 'إدارة'],
      color: 'from-emerald-500 to-teal-500',
      link: '#field-booking',
      stats: [
        { label: 'ملاعب', value: '3' },
        { label: 'أوقات', value: '42/أسبوع' },
      ]
    },
    {
      id: 'testimonials',
      name: 'الشهادات والتقييمات',
      icon: '⭐',
      description: 'شهادات أولياء الأمور واللاعبين',
      features: ['تقييم 5 نجوم', 'فلاتر', 'إحصائيات', 'CTA'],
      color: 'from-amber-500 to-orange-500',
      link: '#testimonials',
      stats: [
        { label: 'تقييم', value: '4.9/5' },
        { label: 'شهادات', value: '500+' },
      ]
    },
    {
      id: 'coaches',
      name: 'فريق المدربين',
      icon: '👨‍🏫',
      description: '25 مدرب معتمد دولياً',
      features: ['بطاقات', 'شهادات', 'إنجازات', 'تقييمات'],
      color: 'from-blue-500 to-cyan-500',
      link: '#coaches',
      stats: [
        { label: 'مدربون', value: '25' },
        { label: 'شهادات', value: 'UEFA/FIFA' },
      ]
    },
    {
      id: 'gallery',
      name: 'معرض الصور',
      icon: '📸',
      description: 'معرض صور تفاعلي مع Lightbox',
      features: ['Lightbox', 'فلاتر', 'تصنيفات', 'عرض كامل'],
      color: 'from-purple-500 to-pink-500',
      link: '#gallery',
      stats: [
        { label: 'صور', value: '100+' },
        { label: 'فئات', value: '3' },
      ]
    },
  ];

  const totalFeatures = modules.reduce((sum, m) => sum + m.features.length, 0);

  return (
    <section id="system-overview" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">عرض شامل</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            🗺️ نظرة عامة على <span className="gradient-text">المنظومة</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            استكشف جميع أنظمة المنظومة الـ {modules.length} في مكان واحد
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-4xl font-black gradient-text mb-1">{modules.length}</div>
            <div className="text-gray-400 text-sm">نظام متكامل</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-4xl font-black gradient-text-blue mb-1">{totalFeatures}+</div>
            <div className="text-gray-400 text-sm">ميزة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-4xl font-black text-emerald-400 mb-1">55+</div>
            <div className="text-gray-400 text-sm">مكون</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-4xl font-black text-amber-400 mb-1">100%</div>
            <div className="text-gray-400 text-sm">جاهز للإنتاج</div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'grid', label: '🔲 شبكة', icon: '🔲' },
            { id: 'list', label: '📋 قائمة', icon: '📋' },
            { id: 'flow', label: '🔄 تدفق', icon: '🔄' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as any)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                viewMode === mode.id
                  ? 'bg-gradient-to-l from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.map((module) => (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module)}
                className="glass-card p-5 cursor-pointer hover:scale-105 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-3xl mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                  {module.icon}
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{module.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
                  {module.description}
                </p>
                {module.stats && (
                  <div className="flex gap-2 flex-wrap">
                    {module.stats.map((stat, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-300">
                        {stat.label}: <strong className="text-white">{stat.value}</strong>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-3">
            {modules.map((module, index) => (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module)}
                className="glass-card p-4 cursor-pointer hover:scale-[1.01] transition-all flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold shrink-0">
                  {index + 1}
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl shrink-0`}>
                  {module.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm mb-1">{module.name}</h3>
                  <p className="text-gray-400 text-xs truncate">{module.description}</p>
                </div>
                <div className="hidden md:flex gap-2">
                  {module.stats?.map((stat, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">
                      {stat.label}: <strong>{stat.value}</strong>
                    </span>
                  ))}
                </div>
                <div className="text-gray-500 text-sm">←</div>
              </div>
            ))}
          </div>
        )}

        {/* Flow View */}
        {viewMode === 'flow' && (
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-6 text-center">
              🔄 تدفق العمليات في المنظومة
            </h3>
            <div className="space-y-4">
              {[
                { step: 1, title: 'التسجيل', desc: 'ولي الأمر يسجل اللاعب', icon: '📝', modules: ['login', 'digital-card'] },
                { step: 2, title: 'الدفع', desc: 'اختيار الباقة والدفع عبر المحفظة', icon: '💳', modules: ['pricing', 'financial'] },
                { step: 3, title: 'الاعتماد', desc: 'المدير المالي يعتمد الدفع', icon: '✓', modules: ['financial', 'invoices'] },
                { step: 4, title: 'التصنيف', desc: 'تصنيف اللاعب تلقائياً', icon: '📊', modules: ['digital-card', 'schedule'] },
                { step: 5, title: 'التدريب', desc: 'حضور التدريبات وتسجيل الحضور', icon: '⚽', modules: ['attendance', 'schedule'] },
                { step: 6, title: 'التحليل', desc: 'الذكاء الاصطناعي يحلل الأداء', icon: '🤖', modules: ['ai-analysis', 'performance'] },
                { step: 7, title: 'التطور', desc: 'تتبع الأرقام القياسية', icon: '🏆', modules: ['world-records', 'rewards'] },
                { step: 8, title: 'البث', desc: 'بث التدريبات مباشرة', icon: '📹', modules: ['live-streaming', 'communication'] },
              ].map((item) => (
                <div key={item.step} className="glass-card-light p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {item.step}
                  </div>
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                  <div className="hidden md:flex gap-1">
                    {item.modules.map((moduleId) => {
                      const module = modules.find(m => m.id === moduleId);
                      return module ? (
                        <span key={moduleId} className="text-xl" title={module.name}>
                          {module.icon}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module Details Modal */}
        {selectedModule && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedModule(null)}
          >
            <div
              className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedModule.color} flex items-center justify-center text-4xl shadow-lg`}>
                    {selectedModule.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-2xl">{selectedModule.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{selectedModule.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              {/* Stats */}
              {selectedModule.stats && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {selectedModule.stats.map((stat, i) => (
                    <div key={i} className="glass-card-light p-4 text-center">
                      <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                      <div className="text-gray-400 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span>✨</span> المميزات
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedModule.features.map((feature, i) => (
                    <div key={i} className="glass-card-light p-3 flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={selectedModule.link}
                  onClick={() => setSelectedModule(null)}
                  className="flex-1 py-3 bg-gradient-to-l from-blue-500 to-purple-600 text-white text-sm font-bold rounded-lg text-center hover:opacity-90 transition-opacity"
                >
                  عرض النظام ←
                </a>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="px-6 py-3 glass-card text-white text-sm rounded-lg"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Integration Map */}
        <div className="mt-12 glass-card p-6">
          <h3 className="text-white font-bold text-xl mb-6 text-center">
            🔗 خريطة التكامل بين الأنظمة
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: '🎯 مسار اللاعب',
                items: ['التسجيل → الكارنيه', 'الكارنيه → الحضور', 'الحضور → الأداء', 'الأداء → المكافآت'],
                color: 'border-blue-500/30'
              },
              {
                title: '💰 مسار الدفع',
                items: ['الباقات → الدفع', 'الدفع → معلق', 'المعلق → الاعتماد', 'الاعتماد → الفاتورة'],
                color: 'border-emerald-500/30'
              },
              {
                title: '📊 مسار البيانات',
                items: ['الحضور → التقارير', 'الأداء → الذكاء', 'الذكاء → التوصيات', 'التوصيات → التدريب'],
                color: 'border-purple-500/30'
              },
            ].map((path, i) => (
              <div key={i} className={`glass-card-light p-4 border ${path.color}`}>
                <h4 className="text-white font-bold mb-3">{path.title}</h4>
                <div className="space-y-2">
                  {path.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="text-gray-500">{j + 1}.</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 glass-card p-6">
          <h3 className="text-white font-bold text-xl mb-4 text-center">
            ⚡ الوصول السريع
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {modules.slice(0, 12).map((module) => (
              <a
                key={module.id}
                href={module.link}
                className="glass-card-light p-3 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-2xl mb-1">{module.icon}</div>
                <div className="text-white text-xs font-semibold truncate">{module.name}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
