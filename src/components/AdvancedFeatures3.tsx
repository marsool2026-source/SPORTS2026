import { useState } from 'react';

// ============================================
// 🏅 نظام الشهادات الإلكترونية
// ============================================
export function ECertificates() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const certificates = [
    { id: 1, title: 'شهادة إتمام دورة كرة القدم', player: 'أحمد محمد علي', date: '2026-01-15', level: 'ذهبي', hours: 40, signature: 'كابتن محمود أحمد' },
    { id: 2, title: 'شهادة بطل المنطقة 2025', player: 'محمد خالد حسن', date: '2025-12-20', level: 'بلاتيني', hours: 0, signature: 'المدير العام' },
    { id: 3, title: 'شهادة اللياقة البدنية', player: 'يوسف أحمد سعيد', date: '2026-01-10', level: 'فضي', hours: 30, signature: 'كابتن سارة علي' },
    { id: 4, title: 'شهادة المشاركة في البطولة', player: 'عمر طارق محمود', date: '2026-01-05', level: 'برونزي', hours: 0, signature: 'كابتن محمد حسن' },
  ];

  return (
    <section id="e-certificates" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">شهادات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏅 الشهادات الإلكترونية
          </h2>
          <p className="text-gray-400">شهادات احترافية قابلة للتحميل والتحقق</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert.id)}
              className="glass-card p-6 cursor-pointer hover:scale-105 transition-all"
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">🏅</div>
                <h3 className="text-white font-bold text-sm">{cert.title}</h3>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">اللاعب:</span>
                  <span className="text-white">{cert.player}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">التاريخ:</span>
                  <span className="text-white">{cert.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">المستوى:</span>
                  <span className="text-amber-400 font-bold">{cert.level}</span>
                </div>
                {cert.hours > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">الساعات:</span>
                    <span className="text-white">{cert.hours} ساعة</span>
                  </div>
                )}
              </div>
              <button className="w-full mt-4 py-2 bg-gradient-to-l from-amber-500 to-orange-600 text-white text-sm font-bold rounded-lg">
                📥 تحميل PDF
              </button>
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
  const [activeCategory, setActiveCategory] = useState<'all' | 'training' | 'health' | 'news'>('all');

  const articles = [
    { id: 1, title: '10 نصائح لتحسين أداء اللاعبين الناشئين', category: 'training', author: 'كابتن محمود', date: '2026-01-15', readTime: '5 دقائق', icon: '⚽', views: 1234 },
    { id: 2, title: 'التغذية السليمة للرياضيين الشباب', category: 'health', author: 'د. أحمد سعيد', date: '2026-01-10', readTime: '7 دقائق', icon: '🥗', views: 987 },
    { id: 3, title: 'أهمية الإحماء قبل التمرين', category: 'health', author: 'كابتن أحمد', date: '2026-01-05', readTime: '3 دقائق', icon: '🤸', views: 756 },
    { id: 4, title: 'أسرار النجاح في بطولات الناشئين', category: 'training', author: 'كابتن محمود', date: '2025-12-28', readTime: '6 دقائق', icon: '🏆', views: 1567 },
    { id: 5, title: 'دور ولي الأمر في دعم اللاعب', category: 'training', author: 'د. سارة علي', date: '2025-12-20', readTime: '5 دقائق', icon: '👨‍👩‍👧', views: 892 },
    { id: 6, title: 'إطلاق بطولة المنطقة الشتوية', category: 'news', author: 'الإدارة', date: '2026-01-18', readTime: '2 دقائق', icon: '📢', views: 2341 },
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <section id="news-blog" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-semibold">محتوى</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📰 الأخبار والمدونة
          </h2>
          <p className="text-gray-400">مقالات تدريبية ونصائح صحية وأخبار الأكاديمية</p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 justify-center">
          {[
            { id: 'all', label: '📋 الكل' },
            { id: 'training', label: '⚽ تدريب' },
            { id: 'health', label: '💚 صحة' },
            { id: 'news', label: '📢 أخبار' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-l from-green-500 to-emerald-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="glass-card overflow-hidden hover:scale-105 transition-all cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-6xl">
                {article.icon}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                    {article.category === 'training' ? 'تدريب' : article.category === 'health' ? 'صحة' : 'أخبار'}
                  </span>
                  <span className="text-gray-500 text-xs">{article.readTime}</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{article.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>✍️ {article.author}</span>
                  <span>👁️ {article.views}</span>
                </div>
                <div className="text-gray-500 text-xs mt-2">{article.date}</div>
              </div>
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
  const [selectedSurvey, setSelectedSurvey] = useState<number | null>(null);

  const surveys = [
    { id: 1, title: 'استطلاع رضا اللاعبين', description: 'شاركنا رأيك في خدمات الأكاديمية', questions: 10, responses: 234, deadline: '2026-02-01', status: 'active' },
    { id: 2, title: 'تقييم المدربين', description: 'قيم أداء مدربيك', questions: 8, responses: 189, deadline: '2026-01-31', status: 'active' },
    { id: 3, title: 'استطلاع الخدمات', description: 'ساعدنا في تحسين خدماتنا', questions: 12, responses: 156, deadline: '2026-02-15', status: 'active' },
    { id: 4, title: 'استطلاع المرافق', description: 'قيم مرافق الأكاديمية', questions: 15, responses: 312, deadline: '2026-01-20', status: 'completed' },
  ];

  return (
    <section id="surveys" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            <span className="text-indigo-300 text-xs font-semibold">استطلاعات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 نظام الاستطلاعات
          </h2>
          <p className="text-gray-400">شاركنا رأيك وساعدنا في التحسين</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {surveys.map((survey) => (
            <div
              key={survey.id}
              onClick={() => survey.status === 'active' && setSelectedSurvey(survey.id)}
              className={`glass-card p-6 ${survey.status === 'active' ? 'cursor-pointer hover:scale-105' : 'opacity-60'} transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">{survey.title}</h3>
                  <p className="text-gray-400 text-sm">{survey.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  survey.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/20 text-gray-300'
                }`}>
                  {survey.status === 'active' ? '✓ نشط' : '✓ مكتمل'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="glass-card-light p-3 text-center">
                  <div className="text-xl font-bold text-indigo-400">{survey.questions}</div>
                  <div className="text-gray-400 text-xs">أسئلة</div>
                </div>
                <div className="glass-card-light p-3 text-center">
                  <div className="text-xl font-bold text-purple-400">{survey.responses}</div>
                  <div className="text-gray-400 text-xs">مشارك</div>
                </div>
                <div className="glass-card-light p-3 text-center">
                  <div className="text-xl font-bold text-pink-400">{survey.deadline.split('-')[2]}</div>
                  <div className="text-gray-400 text-xs">يوم متبقي</div>
                </div>
              </div>

              {survey.status === 'active' && (
                <button className="w-full py-2.5 bg-gradient-to-l from-indigo-500 to-purple-600 text-white text-sm font-bold rounded-lg">
                  📝 ابدأ الاستطلاع
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📱 نظام البث المباشر المتقدم
// ============================================
export function AdvancedLiveStream() {
  const [activeStream, setActiveStream] = useState<number | null>(null);
  const [cameraAngle, setCameraAngle] = useState<'main' | 'side' | '360'>('main');

  const streams = [
    { id: 1, title: 'تدريب ناشئين U10', viewers: 245, duration: '01:23:45', cameras: 3, status: 'live', icon: '⚽' },
    { id: 2, title: 'بطولة كرة السلة', viewers: 567, duration: '02:15:30', cameras: 4, status: 'live', icon: '🏀' },
    { id: 3, title: 'تدريب سباحة', viewers: 123, duration: '00:45:20', cameras: 2, status: 'live', icon: '🏊' },
  ];

  return (
    <section id="advanced-livestream" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-300 text-xs font-semibold">بث متقدم</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📱 البث المباشر المتقدم
          </h2>
          <p className="text-gray-400">بث متعدد الكاميرات وزاوية 360 درجة</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {streams.map((stream) => (
            <div
              key={stream.id}
              onClick={() => setActiveStream(stream.id)}
              className={`glass-card overflow-hidden cursor-pointer transition-all ${
                activeStream === stream.id ? 'ring-2 ring-red-500/50' : ''
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-red-900/30 to-orange-900/30 flex items-center justify-center relative">
                <div className="text-6xl">{stream.icon}</div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  مباشر
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 backdrop-blur text-white text-xs rounded flex items-center gap-1">
                  👥 {stream.viewers}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold mb-2">{stream.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>📹 {stream.cameras} كاميرات</span>
                  <span>⏱️ {stream.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeStream && (
          <div className="glass-card p-6 mt-6">
            <h3 className="text-white font-bold text-lg mb-4">🎥 تحكم الكاميرا</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'main', label: '📷 الكاميرا الرئيسية' },
                { id: 'side', label: '📹 الكاميرا الجانبية' },
                { id: '360', label: '🔄 360 درجة' },
              ].map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setCameraAngle(cam.id as any)}
                  className={`py-3 rounded-lg text-sm font-bold transition-all ${
                    cameraAngle === cam.id
                      ? 'bg-gradient-to-l from-red-500 to-orange-600 text-white'
                      : 'glass-card-light text-gray-400 hover:text-white'
                  }`}
                >
                  {cam.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// 📈 نظام التحليلات التنبؤية
// ============================================
export function PredictiveAnalytics() {
  const predictions = [
    { id: 1, metric: 'الأداء العام', currentValue: 85, predictedValue: 92, confidence: 88, trend: 'up', timeframe: 'الشهر القادم' },
    { id: 2, metric: 'سرعة الجري', currentValue: 11.2, predictedValue: 10.8, confidence: 92, trend: 'down', timeframe: 'أسبوعين', unit: 'ثانية' },
    { id: 3, metric: 'خطر الإصابة', currentValue: 15, predictedValue: 8, confidence: 78, trend: 'down', timeframe: 'الشهر القادم', unit: '%' },
    { id: 4, metric: 'معدل الحضور', currentValue: 88, predictedValue: 95, confidence: 85, trend: 'up', timeframe: 'الشهر القادم', unit: '%' },
  ];

  return (
    <section id="predictive-analytics" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-xs font-semibold">تنبؤات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📈 التحليلات التنبؤية
          </h2>
          <p className="text-gray-400">تنبؤات ذكية بالأداء والإصابات</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {predictions.map((pred) => (
            <div key={pred.id} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">{pred.metric}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  pred.trend === 'up' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {pred.trend === 'up' ? '↑ تحسن' : '↓ انخفاض'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="glass-card-light p-3 text-center">
                  <div className="text-gray-400 text-xs mb-1">الحالي</div>
                  <div className="text-2xl font-bold text-white">
                    {pred.currentValue}{pred.unit || ''}
                  </div>
                </div>
                <div className="glass-card-light p-3 text-center">
                  <div className="text-gray-400 text-xs mb-1">المتوقع</div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {pred.predictedValue}{pred.unit || ''}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">نسبة الثقة</span>
                  <span className="text-cyan-400 font-bold">{pred.confidence}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-cyan-500 to-blue-600"
                    style={{ width: `${pred.confidence}%` }}
                  />
                </div>
                <div className="text-gray-500 text-xs">⏱️ {pred.timeframe}</div>
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
  const [layout, setLayout] = useState('grid');
  const [fontSize, setFontSize] = useState('medium');

  const themes = [
    { id: 'dark', name: 'داكن', icon: '🌙' },
    { id: 'light', name: 'فاتح', icon: '☀️' },
    { id: 'auto', name: 'تلقائي', icon: '💻' },
  ];

  const colors = [
    { id: '#3B82F6', name: 'أزرق' },
    { id: '#8B5CF6', name: 'بنفسجي' },
    { id: '#EC4899', name: 'وردي' },
    { id: '#10B981', name: 'أخضر' },
    { id: '#F59E0B', name: 'برتقالي' },
    { id: '#EF4444', name: 'أحمر' },
  ];

  const layouts = [
    { id: 'grid', name: 'شبكة', icon: '🔲' },
    { id: 'list', name: 'قائمة', icon: '📋' },
    { id: 'compact', name: 'مضغوط', icon: '📦' },
  ];

  const fontSizes = [
    { id: 'small', name: 'صغير' },
    { id: 'medium', name: 'متوسط' },
    { id: 'large', name: 'كبير' },
  ];

  return (
    <section id="advanced-customization" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">تخصيص</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎨 التخصيص المتقدم
          </h2>
          <p className="text-gray-400">خصص الواجهة حسب تفضيلاتك</p>
        </div>

        <div className="space-y-6">
          {/* Theme Selection */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🌓 المظهر</h3>
            <div className="grid grid-cols-3 gap-3">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-4 rounded-lg text-center transition-all ${
                    theme === t.id
                      ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white'
                      : 'glass-card-light text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="text-3xl mb-2">{t.icon}</div>
                  <div className="text-sm font-bold">{t.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Color */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🎨 اللون الأساسي</h3>
            <div className="grid grid-cols-6 gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setPrimaryColor(color.id)}
                  className={`aspect-square rounded-lg transition-all ${
                    primaryColor === color.id ? 'ring-4 ring-white/50 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color.id }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Layout */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📐 التخطيط</h3>
            <div className="grid grid-cols-3 gap-3">
              {layouts.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLayout(l.id)}
                  className={`p-4 rounded-lg text-center transition-all ${
                    layout === l.id
                      ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white'
                      : 'glass-card-light text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="text-3xl mb-2">{l.icon}</div>
                  <div className="text-sm font-bold">{l.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🔤 حجم الخط</h3>
            <div className="grid grid-cols-3 gap-3">
              {fontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setFontSize(size.id)}
                  className={`p-4 rounded-lg text-center transition-all ${
                    fontSize === size.id
                      ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white'
                      : 'glass-card-light text-gray-400 hover:text-white'
                  }`}
                >
                  <div className={`font-bold ${
                    size.id === 'small' ? 'text-sm' : size.id === 'medium' ? 'text-base' : 'text-lg'
                  }`}>
                    {size.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full py-4 bg-gradient-to-l from-pink-500 to-rose-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
            💾 حفظ الإعدادات
          </button>
        </div>
      </div>
    </section>
  );
}
