import { useState } from 'react';

interface UserRegistration {
  name: string;
  role: 'player' | 'coach' | 'admin' | 'financial';
  birthYear?: string;
  sport?: string;
}

const roleConfig = {
  player: { label: 'لاعب', icon: '⚽', color: 'from-blue-500 to-cyan-500', cardTitle: 'كارنيه اللاعب' },
  coach: { label: 'مدرب', icon: '🏅', color: 'from-purple-500 to-violet-500', cardTitle: 'كارنيه المدرب' },
  admin: { label: 'مدير', icon: '👑', color: 'from-amber-500 to-orange-500', cardTitle: 'كارنيه المدير' },
  financial: { label: 'مدير مالي', icon: '💼', color: 'from-emerald-500 to-teal-500', cardTitle: 'كارنيه المدير المالي' },
};

// Generate a pseudo-random QR-like pattern based on user data
const generateQRPattern = (seed: string): boolean[][] => {
  const size = 21;
  const pattern: boolean[][] = [];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  
  for (let row = 0; row < size; row++) {
    pattern[row] = [];
    for (let col = 0; col < size; col++) {
      // Corner markers (fixed)
      const isTopLeft = row < 7 && col < 7;
      const isTopRight = row < 7 && col >= size - 7;
      const isBottomLeft = row >= size - 7 && col < 7;
      
      if (isTopLeft || isTopRight || isBottomLeft) {
        const localRow = isBottomLeft ? row - (size - 7) : row;
        const localCol = isTopRight ? col - (size - 7) : col;
        const isBorder = localRow === 0 || localRow === 6 || localCol === 0 || localCol === 6;
        const isInner = localRow >= 2 && localRow <= 4 && localCol >= 2 && localCol <= 4;
        pattern[row][col] = isBorder || isInner;
      } else {
        // Random data based on hash
        hash = (hash * 1103515245 + 12345) & 0x7fffffff;
        pattern[row][col] = (hash % 3) !== 0;
      }
    }
  }
  return pattern;
};

