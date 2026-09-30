import { useState } from 'react';

interface AIInsight {
  id: number;
  type: 'performance' | 'injury' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  icon: string;
  color: string;
}

interface PlayerAnalysis {
  playerId: string;
  playerName: string;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  injuryRisk: 'low' | 'medium' | 'high';
}

const aiInsights: AIInsight[] = [
  {
    id: 1,
    type: 'performance',
    title: 'تحسن ملحوظ في السرعة',
    description: 'أحمد محمد حقق تحسناً بنسبة 15% في سرعة الجري خلال الشهر الماضي',
    confidence: 92,
    icon: '⚡',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    type: 'injury',
    title: 'تحذير: خطر إصابة محتمل',
    description: 'يوسف أحمد يظهر علامات إرهاق في العضلات. يُنصح بيوم راحة',
    confidence: 78,
    icon: '⚠️',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 3,
    type: 'recommendation',
    title: 'توصية تدريبية',
    description: 'محمد خالد يحتاج لتركيز أكبر على تمارين المرونة لتحسين الأداء',
    confidence: 85,
    icon: '💡',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 4,
    type: 'performance',
    title: 'أداء استثنائي',
    description: 'عمر طارق حقق أفضل نتيجة له في بطولة المنطقة',
    confidence: 95,
    icon: '🏆',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    id: 5,
    type: 'recommendation',
    title: 'خطة تدريب مقترحة',
    description: 'يُنصح بزيادة كثافة التدريب بنسبة 20% للأسبوع القادم',
    confidence: 88,
    icon: '📋',
    color: 'from-purple-500 to-violet-500'
  }
];

const playerAnalysis: PlayerAnalysis[] = [
  {
    playerId: 'P001',
    playerName: 'أحمد محمد',
    overallScore: 87,
    strengths: ['السرعة', 'التحمل', 'التركيز'],
    weaknesses: ['المرونة'],
    recommendations: ['إضافة تمارين يوجا', 'زيادة تمارين الإطالة'],
    injuryRisk: 'low'
  },
  {
    playerId: 'P002',
    playerName: 'محمد خالد',
    overallScore: 82,
    strengths: ['القوة', 'التقنية'],
    weaknesses: ['السرعة', 'المرونة'],
    recommendations: ['تمارين سرعة أسبوعية', 'تمارين مرونة يومية'],
    injuryRisk: 'medium'
  },
  {
    playerId: 'P003',
    playerName: 'يوسف أحمد',
    overallScore: 79,
    strengths: ['التحمل', 'القوة'],
    weaknesses: ['التركيز', 'السرعة'],
    recommendations: ['تمارين تركيز ذهني', 'تمارين سرعة انفجارية'],
    injuryRisk: 'high'
  }
];

