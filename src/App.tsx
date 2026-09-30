import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Header */}
        <header className="glass-card border-b border-white/10 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                SA
              </div>
              <div>
                <h1 className="text-white font-bold">أكاديمية الرياضات الاحترافية</h1>
                <p className="text-gray-400 text-xs">Sports Academy System</p>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                منظومة أكاديمية الرياضات الاحترافية
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              منصة مؤسسية متكاملة لإدارة الأكاديميات الرياضية
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-4">
                <div className="text-3xl font-black text-blue-400">55+</div>
                <div className="text-gray-400 text-sm">مكون</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-3xl font-black text-purple-400">100+</div>
                <div className="text-gray-400 text-sm">وحدة</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-3xl font-black text-emerald-400">24</div>
                <div className="text-gray-400 text-sm">نظام</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-3xl font-black text-amber-400">100%</div>
                <div className="text-gray-400 text-sm">جاهز</div>
              </div>
            </div>
          </div>
        </section>

        {/* Systems Overview */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              🗺️ نظرة عامة على <span className="text-blue-400">المنظومة</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[
                { icon: '🚪', name: 'تسجيل الدخول', color: 'from-blue-500 to-cyan-500' },
                { icon: '🪪', name: 'الكارنيه الرقمي', color: 'from-purple-500 to-violet-500' },
                { icon: '📱', name: 'نظام الحضور', color: 'from-emerald-500 to-teal-500' },
                { icon: '💬', name: 'مركز التواصل', color: 'from-pink-500 to-rose-500' },
                { icon: '🏆', name: 'البطولات', color: 'from-amber-500 to-orange-500' },
                { icon: '📈', name: 'تتبع الأداء', color: 'from-indigo-500 to-blue-500' },
                { icon: '🌍', name: 'الأرقام القياسية', color: 'from-yellow-500 to-amber-500' },
                { icon: '🤖', name: 'الذكاء الاصطناعي', color: 'from-violet-500 to-purple-500' },
                { icon: '📹', name: 'البث المباشر', color: 'from-red-500 to-pink-500' },
                { icon: '💰', name: 'النظام المالي', color: 'from-emerald-500 to-green-500' },
                { icon: '🛒', name: 'متجر المنتجات', color: 'from-cyan-500 to-blue-500' },
                { icon: '🚌', name: 'إدارة الباصات', color: 'from-sky-500 to-blue-500' },
              ].map((system, i) => (
                <div key={i} className="glass-card p-5 hover:scale-105 transition-transform cursor-pointer">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${system.color} flex items-center justify-center text-3xl mb-3`}>
                    {system.icon}
                  </div>
                  <h3 className="text-white font-bold">{system.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              ✨ المميزات <span className="text-purple-400">الرئيسية</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-white mb-2">أمان عالي</h3>
                <p className="text-gray-400">RBAC صارم، تشفير البيانات، اعتماد مالي مزدوج</p>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-white mb-2">متوافق مع جميع المنصات</h3>
                <p className="text-gray-400">Android, iOS, Windows, Mac, Linux, Web</p>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2">5 ثيمات عصرية</h3>
                <p className="text-gray-400">تصاميم زجاجية مع تدرجات لونية جذابة</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="glass-card border-t border-white/10 p-8 text-center">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-400">
              صُنع بـ ❤️ بواسطة فريق Sports Academy
            </p>
            <p className="text-gray-500 text-sm mt-2">
              الإصدار 5.1.0 - النسخة النهائية الكاملة
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
