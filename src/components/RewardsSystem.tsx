import { useState } from 'react';

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  icon: string;
  category: 'attendance' | 'performance' | 'special';
}

interface PlayerLevel {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  icon: string;
  benefits: string[];
}

const rewards: Reward[] = [
  { id: 1, title: 'حضور 10 حصص', description: 'احضر 10 حصص تدريبية', points: 100, icon: '📅', category: 'attendance' },
  { id: 2, title: 'حضور 25 حصة', description: 'احضر 25 حصة تدريبية', points: 300, icon: '🎯', category: 'attendance' },
  { id: 3, title: 'حضور 50 حصة', description: 'احضر 50 حصة تدريبية', points: 700, icon: '🏆', category: 'attendance' },
  { id: 4, title: 'أداء ممتاز', description: 'حقق تقييم 90%+ في اختبار', points: 200, icon: '⭐', category: 'performance' },
  { id: 5, title: 'تحسن ملحوظ', description: 'تحسن أداؤك بنسبة 20%', points: 400, icon: '📈', category: 'performance' },
  { id: 6, title: 'بطل البطولة', description: 'افز ببطولة داخلية', points: 500, icon: '🥇', category: 'special' },
  { id: 7, title: 'روح رياضية', description: 'احصل على 5 شهادات روح رياضية', points: 250, icon: '🤝', category: 'special' },
  { id: 8, title: 'قائد الفريق', description: 'كن قائد الفريق لمدة شهر', points: 350, icon: '👑', category: 'special' },
];

const levels: PlayerLevel[] = [
  { level: 1, name: 'مبتدئ', minPoints: 0, maxPoints: 499, color: 'from-gray-400 to-gray-500', icon: '🥉', benefits: ['كارنيه رقمي', 'تقرير شهري'] },
  { level: 2, name: 'متقدم', minPoints: 500, maxPoints: 1499, color: 'from-blue-400 to-cyan-500', icon: '🥈', benefits: ['كارنيه رقمي', 'تقرير أسبوعي', 'خصم 5% منتجات'] },
  { level: 3, name: 'محترف', minPoints: 1500, maxPoints: 2999, color: 'from-amber-400 to-orange-500', icon: '🥇', benefits: ['كارنيه VIP', 'تقرير يومي', 'خصم 10% منتجات', 'حصة خاصة مجانية'] },
  { level: 4, name: 'بطل', minPoints: 3000, maxPoints: 99999, color: 'from-purple-400 to-pink-500', icon: '👑', benefits: ['كارنيه VIP', 'تقرير يومي', 'خصم 20% منتجات', 'حصتان خاصتان', 'خدمة نقل مجانية'] },
];

export default function RewardsSystem() {
  const [playerPoints] = useState(1250);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const currentLevel = levels.find(l => playerPoints >= l.minPoints && playerPoints <= l.maxPoints) || levels[0];
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progressToNext = nextLevel 
    ? ((playerPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 
    : 100;

  return (
    <section id="rewards" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">المكافآت والولاء</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏅 نظام <span className="gradient-text">المكافآت</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            اكسب النقاط واحصل على مكافآت حصرية
          </p>
        </div>

        {/* Player Status */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentLevel.color} flex items-center justify-center text-4xl shadow-lg`}>
              {currentLevel.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-xl mb-1">المستوى الحالي: {currentLevel.name}</h3>
              <p className="text-gray-400 text-sm">
                {nextLevel ? `المستوى التالي: ${nextLevel.name} (${nextLevel.minPoints} نقطة)` : 'أعلى مستوى!'}
              </p>
            </div>
            <div className="text-left">
              <div className="text-3xl font-black text-amber-400">{playerPoints}</div>
              <div className="text-gray-400 text-xs">نقطة</div>
            </div>
          </div>

          {/* Progress Bar */}
          {nextLevel && (
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>{currentLevel.minPoints} نقطة</span>
                <span>{nextLevel.minPoints} نقطة</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-l ${currentLevel.color} transition-all duration-1000`}
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <div className="text-center text-xs text-gray-400 mt-2">
                {nextLevel.minPoints - playerPoints} نقطة للوصول للمستوى التالي
              </div>
            </div>
          )}

          {/* Current Benefits */}
          <div className="mt-6">
            <h4 className="text-white font-bold text-sm mb-3">مزايا مستواك الحالي:</h4>
            <div className="flex flex-wrap gap-2">
              {currentLevel.benefits.map((benefit, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
                  ✓ {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Levels */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {levels.map((level) => (
            <div
              key={level.level}
              className={`glass-card p-5 text-center ${
                level.level === currentLevel.level ? 'ring-2 ring-amber-500/50' : ''
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg`}>
                {level.icon}
              </div>
              <h4 className="text-white font-bold mb-1">{level.name}</h4>
              <p className="text-gray-400 text-xs mb-2">
                {level.minPoints} - {level.maxPoints === 99999 ? '+' : level.maxPoints} نقطة
              </p>
              <div className="text-xs text-gray-500">
                {level.benefits.length} مزايا
              </div>
            </div>
          ))}
        </div>

        {/* Rewards */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span>🎁</span> المكافآت المتاحة
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.map((reward) => {
              const canClaim = playerPoints >= reward.points;
              return (
                <div
                  key={reward.id}
                  onClick={() => canClaim && setSelectedReward(reward)}
                  className={`glass-card-light p-4 cursor-pointer transition-all ${
                    canClaim ? 'hover:scale-105 hover:bg-white/10' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="text-3xl mb-2">{reward.icon}</div>
                  <h4 className="text-white font-bold text-sm mb-1">{reward.title}</h4>
                  <p className="text-gray-400 text-xs mb-2 leading-relaxed">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-sm">{reward.points} نقطة</span>
                    {canClaim && (
                      <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        متاح
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Claim Modal */}
        {selectedReward && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card p-8 max-w-md w-full text-center">
              <div className="text-6xl mb-4">{selectedReward.icon}</div>
              <h3 className="text-white font-bold text-xl mb-2">{selectedReward.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{selectedReward.description}</p>
              <div className="text-amber-400 font-bold text-2xl mb-6">{selectedReward.points} نقطة</div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedReward(null)}
                  className="flex-1 py-3 bg-gradient-to-l from-amber-500 to-orange-600 text-white font-bold rounded-lg shadow-lg"
                >
                  استلام المكافأة 🎁
                </button>
                <button
                  onClick={() => setSelectedReward(null)}
                  className="px-6 py-3 glass-card text-white rounded-lg"
                >
                  لاحقاً
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
