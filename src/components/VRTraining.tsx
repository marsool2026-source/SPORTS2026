import { useState } from 'react';

interface VRExperience {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  icon: string;
  category: 'training' | 'simulation' | 'tour';
}

const vrExperiences: VRExperience[] = [
  { id: 1, title: 'محاكاة المباراة', description: 'عب في مباراة افتراضية كاملة', duration: '30 دقيقة', difficulty: 'متقدم', icon: '⚽', category: 'simulation' },
  { id: 2, title: 'تدريب التسديد', description: 'تدرب على التسديد على المرمى', duration: '15 دقيقة', difficulty: 'متوسط', icon: '🎯', category: 'training' },
  { id: 3, title: 'جولة الملعب', description: 'جولة افتراضية في الملعب', duration: '10 دقائق', difficulty: 'مبتدئ', icon: '🏟️', category: 'tour' },
  { id: 4, title: 'تدريب الحارس', description: 'تدرب على التصدي للكرات', duration: '20 دقيقة', difficulty: 'متقدم', icon: '🧤', category: 'training' },
];

export default function VRTraining() {
  const [selectedExperience, setSelectedExperience] = useState<VRExperience | null>(null);
  const [isInVR, setIsInVR] = useState(false);

  const startVR = (experience: VRExperience) => {
    setSelectedExperience(experience);
    setIsInVR(true);
  };

  const exitVR = () => {
    setIsInVR(false);
    setSelectedExperience(null);
  };

  if (isInVR && selectedExperience) {
    return (
      <section id="vr-training" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8 text-center">
            <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl overflow-hidden mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-pulse">{selectedExperience.icon}</div>
                  <h3 className="text-white text-3xl font-bold mb-2">{selectedExperience.title}</h3>
                  <p className="text-gray-300 mb-4">{selectedExperience.description}</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                    <span>⏱️ {selectedExperience.duration}</span>
                    <span>🎯 {selectedExperience.difficulty}</span>
                  </div>
                </div>
              </div>
              
              {/* VR Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  VR LIVE
                </div>
                <button
                  onClick={exitVR}
                  className="px-4 py-2 bg-white/10 backdrop-blur text-white text-sm rounded-lg hover:bg-white/20 transition-colors"
                >
                  ✕ خروج
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass-card-light p-4">
                <div className="text-2xl mb-2">🎮</div>
                <div className="text-white font-bold text-sm">التحكم</div>
                <div className="text-gray-400 text-xs mt-1">استخدم يديك للتفاعل</div>
              </div>
              <div className="glass-card-light p-4">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-white font-bold text-sm">الأداء</div>
                <div className="text-gray-400 text-xs mt-1">يتم تتبعه تلقائياً</div>
              </div>
              <div className="glass-card-light p-4">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-white font-bold text-sm">النقاط</div>
                <div className="text-gray-400 text-xs mt-1">+500 نقطة</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="vr-training" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">واقع افتراضي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🥽 التدريب بالواقع الافتراضي
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            تجارب تدريبية غامرة في بيئة افتراضية
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {vrExperiences.map((experience) => (
            <div key={experience.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="text-7xl">{experience.icon}</div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-purple-500/80 backdrop-blur text-white text-xs font-bold rounded">
                  VR
                </div>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{experience.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{experience.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>⏱️ {experience.duration}</span>
                <span>🎯 {experience.difficulty}</span>
              </div>
              <button
                onClick={() => startVR(experience)}
                className="w-full py-3 bg-gradient-to-l from-purple-500 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                🥽 ابدأ التجربة
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">🎮 متطلبات النظام</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-card-light p-4">
              <div className="text-2xl mb-2">🥽</div>
              <div className="text-white font-bold text-sm">نظارة VR</div>
              <div className="text-gray-400 text-xs mt-1">Oculus Quest 2 أو أحدث</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-2xl mb-2">💻</div>
              <div className="text-white font-bold text-sm">جهاز كمبيوتر</div>
              <div className="text-gray-400 text-xs mt-1">GPU: GTX 1060 أو أحدث</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-2xl mb-2">🌐</div>
              <div className="text-white font-bold text-sm">اتصال إنترنت</div>
              <div className="text-gray-400 text-xs mt-1">10 Mbps أو أسرع</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
