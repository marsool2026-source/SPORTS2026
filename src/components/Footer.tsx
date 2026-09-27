export default function Footer() {
  const quickLinks = [
    { href: '#overview', label: 'نظرة عامة' },
    { href: '#timeline', label: 'خارطة الطريق' },
    { href: '#digital-card', label: 'الكارنيه الرقمي' },
    { href: '#attendance', label: 'نظام الحضور' },
    { href: '#financial', label: 'النظام المالي' },
    { href: '#integration', label: 'تدفق العمليات' },
    { href: '#architecture', label: 'البنية المعمارية' },
    { href: '#faq', label: 'أسئلة شائعة' },
  ];

  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                SA
              </div>
              <div className="text-right">
                <h3 className="text-white font-bold text-sm">أكاديمية الرياضات الاحترافية</h3>
                <p className="text-gray-500 text-xs">Enterprise Sports Academy System</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              خارطة طريق احترافية لبناء منظومة مؤسسية متكاملة لإدارة الأكاديميات الرياضية
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">روابط سريعة</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-gray-400 text-xs hover:text-white transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">التقنيات المستخدمة</h4>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vite', 'Framer Motion', 'PWA'].map((tech, i) => (
                <span key={i} className="text-xs text-gray-500 glass-card-light px-2 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-gray-600 text-xs">
            © {new Date().getFullYear()} خارطة طريق أكاديمية الرياضات الاحترافية — جميع الحقوق محفوظة
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-gray-500 text-xs">v2.0 — محدّث 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
