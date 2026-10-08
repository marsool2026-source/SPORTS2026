export function PackageComparison() {
  const features = [
    { name: 'عدد الحصص الشهرية', basic: '8', advanced: '12', pro: 'غير محدود' },
    { name: 'مدرب معتمد', basic: '✓', advanced: '✓', pro: '✓' },
    { name: 'كارنيه رقمي', basic: '✓', advanced: '✓', pro: 'VIP' },
    { name: 'تقارير الأداء', basic: 'شهري', advanced: 'أسبوعي', pro: 'يومي' },
    { name: 'حصص خاصة', basic: '✗', advanced: '2 شهرياً', pro: '4 شهرياً' },
    { name: 'خدمة النقل', basic: '✗', advanced: '✗', pro: 'خط واحد' },
    { name: 'خصم المنتجات', basic: '✗', advanced: '10%', pro: '20%' },
    { name: 'بطولات خاصة', basic: '✗', advanced: '✓', pro: '✓' },
    { name: 'دعم فني 24/7', basic: '✗', advanced: '✗', pro: '✓' },
    { name: 'فيديو تحليل', basic: '✗', advanced: '✗', pro: '✓' },
  ];

  return (
    <section id="comparison" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            📊 مقارنة <span className="gradient-text-blue">الباقات</span>
          </h2>
          <p className="text-gray-400">قارن بين الباقات واختر الأنسب لك</p>
        </div>

        <div className="glass-card overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-right text-gray-400 text-sm font-normal">الميزة</th>
                <th className="p-4 text-center">
                  <div className="text-2xl mb-1">🥉</div>
                  <div className="text-white font-bold text-sm">الأساسية</div>
                  <div className="text-gray-400 text-xs">500 ج.م</div>
                </th>
                <th className="p-4 text-center bg-blue-500/10">
                  <div className="text-2xl mb-1">🥈</div>
                  <div className="text-white font-bold text-sm">المتقدمة</div>
                  <div className="text-blue-400 text-xs">800 ج.م ⭐</div>
                </th>
                <th className="p-4 text-center">
                  <div className="text-2xl mb-1">🥇</div>
                  <div className="text-white font-bold text-sm">الاحترافية</div>
                  <div className="text-gray-400 text-xs">1200 ج.م</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-gray-300 text-sm">{feature.name}</td>
                  <td className="p-4 text-center text-gray-400 text-sm">{feature.basic}</td>
                  <td className="p-4 text-center bg-blue-500/5 text-blue-300 text-sm font-semibold">{feature.advanced}</td>
                  <td className="p-4 text-center text-amber-300 text-sm font-semibold">{feature.pro}</td>
                </tr>
              ))}
              <tr>
                <td className="p-4"></td>
                <td className="p-4 text-center">
                  <button className="px-4 py-2 glass-card text-white text-xs rounded-lg hover:bg-white/10 transition-colors">
                    اشترك
                  </button>
                </td>
                <td className="p-4 text-center bg-blue-500/5">
                  <button className="px-4 py-2 bg-gradient-to-l from-blue-500 to-cyan-600 text-white text-xs font-bold rounded-lg shadow-lg">
                    اشترك الآن ⭐
                  </button>
                </td>
                <td className="p-4 text-center">
                  <button className="px-4 py-2 glass-card text-white text-xs rounded-lg hover:bg-white/10 transition-colors">
                    اشترك
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function UpcomingEvents() {
  const events = [
    { id: 1, title: 'بطولة الناشئين الشتوية', date: '15 فبراير 2026', time: '4:00 مساءً', location: 'الملعب الرئيسي', type: 'بطولة', icon: '🏆' },
    { id: 2, title: 'يوم العائلة المفتوح', date: '22 فبراير 2026', time: '10:00 صباحاً', location: 'الأكاديمية', type: 'فعالية', icon: '👨‍👩‍👧‍👦' },
    { id: 3, title: 'ورشة تدريب المدربين', date: '1 مارس 2026', time: '9:00 صباحاً', location: 'قاعة المحاضرات', type: 'ورشة', icon: '👨‍🏫' },
    { id: 4, title: 'كأس الأكاديمية السنوي', date: '20 مارس 2026', time: '3:00 مساءً', location: 'استاد المدينة', type: 'بطولة', icon: '🥇' },
  ];

  return (
    <section id="events" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">الأحداث القادمة</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            📅 الأحداث <span className="gradient-text">القادمة</span>
          </h2>
          <p className="text-gray-400">لا تفوت الفعاليات والبطولات القادمة</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.id} className="glass-card p-5 hover:scale-[1.02] transition-transform">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-2xl shrink-0">
                  {event.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-white font-bold mb-2">{event.title}</h3>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏰</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="mt-3 px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-xs font-bold hover:bg-purple-500/30 transition-colors">
                    تسجيل الحضور
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
