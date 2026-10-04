import { useState } from 'react';

// ============================================
// 🔍 محسّن SEO
// ============================================

export default function SEOEnhancement() {
  const [seoScore, setSeoScore] = useState(92);

  const seoMetrics = [
    { label: 'Meta Tags', score: 100, status: 'excellent', icon: '🏷️' },
    { label: 'Structured Data', score: 95, status: 'excellent', icon: '📊' },
    { label: 'Mobile Friendly', score: 100, status: 'excellent', icon: '📱' },
    { label: 'Page Speed', score: 88, status: 'good', icon: '⚡' },
    { label: 'Security (HTTPS)', score: 100, status: 'excellent', icon: '🔒' },
    { label: 'Accessibility', score: 85, status: 'good', icon: '♿' },
  ];

  const metaTags = [
    { tag: 'title', content: 'أكاديمية الرياضات الاحترافية | Sports Academy', status: '✓' },
    { tag: 'description', content: 'منصة مؤسسية متكاملة لإدارة الأكاديميات الرياضية', status: '✓' },
    { tag: 'keywords', content: 'أكاديمية رياضية, تدريب, بطولات, لاعبين', status: '✓' },
    { tag: 'og:title', content: 'أكاديمية الرياضات الاحترافية', status: '✓' },
    { tag: 'og:description', content: 'منصة مؤسسية متكاملة لإدارة الأكاديميات الرياضية', status: '✓' },
    { tag: 'og:image', content: 'https://sportsacademy.com/og-image.jpg', status: '✓' },
    { tag: 'twitter:card', content: 'summary_large_image', status: '✓' },
    { tag: 'twitter:title', content: 'أكاديمية الرياضات الاحترافية', status: '✓' },
    { tag: 'twitter:description', content: 'منصة مؤسسية متكاملة لإدارة الأكاديميات الرياضية', status: '✓' },
    { tag: 'canonical', content: 'https://sportsacademy.com', status: '✓' },
  ];

  const structuredData = [
    { type: 'Organization', status: '✓', description: 'بيانات المنظمة' },
    { type: 'WebSite', status: '✓', description: 'بيانات الموقع' },
    { type: 'SportsActivityLocation', status: '✓', description: 'مكان النشاط الرياضي' },
    { type: 'BreadcrumbList', status: '✓', description: 'قائمة التنقل' },
  ];

  const seoChecklist = [
    { item: 'Title Tag محسّن', status: true, priority: 'عالي' },
    { item: 'Meta Description', status: true, priority: 'عالي' },
    { item: 'Meta Keywords', status: true, priority: 'متوسط' },
    { item: 'Open Graph Tags', status: true, priority: 'عالي' },
    { item: 'Twitter Cards', status: true, priority: 'متوسط' },
    { item: 'Canonical URL', status: true, priority: 'عالي' },
    { item: 'Structured Data (JSON-LD)', status: true, priority: 'عالي' },
    { item: 'Mobile Responsive', status: true, priority: 'عالي' },
    { item: 'Page Speed < 3s', status: true, priority: 'عالي' },
    { item: 'HTTPS Enabled', status: true, priority: 'عالي' },
    { item: 'Sitemap.xml', status: true, priority: 'متوسط' },
    { item: 'Robots.txt', status: true, priority: 'متوسط' },
    { item: 'Alt Text for Images', status: true, priority: 'متوسط' },
    { item: 'Internal Linking', status: true, priority: 'متوسط' },
    { item: 'URL Structure', status: true, priority: 'عالي' },
  ];

  return (
    <section id="seo" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">SEO</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔍 محسّن SEO
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            تحسين ظهور الموقع في محركات البحث
          </p>
        </div>

        {/* SEO Score */}
        <div className="glass-card p-8 mb-8 text-center">
          <div className="inline-block px-8 py-4 rounded-2xl bg-emerald-500/20 mb-4">
            <div className="text-6xl font-black text-emerald-400">{seoScore}</div>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">تقييم SEO</h3>
          <p className="text-gray-400">ممتاز! الموقع محسّن بشكل جيد لمحركات البحث</p>
        </div>

        {/* SEO Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {seoMetrics.map((metric, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{metric.icon}</div>
                <div className={`text-2xl font-black ${
                  metric.score >= 90 ? 'text-emerald-400' : 'text-blue-400'
                }`}>
                  {metric.score}
                </div>
              </div>
              <div className="text-white font-bold text-sm mb-1">{metric.label}</div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    metric.score >= 90 ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>
              <div className={`text-xs font-bold mt-2 ${
                metric.status === 'excellent' ? 'text-emerald-400' : 'text-blue-400'
              }`}>
                {metric.status === 'excellent' ? '✓ ممتاز' : '✓ جيد'}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Meta Tags */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🏷️ Meta Tags</h3>
            <div className="space-y-2">
              {metaTags.map((tag, i) => (
                <div key={i} className="glass-card-light p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-blue-400 font-mono text-xs">{tag.tag}</span>
                    <span className="text-emerald-400 text-xs">{tag.status}</span>
                  </div>
                  <div className="text-gray-300 text-xs truncate">{tag.content}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Data */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📊 Structured Data</h3>
            <div className="space-y-3">
              {structuredData.map((data, i) => (
                <div key={i} className="glass-card-light p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 text-xl">{data.status}</span>
                      <div>
                        <div className="text-white font-bold text-sm">{data.type}</div>
                        <div className="text-gray-400 text-xs">{data.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* JSON-LD Example */}
            <div className="mt-4 glass-card-light p-4">
              <div className="text-blue-400 text-xs font-bold mb-2">JSON-LD Example:</div>
              <pre className="text-gray-300 text-xs overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "أكاديمية الرياضات",
  "url": "https://sportsacademy.com"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* SEO Checklist */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">✓ قائمة التحقق من SEO</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {seoChecklist.map((item, i) => (
              <div key={i} className="glass-card-light p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 text-xl">{item.status ? '✓' : '✗'}</span>
                  <span className="text-white text-sm">{item.item}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.priority === 'عالي' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '🔍', title: 'بحث متقدم', desc: 'ظهور في الصفحة الأولى' },
            { icon: '📱', title: 'Mobile First', desc: 'محسّن للموبايل' },
            { icon: '⚡', title: 'سرعة فائقة', desc: 'تحميل < 3 ثواني' },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
              <p className="text-gray-400 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
