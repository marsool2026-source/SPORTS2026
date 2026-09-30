import { useState } from 'react';

// ============================================
// 🏟️ نظام حجز المرافق المتقدم
// ============================================

export function FacilityBooking() {
  const [selectedFacility, setSelectedFacility] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const facilities = [
    { id: 1, name: 'الملعب الرئيسي', icon: '🏟️', capacity: '50 لاعب', price: '200 ج.م/ساعة', available: true },
    { id: 2, name: 'صالة كرة السلة', icon: '🏀', capacity: '20 لاعب', price: '150 ج.م/ساعة', available: true },
    { id: 3, name: 'المسبح الأولمبي', icon: '🏊', capacity: '30 لاعب', price: '180 ج.م/ساعة', available: false },
    { id: 4, name: 'صالة اللياقة', icon: '🏋️', capacity: '40 لاعب', price: '100 ج.م/ساعة', available: true },
    { id: 5, name: 'ملعب التنس', icon: '🎾', capacity: '4 لاعبين', price: '120 ج.م/ساعة', available: true },
    { id: 6, name: 'مضمار الجري', icon: '🏃', capacity: '25 لاعب', price: '80 ج.م/ساعة', available: true },
  ];

  const timeSlots = [
    '8:00 ص', '9:00 ص', '10:00 ص', '11:00 ص',
    '2:00 م', '3:00 م', '4:00 م', '5:00 م',
    '6:00 م', '7:00 م', '8:00 م', '9:00 م'
  ];

  return (
    <section id="facility-booking" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏟️ حجز المرافق
          </h2>
          <p className="text-gray-400">احجز الملعب أو الصالة المناسبة</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              onClick={() => facility.available && setSelectedFacility(facility.id)}
              className={`glass-card p-6 cursor-pointer transition-all hover:scale-105 ${
                selectedFacility === facility.id ? 'ring-2 ring-blue-500' : ''
              } ${!facility.available ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-4xl mb-3">{facility.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{facility.name}</h3>
              <div className="space-y-1 text-sm text-gray-400">
                <div>👥 {facility.capacity}</div>
                <div>💰 {facility.price}</div>
                <div className={facility.available ? 'text-emerald-400' : 'text-red-400'}>
                  {facility.available ? '✓ متاح' : '✗ محجوز'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedFacility && (
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">اختر الوقت</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {timeSlots.map((time, i) => {
                const isBooked = Math.random() > 0.7;
                return (
                  <button
                    key={i}
                    disabled={isBooked}
                    className={`py-3 rounded-lg text-sm font-bold transition-all ${
                      isBooked
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400 cursor-not-allowed'
                        : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
            <button className="w-full mt-4 py-3 bg-gradient-to-l from-blue-500 to-cyan-600 text-white font-bold rounded-lg">
              تأكيد الحجز
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// ⭐ نظام التقييمات والمراجعات
// ============================================

export function ReviewsSystem() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const reviews = [
    { id: 1, user: 'أحمد محمد', rating: 5, comment: 'مدرب ممتاز! تعلمت الكثير في فترة قصيرة', date: 'منذ يومين', avatar: '⚽' },
    { id: 2, user: 'فاطمة علي', rating: 4, comment: 'المرافق نظيفة والمدربين محترفين', date: 'منذ أسبوع', avatar: '👩' },
    { id: 3, user: 'محمد خالد', rating: 5, comment: 'أفضل أكاديمية في المنطقة بلا منازع', date: 'منذ أسبوعين', avatar: '🏀' },
  ];

  return (
    <section id="reviews" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ⭐ التقييمات والمراجعات
          </h2>
          <p className="text-gray-400">شاركنا رأيك وساعدنا على التحسن</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Write Review */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">اكتب تقييمك</h3>
            
            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-2 block">التقييم</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-4xl transition-transform hover:scale-110"
                  >
                    {star <= (hoverRating || rating) ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-2 block">التعليق</label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                rows={4}
                placeholder="شاركنا تجربتك..."
              />
            </div>

            <button className="w-full py-3 bg-gradient-to-l from-amber-500 to-orange-600 text-white font-bold rounded-lg">
              إرسال التقييم
            </button>
          </div>

          {/* Reviews List */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">آخر التقييمات</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="glass-card-light p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{review.user}</div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-sm ${i < review.rating ? 'text-amber-400' : 'text-gray-600'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-gray-500 text-xs">{review.date}</div>
                  </div>
                  <p className="text-gray-300 text-sm">{review.comment}</p>
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
// 🔍 نظام البحث المتقدم
// ============================================

export function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const searchItems = [
    { type: 'لاعب', name: 'أحمد محمد علي', category: 'ناشئين U10', icon: '⚽' },
    { type: 'مدرب', name: 'كابتن محمود أحمد', category: 'كرة قدم', icon: '👨‍🏫' },
    { type: 'بطولة', name: 'بطولة الناشئين الشتوية', category: 'فبراير 2026', icon: '🏆' },
    { type: 'منتج', name: 'MEGA PROTEIN', category: 'مكملات غذائية', icon: '🥤' },
  ];

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.length > 0) {
      setResults(searchItems.filter(item => 
        item.name.toLowerCase().includes(q.toLowerCase()) ||
        item.category.toLowerCase().includes(q.toLowerCase())
      ));
    } else {
      setResults([]);
    }
  };

  return (
    <section id="advanced-search" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔍 البحث المتقدم
          </h2>
          <p className="text-gray-400">ابحث في جميع محتويات الأكاديمية</p>
        </div>

        <div className="glass-card p-6">
          <div className="relative mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث عن لاعب، مدرب، بطولة، منتج..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((item, i) => (
                <div key={i} className="glass-card-light p-4 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-white font-bold">{item.name}</div>
                    <div className="text-gray-400 text-sm">{item.category}</div>
                  </div>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">{item.type}</span>
                </div>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400">لا توجد نتائج لـ "{query}"</p>
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
  const recommendations = [
    { id: 1, type: 'تدريب', title: 'تمارين المرونة', reason: 'بناءً على أدائك الأخير', icon: '🤸', score: 95 },
    { id: 2, type: 'منتج', title: 'MEGA PROTEIN', reason: 'مناسب لبرنامجك الغذائي', icon: '🥤', score: 88 },
    { id: 3, type: 'مدرب', title: 'كابتن سارة', reason: 'متخصص في مجالك', icon: '👨‍🏫', score: 92 },
    { id: 4, type: 'بطولة', title: 'بطولة السرعة', reason: 'مهاراتك مناسبة', icon: '🏆', score: 85 },
  ];

  return (
    <section id="recommendations" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎯 توصيات ذكية
          </h2>
          <p className="text-gray-400">توصيات مخصصة بناءً على أدائك واهتماماتك</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recommendations.map((rec) => (
            <div key={rec.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl">
                  {rec.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">{rec.type}</span>
                    <span className="text-emerald-400 text-xs font-bold">{rec.score}% تطابق</span>
                  </div>
                  <h3 className="text-white font-bold text-lg">{rec.title}</h3>
                  <p className="text-gray-400 text-sm">{rec.reason}</p>
                </div>
              </div>
              <button className="w-full py-2 bg-gradient-to-l from-purple-500 to-pink-600 text-white font-bold rounded-lg text-sm">
                عرض التفاصيل
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
