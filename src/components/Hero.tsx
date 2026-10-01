import { systemOverview } from '../data/roadmap';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['⚽', '🏆', '🥇', '🎯', '💪', '🏅'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-20 float-animation"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 16}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Logo / Badge */}
        <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5 mb-8 fade-in">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-300 text-sm font-semibold">خارطة الطريق الاحترافية</span>
          <span className="text-gray-400 text-sm">v2.0</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 slide-up" style={{ animationDelay: '0.2s' }}>
          <span className="gradient-text">{systemOverview.name}</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-4 slide-up max-w-3xl mx-auto" style={{ animationDelay: '0.4s' }}>
          {systemOverview.nameEn}
        </p>

        <p className="text-base md:text-lg text-gray-300 mb-12 slide-up max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '0.6s' }}>
          {systemOverview.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {systemOverview.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card p-4 slide-up hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${0.8 + i * 0.15}s` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="slide-up" style={{ animationDelay: '1.5s' }}>
          <a href="#overview" className="inline-flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-sm">استكشف خارطة الطريق</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
