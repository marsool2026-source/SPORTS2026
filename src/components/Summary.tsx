import { roadmapData } from '../data/roadmap';

export default function Summary() {
  const totalModules = roadmapData.reduce((sum, p) => sum + p.modules.length, 0);
  const totalDays = roadmapData.reduce((sum, p) => sum + p.modules.reduce((s, m) => s + m.estimatedDays, 0), 0);
  const criticalModules = roadmapData.reduce((sum, p) => sum + p.modules.filter(m => m.priority === 'critical').length, 0);

  return (
    <section id="summary" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📈 ملخص <span className="gradient-text-blue">المشروع</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نظرة شاملة على حجم المشروع والمؤشرات الرئيسية
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-black gradient-text mb-2">{totalModules}</div>
            <div className="text-gray-400 text-sm">وحدة/موديول</div>
          </div>
          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-black gradient-text-blue mb-2">{totalDays}</div>
            <div className="text-gray-400 text-sm">يوم عمل تقديري</div>
          </div>
          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-red-400 mb-2">{criticalModules}</div>
            <div className="text-gray-400 text-sm">مهمة حرجة</div>
          </div>
          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-amber-400 mb-2">6</div>
            <div className="text-gray-400 text-sm">مراحل تطويرية</div>
          </div>
        </div>

        {/* Gantt-like Chart */}
        <div className="glass-card p-6 md:p-8 mb-12">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📊</span> الجدول الزمني المرئي
          </h3>
          <div className="space-y-4">
            {roadmapData.map((phase) => {
              const phaseDays = phase.modules.reduce((s, m) => s + m.estimatedDays, 0);
              const maxDays = 50;
              const widthPercent = (phaseDays / maxDays) * 100;
              
              return (
                <div key={phase.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm font-bold text-white shrink-0">
                    {phase.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300 font-medium truncate">{phase.title}</span>
                      <span className="text-xs text-gray-500 shrink-0">{phaseDays} يوم</span>
                    </div>
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-l ${phase.color} rounded-full transition-all duration-1000 relative`}
                        style={{ width: `${widthPercent}%` }}
                      >
                        {phase.status === 'completed' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] text-white font-bold">✓</span>
                          </div>
                        )}
                        {phase.status === 'in-progress' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] text-white font-bold animate-pulse">⟳</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>🎯</span> توزيع الأولويات
            </h3>
            <div className="space-y-3">
              {[
                { label: 'حرج (Critical)', count: criticalModules, color: 'bg-red-500', percent: Math.round((criticalModules / totalModules) * 100) },
                { label: 'عالي (High)', count: roadmapData.reduce((s, p) => s + p.modules.filter(m => m.priority === 'high').length, 0), color: 'bg-amber-500', percent: 0 },
                { label: 'متوسط (Medium)', count: roadmapData.reduce((s, p) => s + p.modules.filter(m => m.priority === 'medium').length, 0), color: 'bg-blue-500', percent: 0 },
                { label: 'منخفض (Low)', count: roadmapData.reduce((s, p) => s + p.modules.filter(m => m.priority === 'low').length, 0), color: 'bg-gray-500', percent: 0 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{item.label}</span>
                    <span className="text-gray-400">{item.count} وحدة ({item.percent || Math.round((item.count / totalModules) * 100)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${(item.count / totalModules) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>🏗️</span> الهيكل التقني
            </h3>
            <div className="space-y-3">
              {[
                { layer: 'Frontend', tech: 'React 18 + TypeScript + Tailwind', icon: '🎨' },
                { layer: 'State Management', tech: 'Zustand + React Query', icon: '🔄' },
                { layer: 'Backend / BaaS', tech: 'Supabase (PostgreSQL + Auth + Storage)', icon: '⚡' },
                { layer: 'Animations', tech: 'Framer Motion + CSS Transitions', icon: '✨' },
                { layer: 'Charts & Reports', tech: 'Recharts + Chart.js + PDF Export', icon: '📊' },
                { layer: 'Deployment', tech: 'Vercel / VPS + CI/CD Pipeline', icon: '🚀' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 glass-card-light p-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.layer}</div>
                    <div className="text-xs text-gray-400">{item.tech}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
