import { useState, useEffect } from 'react';

interface FlowStep {
  id: number;
  title: string;
  actor: string;
  actorIcon: string;
  action: string;
  result: string;
  module: string;
  color: string;
}

const flowSteps: FlowStep[] = [
  {
    id: 1,
    title: 'تسجيل لاعب جديد',
    actor: 'ولي الأمر',
    actorIcon: '👨‍👦',
    action: 'يقوم بتسجيل ابنه في الأكاديمية',
    result: '→ يُنشأ الكود التسلسلي + QR تلقائياً + الكارنيه الرقمي',
    module: 'نظام التسجيل',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'اختيار الباقة والدفع',
    actor: 'ولي الأمر',
    actorIcon: '👨‍👦',
    action: 'يدفع الاشتراك عبر فودافون كاش',
    result: '→ يُرفع إيصال التحويل → الحالة: "معلق بانتظار الاعتماد"',
    module: 'المحافظ الإلكترونية',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 3,
    title: 'اعتماد مالي',
    actor: 'المدير المالي',
    actorIcon: '💼',
    action: 'يراجع الإيصال ويعتمد التحويل',
    result: '→ يُسجَّل القيد المحاسبي → يُفعَّل الاشتراك تلقائياً',
    module: 'الاعتماد المزدوج',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 4,
    title: 'تصنيف اللاعب',
    actor: 'النظام',
    actorIcon: '⚙️',
    action: 'يصنف اللاعب تلقائياً حسب سنة الميلاد',
    result: '→ يُضاف للمجموعة التدريبية المناسبة (ناشئين U10 مثلاً)',
    module: 'التصنيف السني',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 5,
    title: 'تسجيل الحضور',
    actor: 'المدرب',
    actorIcon: '🏅',
    action: 'يمسح QR اللاعب عند وصوله',
    result: '→ يُسجَّل الحضور فورياً → تُحدَّث الإحصائيات',
    module: 'نظام الحضور QR',
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 6,
    title: 'تقرير تلقائي',
    actor: 'المدير العام',
    actorIcon: '👑',
    action: 'يتلقى تقريراً يومياً تلقائياً',
    result: '→ عدد الحضور + التحويلات + حالة الباصات + الإيرادات',
    module: 'لوحات التحكم',
    color: 'from-indigo-500 to-blue-500',
  },
];

export default function IntegrationFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % flowSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="integration" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-xs font-semibold">التكامل بين الوحدات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔄 تدفق <span className="gradient-text-blue">العمليات المتكامل</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            كيف تتكامل جميع وحدات النظام معاً في سيناريو تشغيلي حقيقي — من التسجيل حتى التقرير
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              isPlaying
                ? 'bg-red-500/20 border border-red-500/30 text-red-300'
                : 'bg-gradient-to-l from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
            }`}
          >
            {isPlaying ? '⏸️ إيقاف' : '▶️ تشغيل السيناريو'}
          </button>
          <button
            onClick={() => { setActiveStep(0); setIsPlaying(false); }}
            className="px-4 py-2.5 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
          >
            🔄 إعادة
          </button>
        </div>

        {/* Flow Visualization */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 right-0 left-0 h-0.5 bg-gradient-to-l from-blue-500/30 via-purple-500/30 to-cyan-500/30 -translate-y-1/2" />

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {flowSteps.map((step, i) => (
              <div
                key={step.id}
                onClick={() => { setActiveStep(i); setIsPlaying(false); }}
                className={`glass-card p-5 cursor-pointer transition-all duration-500 relative ${
                  i === activeStep
                    ? 'scale-105 border-2 border-white/30 shadow-2xl'
                    : i < activeStep
                    ? 'opacity-60'
                    : 'opacity-40 hover:opacity-70'
                }`}
              >
                {/* Step Number */}
                <div className={`absolute top-3 left-3 w-7 h-7 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-xs font-bold text-white shadow-lg ${
                  i === activeStep ? 'animate-pulse' : ''
                }`}>
                  {step.id}
                </div>

                {/* Actor */}
                <div className="flex items-center gap-2 mb-3 pt-2">
                  <span className="text-2xl">{step.actorIcon}</span>
                  <div>
                    <div className="text-xs text-gray-500">الفاعل</div>
                    <div className="text-sm text-white font-semibold">{step.actor}</div>
                  </div>
                </div>

                {/* Action */}
                <h4 className="text-white font-bold text-sm mb-2">{step.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-2">{step.action}</p>

                {/* Result */}
                <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                  <p className="text-[11px] text-gray-300 leading-relaxed">{step.result}</p>
                </div>

                {/* Module Badge */}
                <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-[10px] text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
                  {step.module}
                </div>

                {/* Active Indicator */}
                {i === activeStep && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Detail */}
        <div className="mt-8 glass-card p-6 border border-white/10">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${flowSteps[activeStep].color} flex items-center justify-center text-2xl shrink-0 shadow-lg`}>
              {flowSteps[activeStep].actorIcon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500">الخطوة {activeStep + 1} من {flowSteps.length}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                  {flowSteps[activeStep].module}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{flowSteps[activeStep].title}</h3>
              <p className="text-gray-400 text-sm mb-2">
                <span className="text-white font-semibold">{flowSteps[activeStep].actor}</span>
                {' '}يقوم بـ: {flowSteps[activeStep].action}
              </p>
              <p className="text-emerald-300 text-sm font-semibold">
                النتيجة: {flowSteps[activeStep].result}
              </p>
            </div>
          </div>
        </div>

        {/* Integration Points */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { title: 'تكامل البيانات', desc: 'بيانات اللاعب تنتقل تلقائياً بين جميع الوحدات', icon: '🔗', color: 'text-blue-400' },
            { title: 'تكامل الصلاحيات', desc: 'كل دور يرى فقط ما يخصه بدون تداخل', icon: '🛡️', color: 'text-purple-400' },
            { title: 'تكامل التقارير', desc: 'تقارير شاملة تجمع بيانات جميع الوحدات', icon: '📊', color: 'text-emerald-400' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className={`text-3xl mb-2 ${item.color}`}>{item.icon}</div>
              <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
