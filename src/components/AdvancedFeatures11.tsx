import { useState } from 'react';

// ============================================
// 📝 نظام المحتوى التلقائي
// ============================================
export function AutoContent() {
  const [contentType, setContentType] = useState<'article' | 'tip' | 'news' | 'social'>('article');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const contentTemplates = {
    article: [
      '10 نصائح لتحسين أداء اللاعبين الناشئين',
      'كيف تختار الحذاء الرياضي المناسب؟',
      'أهمية الإحماء قبل التمرين',
      'أسرار النجاح في بطولات الناشئين',
    ],
    tip: [
      'اشرب الماء قبل وبعد التمرين',
      'خذ قسطاً كافياً من النوم',
      'لا تتجاهل تمارين الإطالة',
      'تناول وجبة متوازنة قبل التدريب',
    ],
    news: [
      'إطلاق بطولة المنطقة الشتوية',
      'انضمام مدرب جديد للأكاديمية',
      'افتتاح ملعب جديد',
      'تحديث نظام الحضور',
    ],
    social: [
      '🏆 تهانينا لأبطالنا في البطولة!',
      '⚽ تدريب ممتع اليوم مع الفريق',
      '💪 تحدي جديد للاعبينا',
      '🎯 هدف الشهر: تحسين الأداء بنسبة 20%',
    ],
  };

  const generateContent = () => {
    setGenerating(true);
    setTimeout(() => {
      const templates = contentTemplates[contentType];
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      setGeneratedContent(randomTemplate);
      setGenerating(false);
    }, 2000);
  };

  const generatedPosts = [
    { id: 1, type: 'مقال', title: '10 نصائح لتحسين الأداء', status: 'published', views: 1234, date: '2026-01-20' },
    { id: 2, type: 'نصيحة', title: 'أهمية الإحماء', status: 'published', views: 876, date: '2026-01-19' },
    { id: 3, type: 'خبر', title: 'بطولة المنطقة الشتوية', status: 'scheduled', views: 0, date: '2026-01-25' },
    { id: 4, type: 'سوشيال', title: 'تهانينا لأبطالنا', status: 'published', views: 2341, date: '2026-01-18' },
  ];

  return (
    <section id="auto-content" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-violet-300 text-xs font-semibold">Auto Content</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📝 نظام المحتوى التلقائي
          </h2>
          <p className="text-gray-400">إنشاء محتوى تلقائي بالذكاء الاصطناعي</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Content Generator */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">✨ مولد المحتوى</h3>
            
            {/* Content Type */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { id: 'article', label: '📝 مقالات', color: 'from-blue-500 to-cyan-500' },
                { id: 'tip', label: '💡 نصائح', color: 'from-emerald-500 to-teal-500' },
                { id: 'news', label: '📰 أخبار', color: 'from-amber-500 to-orange-500' },
                { id: 'social', label: '📱 سوشيال', color: 'from-purple-500 to-violet-500' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id as any)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    contentType === type.id
                      ? `bg-gradient-to-br ${type.color} text-white`
                      : 'glass-card-light text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.label.split(' ')[0]}</div>
                  <div className="text-xs font-bold">{type.label.split(' ')[1]}</div>
                </button>
              ))}
            </div>

            {/* Generate Button */}
            <button
              onClick={generateContent}
              disabled={generating}
              className="w-full py-3 bg-gradient-to-l from-violet-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 mb-4"
            >
              {generating ? '🤖 جاري الإنشاء...' : '✨ إنشاء محتوى'}
            </button>

            {/* Generated Content */}
            {generatedContent && (
              <div className="glass-card-light p-4">
                <div className="text-gray-400 text-xs mb-2">المحتوى المُنشأ:</div>
                <div className="text-white font-bold">{generatedContent}</div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm">
                    ✓ نشر
                  </button>
                  <button className="flex-1 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm">
                    📅 جدولة
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content History */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📋 المحتوى المُنشأ</h3>
            <div className="space-y-3">
              {generatedPosts.map((post) => (
                <div key={post.id} className="glass-card-light p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full">
                        {post.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {post.status === 'published' ? '✓ منشور' : '⏰ مجدول'}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs">{post.date}</span>
                  </div>
                  <div className="text-white font-bold text-sm mb-1">{post.title}</div>
                  {post.views > 0 && (
                    <div className="text-gray-400 text-xs">👁️ {post.views} مشاهدة</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🏢 نظام B2B للأكاديميات الأخرى
// ============================================
export function B2BSystem() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'الباقة الأساسية',
      price: 2000,
      period: 'شهرياً',
      features: ['50 لاعب', '3 مدربين', 'ملعب واحد', 'دعم فني أساسي', 'تقارير شهرية'],
      color: 'from-blue-500 to-cyan-500',
      popular: false,
    },
    {
      id: 'professional',
      name: 'الباقة الاحترافية',
      price: 5000,
      period: 'شهرياً',
      features: ['200 لاعب', '10 مدربين', '3 ملاعب', 'دعم فني متقدم', 'تقارير أسبوعية', 'تخصيص الواجهة', 'API كامل'],
      color: 'from-purple-500 to-violet-500',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'باقة المؤسسات',
      price: 10000,
      period: 'شهرياً',
      features: ['لاعبين غير محدود', 'مدربين غير محدود', 'ملاعب غير محدودة', 'دعم فني 24/7', 'تقارير يومية', 'تخصيص كامل', 'API + SDK', 'مدير حساب خاص'],
      color: 'from-amber-500 to-orange-500',
      popular: false,
    },
  ];

  const currentClients = [
    { id: 1, name: 'أكاديمية الأبطال', plan: 'professional', players: 150, revenue: 5000, status: 'active' },
    { id: 2, name: 'نادي النخبة', plan: 'enterprise', players: 300, revenue: 10000, status: 'active' },
    { id: 3, name: 'مركز التفوق', plan: 'starter', players: 45, revenue: 2000, status: 'active' },
    { id: 4, name: 'أكاديمية المستقبل', plan: 'professional', players: 180, revenue: 5000, status: 'trial' },
  ];

  const totalRevenue = currentClients.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <section id="b2b" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            <span className="text-indigo-300 text-xs font-semibold">B2B Platform</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏢 نظام B2B للأكاديميات
          </h2>
          <p className="text-gray-400">بيع النظام لأكاديميات أخرى وتحقيق إيرادات إضافية</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🏢</div>
            <div className="text-2xl font-black text-indigo-400">{currentClients.length}</div>
            <div className="text-gray-400 text-xs">عميل B2B</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-black text-emerald-400">{totalRevenue.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">إيرادات شهرية (ج.م)</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-black text-blue-400">{currentClients.reduce((s, c) => s + c.players, 0)}</div>
            <div className="text-gray-400 text-xs">لاعب في المنصة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-black text-amber-400">+35%</div>
            <div className="text-gray-400 text-xs">نمو شهري</div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`glass-card p-6 relative cursor-pointer transition-all ${
                selectedPlan === plan.id ? 'ring-2 ring-indigo-500/50 scale-105' : 'hover:scale-105'
              } ${plan.popular ? 'border-2 border-indigo-500/30' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-l from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-full">
                  ⭐ الأكثر شعبية
                </div>
              )}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-2xl mb-4`}>
                🏢
              </div>
              <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
              <div className="text-3xl font-black text-white mb-1">
                {plan.price.toLocaleString()} <span className="text-sm text-gray-400">ج.م</span>
              </div>
              <div className="text-gray-400 text-sm mb-4">/{plan.period}</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="text-emerald-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                plan.popular
                  ? 'bg-gradient-to-l from-indigo-500 to-purple-600 text-white'
                  : 'glass-card-light text-white hover:bg-white/10'
              }`}>
                اشترك الآن
              </button>
            </div>
          ))}
        </div>

        {/* Current Clients */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">🏢 العملاء الحاليون</h3>
          <div className="space-y-3">
            {currentClients.map((client) => (
              <div key={client.id} className="glass-card-light p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl">
                    🏢
                  </div>
                  <div>
                    <div className="text-white font-bold">{client.name}</div>
                    <div className="text-gray-400 text-xs">
                      {client.plan === 'starter' ? 'الأساسية' : client.plan === 'professional' ? 'الاحترافية' : 'المؤسسات'} • {client.players} لاعب
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-emerald-400 font-bold">{client.revenue.toLocaleString()} ج.م</div>
                  <div className={`text-xs ${client.status === 'active' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {client.status === 'active' ? '✓ نشط' : '⏳ تجريبي'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📱 تطبيق الموبايل (PWA Info)
// ============================================
export function MobileAppInfo() {
  const [installPrompt, setInstallPrompt] = useState(false);

  const features = [
    { icon: '📱', title: 'تثبيت على الشاشة', desc: 'يعمل كتطبيق أصلي' },
    { icon: '📡', title: 'يعمل بدون إنترنت', desc: 'Offline Mode كامل' },
    { icon: '🔔', title: 'إشعارات Push', desc: 'تنبيهات فورية' },
    { icon: '⚡', title: 'سرعة فائقة', desc: 'تحميل < 1 ثانية' },
    { icon: '🔒', title: 'أمان عالي', desc: 'تشفير كامل' },
    { icon: '🎨', title: 'تصميم متجاوب', desc: 'يعمل على جميع الأجهزة' },
  ];

  const installSteps = [
    {
      platform: 'Android',
      icon: '🤖',
      steps: [
        'افتح الموقع في Chrome',
        'اضغط على ⋮ (القائمة)',
        'اختر "إضافة إلى الشاشة الرئيسية"',
        'اضغط "إضافة"',
      ],
    },
    {
      platform: 'iOS',
      icon: '🍎',
      steps: [
        'افتح الموقع في Safari',
        'اضغط على ⬆️ (زر المشاركة)',
        'اختر "إضافة إلى الشاشة الرئيسية"',
        'اضغط "إضافة"',
      ],
    },
    {
      platform: 'Desktop',
      icon: '💻',
      steps: [
        'افتح الموقع في Chrome/Edge',
        'اضغط على أيقونة التثبيت في شريط العنوان',
        'اضغط "تثبيت"',
        'التطبيق جاهز!',
      ],
    },
  ];

  return (
    <section id="mobile-app" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">PWA</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📱 تطبيق الموبايل (PWA)
          </h2>
          <p className="text-gray-400">تطبيق Progressive Web App يعمل على جميع الأجهزة</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {features.map((feature, i) => (
            <div key={i} className="glass-card p-5 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-bold mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Install Guide */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4">📲 كيفية التثبيت</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {installSteps.map((platform, i) => (
              <div key={i} className="glass-card-light p-4">
                <div className="text-3xl mb-3 text-center">{platform.icon}</div>
                <h4 className="text-white font-bold text-center mb-3">{platform.platform}</h4>
                <ol className="space-y-2">
                  {platform.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-pink-400 font-bold">{j + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Install Button */}
        <div className="glass-card p-6 text-center">
          <div className="text-5xl mb-4">📱</div>
          <h3 className="text-white font-bold text-xl mb-2">ثبّت التطبيق الآن!</h3>
          <p className="text-gray-400 mb-4">استمتع بتجربة تطبيق أصلي على جهازك</p>
          <button
            onClick={() => setInstallPrompt(true)}
            className="px-8 py-4 bg-gradient-to-l from-pink-500 to-rose-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity"
          >
            📲 تثبيت التطبيق
          </button>
          {installPrompt && (
            <div className="mt-4 text-emerald-400 font-bold">
              ✓ اتبع التعليمات أعلاه لتثبيت التطبيق
            </div>
          )}
        </div>

        {/* Technical Details */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-white font-bold text-lg mb-4">🔧 التفاصيل التقنية</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card-light p-4">
              <div className="text-pink-400 font-bold mb-2">Service Worker</div>
              <div className="text-gray-300 text-sm">✅ مسجل وفعال</div>
              <div className="text-gray-400 text-xs mt-1">يعمل بدون إنترنت</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-pink-400 font-bold mb-2">Manifest</div>
              <div className="text-gray-300 text-sm">✅ كامل ومحدّث</div>
              <div className="text-gray-400 text-xs mt-1">أيقونات + ألوان + اسم</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-pink-400 font-bold mb-2">Cache Strategy</div>
              <div className="text-gray-300 text-sm">✅ Network First</div>
              <div className="text-gray-400 text-xs mt-1">أحدث المحتوى دائماً</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-pink-400 font-bold mb-2">Push Notifications</div>
              <div className="text-gray-300 text-sm">✅ جاهز للتفعيل</div>
              <div className="text-gray-400 text-xs mt-1">إشعارات فورية</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
