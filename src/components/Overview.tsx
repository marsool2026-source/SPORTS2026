import { systemOverview } from '../data/roadmap';

export default function Overview() {
  return (
    <section id="overview" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            نظرة عامة على <span className="gradient-text-blue">النظام</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            منظومة متكاملة تربط بين العمليات التشغيلية والمالية وتجربة المستخدم
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl mb-4">
              🎮
            </div>
            <h3 className="text-xl font-bold text-white mb-2">العمليات التشغيلية</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              إدارة اللاعبين، المدربين، المجموعات، الحضور، الباصات، والجداول التدريبية
            </p>
          </div>

          <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl mb-4">
              💳
            </div>
            <h3 className="text-xl font-bold text-white mb-2">الشق المالي</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              شجرة حسابات بقيد مزدوج، محافظ إلكترونية، اعتماد مالي مزدوج، وتقارير شاملة
            </p>
          </div>

          <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl mb-4">
              🎨
            </div>
            <h3 className="text-xl font-bold text-white mb-2">تجربة المستخدم</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              واجهات زجاجية متحركة، كارنيهات رقمية، ثيمات ديناميكية، ولوحات تحكم مخصصة
            </p>
          </div>
        </div>

        {/* Roles Section */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            👥 أدوار المستخدمين وصلاحياتهم
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {systemOverview.roles.map((role, i) => (
              <div
                key={i}
                className="glass-card-light p-4 text-center hover:bg-white/10 transition-colors duration-300"
              >
                <div className="text-4xl mb-3">{role.icon}</div>
                <h4 className="text-white font-bold text-sm mb-1">{role.name}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{role.permissions}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🚪</span>
              شاشة تسجيل دخول احترافية
            </h3>
            <ul className="space-y-3">
              {[
                'تصميم زجاجي عصري (Glassmorphism) مع تأثيرات حركية',
                'تبديل سلس بين تسجيل الدخول وإنشاء حساب جديد',
                'دعم ثنائي اللغة (عربي/إنجليزي) مع RTL كامل',
                'تسجيل دخول اجتماعي عبر Google, Facebook, Apple',
                'دائرة حركية تعرض أيقونات الرياضات المختلفة'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-cyan-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🪪</span>
              QR تلقائي + كارنيه رقمي عند التسجيل
            </h3>
            <ul className="space-y-3">
              {[
                'عند تسجيل أي مستخدم (لاعب/مدرب/مدير) يُنشأ QR تلقائياً',
                'يُدمج الـ QR مباشرة في تصميم الكارنيه الرقمي',
                'الكود التسلسلي فريد ومرتبط بسنة الميلاد والدور',
                'تجديد تلقائي سنوي للكارنيه مع الحفاظ على نفس الـ QR',
                'قابل للمسح من أي هاتف أو ماسح معتمد'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-purple-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 border border-emerald-500/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📱</span>
              تسجيل الحضور عبر QR Code
            </h3>
            <ul className="space-y-3">
              {[
                'كل لاعب يحصل على كود QR فريد في الكارنيه الرقمي',
                'المدرب يمسح الكود → يُسجَّل الحضور تلقائياً',
                'يعمل بدون إنترنت (Offline Mode) ثم المزامنة',
                'تحقق بالموقع الجغرافي لمنع الغش',
                'تقارير فورية تُرسل للإدارة تلقائياً'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🔐</span>
              فصل الصلاحيات الصارم (RBAC)
            </h3>
            <ul className="space-y-3">
              {[
                'الإداري التشغيلي لا يمكنه الوصول للشؤون المالية',
                'المدير المالي وحده يعتمد السداد والإقفالات',
                'كل عملية مسجلة في سجل المراجعة (Audit Trail)',
                'حماية برمجية تمنع أي تداخل بين الأدوار'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              الثيمات الديناميكية
            </h3>
            <ul className="space-y-3">
              {[
                'محرك ثيمات ذكي يستخرج الألوان من الشعار',
                'تطبيق تلقائي على جميع واجهات التطبيق',
                'هوية بصرية فريدة لكل أكاديمية',
                'دعم الوضع الفاتح والداكن'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-amber-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
