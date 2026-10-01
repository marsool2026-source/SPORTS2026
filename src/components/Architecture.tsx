export default function Architecture() {
  const layers = [
    {
      title: "طبقة العرض (Presentation Layer)",
      color: "from-blue-500 to-cyan-500",
      icon: "🖥️",
      items: [
        "واجهات زجاجية (Glassmorphism)",
        "حركات سلسة مع Framer Motion",
        "تصميم متجاوب (Responsive)",
        "ثيمات ديناميكية من الشعار",
        "كارنيهات رقمية تفاعلية"
      ]
    },
    {
      title: "طبقة المنطق (Business Logic)",
      color: "from-purple-500 to-violet-500",
      icon: "⚙️",
      items: [
        "نظام صلاحيات RBAC",
        "محرك القيد المزدوج",
        "الاعتماد المالي المزدوج",
        "التصنيف السني التلقائي",
        "نظام الإشعارات الذكي"
      ]
    },
    {
      title: "طبقة البيانات (Data Layer)",
      color: "from-amber-500 to-orange-500",
      icon: "🗄️",
      items: [
        "PostgreSQL (Supabase)",
        "تخزين الملفات (Storage)",
        "المصادقة الآمنة (Auth)",
        "Realtime Subscriptions",
        "نسخ احتياطي تلقائي"
      ]
    }
  ];

  const connections = [
    { from: "اللاعب", to: "الكارنيه الرقمي", icon: "🪪" },
    { from: "ولي الأمر", to: "المحفظة الإلكترونية", icon: "💳" },
    { from: "المدرب", to: "تسجيل الحضور", icon: "📋" },
    { from: "المدير المالي", to: "اعتماد السداد", icon: "✅" },
    { from: "المدير العام", to: "التقارير التنفيذية", icon: "📊" },
  ];

  return (
    <section id="architecture" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏛️ البنية <span className="gradient-text">المعمارية</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            هيكل تقني متين مصمم للتوسع والأمان والأداء العالي
          </p>
        </div>

        {/* Architecture Layers */}
        <div className="space-y-4 mb-16">
          {layers.map((layer, i) => (
            <div key={i} className="glass-card p-6 hover:scale-[1.01] transition-transform duration-300">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center text-2xl shrink-0 shadow-lg`}>
                  {layer.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-3">{layer.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item, j) => (
                      <span key={j} className="text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {i < layers.length - 1 && (
                  <div className="hidden md:flex items-center text-gray-600">
                    <svg className="w-6 h-6 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* User Flow */}
        <div className="glass-card p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
            <span>🔄</span> تدفق العمليات الرئيسي
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {connections.map((conn, i) => (
              <div key={i} className="glass-card-light p-4 text-center group hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{conn.icon}</div>
                <div className="text-xs text-gray-500 mb-1">{conn.from}</div>
                <svg className="w-4 h-4 text-gray-600 mx-auto my-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <div className="text-sm font-semibold text-white">{conn.to}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="text-white font-bold text-sm mb-1">تشفير البيانات</h4>
            <p className="text-gray-400 text-xs">AES-256 للبيانات الحساسة</p>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <h4 className="text-white font-bold text-sm mb-1">حماية الصلاحيات</h4>
            <p className="text-gray-400 text-xs">RBAC مع Audit Trail كامل</p>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📝</div>
            <h4 className="text-white font-bold text-sm mb-1">سجل المراجعة</h4>
            <p className="text-gray-400 text-xs">تتبع كل عملية في النظام</p>
          </div>
        </div>
      </div>
    </section>
  );
}
