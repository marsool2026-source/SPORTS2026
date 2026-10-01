import { useState } from 'react';

// ============================================
// 🏟️ نظام حجز المرافق المتقدم
// ============================================
export function FacilityBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  const facilities = [
    { id: 'field1', name: 'الملعب الرئيسي', type: 'ملعب كرة قدم', capacity: 22, price: 200, available: true },
    { id: 'field2', name: 'الملعب الثانوي', type: 'ملعب كرة قدم', capacity: 14, price: 150, available: true },
    { id: 'court1', name: 'ملعب كرة السلة', type: 'ملعب داخلي', capacity: 10, price: 100, available: true },
    { id: 'pool1', name: 'المسبح الأولمبي', type: 'مسبح', capacity: 8, price: 120, available: false },
    { id: 'gym1', name: 'صالة اللياقة', type: 'صالة رياضية', capacity: 30, price: 80, available: true },
    { id: 'track1', name: 'مضمار الجري', type: 'مضمار', capacity: 20, price: 60, available: true },
  ];

  const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  return (
    <section id="facility-booking" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">حجز متقدم</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏟️ حجز المرافق
          </h2>
          <p className="text-gray-400">احجز الملاعب والصالات والمسابح بسهولة</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Facilities List */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-white font-bold text-lg mb-4">المرافق المتاحة</h3>
            {facilities.map((facility) => (
              <div
                key={facility.id}
                onClick={() => facility.available && setSelectedFacility(facility.id)}
                className={`glass-card p-4 cursor-pointer transition-all ${
                  selectedFacility === facility.id ? 'ring-2 ring-emerald-500/50' : ''
                } ${!facility.available ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-bold text-sm">{facility.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    facility.available ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {facility.available ? 'متاح' : 'محجوز'}
                  </span>
                </div>
                <div className="text-gray-400 text-xs mb-2">{facility.type}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">السعة: {facility.capacity}</span>
                  <span className="text-emerald-400 font-bold">{facility.price} ج.م/ساعة</span>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <div className="md:col-span-2 glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">حجز المرفق</h3>
            
            {selectedFacility ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">التاريخ</label>
                  <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">الوقت</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        className="py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">المدة</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white">
                    <option value="1">ساعة واحدة</option>
                    <option value="2">ساعتان</option>
                    <option value="3">3 ساعات</option>
                  </select>
                </div>

                <div className="glass-card-light p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">السعر الإجمالي:</span>
                    <span className="text-emerald-400 font-bold text-lg">200 ج.م</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                  تأكيد الحجز
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-50">🏟️</div>
                <p className="text-gray-400">اختر مرفقاً من القائمة لبدء الحجز</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ⭐ نظام التقييمات والمراجعات
// ============================================
export function ReviewsRatings() {
  const [activeTab, setActiveTab] = useState<'coaches' | 'facilities' | 'services'>('coaches');

  const reviews = {
    coaches: [
      { id: 1, name: 'كابتن محمود أحمد', rating: 4.9, reviews: 127, comment: 'مدرب محترف جداً، يشرح بطريقة مبسطة' },
      { id: 2, name: 'كابتن سارة علي', rating: 4.8, reviews: 98, comment: 'ممتازة في التدريب ومراقبة اللاعبين' },
      { id: 3, name: 'كابتن محمد حسن', rating: 4.9, reviews: 115, comment: 'خبير في السباحة وأساليبه فعالة' },
    ],
    facilities: [
      { id: 1, name: 'الملعب الرئيسي', rating: 4.7, reviews: 234, comment: 'ملعب ممتاز وصيانته جيدة' },
      { id: 2, name: 'صالة اللياقة', rating: 4.5, reviews: 189, comment: 'معدات حديثة ونظيفة' },
      { id: 3, name: 'المسبح', rating: 4.8, reviews: 156, comment: 'نظيف ومنظم بشكل ممتاز' },
    ],
    services: [
      { id: 1, name: 'خدمة النقل', rating: 4.6, reviews: 87, comment: 'سائقين محترفين ومواعيد دقيقة' },
      { id: 2, name: 'المتجر', rating: 4.4, reviews: 112, comment: 'منتجات جيدة وأسعار معقولة' },
      { id: 3, name: 'الدعم الفني', rating: 4.9, reviews: 203, comment: 'استجابة سريعة وحلول فعالة' },
    ],
  };

  const currentReviews = reviews[activeTab];

  return (
    <section id="reviews-ratings" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">تقييمات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ⭐ التقييمات والمراجعات
          </h2>
          <p className="text-gray-400">آراء اللاعبين وأولياء الأمور</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          {[
            { id: 'coaches', label: '👨‍🏫 المدربين' },
            { id: 'facilities', label: '🏟️ المرافق' },
            { id: 'services', label: '🛎️ الخدمات' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-amber-500 to-orange-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {currentReviews.map((review) => (
            <div key={review.id} className="glass-card p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold">{review.name}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-amber-400 font-bold">{review.rating}</span>
                  <span className="text-amber-400">⭐</span>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.floor(review.rating) ? 'text-amber-400' : 'text-gray-600'}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-3">"{review.comment}"</p>
              <div className="text-gray-500 text-xs">{review.reviews} تقييم</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🔍 نظام البحث المتقدم
// ============================================
export function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    sortBy: 'relevance',
  });

  const searchResults = [
    { id: 1, type: 'player', title: 'أحمد محمد علي', category: 'كرة قدم', description: 'لاعب ناشئ - فئة U10' },
    { id: 2, type: 'coach', title: 'كابتن محمود أحمد', category: 'كرة قدم', description: 'مدرب رئيسي - خبرة 15 سنة' },
    { id: 3, type: 'tournament', title: 'بطولة الناشئين الشتوية', category: 'بطولات', description: 'بطولة قادمة - فبراير 2026' },
    { id: 4, type: 'article', title: 'نصائح لتحسين الأداء', category: 'مقالات', description: 'مقال تدريبي مهم' },
  ];

  const filteredResults = searchResults.filter(result => {
    if (query && !result.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (filters.type !== 'all' && result.type !== filters.type) return false;
    if (filters.category !== 'all' && result.category !== filters.category) return false;
    return true;
  });

  return (
    <section id="advanced-search" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">بحث ذكي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔍 البحث المتقدم
          </h2>
          <p className="text-gray-400">ابحث في جميع محتويات الأكاديمية</p>
        </div>

        {/* Search Input */}
        <div className="glass-card p-6 mb-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن لاعبين، مدربين، بطولات، مقالات..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1">النوع</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="all">الكل</option>
                <option value="player">لاعبين</option>
                <option value="coach">مدربين</option>
                <option value="tournament">بطولات</option>
                <option value="article">مقالات</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">الفئة</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="all">الكل</option>
                <option value="كرة قدم">كرة قدم</option>
                <option value="بطولات">بطولات</option>
                <option value="مقالات">مقالات</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">الترتيب</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="relevance">الأكثر صلة</option>
                <option value="recent">الأحدث</option>
                <option value="popular">الأكثر شعبية</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <div key={result.id} className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">
                    {result.type === 'player' ? '⚽' : result.type === 'coach' ? '👨‍🏫' : result.type === 'tournament' ? '🏆' : '📰'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">{result.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{result.description}</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">{result.type}</span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">{result.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-50">🔍</div>
              <p className="text-gray-400">لا توجد نتائج</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎯 نظام التوصيات الذكية
// ============================================
export function SmartRecommendations() {
  const recommendations = {
    training: [
      { id: 1, title: 'تدريب القوة والتحمل', reason: 'بناءً على أدائك الأخير', icon: '💪', match: 95 },
      { id: 2, title: 'تدريب السرعة', reason: 'لتحسين وقتك في 100 متر', icon: '⚡', match: 88 },
      { id: 3, title: 'تدريب المرونة', reason: 'لتقليل خطر الإصابات', icon: '🤸', match: 82 },
    ],
    products: [
      { id: 1, title: 'MEGA PROTEIN', reason: 'مثالي لبناء العضلات', icon: '🥤', price: 450 },
      { id: 2, title: 'حذاء رياضي احترافي', reason: 'يناسب أسلوب لعبك', icon: '👟', price: 650 },
      { id: 3, title: 'شنطة رياضية', reason: 'حجم مناسب لجميع احتياجاتك', icon: '🎒', price: 250 },
    ],
    coaches: [
      { id: 1, name: 'كابتن محمود أحمد', reason: 'متخصص في تطوير المهارات', icon: '👨‍🏫', rating: 4.9 },
      { id: 2, name: 'كابتن سارة علي', reason: 'خبيرة في التدريب النسائي', icon: '👩‍🏫', rating: 4.8 },
      { id: 3, name: 'كابتن محمد حسن', reason: 'متخصص في حراسة المرمى', icon: '🧤', rating: 4.9 },
    ],
  };

  return (
    <section id="smart-recommendations" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-violet-300 text-xs font-semibold">ذكاء اصطناعي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎯 التوصيات الذكية
          </h2>
          <p className="text-gray-400">اقتراحات مخصصة بناءً على أدائك واهتماماتك</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Training Recommendations */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🏋️</span> تدريبات مقترحة
            </h3>
            <div className="space-y-3">
              {recommendations.training.map((rec) => (
                <div key={rec.id} className="glass-card-light p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{rec.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{rec.title}</div>
                      <div className="text-gray-400 text-xs">{rec.reason}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">نسبة التطابق</div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-l from-violet-500 to-purple-600" style={{ width: `${rec.match}%` }} />
                      </div>
                      <span className="text-violet-400 font-bold text-xs">{rec.match}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Recommendations */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🛒</span> منتجات مقترحة
            </h3>
            <div className="space-y-3">
              {recommendations.products.map((rec) => (
                <div key={rec.id} className="glass-card-light p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{rec.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{rec.title}</div>
                      <div className="text-gray-400 text-xs">{rec.reason}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">السعر</div>
                    <div className="text-emerald-400 font-bold">{rec.price} ج.م</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coaches Recommendations */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>👨‍🏫</span> مدربين مقترحين
            </h3>
            <div className="space-y-3">
              {recommendations.coaches.map((rec) => (
                <div key={rec.id} className="glass-card-light p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{rec.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{rec.name}</div>
                      <div className="text-gray-400 text-xs">{rec.reason}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">التقييم</div>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400">⭐</span>
                      <span className="text-amber-400 font-bold text-sm">{rec.rating}</span>
                    </div>
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
// 🤝 نظام التسويق بالعمولة
// ============================================
export function AffiliateMarketing() {
  const [referralCode] = useState('SA2026-AHMED-XYZ');
  const [copied, setCopied] = useState(false);

  const stats = {
    totalReferrals: 23,
    successfulConversions: 18,
    totalEarnings: 1800,
    pendingEarnings: 300,
    conversionRate: 78,
  };

  const recentReferrals = [
    { id: 1, name: 'محمد خالد', status: 'converted', earnings: 100, date: '2026-01-15' },
    { id: 2, name: 'يوسف أحمد', status: 'converted', earnings: 100, date: '2026-01-14' },
    { id: 3, name: 'عمر طارق', status: 'pending', earnings: 0, date: '2026-01-13' },
    { id: 4, name: 'كريم حسام', status: 'converted', earnings: 100, date: '2026-01-12' },
  ];

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="affiliate-marketing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-semibold">عمولات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤝 التسويق بالعمولة
          </h2>
          <p className="text-gray-400">اكسب المال من خلال إحالة أصدقائك</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-black text-blue-400">{stats.totalReferrals}</div>
            <div className="text-gray-400 text-xs">إجمالي الإحالات</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-black text-emerald-400">{stats.successfulConversions}</div>
            <div className="text-gray-400 text-xs">تحويلات ناجحة</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-black text-amber-400">{stats.totalEarnings} ج.م</div>
            <div className="text-gray-400 text-xs">الأرباح الكلية</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-black text-purple-400">{stats.pendingEarnings} ج.م</div>
            <div className="text-gray-400 text-xs">أرباح معلقة</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-black text-pink-400">{stats.conversionRate}%</div>
            <div className="text-gray-400 text-xs">معدل التحويل</div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="glass-card p-6 mb-6">
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
          <p className="text-gray-400 text-sm mt-3">
            شارك هذا الكود مع أصدقائك واحصل على 100 ج.م لكل تسجيل ناجح
          </p>
        </div>

        {/* Recent Referrals */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📊 آخر الإحالات</h3>
          <div className="space-y-3">
            {recentReferrals.map((referral) => (
              <div key={referral.id} className="glass-card-light p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    referral.status === 'converted' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}>
                    {referral.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{referral.name}</div>
                    <div className="text-gray-400 text-xs">{referral.date}</div>
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
