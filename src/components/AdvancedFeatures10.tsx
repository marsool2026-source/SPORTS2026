import { useState, useEffect } from 'react';

// ============================================
// 📊 نظام تحليلات المستخدمين
// ============================================
export function UserAnalytics() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [analytics, setAnalytics] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    newUsers: 156,
    retentionRate: 78.5,
    avgSessionTime: 12.4,
    bounceRate: 23.1,
    conversionRate: 15.8,
    topPages: [
      { page: 'الرئيسية', views: 4521, percentage: 32 },
      { page: 'الباقات', views: 3245, percentage: 23 },
      { page: 'المدربين', views: 2134, percentage: 15 },
      { page: 'البطولات', views: 1876, percentage: 13 },
      { page: 'اللاعبين', views: 1234, percentage: 9 },
    ],
    userBehavior: [
      { action: 'تسجيل جديد', count: 156, trend: '+23%' },
      { action: 'دفع اشتراك', count: 89, trend: '+15%' },
      { action: 'حضور تدريب', count: 423, trend: '+8%' },
      { action: 'مشاهدة بث', count: 267, trend: '+45%' },
      { action: 'مشاركة إنجاز', count: 134, trend: '+12%' },
    ],
    deviceStats: [
      { device: '📱 موبايل', percentage: 68, color: 'from-blue-500 to-cyan-500' },
      { device: '💻 سطح المكتب', percentage: 24, color: 'from-purple-500 to-violet-500' },
      { device: '📟 تابلت', percentage: 8, color: 'from-amber-500 to-orange-500' },
    ],
  });

  return (
    <section id="user-analytics" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">Analytics</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 تحليلات المستخدمين
          </h2>
          <p className="text-gray-400">فهم سلوك المستخدمين وتحسين التجربة</p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'day', label: '📅 اليوم' },
            { id: 'week', label: '📆 الأسبوع' },
            { id: 'month', label: '🗓️ الشهر' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id as any)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                period === p.id
                  ? 'bg-gradient-to-l from-blue-500 to-cyan-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-black text-blue-400">{analytics.totalUsers}</div>
            <div className="text-gray-400 text-xs">إجمالي المستخدمين</div>
          </div>
          <div className="glass-card p-5 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-black text-emerald-400">{analytics.activeUsers}</div>
            <div className="text-gray-400 text-xs">المستخدمون النشطون</div>
          </div>
          <div className="glass-card p-5 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">🆕</div>
            <div className="text-2xl font-black text-purple-400">{analytics.newUsers}</div>
            <div className="text-gray-400 text-xs">المستخدمون الجدد</div>
          </div>
          <div className="glass-card p-5 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-black text-amber-400">{analytics.retentionRate}%</div>
            <div className="text-gray-400 text-xs">معدل الاحتفاظ</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Top Pages */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📄 أكثر الصفحات زيارة</h3>
            <div className="space-y-3">
              {analytics.topPages.map((page, i) => (
                <div key={i} className="glass-card-light p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">{page.page}</div>
                    <div className="text-gray-400 text-xs">{page.views.toLocaleString()} زيارة</div>
                  </div>
                  <div className="text-blue-400 font-bold text-sm">{page.percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* User Behavior */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🎯 سلوك المستخدمين</h3>
            <div className="space-y-3">
              {analytics.userBehavior.map((behavior, i) => (
                <div key={i} className="glass-card-light p-3 flex items-center justify-between">
                  <div className="text-white text-sm font-semibold">{behavior.action}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm">{behavior.count}</span>
                    <span className="text-emerald-400 text-xs font-bold">{behavior.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Stats */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📱 الأجهزة المستخدمة</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {analytics.deviceStats.map((device, i) => (
              <div key={i} className="glass-card-light p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">{device.device}</span>
                  <span className="text-blue-400 text-sm font-bold">{device.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-l ${device.color}`}
                    style={{ width: `${device.percentage}%` }}
                  />
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
// 🎧 نظام الدعم الفني التلقائي
// ============================================
export function AutoSupport() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'مرحباً! كيف يمكنني مساعدتك اليوم؟', time: 'الآن' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tickets, setTickets] = useState([
    { id: 1, subject: 'مشكلة في الدفع', status: 'open', priority: 'high', date: '2026-01-20' },
    { id: 2, subject: 'استفسار عن الباقات', status: 'resolved', priority: 'medium', date: '2026-01-19' },
    { id: 3, subject: 'طلب تغيير موعد', status: 'open', priority: 'low', date: '2026-01-18' },
  ]);

  const botResponses: Record<string, string> = {
    'دفع': 'يمكنك الدفع عبر فودافون كاش أو اتصالات كاش أو Orange Cash. هل تريد مساعدة في عملية الدفع؟',
    'باقة': 'لدينا 3 باقات: الأساسية (500 ج.م)، المتقدمة (800 ج.م)، والاحترافية (1200 ج.م). أي باقة تهمك؟',
    'موعد': 'يمكنك تغيير موعد التدريب من خلال قسم الجدولة. هل تريد المساعدة في حجز موعد جديد؟',
    'مشكلة': 'أعتذر عن المشكلة. سأقوم بإنشاء تذكرة دعم لحلها في أقرب وقت. هل يمكنك وصف المشكلة بالتفصيل؟',
    'شكوى': 'نأسف لسماع ذلك. سأقوم بتصعيد شكواك للإدارة المختصة. هل يمكنك إعطائي المزيد من التفاصيل؟',
  };

  const getResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerQuery.includes(key)) return response;
    }
    return 'شكراً لتواصلك. سأقوم بإنشاء تذكرة دعم وسيتم الرد عليك خلال 24 ساعة. هل يمكنني مساعدتك في شيء آخر؟';
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input, time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: getResponse(input), time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <section id="auto-support" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">Auto Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎧 الدعم الفني التلقائي
          </h2>
          <p className="text-gray-400">Chatbot ذكي + نظام تذاكر دعم</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Chatbot */}
          <div className="glass-card overflow-hidden">
            <div className="bg-gradient-to-l from-emerald-600 to-teal-600 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🤖</div>
              <div className="flex-1">
                <div className="text-white font-bold">المساعد الذكي</div>
                <div className="text-white/70 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                  متصل الآن
                </div>
              </div>
            </div>
            <div className="h-[400px] overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white'
                      : 'bg-white/5 border border-white/10 text-gray-200'
                  }`}>
                    <div className="text-sm">{msg.text}</div>
                    <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-emerald-200' : 'text-gray-500'}`}>{msg.time}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="اكتب سؤالك..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
              />
              <button onClick={sendMessage} className="px-4 py-2 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg">➤</button>
            </div>
          </div>

          {/* Tickets */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🎫 تذاكر الدعم</h3>
            <div className="space-y-3 mb-6">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="glass-card-light p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-bold text-sm">{ticket.subject}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      ticket.status === 'open' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {ticket.status === 'open' ? '⏳ مفتوحة' : '✓ محلولة'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>الأولوية: <span className={ticket.priority === 'high' ? 'text-red-400' : ticket.priority === 'medium' ? 'text-amber-400' : 'text-gray-400'}>
                      {ticket.priority === 'high' ? 'عالية' : ticket.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                    </span></span>
                    <span>{ticket.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg">
              🎫 إنشاء تذكرة جديدة
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 💬 نظام التغذية الراجعة
// ============================================
export function FeedbackSystem() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setFeedback('');
    }, 3000);
  };

  const feedbackStats = [
    { category: 'التدريب', rating: 4.8, count: 234 },
    { category: 'المدربين', rating: 4.9, count: 189 },
    { category: 'المرافق', rating: 4.6, count: 156 },
    { category: 'الدعم الفني', rating: 4.7, count: 98 },
    { category: 'التطبيق', rating: 4.5, count: 312 },
  ];

  return (
    <section id="feedback" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">Feedback</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💬 نظام التغذية الراجعة
          </h2>
          <p className="text-gray-400">شاركنا رأيك وساعدنا في التحسين</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Feedback Form */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">✍️ أرسل ملاحظاتك</h3>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h4 className="text-white font-bold text-xl mb-2">شكراً لملاحظاتك!</h4>
                <p className="text-gray-400">سنعمل على تحسين تجربتك</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">الفئة</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                  >
                    <option value="general" className="bg-gray-900">عام</option>
                    <option value="training" className="bg-gray-900">التدريب</option>
                    <option value="coaches" className="bg-gray-900">المدربين</option>
                    <option value="facilities" className="bg-gray-900">المرافق</option>
                    <option value="support" className="bg-gray-900">الدعم الفني</option>
                    <option value="app" className="bg-gray-900">التطبيق</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">التقييم</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="text-3xl transition-transform hover:scale-110"
                      >
                        {star <= (hoverRating || rating) ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">ملاحظاتك</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="اكتب ملاحظاتك هنا..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500/50 resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  className="w-full py-3 bg-gradient-to-l from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  📤 إرسال الملاحظات
                </button>
              </div>
            )}
          </div>

          {/* Feedback Stats */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📊 إحصائيات التقييمات</h3>
            <div className="space-y-4">
              {feedbackStats.map((stat, i) => (
                <div key={i} className="glass-card-light p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold">{stat.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">{stat.rating}</span>
                      <span className="text-amber-400">⭐</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-l from-amber-500 to-orange-600"
                        style={{ width: `${(stat.rating / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-xs">{stat.count} تقييم</span>
                  </div>
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
// 🤝 نظام الإحالات المتقدم
// ============================================
export function AdvancedReferral() {
  const [referralCode] = useState('SA2026-AHMED-XYZ');
  const [copied, setCopied] = useState(false);
  const [level, setLevel] = useState(1);

  const referralStats = {
    totalReferrals: 45,
    level1: 23,
    level2: 15,
    level3: 7,
    totalEarnings: 4500,
    pendingEarnings: 800,
    conversionRate: 78,
  };

  const referralHistory = [
    { id: 1, name: 'محمد خالد', level: 1, status: 'converted', earnings: 100, date: '2026-01-15' },
    { id: 2, name: 'يوسف أحمد', level: 1, status: 'converted', earnings: 100, date: '2026-01-14' },
    { id: 3, name: 'عمر طارق', level: 2, status: 'converted', earnings: 50, date: '2026-01-13' },
    { id: 4, name: 'كريم حسام', level: 1, status: 'pending', earnings: 0, date: '2026-01-12' },
    { id: 5, name: 'زياد إبراهيم', level: 3, status: 'converted', earnings: 25, date: '2026-01-11' },
  ];

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="advanced-referral" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-semibold">Multi-Level Referral</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤝 نظام الإحالات المتقدم
          </h2>
          <p className="text-gray-400">برنامج إحالات متعدد المستويات مع مكافآت تصاعدية</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-black text-blue-400">{referralStats.totalReferrals}</div>
            <div className="text-gray-400 text-xs">إجمالي الإحالات</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-black text-emerald-400">{referralStats.totalEarnings} ج.م</div>
            <div className="text-gray-400 text-xs">الأرباح الكلية</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-black text-purple-400">{referralStats.conversionRate}%</div>
            <div className="text-gray-400 text-xs">معدل التحويل</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">⏳</div>
            <div className="text-2xl font-black text-amber-400">{referralStats.pendingEarnings} ج.م</div>
            <div className="text-gray-400 text-xs">أرباح معلقة</div>
          </div>
        </div>

        {/* Referral Levels */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4">🎯 مستويات الإحالات</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { level: 1, name: 'المستوى الأول', reward: '100 ج.م', referrals: referralStats.level1, color: 'from-blue-500 to-cyan-500' },
              { level: 2, name: 'المستوى الثاني', reward: '50 ج.م', referrals: referralStats.level2, color: 'from-purple-500 to-violet-500' },
              { level: 3, name: 'المستوى الثالث', reward: '25 ج.م', referrals: referralStats.level3, color: 'from-amber-500 to-orange-500' },
            ].map((lvl) => (
              <div key={lvl.level} className={`glass-card-light p-5 border-2 ${level === lvl.level ? 'border-blue-500/50' : 'border-transparent'}`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lvl.color} flex items-center justify-center text-white font-bold text-xl mb-3`}>
                  {lvl.level}
                </div>
                <h4 className="text-white font-bold mb-1">{lvl.name}</h4>
                <div className="text-emerald-400 font-bold text-lg mb-2">{lvl.reward}</div>
                <div className="text-gray-400 text-sm">{lvl.referrals} إحالة</div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Code */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4">🔗 كود الإحالة الخاص بك</h3>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-emerald-400">
              {referralCode}
            </div>
            <button
              onClick={copyCode}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                copied ? 'bg-emerald-500 text-white' : 'bg-gradient-to-l from-green-500 to-emerald-600 text-white'
              }`}
            >
              {copied ? '✓ تم النسخ' : '📋 نسخ'}
            </button>
          </div>
        </div>

        {/* Referral History */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📊 سجل الإحالات</h3>
          <div className="space-y-3">
            {referralHistory.map((referral) => (
              <div key={referral.id} className="glass-card-light p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    referral.status === 'converted' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}>
                    {referral.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{referral.name}</div>
                    <div className="text-gray-400 text-xs">المستوى {referral.level} • {referral.date}</div>
                  </div>
                </div>
                <div className="text-left">
                  <div className={`text-sm font-bold ${
                    referral.status === 'converted' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {referral.status === 'converted' ? `+${referral.earnings} ج.م` : 'معلق'}
                  </div>
                  <div className={`text-xs ${
                    referral.status === 'converted' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {referral.status === 'converted' ? '✓ محول' : '⏳ معلق'}
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
