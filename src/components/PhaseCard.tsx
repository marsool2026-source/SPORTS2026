import { useState } from 'react';
import { Phase } from '../data/roadmap';

interface PhaseCardProps {
  phase: Phase;
  index: number;
}

export default function PhaseCard({ phase, index }: PhaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = {
    'completed': { label: 'مكتملة', color: 'bg-emerald-500', textColor: 'text-emerald-400', borderColor: 'border-emerald-500/30' },
    'in-progress': { label: 'قيد التنفيذ', color: 'bg-amber-500', textColor: 'text-amber-400', borderColor: 'border-amber-500/30' },
    'upcoming': { label: 'قادمة', color: 'bg-gray-500', textColor: 'text-gray-400', borderColor: 'border-gray-500/30' }
  };

  const priorityConfig = {
    'critical': { label: 'حرج', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
    'high': { label: 'عالي', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    'medium': { label: 'متوسط', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    'low': { label: 'منخفض', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' }
  };

  const status = statusConfig[phase.status];
  const totalDays = phase.modules.reduce((sum, m) => sum + m.estimatedDays, 0);

  return (
    <div className="relative">
      {/* Timeline Dot */}
      <div className="absolute right-0 top-8 -translate-x-1/2 z-10">
        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${phase.color} ${phase.status === 'in-progress' ? 'phase-badge' : ''} flex items-center justify-center`}>
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>

      {/* Phase Card */}
      <div className={`mr-8 glass-card p-6 md:p-8 border ${status.borderColor} hover:border-opacity-50 transition-all duration-300`}>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-2xl shadow-lg`}>
              {phase.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-gray-500">المرحلة {phase.id}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${status.color} text-white`}>
                  {phase.status === 'in-progress' && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                  {status.label}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">{phase.title}</h3>
              <p className="text-gray-400 text-sm">{phase.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="glass-card-light px-3 py-1 text-gray-300">
              📅 {phase.duration}
            </span>
            <span className="glass-card-light px-3 py-1 text-gray-300">
              ⏱️ {totalDays} يوم عمل
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>التقدم</span>
            <span>{phase.status === 'completed' ? '100%' : phase.status === 'in-progress' ? '45%' : '0%'}</span>
          </div>
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-l ${phase.color} rounded-full transition-all duration-1000`}
              style={{ width: phase.status === 'completed' ? '100%' : phase.status === 'in-progress' ? '45%' : '0%' }}
            />
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {phase.modules.map((module, i) => (
            <div
              key={i}
              className="glass-card-light p-3 hover:bg-white/10 transition-colors duration-200 group"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {module.name}
                </h4>
                <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded border ${priorityConfig[module.priority]}`}>
                  {priorityConfig[module.priority].label}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{module.description}</p>
              <div className="mt-2 text-xs text-gray-500">
                ⏱️ {module.estimatedDays} أيام
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Section */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm text-gray-400 hover:text-white transition-colors border-t border-white/5"
        >
          <span>{isExpanded ? 'إخفاء التفاصيل' : 'عرض المخرجات والتقنيات'}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/5 space-y-6 animate-[fadeIn_0.3s_ease-out]">
            {/* Deliverables */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span>📋</span> المخرجات المتوقعة
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {phase.deliverables.map((d, i) => (
                  <div key={i} className="text-sm text-gray-300 bg-white/5 rounded-lg px-3 py-2">
                    {d}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span>🛠️</span> التقنيات المستخدمة
              </h4>
              <div className="flex flex-wrap gap-2">
                {phase.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-l from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
