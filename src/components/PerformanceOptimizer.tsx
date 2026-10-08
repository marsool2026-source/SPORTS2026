import { useState, useEffect } from 'react';

// ============================================
// ⚡ محسّن الأداء
// ============================================

export default function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    timeToInteractive: 0,
    cumulativeLayoutShift: 0,
    totalBlockingTime: 0,
  });

  const [optimizations, setOptimizations] = useState({
    codeSplitting: true,
    lazyLoading: true,
    imageOptimization: true,
    caching: true,
    compression: true,
    cdn: true,
  });

  useEffect(() => {
    // محاكاة قياس الأداء
    const timer = setTimeout(() => {
      setMetrics({
        loadTime: 1.2,
        firstContentfulPaint: 0.8,
        largestContentfulPaint: 1.5,
        timeToInteractive: 2.1,
        cumulativeLayoutShift: 0.05,
        totalBlockingTime: 150,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getPerformanceGrade = () => {
    const score = (
      (metrics.loadTime < 2 ? 20 : 10) +
      (metrics.firstContentfulPaint < 1.5 ? 20 : 10) +
      (metrics.largestContentfulPaint < 2.5 ? 20 : 10) +
      (metrics.timeToInteractive < 3 ? 20 : 10) +
      (metrics.cumulativeLayoutShift < 0.1 ? 20 : 10)
    );
    
    if (score >= 90) return { grade: 'A', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (score >= 50) return { grade: 'C', color: 'text-amber-400', bg: 'bg-amber-500/20' };
    return { grade: 'D', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  const performanceGrade = getPerformanceGrade();

  const bundleSize = {
    js: 370, // KB
    css: 16, // KB
    images: 245, // KB
    total: 631, // KB
  };

  const optimizationsList = [
    { id: 'codeSplitting', name: 'Code Splitting', desc: 'تقسيم الكود إلى chunks أصغر', status: optimizations.codeSplitting, impact: 'عالي' },
    { id: 'lazyLoading', name: 'Lazy Loading', desc: 'تحميل المكونات عند الطلب', status: optimizations.lazyLoading, impact: 'عالي' },
    { id: 'imageOptimization', name: 'Image Optimization', desc: 'تحويل الصور إلى WebP', status: optimizations.imageOptimization, impact: 'متوسط' },
    { id: 'caching', name: 'Caching Strategy', desc: 'تحسين التخزين المؤقت', status: optimizations.caching, impact: 'عالي' },
    { id: 'compression', name: 'Compression', desc: 'ضغط الملفات (Gzip/Brotli)', status: optimizations.compression, impact: 'عالي' },
    { id: 'cdn', name: 'CDN Integration', desc: 'شبكة توصيل المحتوى', status: optimizations.cdn, impact: 'متوسط' },
  ];

  return (
    <section id="performance" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">Performance</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ⚡ محسّن الأداء
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            تحليل وتحسين أداء التطبيق
          </p>
        </div>

        {/* Performance Grade */}
        <div className="glass-card p-8 mb-8 text-center">
          <div className={`inline-block px-8 py-4 rounded-2xl ${performanceGrade.bg} mb-4`}>
            <div className={`text-6xl font-black ${performanceGrade.color}`}>
              {performanceGrade.grade}
            </div>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">تقييم الأداء</h3>
          <p className="text-gray-400">
            {performanceGrade.grade === 'A' ? 'ممتاز! الأداء مثالي' :
             performanceGrade.grade === 'B' ? 'جيد جداً! أداء قوي' :
             performanceGrade.grade === 'C' ? 'مقبول! يمكن التحسين' :
             'يحتاج تحسين!'}
          </p>
        </div>

        {/* Core Web Vitals */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-black text-white mb-1">{metrics.loadTime}s</div>
            <div className="text-gray-400 text-xs">وقت التحميل</div>
            <div className={`text-xs font-bold mt-2 ${metrics.loadTime < 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {metrics.loadTime < 2 ? '✓ ممتاز' : '⚠ يحتاج تحسين'}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="text-3xl mb-2">🎨</div>
            <div className="text-2xl font-black text-white mb-1">{metrics.firstContentfulPaint}s</div>
            <div className="text-gray-400 text-xs">First Contentful Paint</div>
            <div className={`text-xs font-bold mt-2 ${metrics.firstContentfulPaint < 1.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {metrics.firstContentfulPaint < 1.5 ? '✓ ممتاز' : '⚠ يحتاج تحسين'}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="text-3xl mb-2">🖼️</div>
            <div className="text-2xl font-black text-white mb-1">{metrics.largestContentfulPaint}s</div>
            <div className="text-gray-400 text-xs">Largest Contentful Paint</div>
            <div className={`text-xs font-bold mt-2 ${metrics.largestContentfulPaint < 2.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {metrics.largestContentfulPaint < 2.5 ? '✓ ممتاز' : '⚠ يحتاج تحسين'}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="text-3xl mb-2">🚀</div>
            <div className="text-2xl font-black text-white mb-1">{metrics.timeToInteractive}s</div>
            <div className="text-gray-400 text-xs">Time to Interactive</div>
            <div className={`text-xs font-bold mt-2 ${metrics.timeToInteractive < 3 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {metrics.timeToInteractive < 3 ? '✓ ممتاز' : '⚠ يحتاج تحسين'}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="text-3xl mb-2">📐</div>
            <div className="text-2xl font-black text-white mb-1">{metrics.cumulativeLayoutShift}</div>
            <div className="text-gray-400 text-xs">Cumulative Layout Shift</div>
            <div className={`text-xs font-bold mt-2 ${metrics.cumulativeLayoutShift < 0.1 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {metrics.cumulativeLayoutShift < 0.1 ? '✓ ممتاز' : '⚠ يحتاج تحسين'}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="text-3xl mb-2">⏸️</div>
            <div className="text-2xl font-black text-white mb-1">{metrics.totalBlockingTime}ms</div>
            <div className="text-gray-400 text-xs">Total Blocking Time</div>
            <div className={`text-xs font-bold mt-2 ${metrics.totalBlockingTime < 200 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {metrics.totalBlockingTime < 200 ? '✓ ممتاز' : '⚠ يحتاج تحسين'}
            </div>
          </div>
        </div>

        {/* Bundle Size */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4">📦 حجم الملفات</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="glass-card-light p-4 text-center">
              <div className="text-3xl mb-2">📜</div>
              <div className="text-2xl font-black text-blue-400">{bundleSize.js}</div>
              <div className="text-gray-400 text-xs">JavaScript (KB)</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-3xl mb-2">🎨</div>
              <div className="text-2xl font-black text-purple-400">{bundleSize.css}</div>
              <div className="text-gray-400 text-xs">CSS (KB)</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-3xl mb-2">🖼️</div>
              <div className="text-2xl font-black text-amber-400">{bundleSize.images}</div>
              <div className="text-gray-400 text-xs">Images (KB)</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-black text-emerald-400">{bundleSize.total}</div>
              <div className="text-gray-400 text-xs">Total (KB)</div>
            </div>
          </div>
        </div>

        {/* Optimizations */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">🚀 التحسينات المطبقة</h3>
          <div className="space-y-3">
            {optimizationsList.map((opt) => (
              <div key={opt.id} className="glass-card-light p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${opt.status ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                  <div>
                    <div className="text-white font-bold text-sm">{opt.name}</div>
                    <div className="text-gray-400 text-xs">{opt.desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    opt.impact === 'عالي' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    تأثير {opt.impact}
                  </span>
                  <button
                    onClick={() => setOptimizations(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof prev] }))}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      opt.status ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {opt.status ? '✓ مفعّل' : '✗ معطّل'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Tips */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '⚡', title: 'سرعة فائقة', desc: 'تحميل < 2 ثانية' },
            { icon: '📱', title: 'Mobile Optimized', desc: 'محسّن للموبايل' },
            { icon: '🌐', title: 'CDN Global', desc: 'توصيل عالمي' },
          ].map((tip, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-3xl mb-2">{tip.icon}</div>
              <h4 className="text-white font-bold text-sm mb-1">{tip.title}</h4>
              <p className="text-gray-400 text-xs">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
