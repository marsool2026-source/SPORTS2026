import { useState, useEffect } from 'react';

interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  prize?: string;
  category: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  wins: number;
  avatar: string;
  trend: 'up' | 'down' | 'same';
}

const tournaments: Tournament[] = [
  { id: 1, name: 'بطولة الناشئين الشتوية', date: '2026-02-15', location: 'الملعب الرئيسي', participants: 32, status: 'upcoming', prize: 'كأس + ميداليات', category: 'ناشئين U10' },
  { id: 2, name: 'كأس الأكاديمية السنوي', date: '2026-03-20', location: 'استاد المدينة', participants: 64, status: 'upcoming', prize: 'جوائز قيمة', category: 'عام' },
  { id: 3, name: 'دوري البراعم', date: '2026-01-10', location: 'ملعب التدريب', participants: 16, status: 'ongoing', category: 'براعم U8' },
  { id: 4, name: 'بطولة السرعة', date: '2025-12-20', location: 'المضمار', participants: 24, status: 'completed', prize: 'شهادات تقدير', category: 'شباب U13' },
];

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'أحمد محمد علي', points: 2450, wins: 12, avatar: '🥇', trend: 'up' },
  { rank: 2, name: 'محمد خالد حسن', points: 2280, wins: 10, avatar: '🥈', trend: 'up' },
  { rank: 3, name: 'يوسف أحمد سعيد', points: 2150, wins: 9, avatar: '🥉', trend: 'down' },
  { rank: 4, name: 'عمر طارق محمود', points: 1980, wins: 8, avatar: '🏅', trend: 'same' },
  { rank: 5, name: 'كريم حسام الدين', points: 1850, wins: 7, avatar: '🏅', trend: 'up' },
];

export default function TournamentsSection() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeTab, setActiveTab] = useState<'upcoming' | 'leaderboard'>('upcoming');

  // Countdown timer for next tournament
  useEffect(() => {
    const targetDate = new Date('2026-02-15T18:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: Tournament['status']) => {
    const config = {
      upcoming: { label: 'قادمة', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      ongoing: { label: 'جارية الآن', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      completed: { label: 'مكتملة', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
    };
    return config[status];
  };

  return (
    <section id="tournaments" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">البطولات والمنافسات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏆 البطولات <span className="gradient-text">والمنافسات</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            متابعة البطولات القادمة، لوحة المتصدرين، والأرقام القياسية
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="glass-card p-6 mb-8 border border-amber-500/20">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-white mb-1">⏰ البطولة القادمة</h3>
            <p className="text-amber-300 text-sm">{tournaments[0].name}</p>
          </div>
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            {[
              { label: 'يوم', value: countdown.days },
              { label: 'ساعة', value: countdown.hours },
              { label: 'دقيقة', value: countdown.minutes },
              { label: 'ثانية', value: countdown.seconds },
            ].map((item, i) => (
              <div key={i} className="glass-card-light p-3 text-center">
                <div className="text-2xl md:text-3xl font-black text-amber-400">{item.value}</div>
                <div className="text-xs text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-l from-amber-500 to-orange-600 text-white shadow-lg'
                : 'glass-card text-gray-400 hover:text-white'
            }`}
          >
            📅 البطولات
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-gradient-to-l from-amber-500 to-orange-600 text-white shadow-lg'
                : 'glass-card text-gray-400 hover:text-white'
            }`}
          >
            🏅 لوحة المتصدرين
          </button>
        </div>

        {/* Content */}
        {activeTab === 'upcoming' ? (
          <div className="space-y-4">
            {tournaments.map((tournament) => {
              const status = getStatusBadge(tournament.status);
              return (
                <div key={tournament.id} className="glass-card p-5 hover:scale-[1.02] transition-transform">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${status.color}`}>
                          {status.label}
                        </span>
                        <span className="text-gray-500 text-xs">{tournament.category}</span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">{tournament.name}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          📅 {new Date(tournament.date).toLocaleDateString('ar-EG')}
                        </span>
                        <span className="flex items-center gap-1">
                          📍 {tournament.location}
                        </span>
                        <span className="flex items-center gap-1">
                          👥 {tournament.participants} مشارك
                        </span>
                      </div>
                      {tournament.prize && (
                        <div className="mt-2 text-amber-300 text-sm font-semibold">
                          🎁 الجائزة: {tournament.prize}
                        </div>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition-colors">
                      التسجيل
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🏅</span> أفضل 5 لاعبين
            </h3>
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className="glass-card-light p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    entry.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-yellow-500' :
                    entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                    entry.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-700' :
                    'bg-gray-700'
                  }`}>
                    {entry.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">#{entry.rank}</span>
                      <span className="text-white text-sm">{entry.name}</span>
                      <span className={`text-xs ${
                        entry.trend === 'up' ? 'text-emerald-400' :
                        entry.trend === 'down' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {entry.trend === 'up' ? '↑' : entry.trend === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {entry.wins} فوز • {entry.points} نقطة
                    </div>
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
      </div>
    </section>
  );
}
