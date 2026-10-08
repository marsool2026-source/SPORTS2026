import { useState } from 'react';

interface AnalyticsData {
  label: string;
  value: number;
  change: number;
  icon: string;
}

interface ConversionFunnel {
  stage: string;
  visitors: number;
  percentage: number;
}

interface HeatmapData {
  hour: string;
  day: string;
  value: number;
}

const analyticsData: AnalyticsData[] = [
  { label: 'الزوار اليوم', value: 1247, change: 12, icon: '👥' },
  { label: 'التسجيلات الجديدة', value: 89, change: 23, icon: '📝' },
  { label: 'معدل التحويل', value: 7.1, change: -2, icon: '🎯' },
  { label: 'متوسط الجلسة', value: 8.5, change: 15, icon: '⏱️' },
];

const conversionFunnel: ConversionFunnel[] = [
  { stage: 'زيارة الموقع', visitors: 10000, percentage: 100 },
  { stage: 'تصفح الباقات', visitors: 6500, percentage: 65 },
  { stage: 'بدء التسجيل', visitors: 3200, percentage: 32 },
  { stage: 'إكمال التسجيل', visitors: 1800, percentage: 18 },
  { stage: 'الدفع', visitors: 1200, percentage: 12 },
  { stage: 'الاشتراك النشط', visitors: 890, percentage: 8.9 },
];

const heatmapData: HeatmapData[] = [
  { hour: '6 ص', day: 'السبت', value: 45 },
  { hour: '9 ص', day: 'السبت', value: 78 },
  { hour: '12 م', day: 'السبت', value: 92 },
  { hour: '3 م', day: 'السبت', value: 156 },
  { hour: '6 م', day: 'السبت', value: 234 },
  { hour: '9 م', day: 'السبت', value: 189 },
  { hour: '6 ص', day: 'الأحد', value: 38 },
  { hour: '9 ص', day: 'الأحد', value: 85 },
  { hour: '12 م', day: 'الأحد', value: 112 },
  { hour: '3 م', day: 'الأحد', value: 178 },
  { hour: '6 م', day: 'الأحد', value: 267 },
  { hour: '9 م', day: 'الأحد', value: 198 },
];

const topPages = [
  { page: 'الرئيسية', views: 4521, percentage: 32 },
  { page: 'الباقات', views: 3245, percentage: 23 },
  { page: 'المدربين', views: 2134, percentage: 15 },
  { page: 'البطولات', views: 1876, percentage: 13 },
  { page: 'من نحن', views: 1234, percentage: 9 },
  { page: 'المدونة', views: 987, percentage: 7 },
];

const deviceStats = [
  { device: '📱 موبايل', percentage: 68, color: 'from-blue-500 to-cyan-500' },
  { device: '💻 سطح المكتب', percentage: 24, color: 'from-purple-500 to-violet-500' },
  { device: '📟 تابلت', percentage: 8, color: 'from-amber-500 to-orange-500' },
];

const browserStats = [
  { browser: 'Chrome', percentage: 52, color: 'bg-blue-500' },
  { browser: 'Safari', percentage: 28, color: 'bg-purple-500' },
  { browser: 'Firefox', percentage: 12, color: 'bg-orange-500' },
  { browser: 'Edge', percentage: 8, color: 'bg-cyan-500' },
];

export default function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  return (
    <section id="advanced-analytics" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-xs font-semibold">تحليلات متقدمة</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 التحليلات <span className="gradient-text-blue">المتقدمة</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            رؤى عميقة حول أداء الموقع وسلوك المستخدمين
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'day', label: '📅 اليوم' },
            { id: 'week', label: '📆 الأسبوع' },
            { id: 'month', label: '🗓️ الشهر' },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id as any)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                timeRange === range.id
                  ? 'bg-gradient-to-l from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {analyticsData.map((data, i) => (
            <div key={i} className="glass-card p-5 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{data.icon}</div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  data.change > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {data.change > 0 ? '↑' : '↓'} {Math.abs(data.change)}%
                </span>
              </div>
              <div className="text-3xl font-black text-white mb-1">{data.value}</div>
              <div className="text-gray-400 text-xs">{data.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Conversion Funnel */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🎯</span> مسار التحويل
            </h3>
            <div className="space-y-3">
              {conversionFunnel.map((stage, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">{stage.stage}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">{stage.visitors.toLocaleString()}</span>
                      <span className="text-cyan-400 text-xs font-bold">{stage.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-cyan-500 to-blue-600 rounded-full transition-all duration-1000 flex items-center justify-end px-2"
                      style={{ width: `${stage.percentage}%` }}
                    >
                      {stage.percentage > 15 && (
                        <span className="text-white text-xs font-bold">{stage.percentage}%</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Pages */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>📄</span> أكثر الصفحات زيارة
            </h3>
            <div className="space-y-3">
              {topPages.map((page, i) => (
                <div key={i} className="glass-card-light p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">{page.page}</div>
                    <div className="text-gray-400 text-xs">{page.views.toLocaleString()} زيارة</div>
                  </div>
                  <div className="text-cyan-400 font-bold text-sm">{page.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Device Stats */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>📱</span> الأجهزة
            </h3>
            <div className="space-y-4">
              {deviceStats.map((device, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">{device.device}</span>
                    <span className="text-cyan-400 text-sm font-bold">{device.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-l ${device.color} transition-all duration-1000`}
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browser Stats */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🌐</span> المتصفحات
            </h3>
            <div className="space-y-4">
              {browserStats.map((browser, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">{browser.browser}</span>
                    <span className="text-cyan-400 text-sm font-bold">{browser.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${browser.color} transition-all duration-1000`}
                      style={{ width: `${browser.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>⏰</span> ساعات الذروة
            </h3>
            <div className="space-y-2">
              {['6 م', '9 م', '3 م', '12 م', '9 ص'].map((hour, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs w-10">{hour}</span>
                  <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-amber-500 to-orange-600 rounded-full"
                      style={{ width: `${100 - i * 15}%` }}
                    />
                  </div>
                  <span className="text-amber-400 text-xs font-bold w-12">{[267, 198, 178, 112, 85][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>💡</span> رؤى ذكية
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: '📈',
                title: 'زيادة في الزيارات',
                description: 'الزيارات زادت بنسبة 23% مقارنة بالأسبوع الماضي',
                color: 'text-emerald-400'
              },
              {
                icon: '⚠️',
                title: 'معدل ارتداد مرتفع',
                description: 'صفحة الباقات تحتاج تحسين - معدل الارتداد 45%',
                color: 'text-amber-400'
              },
              {
                icon: '🎯',
                title: 'فرصة تحسين',
                description: 'إضافة فيديو تعريفي قد يزيد التحويل بنسبة 30%',
                color: 'text-cyan-400'
              },
            ].map((insight, i) => (
              <div key={i} className="glass-card-light p-4">
                <div className={`text-3xl mb-2 ${insight.color}`}>{insight.icon}</div>
                <h4 className="text-white font-bold text-sm mb-1">{insight.title}</h4>
                <p className="text-gray-400 text-xs">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
