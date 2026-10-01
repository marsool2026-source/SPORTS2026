import { useState, useEffect } from 'react';

export default function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'أكاديمية الرياضات الاحترافية',
      subtitle: 'نبني أبطال المستقبل',
      description: 'منصة مؤسسية متكاملة لإدارة الأكاديميات الرياضية',
      icon: '🏆',
      gradient: 'from-blue-600 via-purple-600 to-pink-600'
    },
    {
      title: 'تدريب احترافي',
      subtitle: 'مدربون معتمدون دولياً',
      description: '25 مدرباً خبيراً بشهادات UEFA و FIFA',
      icon: '⚽',
      gradient: 'from-emerald-600 via-teal-600 to-cyan-600'
    },
    {
      title: 'تكنولوجيا متطورة',
      subtitle: 'نظام إداري رقمي',
      description: 'كارنيهات رقمية، حضور QR، تتبع أداء',
      icon: '📱',
      gradient: 'from-amber-600 via-orange-600 to-red-600'
    },
    {
      title: 'انضم إلينا',
      subtitle: 'أكثر من 500 لاعب',
      description: 'حقق أحلامك الرياضية معنا',
      icon: '🚀',
      gradient: 'from-purple-600 via-pink-600 to-rose-600'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Icon */}
        <div className="text-8xl mb-6 animate-bounce-slow">
          {slides[currentSlide].icon}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 animate-fade-in-up">
          {slides[currentSlide].title}
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-3xl text-white/90 font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {slides[currentSlide].subtitle}
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {slides[currentSlide].description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <a
            href="#pricing"
            className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:scale-105 transition-transform shadow-2xl"
          >
            ابدأ الآن 🚀
          </a>
          <a
            href="#about"
            className="px-8 py-4 bg-white/10 backdrop-blur border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-colors"
          >
            تعرف علينا
          </a>
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-2 justify-center mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="mt-6 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm hover:bg-white/20 transition-colors"
        >
          {isPlaying ? '⏸️ إيقاف' : '▶️ تشغيل'}
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
