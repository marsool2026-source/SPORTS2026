export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              SA
            </div>
            <div className="text-right">
              <h3 className="text-white font-bold text-sm">أكاديمية الرياضات الاحترافية</h3>
              <p className="text-gray-500 text-xs">Enterprise Sports Academy System</p>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          خارطة طريق احترافية لبناء منظومة مؤسسية متكاملة لإدارة الأكاديميات الرياضية
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          {['React', 'TypeScript', 'Tailwind', 'Supabase', 'Vite'].map((tech) => (
            <span key={tech} className="text-xs text-gray-500 glass-card-light px-3 py-1">
              {tech}
            </span>
          ))}
        </div>

        <div className="text-gray-600 text-xs">
          © {new Date().getFullYear()} جميع الحقوق محفوظة — خارطة الطريق قابلة للتحديث والتطوير المستمر
        </div>
      </div>
    </footer>
  );
}
