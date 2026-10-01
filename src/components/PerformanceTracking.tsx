import { useState } from 'react';

interface PerformanceMetric {
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: number;
  icon: string;
}

interface PlayerStats {
  name: string;
  ageGroup: string;
  avatar: string;
  metrics: PerformanceMetric[];
  achievements: string[];
}

const playerStats: PlayerStats = {
  name: 'أحمد محمد علي',
  ageGroup: 'ناشئين U10',
  avatar: '⚽',
  metrics: [
    { name: 'السرعة', current: 85, target: 100, unit: 'كم/س', trend: 5, icon: '🏃' },
    { name: 'القوة', current: 78, target: 100, unit: 'كجم', trend: 3, icon: '💪' },
    { name: 'التحمل', current: 92, target: 100, unit: 'دقيقة', trend: 8, icon: '🔥' },
    { name: 'المرونة', current: 88, target: 100, unit: '%', trend: 2, icon: '🤸' },
    { name: 'الدقة', current: 75, target: 100, unit: '%', trend: 4, icon: '🎯' },
  ],
  achievements: [
    '🏆 أفضل لاعب في بطولة الناشئين',
    '⚡ رقم قياسي في السرعة - يناير 2026',
    '🌟 لاعب الشهر - ديسمبر 2025',
    '🎯 أفضل دقة في التسديد',
  ],
};

export default function PerformanceTracking() {
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Generate chart data
  const generateChartData = () => {
    const data = [];
    for (let i = 0; i < 7; i++) {
      data.push({
        day: ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'][i],
        attendance: Math.floor(Math.random() * 3) + 1,
        performance: Math.floor(Math.random() * 30) + 70,
      });
    }
    return data;
  };

  const chartData = generateChartData();
  const maxPerformance = Math.max(...chartData.map(d => d.performance));

  return (
    <section id="performance" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">تتبع الأداء</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📈 تتبع <span className="gradient-text-blue">الأداء واللياقة</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            متابعة تطور أداء اللاعبين مع قياسات بدنية ورسوم بيانية تفاعلية
          </p>
        </div>

        {/* Player Selector */}
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {['أحمد محمد', 'يوسف سعيد', 'عمر طارق', 'كريم حسام'].map((player, i) => (
              <button
                key={i}
                onClick={() => setSelectedPlayer(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedPlayer === i
                    ? 'bg-gradient-to-l from-emerald-500 to-teal-600 text-white'
                    : 'glass-card-light text-gray-400 hover:text-white'
                }`}
              >
                {player}
              </button>
            ))}
          </div>
        </div>

        {/* Player Profile Card */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl shadow-lg">
              {playerStats.avatar}
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">{playerStats.name}</h3>
              <p className="text-gray-400 text-sm">{playerStats.ageGroup}</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {playerStats.metrics.map((metric, i) => {
              const progress = (metric.current / metric.target) * 100;
              return (
                <div key={i} className="glass-card-light p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{metric.icon}</span>
                    <span className={`text-xs font-bold ${
                      metric.trend > 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {metric.trend > 0 ? '+' : ''}{metric.trend}%
                    </span>
                  </div>
                  <div className="text-white font-bold text-lg mb-1">{metric.current}</div>
                  <div className="text-gray-400 text-xs mb-2">{metric.name}</div>
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Performance */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <span>📊</span> الأداء الأسبوعي
              </h3>
              <div className="flex gap-1">
                {(['week', 'month', 'year'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                      timeRange === range
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {range === 'week' ? 'أسبوع' : range === 'month' ? 'شهر' : 'سنة'}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="h-48 flex items-end justify-between gap-2">
              {chartData.map((data, i) => {
                const height = (data.performance / maxPerformance) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ height: `${height}%`, minHeight: '20px' }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-400">{data.day}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🏆</span> الإنجازات
            </h3>
            <div className="space-y-3">
              {playerStats.achievements.map((achievement, i) => (
                <div key={i} className="glass-card-light p-3 flex items-center gap-3 hover:bg-white/10 transition-colors">
                  <div className="text-2xl">{achievement.split(' ')[0]}</div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">
                      {achievement.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body Measurements */}
        <div className="mt-6 glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>📏</span> القياسات البدنية
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'الطول', value: '145', unit: 'سم', icon: '📏' },
              { label: 'الوزن', value: '38', unit: 'كجم', icon: '⚖️' },
              { label: 'BMI', value: '18.1', unit: '', icon: '💪' },
              { label: 'نبض القلب', value: '72', unit: 'نبضة/د', icon: '❤️' },
            ].map((item, i) => (
              <div key={i} className="glass-card-light p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-white font-bold text-xl">{item.value}</div>
                <div className="text-gray-400 text-xs mt-1">{item.label} {item.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
