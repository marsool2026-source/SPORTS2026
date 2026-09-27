import { useState, useEffect } from 'react';

interface Player {
  id: string;
  name: string;
  code: string;
  ageGroup: string;
  status: 'pending' | 'present' | 'late';
  time?: string;
}

const samplePlayers: Player[] = [
  { id: '1', name: 'أحمد محمد علي', code: 'SA-2014-001', ageGroup: 'ناشئين U10', status: 'pending' },
  { id: '2', name: 'محمد خالد حسن', code: 'SA-2013-015', ageGroup: 'ناشئين U11', status: 'pending' },
  { id: '3', name: 'يوسف أحمد سعيد', code: 'SA-2012-008', ageGroup: 'شباب U13', status: 'pending' },
  { id: '4', name: 'عمر طارق محمود', code: 'SA-2014-022', ageGroup: 'ناشئين U10', status: 'pending' },
  { id: '5', name: 'كريم حسام الدين', code: 'SA-2013-033', ageGroup: 'ناشئين U11', status: 'pending' },
  { id: '6', name: 'زياد إبراهيم نور', code: 'SA-2012-041', ageGroup: 'شباب U13', status: 'pending' },
];

export default function AttendanceSystem() {
  const [players, setPlayers] = useState<Player[]>(samplePlayers);
  const [scanning, setScanning] = useState(false);
  const [currentScan, setCurrentScan] = useState<number | null>(null);
  const [totalPresent, setTotalPresent] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);

  // Simulate QR scanning
  const simulateScan = () => {
    if (!sessionActive) return;
    
    const pendingPlayers = players.filter(p => p.status === 'pending');
    if (pendingPlayers.length === 0) return;

    setScanning(true);
    const randomIndex = players.findIndex(p => p.status === 'pending');
    setCurrentScan(randomIndex);

    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
      
      setPlayers(prev => prev.map((p, i) => 
        i === randomIndex 
          ? { ...p, status: 'present' as const, time: timeStr }
          : p
      ));
      setTotalPresent(prev => prev + 1);
      setScanning(false);
      setCurrentScan(null);
    }, 1500);
  };

  // Auto-scan simulation
  useEffect(() => {
    if (!sessionActive) return;
    const pendingCount = players.filter(p => p.status === 'pending').length;
    if (pendingCount === 0) return;

    const interval = setInterval(() => {
      simulateScan();
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionActive, players]);

  const resetDemo = () => {
    setPlayers(samplePlayers.map(p => ({ ...p, status: 'pending' as const, time: undefined })));
    setTotalPresent(0);
    setSessionActive(false);
    setScanning(false);
    setCurrentScan(null);
  };

  const startDemo = () => {
    resetDemo();
    setSessionActive(true);
  };

  const presentCount = players.filter(p => p.status === 'present').length;
  const pendingCount = players.filter(p => p.status === 'pending').length;

  return (
    <section id="attendance" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">ميزة تفاعلية</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📱 نظام الحضور عبر <span className="gradient-text">QR Code</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نظام ذكي لتسجيل الحضور فورياً — المدرب يمسح كود اللاعب → يُسجَّل الحضور تلقائياً
          </p>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { step: '1', title: 'توليد QR', desc: 'كل لاعب يحصل على كود QR فريد في الكارنيه الرقمي', icon: '🪪', color: 'from-blue-500 to-cyan-500' },
            { step: '2', title: 'المسح', desc: 'المدرب يمسح الكود عبر كاميرا الهاتف أو الماسح', icon: '📷', color: 'from-purple-500 to-violet-500' },
            { step: '3', title: 'التسجيل', desc: 'يُسجَّل الحضور تلقائياً مع الوقت والتاريخ', icon: '✅', color: 'from-emerald-500 to-teal-500' },
            { step: '4', title: 'التقارير', desc: 'تقارير فورية للحضور والغياب لكل مجموعة', icon: '📊', color: 'from-amber-500 to-orange-500' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-5 text-center hover:scale-105 transition-transform duration-300 relative">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl mx-auto mb-3 shadow-lg`}>
                {item.icon}
              </div>
              <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                {item.step}
              </div>
              <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -left-3 text-gray-600">
                  ←
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Demo */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🎮</span> محاكاة حية — جرّب النظام!
            </h3>
            <div className="flex items-center gap-3">
              {!sessionActive ? (
                <button
                  onClick={startDemo}
                  className="px-5 py-2.5 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
                >
                  ▶️ بدء المحاكاة
                </button>
              ) : (
                <button
                  onClick={resetDemo}
                  className="px-5 py-2.5 bg-gray-700 text-white text-sm font-bold rounded-lg hover:bg-gray-600 transition-colors"
                >
                  🔄 إعادة تعيين
                </button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Scanner Side */}
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <span>📷</span> واجهة الماسح (المدرب)
              </h4>
              
              {/* Scanner View */}
              <div className="relative aspect-square max-w-[280px] mx-auto bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700">
                {/* Scanner Frame */}
                <div className="absolute inset-4 border-2 border-emerald-400/50 rounded-xl">
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-xl" />
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-xl" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-xl" />
                </div>

                {/* Scanning Line */}
                {scanning && (
                  <div className="absolute inset-4 overflow-hidden rounded-xl">
                    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-emerald-400 to-transparent animate-bounce" 
                      style={{ animation: 'scanLine 1.5s ease-in-out infinite' }} />
                  </div>
                )}

                {/* QR Code Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {scanning && currentScan !== null ? (
                    <div className="text-center animate-pulse">
                      <div className="w-24 h-24 mx-auto bg-white rounded-lg p-2 mb-2">
                        {/* Simulated QR Pattern */}
                        <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-0.5">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-gray-900' : 'bg-white'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-emerald-400 text-xs font-bold">جاري المسح...</p>
                      <p className="text-gray-400 text-[10px] mt-1">{players[currentScan]?.name}</p>
                    </div>
                  ) : sessionActive ? (
                    <div className="text-center">
                      <div className="text-4xl mb-2 animate-pulse">📷</div>
                      <p className="text-gray-400 text-xs">وجّه الكاميرا نحو كود QR</p>
                      <p className="text-emerald-400 text-[10px] mt-1">في انتظار المسح...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-2 opacity-50">📷</div>
                      <p className="text-gray-500 text-xs">اضغط "بدء المحاكاة"</p>
                    </div>
                  )}
                </div>

                {/* Success Flash */}
                {presentCount > 0 && !scanning && sessionActive && (
                  <div className="absolute bottom-3 left-3 right-3 bg-emerald-500/20 border border-emerald-500/40 rounded-lg p-2 text-center">
                    <p className="text-emerald-300 text-xs font-bold">✓ تم تسجيل الحضور</p>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-emerald-400">{presentCount}</div>
                  <div className="text-[10px] text-gray-400">حاضر</div>
                </div>
                <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-gray-400">{pendingCount}</div>
                  <div className="text-[10px] text-gray-400">غائب</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-blue-400">{players.length}</div>
                  <div className="text-[10px] text-gray-400">الإجمالي</div>
                </div>
              </div>
            </div>

            {/* Players List Side */}
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <span>👥</span> قائمة اللاعبين — مجموعة الناشئين
              </h4>
              
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {players.map((player, i) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-500 ${
                      player.status === 'present'
                        ? 'bg-emerald-500/10 border border-emerald-500/30'
                        : currentScan === i
                        ? 'bg-amber-500/10 border border-amber-500/30 animate-pulse'
                        : 'bg-white/5 border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        player.status === 'present' ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-400'
                      }`}>
                        {player.status === 'present' ? '✓' : (i + 1)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{player.name}</div>
                        <div className="text-[10px] text-gray-500">{player.code} • {player.ageGroup}</div>
                      </div>
                    </div>
                    <div className="text-left">
                      {player.status === 'present' ? (
                        <div>
                          <div className="text-xs text-emerald-400 font-bold">حاضر ✓</div>
                          <div className="text-[10px] text-gray-500">{player.time}</div>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">في الانتظار</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Completion Message */}
              {pendingCount === 0 && sessionActive && (
                <div className="mt-4 p-3 bg-gradient-to-l from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-lg text-center">
                  <p className="text-emerald-300 font-bold text-sm">🎉 اكتمل تسجيل الحضور!</p>
                  <p className="text-gray-400 text-xs mt-1">تم إرسال التقرير تلقائياً للإدارة</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Features */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '⚡', title: 'فوري', desc: 'تسجيل فوري بدون إنترنت (Offline Mode)' },
            { icon: '🔒', title: 'آمن', desc: 'كل QR مشفر وفريد لا يمكن تزويره' },
            { icon: '📍', title: 'جيولوكيشن', desc: 'التحقق من موقع المسح لمنع الغش' },
            { icon: '📲', title: 'متعدد', desc: 'يعمل على الهاتف، التابلت، أو ماسح مخصص' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-4 text-center hover:bg-white/10 transition-colors">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 10%; }
          50% { top: 85%; }
        }
      `}</style>
    </section>
  );
}
