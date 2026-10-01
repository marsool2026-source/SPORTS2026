import { useState, useEffect } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:scale-110 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="العودة للأعلى"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white mx-auto animate-pulse">
            SA
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-2xl border-2 border-blue-500/50 animate-ping" />
        </div>

        {/* Title */}
        <h1 className="text-white text-2xl font-bold mb-2">أكاديمية الرياضات الاحترافية</h1>
        <p className="text-gray-400 text-sm mb-6">Sports Academy</p>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-l from-blue-500 to-purple-600 animate-loading-bar" />
        </div>

        <p className="text-gray-500 text-xs mt-4">جاري التحميل...</p>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