export default function AIAnalysis() {
  const [selectedPlayer, setSelectedPlayer] = useState<string>('P001');
  const [activeTab, setActiveTab] = useState<'insights' | 'analysis' | 'predictions'>('insights');

  const currentPlayer = playerAnalysis.find(p => p.playerId === selectedPlayer);

  const getRiskColor = (risk: string) => {
    const colors = {
      low: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      medium: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
      high: 'text-red-400 bg-red-500/20 border-red-500/30'
    };
    return colors[risk as keyof typeof colors];
  };

  return (
    <section id="ai-analysis" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">الذكاء الاصطناعي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤖 تحليل <span className="gradient-text">الذكاء الاصطناعي</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            تحليل متقدم للأداء وتوصيات ذكية وتنبؤات بالإصابات
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'تحليلات اليوم', value: '24', icon: '📊', color: 'from-blue-500 to-cyan-500' },
            { label: 'توصيات نشطة', value: '12', icon: '💡', color: 'from-emerald-500 to-teal-500' },
            { label: 'تحذيرات', value: '3', icon: '⚠️', color: 'from-red-500 to-orange-500' },
            { label: 'دقة التنبؤ', value: '94%', icon: '🎯', color: 'from-purple-500 to-violet-500' },
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
            { id: 'insights', label: '💡 الرؤى الذكية', icon: '💡' },
            { id: 'analysis', label: '📊 تحليل اللاعبين', icon: '📊' },
            { id: 'predictions', label: '🔮 التنبؤات', icon: '🔮' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-purple-500 to-violet-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="grid md:grid-cols-2 gap-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="glass-card p-5 hover:scale-[1.02] transition-transform">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center text-xl shrink-0`}>
                    {insight.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">{insight.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{insight.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-l ${insight.color}`}
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{insight.confidence}%</span>
                  </div>
                  <span className="text-xs text-gray-500">دقة التحليل</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div>
            {/* Player Selector */}
            <div className="glass-card p-4 mb-6">
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {playerAnalysis.map((player) => (
                  <button
                    key={player.playerId}
                    onClick={() => setSelectedPlayer(player.playerId)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                      selectedPlayer === player.playerId
                        ? 'bg-gradient-to-l from-purple-500 to-violet-600 text-white'
                        : 'glass-card-light text-gray-400 hover:text-white'
                    }`}
                  >
                    {player.playerName}
                  </button>
                ))}
              </div>
            </div>

            {/* Player Analysis */}
            {currentPlayer && (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-lg">التقييم العام</h3>
                    <div className="text-4xl font-black text-purple-400">{currentPlayer.overallScore}/100</div>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-purple-500 to-violet-600 transition-all duration-1000"
                      style={{ width: `${currentPlayer.overallScore}%` }}
                    />
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass-card p-5">
                    <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                      <span>✓</span> نقاط القوة
                    </h4>
                    <div className="space-y-2">
                      {currentPlayer.strengths.map((strength, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                          <span className="text-emerald-400">●</span>
                          {strength}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card p-5">
                    <h4 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
                      <span>⚠</span> نقاط الضعف
                    </h4>
                    <div className="space-y-2">
                      {currentPlayer.weaknesses.map((weakness, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                          <span className="text-amber-400">●</span>
                          {weakness}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="glass-card p-5">
                  <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                    <span>💡</span> التوصيات
                  </h4>
                  <div className="space-y-2">
                    {currentPlayer.recommendations.map((rec, i) => (
                      <div key={i} className="glass-card-light p-3 text-gray-300 text-sm">
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Injury Risk */}
                <div className="glass-card p-5">
                  <h4 className="text-white font-bold mb-3">مستوى خطر الإصابة</h4>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getRiskColor(currentPlayer.injuryRisk)}`}>
                    <span className="font-bold">
                      {currentPlayer.injuryRisk === 'low' ? 'منخفض' : currentPlayer.injuryRisk === 'medium' ? 'متوسط' : 'عالي'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span>🔮</span> التنبؤات الذكية
            </h3>
            <div className="space-y-4">
              {[
                { player: 'أحمد محمد', prediction: 'سيحقق رقماً قياسياً جديداً في 100 متر خلال الأسبوعين القادمين', confidence: 87 },
                { player: 'محمد خالد', prediction: 'تحسن متوقع بنسبة 10% في الأداء العام بعد تطبيق الخطة التدريبية', confidence: 92 },
                { player: 'يوسف أحمد', prediction: 'يحتاج لأسبوع راحة لتجنب خطر الإصابة', confidence: 78 },
              ].map((pred, i) => (
                <div key={i} className="glass-card-light p-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{pred.player}</div>
                        <div className="text-gray-400 text-xs mt-1">{pred.prediction}</div>
                      </div>
                    </div>
                    <div className="text-left shrink-0">
                      <div className="text-purple-400 font-bold">{pred.confidence}%</div>
                      <div className="text-[10px] text-gray-500">دقة</div>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-purple-500 to-violet-600"
                      style={{ width: `${pred.confidence}%` }}
                    />
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
