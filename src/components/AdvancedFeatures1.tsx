import { useState } from 'react';

// ============================================
// 🥽 نظام الواقع المعزز (AR)
// ============================================

export function ARTraining() {
  const [activeExercise, setActiveExercise] = useState<number | null>(null);

  const exercises = [
    { id: 1, name: 'تسديد على المرمى', icon: '⚽', difficulty: 'متوسط', duration: '15 دقيقة', points: 100 },
    { id: 2, name: 'مراوغة اللاعبين', icon: '🏃', difficulty: 'صعب', duration: '20 دقيقة', points: 150 },
    { id: 3, name: 'تمريرات دقيقة', icon: '🎯', difficulty: 'سهل', duration: '10 دقائق', points: 75 },
    { id: 4, name: 'حركات حارس المرمى', icon: '🧤', difficulty: 'صعب', duration: '25 دقيقة', points: 200 },
  ];

  return (
    <section id="ar-training" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🥽 التدريب بالواقع المعزز
          </h2>
          <p className="text-gray-400">تمارين تفاعلية ثلاثية الأبعاد</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => setActiveExercise(exercise.id)}
              className={`glass-card p-6 cursor-pointer transition-all hover:scale-105 ${
                activeExercise === exercise.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                  {exercise.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{exercise.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded">{exercise.difficulty}</span>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">{exercise.duration}</span>
                  </div>
                </div>
                <div className="text-amber-400 font-bold">+{exercise.points}</div>
              </div>

              {activeExercise === exercise.id && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="text-6xl mb-2">{exercise.icon}</div>
                      <p className="text-white text-sm">محاكاة AR</p>
                      <p className="text-gray-400 text-xs">استخدم الكاميرا للتفاعل</p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-l from-blue-500 to-purple-600 text-white font-bold rounded-lg">
                    🚀 ابدأ التمرين
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🔗 نظام Blockchain للشهادات
// ============================================

export function BlockchainCertificates() {
  const certificates = [
    { id: 1, title: 'شهادة إتمام دورة كرة القدم', date: '2026-01-15', hash: '0x7f8a9b...c3d4e5', verified: true },
    { id: 2, title: 'شهادة المشاركة في البطولة', date: '2026-01-10', hash: '0x3e4f5a...b6c7d8', verified: true },
    { id: 3, title: 'شهادة التفوق الرياضي', date: '2025-12-20', hash: '0x9a8b7c...d2e1f0', verified: true },
  ];

  return (
    <section id="blockchain-cert" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔗 الشهادات الرقمية
          </h2>
          <p className="text-gray-400">شهادات غير قابلة للتزوير على Blockchain</p>
        </div>

        <div className="space-y-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="glass-card p-6 hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{cert.title}</h3>
                    <p className="text-gray-400 text-sm">{cert.date}</p>
                  </div>
                </div>
                {cert.verified && (
                  <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-bold">
                    ✓ موثق
                  </span>
                )}
              </div>
              <div className="glass-card-light p-3">
                <div className="text-xs text-gray-400 mb-1">Blockchain Hash:</div>
                <code className="text-blue-400 text-xs font-mono">{cert.hash}</code>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm">
                  📥 تحميل PDF
                </button>
                <button className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm">
                  🔍 تحقق
                </button>
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
    { id: 1, name: 'ساعة ذكية', icon: '⌚', status: 'connected', battery: 85, data: 'نبض: 72 | خطوات: 8,432' },
    { id: 2, name: 'جهاز تتبع اللياقة', icon: '📿', status: 'connected', battery: 92, data: 'سعرات: 450 | مسافة: 5.2 كم' },
    { id: 3, name: 'كاميرا تحليل', icon: '📹', status: 'connected', battery: 100, data: 'دقة: 95% | تحليل: مباشر' },
    { id: 4, name: 'جهاز قياس السرعة', icon: '⚡', status: 'disconnected', battery: 0, data: 'غير متصل' },
  ];

  return (
    <section id="iot-devices" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📡 الأجهزة الذكية
          </h2>
          <p className="text-gray-400">تكامل مع أجهزة اللياقة والساعات الذكية</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {devices.map((device) => (
            <div key={device.id} className="glass-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl">
                  {device.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{device.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${device.status === 'connected' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                    <span className="text-gray-400 text-xs">
                      {device.status === 'connected' ? 'متصل' : 'غير متصل'}
                    </span>
                  </div>
                </div>
                {device.battery > 0 && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">{device.battery}%</div>
                    <div className="text-xs text-gray-400">بطارية</div>
                  </div>
                )}
              </div>
              <div className="glass-card-light p-3">
                <div className="text-gray-400 text-xs mb-1">البيانات الحية:</div>
                <div className="text-white text-sm">{device.data}</div>
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
  const [recognized, setRecognized] = useState(false);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setRecognized(true);
      setTimeout(() => setRecognized(false), 3000);
    }, 2000);
  };

  return (
    <section id="face-recognition" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            👤 التعرف على الوجه
          </h2>
          <p className="text-gray-400">تسجيل حضور آمن وسريع بالوجه</p>
        </div>

        <div className="glass-card p-8">
          <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
            {scanning ? (
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">👤</div>
                <p className="text-white font-bold">جاري التعرف...</p>
                <div className="mt-4 w-48 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-gradient-to-l from-purple-500 to-pink-500 animate-pulse" style={{ width: '70%' }} />
                </div>
              </div>
            ) : recognized ? (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-emerald-400 font-bold text-xl">تم التعرف بنجاح!</p>
                <p className="text-white mt-2">أحمد محمد علي - ناشئين U10</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-50">👤</div>
                <p className="text-gray-400">اضغط لبدء المسح</p>
              </div>
            )}
          </div>

          <button
            onClick={startScan}
            disabled={scanning}
            className="w-full py-4 bg-gradient-to-l from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {scanning ? '🔄 جاري المسح...' : '📷 ابدأ التعرف'}
          </button>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="glass-card-light p-3 text-center">
              <div className="text-2xl font-black text-emerald-400">99.5%</div>
              <div className="text-xs text-gray-400">دقة التعرف</div>
            </div>
            <div className="glass-card-light p-3 text-center">
              <div className="text-2xl font-black text-blue-400">&lt;2s</div>
              <div className="text-xs text-gray-400">زمن الاستجابة</div>
            </div>
            <div className="glass-card-light p-3 text-center">
              <div className="text-2xl font-black text-purple-400">AES</div>
              <div className="text-xs text-gray-400">تشفير البيانات</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
