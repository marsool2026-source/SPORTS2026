export default function CallToAction() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
              جاهز لبناء <span className="gradient-text">منظومتك الرياضية</span>؟
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              خارطة الطريق هذه مصممة لبناء منصة مؤسسية متكاملة تغطي جميع جوانب إدارة الأكاديمية الرياضية
              — من العمليات اليومية إلى المحاسبة الاحترافية إلى تجربة المستخدم المتطورة.
            </p>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: '⚡', title: 'سرعة التطوير', desc: '6 مراحل منظمة' },
                { icon: '🔒', title: 'أمان صارم', desc: 'RBAC + تشفير' },
                { icon: '📱', title: 'تجربة متطورة', desc: 'UI/UX احترافي' },
              ].map((item, i) => (
                <div key={i} className="glass-card-light p-4">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-white font-bold text-sm">{item.title}</div>
                  <div className="text-gray-400 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['React 18', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'PWA'].map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div>
                <div className="text-2xl md:text-3xl font-black gradient-text">35+</div>
                <div className="text-xs text-gray-400">وحدة تطويرية</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black gradient-text-blue">6</div>
                <div className="text-xs text-gray-400">مراحل تطوير</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-amber-400">28-38</div>
                <div className="text-xs text-gray-400">أسبوع عمل</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
