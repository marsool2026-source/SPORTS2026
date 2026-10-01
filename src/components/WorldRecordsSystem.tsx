import { useState } from 'react';

interface WorldRecord {
  id: number;
  sport: string;
  event: string;
  record: string;
  unit: string;
  holder: string;
  country: string;
  date: string;
  category: 'speed' | 'strength' | 'endurance' | 'accuracy' | 'agility';
  ageGroup?: string;
}

interface PlayerRecord {
  id: number;
  playerId: string;
  playerName: string;
  sport: string;
  event: string;
  record: string;
  unit: string;
  date: string;
  type: 'training' | 'tournament' | 'personal';
  isWorldRecord?: boolean;
  improvement?: number;
}

const worldRecords: WorldRecord[] = [
  // Speed Records
  { id: 1, sport: 'ألعاب قوى', event: '100 متر', record: '9.58', unit: 'ثانية', holder: 'أوسين بولت', country: 'جامايكا', date: '2009', category: 'speed' },
  { id: 2, sport: 'ألعاب قوى', event: '200 متر', record: '19.19', unit: 'ثانية', holder: 'أوسين بولت', country: 'جامايكا', date: '2009', category: 'speed' },
  { id: 3, sport: 'سباحة', event: '100 متر حرة', record: '46.91', unit: 'ثانية', holder: 'بان زانلي', country: 'الصين', date: '2024', category: 'speed' },
  
  // Strength Records
  { id: 4, sport: 'رفع أثقال', event: 'خطف', record: '223', unit: 'كجم', holder: 'لاشا تالخادزه', country: 'جورجيا', date: '2021', category: 'strength' },
  { id: 5, sport: 'رفع أثقال', event: 'نتر', record: '267', unit: 'كجم', holder: 'حسين رضا زاده', country: 'إيران', date: '2004', category: 'strength' },
  
  // Endurance Records
  { id: 6, sport: 'ألعاب قوى', event: 'ماراثون', record: '2:01:09', unit: 'ساعة', holder: 'كيلي كيبتوم', country: 'كينيا', date: '2023', category: 'endurance' },
  { id: 7, sport: 'سباحة', event: '1500 متر حرة', record: '14:30.67', unit: 'دقيقة', holder: 'أحمد حفناوي', country: 'تونس', date: '2024', category: 'endurance' },
  
  // Accuracy Records
  { id: 8, sport: 'رماية', event: 'بندقية هوائية', record: '634.2', unit: 'نقطة', holder: 'يانغ هاوران', country: 'الصين', date: '2024', category: 'accuracy' },
  { id: 9, sport: 'كرة قدم', event: 'أكثر أهداف دولية', record: '130', unit: 'هدف', holder: 'كريستيانو رونالدو', country: 'البرتغال', date: '2024', category: 'accuracy' },
  
  // Agility Records
  { id: 10, sport: 'جمباز', event: 'شامل فردي', record: '91.265', unit: 'نقطة', holder: 'دايكي هاشيموتو', country: 'اليابان', date: '2021', category: 'agility' },
];

const playerRecords: PlayerRecord[] = [
  { id: 1, playerId: 'P001', playerName: 'أحمد محمد', sport: 'ألعاب قوى', event: '100 متر', record: '11.2', unit: 'ثانية', date: '2026-01-15', type: 'tournament', improvement: 0.3 },
  { id: 2, playerId: 'P002', playerName: 'محمد خالد', sport: 'سباحة', event: '50 متر حرة', record: '28.5', unit: 'ثانية', date: '2026-01-14', type: 'training', improvement: 0.5 },
  { id: 3, playerId: 'P003', playerName: 'يوسف أحمد', sport: 'رفع أثقال', event: 'خطف', record: '85', unit: 'كجم', date: '2026-01-13', type: 'personal', improvement: 5 },
  { id: 4, playerId: 'P001', playerName: 'أحمد محمد', sport: 'ألعاب قوى', event: '200 متر', record: '22.8', unit: 'ثانية', date: '2026-01-12', type: 'training', improvement: 0.4 },
  { id: 5, playerId: 'P004', playerName: 'عمر طارق', sport: 'كرة قدم', event: 'أهداف في الموسم', record: '25', unit: 'هدف', date: '2026-01-11', type: 'tournament', improvement: 3 },
];

