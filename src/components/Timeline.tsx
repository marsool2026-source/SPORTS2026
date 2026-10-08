import { roadmapData } from '../data/roadmap';
import PhaseCard from './PhaseCard';

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🗺️ خارطة <span className="gradient-text">الطريق التفصيلية</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ست مراحل تطويرية مدروسة لبناء المنظومة من الصفر حتى الإطلاق الكامل
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute right-[11px] top-0 bottom-0 w-0.5 timeline-line opacity-30" />

          {/* Phases */}
          <div className="space-y-8">
            {roadmapData.map((phase, index) => (
              <PhaseCard key={phase.id} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