export default function DigitalCardSystem() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [userData, setUserData] = useState<UserRegistration>({
    name: '',
    role: 'player',
    birthYear: '',
    sport: '',
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [qrPattern, setQrPattern] = useState<boolean[][]>([]);

  const handleRegister = () => {
    if (!userData.name) return;
    
    setStep(1);
    
    // Simulate code generation
    setTimeout(() => {
      const prefix = userData.role === 'player' ? 'PL' : userData.role === 'coach' ? 'CO' : userData.role === 'admin' ? 'AD' : 'FN';
      const year = userData.birthYear || new Date().getFullYear();
      const random = Math.floor(Math.random() * 9000) + 1000;
      const code = `SA-${year}-${prefix}-${random}`;
      setGeneratedCode(code);
      setQrPattern(generateQRPattern(code + userData.name));
      setStep(2);
      
      setTimeout(() => setStep(3), 1000);
    }, 1500);
  };

  const reset = () => {
    setStep(0);
    setUserData({ name: '', role: 'player', birthYear: '', sport: '' });
    setGeneratedCode('');
    setQrPattern([]);
  };

  const currentRole = roleConfig[userData.role];

  return (
    <section id="digital-card" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">ميزة تلقائية</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🪪 الكارنيه الرقمي مع <span className="gradient-text">QR تلقائي</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            عند تسجيل أي مستخدم — لاعب، مدرب، مدير، أو مدير مالي — يُنشأ QR Code تلقائياً
            ويُدمج في تصميم الكارنيه الرقمي الفوري
          </p>
        </div>

        {/* Flow Explanation */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { step: '1', title: 'تسجيل المستخدم', desc: 'إدخال البيانات الأساسية (الاسم، الدور، سنة الميلاد)', icon: '📝', color: 'from-blue-500 to-cyan-500' },
            { step: '2', title: 'توليد تلقائي', desc: 'النظام يُنشئ الكود التسلسلي + QR Code فوري بدون تدخل', icon: '⚡', color: 'from-purple-500 to-violet-500' },
            { step: '3', title: 'الكارنيه الرقمي', desc: 'تصميم احترافي يحتوي على الصورة، البيانات، والـ QR', icon: '🪪', color: 'from-amber-500 to-orange-500' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-5 text-center relative">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl mx-auto mb-3 shadow-lg`}>
                {item.icon}
              </div>
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-300">
                {item.step}
              </div>
              <h4 className="text-white font-bold mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Demo */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🎮</span> جرّب بنفسك — سجّل مستخدم وشاهد الكارنيه!
            </h3>
            {step > 0 && (
              <button
                onClick={reset}
                className="px-4 py-2 bg-gray-700 text-white text-sm font-bold rounded-lg hover:bg-gray-600 transition-colors"
              >
                🔄 تجربة جديدة
              </button>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Registration Form */}
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <span>📝</span> نموذج التسجيل
              </h4>

              {step === 0 && (
                <div className="space-y-4">
                  {/* Role Selection */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">اختر الدور</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.keys(roleConfig) as Array<keyof typeof roleConfig>).map((role) => (
                        <button
                          key={role}
                          onClick={() => setUserData({ ...userData, role })}
                          className={`p-3 rounded-lg border text-sm font-semibold transition-all ${
                            userData.role === role
                              ? `bg-gradient-to-l ${roleConfig[role].color} border-transparent text-white`
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-lg">{roleConfig[role].icon}</span>
                          <div className="text-xs mt-1">{roleConfig[role].label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      placeholder="مثال: أحمد محمد علي"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  {/* Birth Year (for players) */}
                  {userData.role === 'player' && (
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">سنة الميلاد</label>
                      <input
                        type="number"
                        value={userData.birthYear}
                        onChange={(e) => setUserData({ ...userData, birthYear: e.target.value })}
                        placeholder="2014"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  )}

                  {/* Sport (for players) */}
                  {userData.role === 'player' && (
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">النشاط الرياضي</label>
                      <input
                        type="text"
                        value={userData.sport}
                        onChange={(e) => setUserData({ ...userData, sport: e.target.value })}
                        placeholder="مثال: كرة قدم"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleRegister}
                    disabled={!userData.name}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                      userData.name
                        ? `bg-gradient-to-l ${currentRole.color} text-white hover:opacity-90 shadow-lg`
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    🚀 تسجيل وإنشاء الكارنيه تلقائياً
                  </button>
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative w-20 h-20 mb-4">
                    <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                  <p className="text-white font-bold">جاري إنشاء الكود التسلسلي...</p>
                  <p className="text-gray-400 text-xs mt-1">توليد QR Code فريد</p>
                </div>
              )}

              {(step === 2 || step === 3) && (
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <p className="text-emerald-300 font-bold text-sm">تم التسجيل بنجاح!</p>
                    <p className="text-gray-400 text-xs mt-1">تم إنشاء الكود والكارنيه تلقائياً</p>
                  </div>

                  <div className="space-y-2">
                    <div className="glass-card-light p-3">
                      <div className="text-[10px] text-gray-500 mb-1">الدور</div>
                      <div className="text-sm text-white font-semibold flex items-center gap-2">
                        <span>{currentRole.icon}</span> {currentRole.label}
                      </div>
                    </div>
                    <div className="glass-card-light p-3">
                      <div className="text-[10px] text-gray-500 mb-1">الاسم</div>
                      <div className="text-sm text-white font-semibold">{userData.name}</div>
                    </div>
                    <div className="glass-card-light p-3">
                      <div className="text-[10px] text-gray-500 mb-1">الكود التسلسلي</div>
                      <div className="text-sm text-blue-400 font-mono font-bold">{generatedCode}</div>
                    </div>
                    <div className="glass-card-light p-3">
                      <div className="text-[10px] text-gray-500 mb-1">QR Code</div>
                      <div className="text-sm text-emerald-400 font-semibold">✓ تم التوليد تلقائياً</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Digital Card Preview */}
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <span>🪪</span> الكارنيه الرقمي
              </h4>

              {/* Card Design */}
              <div className={`relative aspect-[1.6/1] rounded-2xl overflow-hidden bg-gradient-to-br ${currentRole.color} shadow-2xl`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                {/* Card Content */}
                <div className="relative h-full p-4 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-sm font-bold text-white">
                        SA
                      </div>
                      <div>
                        <div className="text-white text-[10px] font-bold leading-tight">أكاديمية الرياضات</div>
                        <div className="text-white/70 text-[8px]">Sports Academy</div>
                      </div>
                    </div>
                    <div className="text-white/80 text-[9px] font-semibold">
                      {currentRole.cardTitle}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl md:text-4xl shrink-0 border-2 border-white/30">
                      {step === 0 ? '👤' : currentRole.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-sm md:text-base truncate">
                        {step === 0 ? 'اسم المستخدم' : userData.name || '—'}
                      </div>
                      <div className="text-white/80 text-[10px] md:text-xs mt-1">
                        {step === 0 ? 'الدور' : currentRole.label}
                      </div>
                      {userData.role === 'player' && userData.sport && step > 0 && (
                        <div className="text-white/70 text-[10px] mt-0.5">
                          {userData.sport}
                        </div>
                      )}
                      <div className="text-white/90 text-[9px] md:text-[10px] mt-2 font-mono bg-black/20 rounded px-2 py-0.5 inline-block">
                        {step === 0 ? 'SA-XXXX-XXX-0000' : generatedCode}
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="shrink-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-lg p-1 shadow-lg">
                        {qrPattern.length > 0 ? (
                          <div className="w-full h-full grid" style={{ gridTemplateColumns: `repeat(21, 1fr)` }}>
                            {qrPattern.flat().map((cell, i) => (
                              <div key={i} className={cell ? 'bg-gray-900' : 'bg-white'} />
                            ))}
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-[8px] text-center">
                            QR
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/20">
                    <div className="text-white/70 text-[8px]">
                      {step === 0 ? 'تاريخ الإصدار: —' : `إصدار: ${new Date().toLocaleDateString('ar-EG')}`}
                    </div>
                    <div className="text-white/70 text-[8px]">
                      {step === 0 ? 'ينتهي: —' : `ينتهي: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('ar-EG')}`}
                    </div>
                  </div>
                </div>

                {/* Holographic Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>

              {/* Card Features */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { icon: '🔒', label: 'QR مشفر' },
                  { icon: '🔄', label: 'تجديد سنوي' },
                  { icon: '📱', label: 'قابل للمسح' },
                  { icon: '🎨', label: 'هوية بصرية' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-sm">{item.icon}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Supported Roles */}
        <div className="mt-8 glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4 text-center">
            🎯 يعمل لجميع أدوار المستخدمين
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.keys(roleConfig) as Array<keyof typeof roleConfig>).map((role) => (
              <div key={role} className="glass-card-light p-4 text-center hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-2">{roleConfig[role].icon}</div>
                <div className="text-white font-bold text-sm">{roleConfig[role].label}</div>
                <div className="text-[10px] text-gray-400 mt-1">QR تلقائي + كارنيه</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