export default function WorldRecordsSystem() {
  const [activeTab, setActiveTab] = useState<'world' | 'personal' | 'tracking'>('world');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const sports = ['all', ...new Set(worldRecords.map(r => r.sport))];
  const categories = ['all', 'speed', 'strength', 'endurance', 'accuracy', 'agility'];

  const filteredWorldRecords = worldRecords.filter(r => {
    if (selectedSport !== 'all' && r.sport !== selectedSport) return false;
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    const icons = {
      speed: '⚡',
      strength: '💪',
      endurance: '🔥',
      accuracy: '🎯',
      agility: '🤸'
    };
    return icons[category as keyof typeof icons] || '🏆';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      speed: 'from-blue-500 to-cyan-500',
      strength: 'from-red-500 to-orange-500',
      endurance: 'from-emerald-500 to-teal-500',
      accuracy: 'from-purple-500 to-violet-500',
      agility: 'from-amber-500 to-yellow-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <section id="world-records" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">الأرقام القياسية العالمية</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏆 الأرقام <span className="gradient-text">القياسية</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            تتبع الأرقام القياسية العالمية والرقم الشخصية وتطور اللاعبين
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'أرقام قياسية عالمية', value: worldRecords.length, icon: '🌍', color: 'from-amber-500 to-orange-500' },
            { label: 'أرقام شخصية', value: playerRecords.length, icon: '👤', color: 'from-blue-500 to-cyan-500' },
            { label: 'رياضات مختلفة', value: new Set(worldRecords.map(r => r.sport)).size, icon: '⚽', color: 'from-emerald-500 to-teal-500' },
            { label: 'تحسينات هذا الشهر', value: playerRecords.filter(r => r.improvement).length, icon: '📈', color: 'from-purple-500 to-violet-500' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center hover:scale-105 transition-transform">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'world', label: '🌍 الأرقام العالمية', icon: '🌍' },
            { id: 'personal', label: '👤 الأرقام الشخصية', icon: '👤' },
            { id: 'tracking', label: '📊 تتبع التطور', icon: '📊' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-amber-500 to-orange-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* World Records Tab */}
        {activeTab === 'world' && (
          <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50"
              >
                {sports.map(sport => (
                  <option key={sport} value={sport} className="bg-gray-900">
                    {sport === 'all' ? 'جميع الرياضات' : sport}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-gray-900">
                    {cat === 'all' ? 'جميع الفئات' : cat === 'speed' ? 'السرعة' : cat === 'strength' ? 'القوة' : cat === 'endurance' ? 'التحمل' : cat === 'accuracy' ? 'الدقة' : 'الرشاقة'}
                  </option>
                ))}
              </select>
            </div>

            {/* Records Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWorldRecords.map((record) => (
                <div key={record.id} className="glass-card p-5 hover:scale-105 transition-transform">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(record.category)} flex items-center justify-center text-xl shrink-0`}>
                      {getCategoryIcon(record.category)}
                    </div>
                    <div className="flex-1">
                      <div className="text-amber-300 text-xs mb-1">{record.sport}</div>
                      <h3 className="text-white font-bold text-sm">{record.event}</h3>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-3xl font-black text-white mb-1">
                      {record.record} <span className="text-lg text-gray-400">{record.unit}</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span className="text-white font-semibold">{record.holder}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🌍</span>
                      <span>{record.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{record.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Records Tab */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            {playerRecords.map((record) => (
              <div key={record.id} className="glass-card p-5 hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl shrink-0">
                      👤
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{record.playerName}</h3>
                      <div className="text-gray-400 text-xs mb-2">{record.sport} - {record.event}</div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-white font-bold text-lg">
                          {record.record} {record.unit}
                        </span>
                        {record.improvement && (
                          <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                            ↑ +{record.improvement} {record.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      record.type === 'tournament' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      record.type === 'training' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {record.type === 'tournament' ? '🏆 بطولة' : record.type === 'training' ? '⚽ تدريب' : '👤 شخصي'}
                    </div>
                    <div className="text-gray-500 text-xs mt-2">{record.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span>📊</span> تتبع تطور اللاعبين
            </h3>
            
            {/* Progress Chart */}
            <div className="space-y-4">
              {['أحمد محمد', 'محمد خالد', 'يوسف أحمد'].map((player, i) => (
                <div key={i} className="glass-card-light p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{player}</div>
                        <div className="text-gray-400 text-xs">تحسن بنسبة {(i + 1) * 5}%</div>
                      </div>
                    </div>
                    <div className="text-emerald-400 font-bold">+{(i + 1) * 50} نقطة</div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 transition-all duration-1000"
                      style={{ width: `${60 + i * 15}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Improvements */}
            <div className="mt-6">
              <h4 className="text-white font-bold mb-4">آخر التحسينات</h4>
              <div className="space-y-2">
                {playerRecords.slice(0, 3).map((record) => (
                  <div key={record.id} className="glass-card-light p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400">↑</span>
                      <div>
                        <div className="text-white text-sm font-semibold">{record.playerName}</div>
                        <div className="text-gray-400 text-xs">{record.event}</div>
                      </div>
                    </div>
                    <div className="text-emerald-400 font-bold">+{record.improvement} {record.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
