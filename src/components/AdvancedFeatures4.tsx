import { useState } from 'react';

// ============================================
// 🎮 نظام Gamification المتقدم
// ============================================
export function GamificationSystem() {
  const [playerXP] = useState(2750);
  const [level] = useState(15);
  const [streak] = useState(7);

  const badges = [
    { id: 1, name: 'بطل الأسبوع', icon: '🏆', rarity: 'legendary', earned: true },
    { id: 2, name: 'سريع البرق', icon: '⚡', rarity: 'epic', earned: true },
    { id: 3, name: 'حارس مرمى', icon: '🧤', rarity: 'rare', earned: true },
    { id: 4, name: 'هداف', icon: '🎯', rarity: 'epic', earned: false },
    { id: 5, name: 'قائد الفريق', icon: '👑', rarity: 'legendary', earned: false },
    { id: 6, name: 'مبتدئ', icon: '🌟', rarity: 'common', earned: true },
  ];

  const dailyQuests = [
    { id: 1, title: 'حضور 3 حصص', progress: 2, target: 3, xp: 100, icon: '📅' },
    { id: 2, title: 'تسجيل 5 أهداف', progress: 3, target: 5, xp: 150, icon: '⚽' },
    { id: 3, title: 'مساعدة زميل', progress: 1, target: 1, xp: 75, icon: '🤝' },
  ];

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: 'from-gray-400 to-gray-500',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-amber-400 to-orange-600',
    };
    return colors[rarity] || colors.common;
  };

  return (
    <section id="gamification" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">Gamification</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎮 نظام <span className="gradient-text">الألعاب</span>
          </h2>
          <p className="text-gray-400">اكسب النقاط وارتقِ بالمستويات واحصل على شارات</p>
        </div>

        {/* Player Stats */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center gap-6 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg">
              🎮
            </div>
            <div className="flex-1">
              <div className="text-gray-400 text-sm">المستوى الحالي</div>
              <div className="text-white font-bold text-2xl">المستوى {level}</div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-l from-pink-500 to-purple-600" style={{ width: '75%' }} />
                </div>
                <span className="text-pink-400 font-bold text-sm">{playerXP}/3500 XP</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl">🔥</div>
              <div className="text-orange-400 font-bold">{streak} أيام</div>
              <div className="text-gray-400 text-xs">سلسلة</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4">🏅 الشارات والإنجازات</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div key={badge.id} className={`text-center p-3 rounded-xl ${badge.earned ? '' : 'opacity-40'}`}>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center text-3xl mx-auto mb-2 shadow-lg ${badge.earned ? '' : 'grayscale'}`}>
                  {badge.icon}
                </div>
                <div className="text-white text-xs font-bold">{badge.name}</div>
                <div className={`text-[10px] mt-1 ${
                  badge.rarity === 'legendary' ? 'text-amber-400' :
                  badge.rarity === 'epic' ? 'text-purple-400' :
                  badge.rarity === 'rare' ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {badge.rarity === 'legendary' ? 'أسطوري' : badge.rarity === 'epic' ? 'ملحمي' : badge.rarity === 'rare' ? 'نادر' : 'عادي'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Quests */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📋 المهام اليومية</h3>
          <div className="space-y-3">
            {dailyQuests.map((quest) => (
              <div key={quest.id} className="glass-card-light p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{quest.icon}</span>
                  <div className="flex-1">
                    <div className="text-white font-bold text-sm">{quest.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${quest.progress >= quest.target ? 'bg-emerald-500' : 'bg-gradient-to-l from-pink-500 to-purple-600'}`}
                          style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-xs">{quest.progress}/{quest.target}</span>
                    </div>
                  </div>
                  <div className="text-pink-400 font-bold text-sm">+{quest.xp} XP</div>
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
// 🤖 نظام تحليل الفيديو بالذكاء الاصطناعي
// ============================================
export function VideoAnalysisAI() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const startAnalysis = () => {
    setAnalyzing(true);
    setAnalysisComplete(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const analysisResults = [
    { metric: 'دقة التسديد', score: 87, improvement: '+5%', icon: '🎯' },
    { metric: 'سرعة الجري', score: 92, improvement: '+3%', icon: '⚡' },
    { metric: 'التمرير', score: 78, improvement: '+8%', icon: '🔄' },
    { metric: 'التمركز', score: 85, improvement: '+2%', icon: '📍' },
    { metric: 'القوة البدنية', score: 80, improvement: '+4%', icon: '💪' },
  ];

  return (
    <section id="video-analysis" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-xs font-semibold">AI Analysis</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤖 تحليل الفيديو بالذكاء الاصطناعي
          </h2>
          <p className="text-gray-400">تحليل تلقائي لفيديوهات التدريب واكتشاف الأخطاء</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Video Upload */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📹 رفع الفيديو</h3>
            <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
              {analyzing ? (
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-pulse">🔍</div>
                  <div className="text-white font-bold">جاري التحليل...</div>
                  <div className="mt-4 w-48 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-gradient-to-l from-cyan-500 to-blue-600 animate-pulse" style={{ width: '70%' }} />
                  </div>
                </div>
              ) : analysisComplete ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <div className="text-emerald-400 font-bold">اكتمل التحليل!</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4 opacity-50">📹</div>
                  <div className="text-gray-400">اضغط لرفع فيديو</div>
                </div>
              )}
            </div>
            <button
              onClick={startAnalysis}
              disabled={analyzing}
              className="w-full py-3 bg-gradient-to-l from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {analyzing ? '🔍 جاري التحليل...' : '🤖 بدء التحليل بالذكاء الاصطناعي'}
            </button>
          </div>

          {/* Analysis Results */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📊 نتائج التحليل</h3>
            {analysisComplete ? (
              <div className="space-y-3">
                {analysisResults.map((result, i) => (
                  <div key={i} className="glass-card-light p-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{result.icon}</span>
                      <div className="flex-1">
                        <div className="text-white font-bold text-sm">{result.metric}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-l from-cyan-500 to-blue-600" style={{ width: `${result.score}%` }} />
                          </div>
                          <span className="text-cyan-400 font-bold text-sm">{result.score}%</span>
                        </div>
                      </div>
                      <span className="text-emerald-400 text-xs font-bold">{result.improvement}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-50">📊</div>
                <p className="text-gray-400">ابدأ التحليل لعرض النتائج</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🔗 نظام NFT للشهادات
// ============================================
export function NFTCertificates() {
  const nfts = [
    { id: 1, name: 'شهادة بطل المنطقة', tokenId: '#0001', owner: 'أحمد محمد', price: '2.5 ETH', rarity: 'Legendary', image: '🏆' },
    { id: 2, name: 'شارة الهداف', tokenId: '#0042', owner: 'محمد خالد', price: '1.2 ETH', rarity: 'Epic', image: '⚽' },
    { id: 3, name: 'شهادة اللياقة', tokenId: '#0108', owner: 'يوسف أحمد', price: '0.8 ETH', rarity: 'Rare', image: '💪' },
    { id: 4, name: 'نجمة الصعود', tokenId: '#0256', owner: 'عمر طارق', price: '0.5 ETH', rarity: 'Common', image: '⭐' },
  ];

  return (
    <section id="nft-certificates" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">NFT</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔗 شهادات NFT الرقمية
          </h2>
          <p className="text-gray-400">شهادات وإنجازات رقمية فريدة على Blockchain</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div key={nft.id} className="glass-card overflow-hidden hover:scale-105 transition-all cursor-pointer">
              <div className={`aspect-square bg-gradient-to-br ${
                nft.rarity === 'Legendary' ? 'from-amber-500/30 to-orange-600/30' :
                nft.rarity === 'Epic' ? 'from-purple-500/30 to-violet-600/30' :
                nft.rarity === 'Rare' ? 'from-blue-500/30 to-cyan-600/30' :
                'from-gray-500/30 to-gray-600/30'
              } flex items-center justify-center`}>
                <div className="text-8xl">{nft.image}</div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm mb-1">{nft.name}</h3>
                <div className="text-gray-400 text-xs mb-2">Token: {nft.tokenId}</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-[10px]">المالك</div>
                    <div className="text-white text-xs">{nft.owner}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-gray-400 text-[10px]">السعر</div>
                    <div className="text-purple-400 text-xs font-bold">{nft.price}</div>
                  </div>
                </div>
                <div className={`mt-2 px-2 py-1 rounded-full text-[10px] font-bold text-center ${
                  nft.rarity === 'Legendary' ? 'bg-amber-500/20 text-amber-300' :
                  nft.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-300' :
                  nft.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {nft.rarity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🌍 نظام تعدد الفروع
// ============================================
export function MultiBranchSystem() {
  const branches = [
    { id: 1, name: 'الفرع الرئيسي - القاهرة', manager: 'كابتن محمود', players: 120, coaches: 8, revenue: '45,000 ج.م', status: 'active', icon: '🏢' },
    { id: 2, name: 'فرع الإسكندرية', manager: 'كابتن سارة', players: 85, coaches: 6, revenue: '32,000 ج.م', status: 'active', icon: '🏖️' },
    { id: 3, name: 'فرع الجيزة', manager: 'كابتن أحمد', players: 95, coaches: 7, revenue: '38,000 ج.م', status: 'active', icon: '🏛️' },
    { id: 4, name: 'فرع المنصورة', manager: 'كابتن محمد', players: 60, coaches: 4, revenue: '22,000 ج.م', status: 'active', icon: '🌳' },
  ];

  return (
    <section id="multi-branch" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">فروع متعددة</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🌍 نظام الفروع المتعددة
          </h2>
          <p className="text-gray-400">إدارة مركزية لجميع فروع الأكاديمية</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">🏢</div>
            <div className="text-2xl font-black text-white">{branches.length}</div>
            <div className="text-gray-400 text-xs">فروع</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-black text-blue-400">{branches.reduce((s, b) => s + b.players, 0)}</div>
            <div className="text-gray-400 text-xs">لاعب</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">👨‍🏫</div>
            <div className="text-2xl font-black text-purple-400">{branches.reduce((s, b) => s + b.coaches, 0)}</div>
            <div className="text-gray-400 text-xs">مدرب</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-black text-emerald-400">137K</div>
            <div className="text-gray-400 text-xs">إيرادات</div>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {branches.map((branch) => (
            <div key={branch.id} className="glass-card p-6 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl">
                  {branch.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{branch.name}</h3>
                  <p className="text-gray-400 text-sm">المدير: {branch.manager}</p>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">✓ نشط</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="glass-card-light p-2 text-center">
                  <div className="text-lg font-bold text-white">{branch.players}</div>
                  <div className="text-gray-400 text-[10px]">لاعب</div>
                </div>
                <div className="glass-card-light p-2 text-center">
                  <div className="text-lg font-bold text-white">{branch.coaches}</div>
                  <div className="text-gray-400 text-[10px]">مدرب</div>
                </div>
                <div className="glass-card-light p-2 text-center">
                  <div className="text-lg font-bold text-emerald-400">{branch.revenue}</div>
                  <div className="text-gray-400 text-[10px]">إيرادات</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📊 نظام Big Data والتحليلات
// ============================================
export function BigDataAnalytics() {
  const metrics = [
    { label: 'بيانات معالجة اليوم', value: '2.4M', icon: '📊', change: '+15%' },
    { label: 'وقت المعالجة', value: '45ms', icon: '⚡', change: '-20%' },
    { label: 'دقة التنبؤات', value: '94.7%', icon: '🎯', change: '+2.3%' },
    { label: 'نماذج ML نشطة', value: '12', icon: '🧠', change: '+3' },
  ];

  const dataPipelines = [
    { name: 'تحليل الأداء', status: 'active', records: '1.2M', lastRun: 'منذ 5 دقائق' },
    { name: 'تنبؤ الإصابات', status: 'active', records: '850K', lastRun: 'منذ 15 دقيقة' },
    { name: 'تحليل الحضور', status: 'active', records: '2.1M', lastRun: 'منذ دقيقة' },
    { name: 'تقارير مالية', status: 'scheduled', records: '500K', lastRun: 'بعد ساعة' },
  ];

  return (
    <section id="big-data" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            <span className="text-indigo-300 text-xs font-semibold">Big Data</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 Big Data والتحليلات المتقدمة
          </h2>
          <p className="text-gray-400">تحليل بيانات ضخمة لاتخاذ قرارات ذكية</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, i) => (
            <div key={i} className="glass-card p-5 text-center hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-2xl font-black text-white mb-1">{metric.value}</div>
              <div className="text-gray-400 text-xs mb-1">{metric.label}</div>
              <div className="text-emerald-400 text-xs font-bold">{metric.change}</div>
            </div>
          ))}
        </div>

        {/* Data Pipelines */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">🔄 خطوط معالجة البيانات</h3>
          <div className="space-y-3">
            {dataPipelines.map((pipeline, i) => (
              <div key={i} className="glass-card-light p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${pipeline.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <div>
                    <div className="text-white font-bold text-sm">{pipeline.name}</div>
                    <div className="text-gray-400 text-xs">{pipeline.records} سجل • {pipeline.lastRun}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  pipeline.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {pipeline.status === 'active' ? '🟢 نشط' : '⏰ مجدول'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
