import { useState } from 'react';

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
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

const challenges: Challenge[] = [
  { id: 1, title: 'تحدي الأسبوع', description: 'احضر 5 حصص تدريبية', points: 500, progress: 3, target: 5, deadline: '2026-01-27', status: 'active', icon: '📅', difficulty: 'easy' },
  { id: 2, title: 'تحدي اللياقة', description: 'حقق 90% في اختبار اللياقة', points: 1000, progress: 85, target: 90, deadline: '2026-02-01', status: 'active', icon: '💪', difficulty: 'medium' },
  { id: 3, title: 'تحدي السرعة', description: 'حطم رقمك القياسي', points: 1500, progress: 60, target: 100, deadline: '2026-02-15', status: 'active', icon: '⚡', difficulty: 'hard' },
  { id: 4, title: 'تحدي الروح الرياضية', description: 'احصل على 10 شهادات روح رياضية', points: 800, progress: 7, target: 10, deadline: '2026-01-31', status: 'active', icon: '🤝', difficulty: 'medium' },
];

const achievements: Achievement[] = [
  { id: 1, title: 'البداية', description: 'أكمل أول تدريب', icon: '🎯', unlocked: true, date: '2026-01-01' },
  { id: 2, title: 'المثابر', description: 'احضر 10 حصص متتالية', icon: '🔥', unlocked: true, date: '2026-01-10' },
  { id: 3, title: 'البطل', description: 'افز ببطولة', icon: '🏆', unlocked: true, date: '2026-01-15' },
  { id: 4, title: 'الأسطورة', description: 'حقق 1000 نقطة', icon: '⭐', unlocked: false },
  { id: 5, title: 'القائد', description: 'كن قائد الفريق', icon: '👑', unlocked: false },
  { id: 6, title: 'المعلم', description: 'ساعد 5 لاعبين', icon: '🎓', unlocked: false },
];

const leaderboard = [
  { rank: 1, name: 'أحمد محمد', points: 4850, level: 'أسطوري', avatar: '👑' },
  { rank: 2, name: 'محمد خالد', points: 3200, level: 'بلاتيني', avatar: '💎' },
  { rank: 3, name: 'أنت', points: 2750, level: 'ذهبي', avatar: '🥇' },
  { rank: 4, name: 'يوسف أحمد', points: 1850, level: 'ذهبي', avatar: '🥇' },
  { rank: 5, name: 'عمر طارق', points: 1200, level: 'فضي', avatar: '🥈' },
];

export default function GamificationSystem() {
  const [activeTab, setActiveTab] = useState<'challenges' | 'achievements' | 'leaderboard'>('challenges');
  const [playerPoints] = useState(2750);

  return (
    <section id="gamification" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">نظام الألعاب</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎮 نظام <span className="gradient-text">الألعاب والتحديات</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            تحديات يومية، شارات، ولوحة متصدرين تفاعلية
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-black text-pink-400">{challenges.filter(c => c.status === 'active').length}</div>
            <div className="text-gray-400 text-xs">تحديات نشطة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-black text-amber-400">{achievements.filter(a => a.unlocked).length}</div>
            <div className="text-gray-400 text-xs">شارات مكتسبة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-black text-purple-400">{playerPoints}</div>
            <div className="text-gray-400 text-xs">نقاطك</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-black text-blue-400">#3</div>
            <div className="text-gray-400 text-xs">ترتيبك</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'challenges', label: '🎯 التحديات' },
            { id: 'achievements', label: '🏆 الشارات' },
            { id: 'leaderboard', label: '📊 المتصدرون' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            {challenges.map((challenge) => {
              const difficultyColors = {
                easy: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                hard: 'bg-red-500/20 text-red-300 border-red-500/30'
              };
              const difficultyLabels = { easy: 'سهل', medium: 'متوسط', hard: 'صعب' };

              return (
                <div key={challenge.id} className="glass-card p-6 hover:scale-[1.02] transition-transform">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl shrink-0">
                      {challenge.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-bold text-lg">{challenge.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${difficultyColors[challenge.difficulty]}`}>
                          {difficultyLabels[challenge.difficulty]}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{challenge.description}</p>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-400">الموعد النهائي: {challenge.deadline}</span>
                        <span className="text-pink-400 font-bold">+{challenge.points} نقطة</span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-l from-pink-500 to-purple-600 transition-all duration-1000"
                          style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{challenge.progress}/{challenge.target}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`glass-card p-6 text-center transition-all ${
                  achievement.unlocked ? 'hover:scale-105' : 'opacity-50'
                }`}
              >
                <div className={`w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                    : 'bg-gray-700'
                }`}>
                  {achievement.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{achievement.title}</h3>
                <p className="text-gray-400 text-xs mb-3">{achievement.description}</p>
                {achievement.unlocked && achievement.date && (
                  <div className="text-emerald-400 text-xs">✓ تم فتحها في {achievement.date}</div>
                )}
                {!achievement.unlocked && (
                  <div className="text-gray-500 text-xs">🔒 مقفلة</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>📊</span> لوحة المتصدرين
            </h3>
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`glass-card-light p-4 flex items-center gap-4 ${
                    entry.name === 'أنت' ? 'ring-2 ring-pink-500/50' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    entry.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-yellow-500' :
                    entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                    entry.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-700' :
                    'bg-gray-700'
                  }`}>
                    {entry.rank <= 3 ? entry.avatar : `#${entry.rank}`}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{entry.name}</span>
                      {entry.name === 'أنت' && (
                        <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-xs">أنت</span>
                      )}
                    </div>
                    <div className="text-gray-400 text-xs">{entry.level}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-pink-400">{entry.points}</div>
                    <div className="text-[10px] text-gray-500">نقطة</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
