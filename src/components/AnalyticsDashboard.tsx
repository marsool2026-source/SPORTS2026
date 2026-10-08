import { useEffect } from 'react';

// ============================================
// 📊 Google Analytics 4 Integration
// ============================================

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(script2);
}

export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

export function trackConversion(
  eventName: string,
  parameters?: Record<string, any>
) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, parameters);
}

// ============================================
// 📈 Analytics Hook
// ============================================

export function useAnalytics() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return {
    trackPageView,
    trackEvent,
    trackConversion,
  };
}

// ============================================
// 📊 Analytics Dashboard Component
// ============================================

export default function AnalyticsDashboard() {
  const metrics = [
    { label: 'الزوار اليوم', value: '1,247', change: '+12%', icon: '👥', color: 'from-blue-500 to-cyan-500' },
    { label: 'الصفحات المشاهدة', value: '4,521', change: '+23%', icon: '📄', color: 'from-purple-500 to-violet-500' },
    { label: 'معدل التحويل', value: '15.8%', change: '+2.3%', icon: '🎯', color: 'from-emerald-500 to-teal-500' },
    { label: 'متوسط الجلسة', value: '8:45', change: '+15%', icon: '⏱️', color: 'from-amber-500 to-orange-500' },
    { label: 'معدل الارتداد', value: '23.1%', change: '-5.2%', icon: '📉', color: 'from-pink-500 to-rose-500' },
    { label: 'المستخدمون النشطون', value: '892', change: '+18%', icon: '🔥', color: 'from-red-500 to-orange-500' },
  ];

  const topPages = [
    { page: 'الرئيسية', views: 4521, percentage: 32 },
    { page: 'الباقات', views: 3245, percentage: 23 },
    { page: 'المدربين', views: 2134, percentage: 15 },
    { page: 'البطولات', views: 1876, percentage: 13 },
    { page: 'من نحن', views: 1234, percentage: 9 },
  ];

  const events = [
    { event: 'تسجيل لاعب', count: 89, percentage: 7.1 },
    { event: 'دفع اشتراك', count: 156, percentage: 12.5 },
    { event: 'حجز تدريب', count: 234, percentage: 18.8 },
    { event: 'مشاهدة بث', count: 567, percentage: 45.5 },
    { event: 'تحميل شهادة', count: 78, percentage: 6.3 },
  ];

  const devices = [
    { device: '📱 موبايل', percentage: 68, color: 'from-blue-500 to-cyan-500' },
    { device: '💻 سطح المكتب', percentage: 24, color: 'from-purple-500 to-violet-500' },
    { device: '📟 تابلت', percentage: 8, color: 'from-amber-500 to-orange-500' },
  ];

  const browsers = [
    { name: 'Chrome', percentage: 52, color: 'bg-blue-500' },
    { name: 'Safari', percentage: 28, color: 'bg-purple-500' },
    { name: 'Firefox', percentage: 12, color: 'bg-orange-500' },
    { name: 'Edge', percentage: 8, color: 'bg-cyan-500' },
  ];

  return (
    <section id="analytics-dashboard" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">Analytics</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 لوحة التحليلات المتقدمة
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            تحليلات شاملة لأداء الموقع وسلوك المستخدمين
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric, i) => (
            <div key={i} className="glass-card p-4 hover:scale-105 transition-transform">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center text-xl mb-2`}>
                {metric.icon}
              </div>
              <div className="text-2xl font-black text-white mb-1">{metric.value}</div>
              <div className="text-gray-400 text-xs mb-1">{metric.label}</div>
              <div className={`text-xs font-bold ${metric.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Top Pages */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📄 أكثر الصفحات زيارة</h3>
            <div className="space-y-3">
              {topPages.map((page, i) => (
                <div key={i} className="glass-card-light p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">{page.page}</div>
                    <div className="text-gray-400 text-xs">{page.views.toLocaleString()} زيارة</div>
                  </div>
                  <div className="text-blue-400 font-bold text-sm">{page.percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🎯 الأحداث الرئيسية</h3>
            <div className="space-y-3">
              {events.map((event, i) => (
                <div key={i} className="glass-card-light p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-semibold">{event.event}</span>
                    <span className="text-emerald-400 font-bold text-sm">{event.count}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-emerald-500 to-teal-600"
                      style={{ width: `${event.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Devices */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📱 الأجهزة المستخدمة</h3>
            <div className="space-y-4">
              {devices.map((device, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">{device.device}</span>
                    <span className="text-blue-400 text-sm font-bold">{device.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-l ${device.color}`}
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browsers */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🌐 المتصفحات</h3>
            <div className="space-y-4">
              {browsers.map((browser, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">{browser.name}</span>
                    <span className="text-blue-400 text-sm font-bold">{browser.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${browser.color}`}
                      style={{ width: `${browser.percentage}%` }}
                    />
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
