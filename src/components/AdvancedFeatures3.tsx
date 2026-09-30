import { useState } from 'react';

// ============================================
// 🤝 نظام التسويق بالعمولة
// ============================================

export function AffiliateMarketing() {
  const [referralCode] = useState('SA-AHMED-2026');
  
  const referrals = [
    { id: 1, name: 'محمد خالد', status: 'completed', commission: 100, date: '2026-01-15' },
    { id: 2, name: 'يوسف أحمد', status: 'pending', commission: 100, date: '2026-01-18' },
    { id: 3, name: 'عمر طارق', status: 'completed', commission: 100, date: '2026-01-10' },
  ];

  const stats = {
    totalReferrals: 12,
    completed: 9,
    pending: 3,
    totalCommission: 900,
    pendingCommission: 300
  };

  return (
    <section id="affiliate" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤝 التسويق بالعمولة
          </h2>
          <p className="text-gray-400">اكسب 100 ج.م عن كل إحالة ناجحة</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-3xl font-black text-blue-400">{stats.totalReferrals}</div>
            <div className="text-gray-400 text-sm">إجمالي الإحالات</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-3xl font-black text-emerald-400">{stats.totalCommission} ج.م</div>
            <div className="text-gray-400 text-sm">الأرباح المكتسبة</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-2">⏳</div>
            <div className="text-3xl font-black text-amber-400">{stats.pendingCommission} ج.م</div>
            <div className="text-gray-400 text-sm">أرباح معلقة</div>
          </div>
        </div>

        <div className="glass-card p-6 mb-6">
          <h3 className="text-white font-bold text-lg mb-4">كود الإحالة الخاص بك</h3>
          <div className="glass-card-light p-4 flex items-center justify-between">
            <code className="text-emerald-400 font-mono text-lg">{referralCode}</code>
            <button className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm">
              📋 نسخ
            </button>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">سجل الإحالات</h3>
          <div className="space-y-3">
            {referrals.map((ref) => (
              <div key={ref.id} className="glass-card-light p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {ref.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{ref.name}</div>
                    <div className="text-gray-400 text-xs">{ref.date}</div>
                  </div>
                </div>
                <div className="text-left">
                  <div className={`font-bold ${ref.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    +{ref.commission} ج.م
                  </div>
                  <div className={`text-xs ${ref.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {ref.status === 'completed' ? '✓ مكتمل' : '⏳ معلق'}
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
// 🏅 نظام الشهادات الإلكترونية
// ============================================

export function ECertificates() {
  const certificates = [
    { id: 1, title: 'شهادة إتمام دورة كرة القدم', date: '2026-01-15', type: 'إتمام', grade: 'ممتاز' },
    { id: 2, title: 'شهادة المشاركة في البطولة', date: '2026-01-10', type: 'مشاركة', grade: 'المركز الأول' },
    { id: 3, title: 'شهادة التفوق الرياضي', date: '2025-12-20', type: 'تفوق', grade: 'A+' },
  ];

  return (
    <section id="e-certificates" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏅 الشهادات الإلكترونية
          </h2>
          <p className="text-gray-400">شهادات احترافية قابلة للتحميل والتحقق</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="absolute inset-0 border-4 border-amber-500/30 rounded-xl m-4" />
                <div className="text-center">
                  <div className="text-6xl mb-2">🏆</div>
                  <div className="text-amber-300 font-bold">شهادة</div>
                  <div className="text-white text-xs mt-1">{cert.type}</div>
                </div>
              </div>
              <h3 className="text-white font-bold mb-2">{cert.title}</h3>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-400">{cert.date}</span>
                <span className="text-amber-400 font-bold">{cert.grade}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm">
                  📥 تحميل PDF
                </button>
                <button className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm">
                  🔗 مشاركة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📰 نظام الأخبار والمدونة
// ============================================

export function NewsBlog() {
  const articles = [
    { id: 1, title: '10 نصائح لتحسين أداء اللاعبين', category: 'تدريب', date: '2026-01-20', readTime: '5 دقائق', icon: '⚽' },
    { id: 2, title: 'التغذية السليمة للرياضيين', category: 'صحة', date: '2026-01-18', readTime: '7 دقائق', icon: '🥗' },
    { id: 3, title: 'أهمية الإحماء قبل التمرين', category: 'صحة', date: '2026-01-15', readTime: '4 دقائق', icon: '🤸' },
    { id: 4, title: 'استعدادات البطولة القادمة', category: 'أخبار', date: '2026-01-12', readTime: '6 دقائق', icon: '🏆' },
  ];

  return (
    <section id="news-blog" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📰 الأخبار والمدونة
          </h2>
          <p className="text-gray-400">أحدث المقالات والأخبار الرياضية</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="glass-card p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <div className="text-6xl">{article.icon}</div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">{article.category}</span>
                <span className="text-gray-500 text-xs">⏱️ {article.readTime}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{article.title}</h3>
              <div className="text-gray-400 text-sm">{article.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📊 نظام الاستطلاعات
// ============================================

export function Surveys() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentSurvey = {
    title: 'استبيان رضا العملاء',
    description: 'ساعدنا على تحسين خدماتنا من خلال إجاباتك',
    questions: [
      {
        id: 1,
        question: 'ما مدى رضاك عن جودة التدريب؟',
        options: ['ممتاز جداً', 'جيد جداً', 'جيد', 'مقبول', 'ضعيف']
      }
    ]
  };

  return (
    <section id="surveys" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 الاستطلاعات
          </h2>
          <p className="text-gray-400">شاركنا رأيك وساعدنا على التحسن</p>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-white font-bold text-xl mb-2">{currentSurvey.title}</h3>
          <p className="text-gray-400 mb-6">{currentSurvey.description}</p>

          {currentSurvey.questions.map((q) => (
            <div key={q.id} className="mb-6">
              <h4 className="text-white font-bold mb-4">{q.question}</h4>
              <div className="space-y-2">
                {q.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    className={`w-full p-4 rounded-lg text-right transition-all ${
                      selectedAnswer === i
                        ? 'bg-gradient-to-l from-blue-500 to-purple-600 text-white'
                        : 'glass-card-light text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            disabled={selectedAnswer === null}
            className="w-full py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg disabled:opacity-50"
          >
            إرسال الإجابات
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📱 نظام البث المباشر المتقدم
// ============================================

export function AdvancedLiveStream() {
  const [isLive, setIsLive] = useState(true);

  return (
    <section id="advanced-stream" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📱 البث المباشر المتقدم
          </h2>
          <p className="text-gray-400">بث متعدد الكاميرات و360 درجة</p>
        </div>

        <div className="glass-card p-6">
          <div className="aspect-video bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
            {isLive && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            )}
            <div className="text-center">
              <div className="text-8xl mb-4">📹</div>
              <p className="text-white text-xl font-bold">بث مباشر</p>
              <p className="text-gray-400">تدريب ناشئين U10</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <button className="py-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-bold">
              📷 كاميرا 1
            </button>
            <button className="py-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-bold">
              📷 كاميرا 2
            </button>
            <button className="py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm font-bold">
              🔄 360°
            </button>
            <button className="py-3 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-300 text-sm font-bold">
              🎥 تسجيل
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">👥 234 مشاهد</span>
              <span className="text-gray-400">⏱️ 45:23</span>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg font-bold ${
                isLive ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
              }`}
            >
              {isLive ? '⏹️ إيقاف البث' : '▶️ بدء البث'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📈 نظام التحليلات التنبؤية
// ============================================

export function PredictiveAnalytics() {
  const predictions = [
    { metric: 'الأداء العام', current: 85, predicted: 92, confidence: 88, trend: 'up' },
    { metric: 'السرعة', current: 78, predicted: 85, confidence: 92, trend: 'up' },
    { metric: 'التحمل', current: 90, predicted: 95, confidence: 85, trend: 'up' },
    { metric: 'خطر الإصابة', current: 15, predicted: 8, confidence: 78, trend: 'down' },
  ];

  return (
    <section id="predictive" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📈 التحليلات التنبؤية
          </h2>
          <p className="text-gray-400">تنبؤات ذكية بناءً على البيانات</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {predictions.map((pred, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">{pred.metric}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  pred.trend === 'up' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {pred.trend === 'up' ? '↑ تحسن' : '↓ انخفاض'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="glass-card-light p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">الحالي</div>
                  <div className="text-xl font-bold text-white">{pred.current}</div>
                </div>
                <div className="glass-card-light p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">المتوقع</div>
                  <div className="text-xl font-bold text-blue-400">{pred.predicted}</div>
                </div>
                <div className="glass-card-light p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">الثقة</div>
                  <div className="text-xl font-bold text-purple-400">{pred.confidence}%</div>
                </div>
              </div>

              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-blue-500 to-purple-600 transition-all duration-1000"
                  style={{ width: `${pred.confidence}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎨 نظام التخصيص المتقدم
// ============================================

export function AdvancedCustomization() {
  const [theme, setTheme] = useState('dark');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [fontSize, setFontSize] = useState('medium');

  return (
    <section id="customization" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎨 التخصيص المتقدم
          </h2>
          <p className="text-gray-400">خصص واجهة التطبيق حسب ذوقك</p>
        </div>

        <div className="glass-card p-6 space-y-6">
          {/* Theme */}
          <div>
            <label className="text-white font-bold mb-3 block">🎨 المظهر</label>
            <div className="grid grid-cols-3 gap-3">
              {['dark', 'light', 'auto'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`py-3 rounded-lg font-bold transition-all ${
                    theme === t ? 'bg-blue-500 text-white' : 'glass-card-light text-gray-400'
                  }`}
                >
                  {t === 'dark' ? '🌙 داكن' : t === 'light' ? '☀️ فاتح' : '🔄 تلقائي'}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Color */}
          <div>
            <label className="text-white font-bold mb-3 block">🎨 اللون الأساسي</label>
            <div className="flex gap-3">
              {['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'].map((color) => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className={`w-12 h-12 rounded-xl transition-transform hover:scale-110 ${
                    primaryColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-white font-bold mb-3 block">📏 حجم الخط</label>
            <div className="grid grid-cols-3 gap-3">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`py-3 rounded-lg font-bold transition-all ${
                    fontSize === size ? 'bg-blue-500 text-white' : 'glass-card-light text-gray-400'
                  }`}
                >
                  {size === 'small' ? 'صغير' : size === 'medium' ? 'متوسط' : 'كبير'}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-3 bg-gradient-to-l from-blue-500 to-purple-600 text-white font-bold rounded-lg">
            💾 حفظ الإعدادات
          </button>
        </div>
      </div>
    </section>
  );
}
