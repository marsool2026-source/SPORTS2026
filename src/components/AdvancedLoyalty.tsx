import { useState } from 'react';

interface LoyaltyLevel {
  name: string;
  icon: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  benefits: string[];
  badge: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  progress: number;
  target: number;
  deadline: string;
  status: 'active' | 'completed' | 'expired';
  icon: string;
}

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  icon: string;
  category: 'training' | 'equipment' | 'experience' | 'recognition';
  available: boolean;
}

const levels: LoyaltyLevel[] = [
  { name: 'برونزي', icon: '🥉', minPoints: 0, maxPoints: 499, color: 'from-amber-700 to-amber-900', benefits: ['كارنيه رقمي', 'تقرير شهري', 'دخول الملعب'], badge: '🥉' },
  { name: 'فضي', icon: '🥈', minPoints: 500, maxPoints: 1499, color: 'from-gray-300 to-gray-500', benefits: ['كل مزايا البرونزي', 'خصم 5% منتجات', 'حصة خاصة مجانية', 'أولوية الحجز'], badge: '🥈' },
  { name: 'ذهبي', icon: '🥇', minPoints: 1500, maxPoints: 2999, color: 'from-yellow-400 to-amber-500', benefits: ['كل مزايا الفضي', 'خصم 15% منتجات', 'حصتان خاصتان', 'ملابس مجانية', 'دعوة لبطولات VIP'], badge: '🥇' },
  { name: 'بلاتيني', icon: '💎', minPoints: 3000, maxPoints: 4999, color: 'from-cyan-300 to-blue-500', benefits: ['كل مزايا الذهبي', 'خصم 25% منتجات', 'مدرب شخصي', 'نقل مجاني', 'تغطية إعلامية'], badge: '💎' },
  { name: 'أسطوري', icon: '👑', minPoints: 5000, maxPoints: 99999, color: 'from-purple-500 to-pink-500', benefits: ['كل المزايا', 'خصم 40%', 'عقد رعاية', 'سفير الأكاديمية', 'تدريب مع محترفين'], badge: '👑' },
];

const challenges: Challenge[] = [
  { id: 1, title: 'حضور 10 حصص', description: 'احضر 10 حصص تدريبية متتالية', points: 200, progress: 7, target: 10, deadline: '2026-02-01', status: 'active', icon: '📅' },
  { id: 2, title: 'تحدي اللياقة', description: 'حقق 90% في اختبار اللياقة', points: 300, progress: 85, target: 90, deadline: '2026-01-31', status: 'active', icon: '💪' },
  { id: 3, title: 'روح رياضية', description: 'احصل على 5 شهادات روح رياضية', points: 150, progress: 3, target: 5, deadline: '2026-02-15', status: 'active', icon: '🤝' },
  { id: 4, title: 'بطل الأسبوع', description: 'حقق أعلى نتيجة في التدريب', points: 250, progress: 100, target: 100, deadline: '2026-01-20', status: 'completed', icon: '🏆' },
  { id: 5, title: 'تحدي السرعة', description: 'حطم رقمك القياسي في 100 متر', points: 400, progress: 60, target: 100, deadline: '2026-02-28', status: 'active', icon: '⚡' },
];

const rewards: Reward[] = [
  { id: 1, title: 'حصة تدريبية مجانية', description: 'حصة خاصة مع مدرب', points: 500, icon: '🏋️', category: 'training', available: true },
  { id: 2, title: 'قميص الأكاديمية', description: 'قميص رسمي بشعار الأكاديمية', points: 800, icon: '👕', category: 'equipment', available: true },
  { id: 3, title: 'MEGA PROTEIN', description: 'عبوة بروتين مجانية', points: 600, icon: '🥤', category: 'equipment', available: true },
  { id: 4, title: 'تدريب مع بطل', description: 'جلسة تدريب مع لاعب محترف', points: 1500, icon: '⭐', category: 'experience', available: true },
  { id: 5, title: 'شهادة تقدير', description: 'شهادة إنجاز رسمية', points: 300, icon: '📜', category: 'recognition', available: true },
  { id: 6, title: 'رحلة رياضية', description: 'رحلة لملعب عالمي', points: 3000, icon: '✈️', category: 'experience', available: false },
  { id: 7, title: 'معدات رياضية', description: 'حذاء رياضي احترافي', points: 1200, icon: '👟', category: 'equipment', available: true },
  { id: 8, title: 'صورة احترافية', description: 'جلسة تصوير احترافية', points: 700, icon: '📸', category: 'recognition', available: true },
];

