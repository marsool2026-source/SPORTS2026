import { useState, useEffect } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  color: string;
}

const stats: Stat[] = [
  { label: 'لاعب نشط', value: 520, suffix: '+', icon: '⚽', color: 'from-blue-500 to-cyan-500' },
  { label: 'مدرب معتمد', value: 25, suffix: '', icon: '👨‍🏫', color: 'from-purple-500 to-violet-500' },
  { label: 'بطولة سنوياً', value: 18, suffix: '', icon: '🏆', color: 'from-amber-500 to-orange-500' },
  { label: 'ساعة تدريب أسبوعياً', value: 120, suffix: '+', icon: '⏰', color: 'from-emerald-500 to-teal-500' },
  { label: 'سنة خبرة', value: 12, suffix: '', icon: '📅', color: 'from-pink-500 to-rose-500' },
  { label: 'لاعب محترف', value: 45, suffix: '+', icon: '🌟', color: 'from-indigo-500 to-blue-500' },
];

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${target}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return <span id={`counter-${target}`}>{count}</span>;
}

export default function LiveStats() {
  return (
    <section id="live-stats" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">إحصائيات حية</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 إحصائيات <span className="gradient-text-blue">الأكاديمية</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            أرقام حقيقية تعكس نجاحنا وتميزنا
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card p-6 text-center hover:scale-105 transition-all group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>

              {/* Counter */}
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                <AnimatedCounter target={stat.value} />
                <span className="text-2xl">{stat.suffix}</span>
              </div>

              {/* Label */}
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 glass-card p-6 text-center">
          <p className="text-gray-300 text-sm leading-relaxed">
            🎯 نحقق هذه الأرقام بفضل التزامنا بالجودة والاحترافية
            <br />
            <span className="text-emerald-400 font-semibold">انضم إلى عائلة الأكاديمية اليوم!</span>
          </p>
        </div>
      </div>
    </section>
  );
}
