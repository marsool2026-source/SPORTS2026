import { useState } from 'react';

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setSuccess(false);
  };

  return (
    <section id="login" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-xs font-semibold">واجهة احترافية</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🚪 شاشة <span className="gradient-text-blue">تسجيل الدخول</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            واجهة زجاجية عصرية مع حركات سلسة عند التبديل بين تسجيل الدخول وإنشاء حساب جديد
          </p>
        </div>

        {/* Main Display */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-[320px] h-[640px] bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                
                {/* Screen */}
                <div className="relative w-full h-full bg-gradient-to-br from-[#0B0F19] via-[#0a1628] to-[#0B0F19] rounded-[2.5rem] overflow-hidden">
                  {/* Background Effects */}
                  <div className="absolute inset-0">
                    <div className="absolute top-20 right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-6 pt-12">
                    {/* Title */}
                    <div className="text-center mb-4">
                      <h1 className="text-cyan-400 text-lg font-bold tracking-widest">SPORTS ACADEMY</h1>
                      <p className="text-white text-xs tracking-wider opacity-80">أكاديمية الرياضات الاحترافية</p>
                    </div>

                    {/* Animated Circle */}
                    <div className="relative mb-6">
                      <div className="w-28 h-28 rounded-full border-2 border-cyan-400/50 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping" />
                        <div className="absolute inset-2 rounded-full border border-purple-400/30 animate-pulse" />
                        
                        {/* Sports Icons */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl">⚽</div>
                        <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-xl">🏊</div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xl">🏀</div>
                        <div className="absolute top-1/2 -left-2 -translate-y-1/2 text-xl">🏃</div>
                        <div className="absolute top-2 right-2 text-lg">🥋</div>
                        
                        {/* Center Icon */}
                        <div className="text-3xl">🏆</div>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="w-full space-y-3">
                      {isSignUp && (
                        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="البريد الإلكتروني / Email"
                            className="w-full bg-transparent text-white text-xs placeholder-gray-400 focus:outline-none"
                          />
                        </div>
                      )}
                      
                      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10 flex items-center gap-2">
                        <span className="text-cyan-400 text-sm">👤</span>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="اسم المستخدم / Username"
                          className="flex-1 bg-transparent text-white text-xs placeholder-gray-400 focus:outline-none"
                        />
                      </div>

                      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10 flex items-center gap-2">
                        <span className="text-cyan-400 text-sm">🔒</span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="كلمة المرور / Password"
                          className="flex-1 bg-transparent text-white text-xs placeholder-gray-400 focus:outline-none"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 text-xs"
                        >
                          {showPassword ? '🙈' : '👁️'}
                        </button>
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-l from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            جاري المعالجة...
                          </span>
                        ) : success ? (
                          '✓ تم بنجاح!'
                        ) : isSignUp ? (
                          'إنشاء حساب / Sign Up'
                        ) : (
                          'تسجيل الدخول / Login Now'
                        )}
                      </button>

                      {/* Forgot Password */}
                      {!isSignUp && (
                        <button className="w-full text-center text-gray-400 text-[10px] hover:text-white transition-colors">
                          نسيت كلمة المرور؟ / Forgot Password?
                        </button>
                      )}

                      {/* Social Login */}
                      <div className="flex items-center justify-center gap-4 pt-2">
                        <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm transition-colors">
                          G
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm text-blue-400 transition-colors">
                          f
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm transition-colors">
                          
                        </button>
                      </div>

                      {/* Toggle */}
                      <button
                        onClick={toggleMode}
                        className="w-full text-center text-cyan-400 text-[10px] font-bold hover:text-cyan-300 transition-colors pt-2"
                      >
                        {isSignUp ? 'لديك حساب؟ تسجيل الدخول' : 'إنشاء حساب جديد / Sign Up'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-[4rem] blur-2xl -z-10" />
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">✨ مميزات واجهة الدخول</h3>
            
            {[
              { icon: '🎨', title: 'تصميم زجاجي عصري', desc: 'Glassmorphism مع تأثيرات ضبابية وحركات سلسة' },
              { icon: '🔄', title: 'تبديل سلس', desc: 'انتقال متحرك بين تسجيل الدخول وإنشاء حساب جديد' },
              { icon: '🌐', title: 'دعم ثنائي اللغة', desc: 'واجهة عربية/إنجليزية مع دعم RTL كامل' },
              { icon: '🔐', title: 'تسجيل دخول اجتماعي', desc: 'Google, Facebook, Apple للتسجيل السريع' },
              { icon: '🎯', title: 'أيقونات رياضية متحركة', desc: 'دائرة حركية تعرض أيقونات الرياضات المختلفة' },
              { icon: '📱', title: 'تصميم متجاوب', desc: 'يعمل بشكل مثالي على جميع الأجهزة' },
            ].map((item, i) => (
              <div key={i} className="glass-card p-4 flex items-start gap-3 hover:scale-[1.02] transition-transform">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Tech Stack */}
            <div className="glass-card p-4 mt-6">
              <h4 className="text-white font-bold text-sm mb-3">🛠️ التقنيات المستخدمة</h4>
              <div className="flex flex-wrap gap-2">
                {['Framer Motion', 'Glassmorphism CSS', 'React Hook Form', 'JWT Auth', 'OAuth 2.0', 'RTL Support'].map((tech, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-[10px] font-medium bg-gradient-to-l from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