export default function AdvancedLoyalty() {
  const [playerPoints] = useState(2750);
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'rewards' | 'leaderboard'>('overview');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const currentLevel = levels.find(l => playerPoints >= l.minPoints && playerPoints <= l.maxPoints) || levels[0];
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progressToNext = nextLevel ? ((playerPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 : 100;

  const leaderboard = [
    { rank: 1, name: 'أحمد محمد', points: 4850, level: 'أسطوري', icon: '👑' },
    { rank: 2, name: 'محمد خالد', points: 3200, level: 'بلاتيني', icon: '💎' },
    { rank: 3, name: 'أنت', points: playerPoints, level: currentLevel.name, icon: currentLevel.icon },
    { rank: 4, name: 'يوسف أحمد', points: 1850, level: 'ذهبي', icon: '🥇' },
    { rank: 5, name: 'عمر طارق', points: 1200, level: 'فضي', icon: '🥈' },
    { rank: 6, name: 'كريم حسام', points: 750, level: 'فضي', icon: '🥈' },
    { rank: 7, name: 'زياد إبراهيم', points: 420, level: 'برونزي', icon: '🥉' },
  ];

  return (
    <section id="advanced-loyalty" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">نظام متقدم</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏆 نظام <span className="gradient-text">الولاء المتقدم</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            5 مستويات + تحديات أسبوعية + مكافآت حصرية
          </p>
        </div>

        {/* Player Status Card */}
        <div className="glass-card p-6 mb-8 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${currentLevel.color} opacity-10`} />
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${currentLevel.color} flex items-center justify-center text-5xl shadow-2xl`}>
                {currentLevel.icon}
              </div>
              <div className="flex-1 text-center md:text-right">
                <div className="text-gray-400 text-sm mb-1">المستوى الحالي</div>
                <h3 className="text-white font-bold text-3xl mb-2">{currentLevel.name}</h3>
                <div className="text-4xl font-black text-amber-400">{playerPoints} <span className="text-lg text-gray-400">نقطة</span></div>
              </div>
              <div className="flex-1 w-full">
                {nextLevel && (
                  <>
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>{currentLevel.name} ({currentLevel.minPoints})</span>
                      <span>{nextLevel.name} ({nextLevel.minPoints})</span>
                    </div>
                    <div className="h-4 bg-gray-700 rounded-full overflow-hidden mb-2">
                      <div className={`h-full bg-gradient-to-l ${currentLevel.color} transition-all duration-1000 rounded-full`} style={{ width: `${progressToNext}%` }} />
                    </div>
                    <div className="text-center text-xs text-gray-400">
                      {nextLevel.minPoints - playerPoints} نقطة للوصول إلى {nextLevel.name} {nextLevel.icon}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Current Benefits */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-white font-bold mb-3">✨ مزايا مستواك الحالي:</h4>
              <div className="flex flex-wrap gap-2">
                {currentLevel.benefits.map((benefit, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: '📊 نظرة عامة' },
            { id: 'challenges', label: '🎯 التحديات' },
            { id: 'rewards', label: '🎁 المكافآت' },
            { id: 'leaderboard', label: '🏅 المتصدرون' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-amber-500 to-orange-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Levels */}
            <h3 className="text-white font-bold text-xl mb-4">🎖️ المستويات</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {levels.map((level, i) => (
                <div
                  key={i}
                  className={`glass-card p-5 text-center ${
                    level.name === currentLevel.name ? 'ring-2 ring-amber-500/50 scale-105' : ''
                  } transition-all`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg`}>
                    {level.icon}
                  </div>
                  <h4 className="text-white font-bold mb-1">{level.name}</h4>
                  <p className="text-gray-400 text-xs mb-2">{level.minPoints} - {level.maxPoints === 99999 ? '∞' : level.maxPoints} نقطة</p>
                  <div className="text-xs text-gray-500">{level.benefits.length} ميزة</div>
                </div>
              ))}
            </div>

            {/* Points History */}
            <h3 className="text-white font-bold text-xl mb-4">📈 سجل النقاط</h3>
            <div className="glass-card p-6">
              <div className="space-y-3">
                {[
                  { action: 'حضور تدريب', points: 50, date: 'اليوم', icon: '✅' },
                  { action: 'إحالة صديق', points: 100, date: 'أمس', icon: '🤝' },
                  { action: 'إكمال تحدي', points: 250, date: 'منذ يومين', icon: '🎯' },
                  { action: 'شراء منتج', points: 30, date: 'منذ 3 أيام', icon: '🛒' },
                  { action: 'تقييم مدرب', points: 20, date: 'منذ 4 أيام', icon: '⭐' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between glass-card-light p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-white text-sm font-semibold">{item.action}</div>
                        <div className="text-gray-500 text-xs">{item.date}</div>
                      </div>
                    </div>
                    <div className="text-emerald-400 font-bold">+{item.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="glass-card p-5">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl shrink-0">
                    {challenge.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-bold">{challenge.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        challenge.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                        challenge.status === 'expired' ? 'bg-red-500/20 text-red-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {challenge.status === 'completed' ? '✓ مكتمل' : challenge.status === 'expired' ? '✗ منتهي' : '⏰ نشط'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{challenge.description}</p>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-400">الموعد النهائي: {challenge.deadline}</span>
                      <span className="text-amber-400 font-bold">+{challenge.points} نقطة</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 rounded-full ${
                          challenge.progress >= 100 ? 'bg-emerald-500' : 'bg-gradient-to-l from-amber-500 to-orange-500'
                        }`}
                        style={{ width: `${Math.min(challenge.progress, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1 text-left">{challenge.progress}/{challenge.target}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rewards.map((reward) => {
                const canRedeem = playerPoints >= reward.points && reward.available;
                return (
                  <div
                    key={reward.id}
                    onClick={() => canRedeem && setSelectedReward(reward)}
                    className={`glass-card p-5 transition-all ${
                      canRedeem ? 'cursor-pointer hover:scale-105' : 'opacity-50'
                    }`}
                  >
                    <div className="text-4xl mb-3 text-center">{reward.icon}</div>
                    <h4 className="text-white font-bold text-sm mb-1 text-center">{reward.title}</h4>
                    <p className="text-gray-400 text-xs mb-3 text-center">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-bold">{reward.points} نقطة</span>
                      {canRedeem && (
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
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="glass-card p-6">
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`glass-card-light p-4 flex items-center gap-4 ${
                    entry.name === 'أنت' ? 'ring-2 ring-amber-500/50' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    entry.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-yellow-500' :
                    entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                    entry.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-700' :
                    'bg-gray-700'
                  }`}>
                    {entry.rank <= 3 ? entry.icon : `#${entry.rank}`}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{entry.name}</span>
                      {entry.name === 'أنت' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px]">أنت</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{entry.level}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-amber-400">{entry.points}</div>
                    <div className="text-[10px] text-gray-500">نقطة</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Redeem Modal */}
        {selectedReward && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedReward(null)}>
            <div className="glass-card p-8 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
              <div className="text-6xl mb-4">{selectedReward.icon}</div>
              <h3 className="text-white font-bold text-xl mb-2">{selectedReward.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{selectedReward.description}</p>
              <div className="text-3xl font-black text-amber-400 mb-6">{selectedReward.points} نقطة</div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gradient-to-l from-amber-500 to-orange-600 text-white font-bold rounded-lg">
                  استلام المكافأة 🎁
                </button>
                <button onClick={() => setSelectedReward(null)} className="px-6 py-3 glass-card text-white rounded-lg">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
