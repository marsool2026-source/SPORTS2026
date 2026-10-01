import { useState } from 'react';

// ============================================
// 🥽 نظام الواقع المعزز (AR Training)
// ============================================
export function ARTraining() {
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [arActive, setArActive] = useState(false);

  const exercises = [
    { id: 1, name: 'تدريب التسديد', icon: '⚽', difficulty: 'متوسط', duration: '15 دقيقة', points: 100 },
    { id: 2, name: 'تدريب المراوغة', icon: '🏃', difficulty: 'صعب', duration: '20 دقيقة', points: 150 },
    { id: 3, name: 'تدريب التمرير', icon: '🎯', difficulty: 'سهل', duration: '10 دقائق', points: 80 },
    { id: 4, name: 'تدريب الحراسة', icon: '🧤', difficulty: 'صعب', duration: '25 دقيقة', points: 200 },
  ];

  return (
    <section id="ar-training" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">تقنية متقدمة</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🥽 التدريب بالواقع المعزز
          </h2>
          <p className="text-gray-400">تجربة تدريبية تفاعلية ثلاثية الأبعاد</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* AR View */}
          <div className="glass-card p-6">
            <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
              {arActive ? (
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">🥽</div>
                  <div className="text-white font-bold">الواقع المعزز نشط</div>
                  <div className="text-purple-300 text-sm mt-2">جاري تحليل الحركة...</div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {['السرعة', 'الدقة', 'القوة'].map((metric, i) => (
                      <div key={i} className="bg-white/10 rounded-lg p-2">
                        <div className="text-purple-300 text-xs">{metric}</div>
                        <div className="text-white font-bold">{85 + i * 5}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4 opacity-50">🥽</div>
                  <div className="text-gray-400">اضغط لبدء الواقع المعزز</div>
                </div>
              )}
            </div>
            <button
              onClick={() => setArActive(!arActive)}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                arActive
                  ? 'bg-red-500/20 border border-red-500/30 text-red-300'
                  : 'bg-gradient-to-l from-purple-500 to-violet-600 text-white'
              }`}
            >
              {arActive ? '⏸️ إيقاف AR' : '🥽 بدء الواقع المعزز'}
            </button>
          </div>

          {/* Exercises */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg mb-4">📋 التمارين المتاحة</h3>
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => setActiveExercise(exercise.id)}
                className={`glass-card p-4 cursor-pointer transition-all ${
                  activeExercise === exercise.id ? 'ring-2 ring-purple-500/50' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{exercise.icon}</div>
                  <div className="flex-1">
                    <div className="text-white font-bold">{exercise.name}</div>
                    <div className="text-gray-400 text-xs">
                      {exercise.difficulty} • {exercise.duration}
                    </div>
                  </div>
                  <div className="text-purple-400 font-bold">+{exercise.points}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🔗 نظام Blockchain للشهادات
// ============================================
export function BlockchainCertificates() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const certificates = [
    { id: 1, title: 'شهادة إتمام دورة كرة القدم', player: 'أحمد محمد علي', date: '2026-01-15', hash: '0x7a3b...9f2c', verified: true, level: 'ذهبي' },
    { id: 2, title: 'شهادة بطل المنطقة 2025', player: 'محمد خالد حسن', date: '2025-12-20', hash: '0x8b4c...0g3d', verified: true, level: 'بلاتيني' },
    { id: 3, title: 'شهادة اللياقة البدنية', player: 'يوسف أحمد سعيد', date: '2026-01-10', hash: '0x9c5d...1h4e', verified: true, level: 'فضي' },
  ];

  return (
    <section id="blockchain-certs" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">Blockchain</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔗 شهادات Blockchain
          </h2>
          <p className="text-gray-400">شهادات رقمية غير قابلة للتزوير على Blockchain</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert.id)}
              className="glass-card p-6 cursor-pointer hover:scale-105 transition-all"
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">🏆</div>
                <h3 className="text-white font-bold text-sm">{cert.title}</h3>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">اللاعب:</span>
                  <span className="text-white">{cert.player}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">التاريخ:</span>
                  <span className="text-white">{cert.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">المستوى:</span>
                  <span className="text-amber-400 font-bold">{cert.level}</span>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="text-gray-400 text-[10px] mb-1">Blockchain Hash:</div>
                  <code className="text-blue-400 text-[10px] font-mono">{cert.hash}</code>
                </div>
                {cert.verified && (
                  <div className="flex items-center gap-1 text-emerald-400 text-xs mt-2">
                    <span>✓</span>
                    <span>موثق على Blockchain</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📡 نظام IoT للأجهزة الذكية
// ============================================
export function IoTDevices() {
  const devices = [
    { id: 1, name: 'ساعة ذكية - أحمد', type: 'Apple Watch', battery: 85, status: 'active', heartRate: 72, steps: 8450 },
    { id: 2, name: 'جهاز تتبع - محمد', type: 'Fitbit', battery: 92, status: 'active', heartRate: 68, steps: 12300 },
    { id: 3, name: 'كاميرا ذكية - الملعب', type: 'Security Cam', battery: 100, status: 'active', heartRate: 0, steps: 0 },
    { id: 4, name: 'جهاز قياس السرعة', type: 'Speed Radar', battery: 78, status: 'active', heartRate: 0, steps: 0 },
  ];

  return (
    <section id="iot-devices" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-xs font-semibold">IoT</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📡 الأجهزة الذكية
          </h2>
          <p className="text-gray-400">تكامل مع أجهزة اللياقة والساعات الذكية</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {devices.map((device) => (
            <div key={device.id} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">
                  {device.type.includes('Watch') ? '⌚' : device.type.includes('Fitbit') ? '📱' : device.type.includes('Cam') ? '📷' : '📡'}
                </div>
                <span className={`w-2 h-2 rounded-full ${device.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">{device.name}</h3>
              <p className="text-gray-400 text-xs mb-3">{device.type}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">البطارية</span>
                  <span className="text-white">{device.battery}%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${device.battery > 50 ? 'bg-emerald-500' : device.battery > 20 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${device.battery}%` }}
                  />
                </div>
                
                {device.heartRate > 0 && (
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-gray-400">❤️ نبض القلب</span>
                    <span className="text-red-400 font-bold">{device.heartRate} bpm</span>
                  </div>
                )}
                
                {device.steps > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">👟 الخطوات</span>
                    <span className="text-cyan-400 font-bold">{device.steps.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 👤 نظام التعرف على الوجه
// ============================================
export function FaceRecognition() {
  const [scanning, setScanning] = useState(false);
  const [recognized, setRecognized] = useState<string | null>(null);

  const startScan = () => {
    setScanning(true);
    setRecognized(null);
    setTimeout(() => {
      setScanning(false);
      setRecognized('أحمد محمد علي');
    }, 2000);
  };

  return (
    <section id="face-recognition" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            👤 التعرف على الوجه
          </h2>
          <p className="text-gray-400">تسجيل حضور آمن وسريع بالوجه</p>
        </div>

        <div className="glass-card p-8">
          <div className="aspect-video bg-gradient-to-br from-pink-900/30 to-purple-900/30 rounded-xl flex items-center justify-center relative overflow-hidden mb-6">
            {scanning ? (
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">👤</div>
                <div className="text-white font-bold">جاري المسح...</div>
                <div className="mt-4 w-48 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-gradient-to-l from-pink-500 to-purple-500 animate-pulse" style={{ width: '70%' }} />
                </div>
              </div>
            ) : recognized ? (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <div className="text-emerald-400 font-bold text-xl">تم التعرف!</div>
                <div className="text-white mt-2">{recognized}</div>
                <div className="text-gray-400 text-sm mt-1">تم تسجيل الحضور</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-50">👤</div>
                <div className="text-gray-400">اضغط لبدء المسح</div>
              </div>
            )}
          </div>

          <button
            onClick={startScan}
            disabled={scanning}
            className="w-full py-3 bg-gradient-to-l from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {scanning ? '🔄 جاري المسح...' : recognized ? '🔄 مسح جديد' : '👤 بدء التعرف على الوجه'}
          </button>
        </div>
      </div>
    </section>
  );
}
