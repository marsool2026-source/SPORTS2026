import { useState } from 'react';

// ============================================
// ♿ محسّن إمكانية الوصول (Accessibility)
// ============================================

export default function AccessibilityEnhancement() {
  const [accessibilityScore, setAccessibilityScore] = useState(88);

  const accessibilityMetrics = [
    { label: 'ARIA Labels', score: 95, status: 'excellent', icon: '🏷️' },
    { label: 'Keyboard Navigation', score: 100, status: 'excellent', icon: '⌨️' },
    { label: 'Color Contrast', score: 92, status: 'excellent', icon: '🎨' },
    { label: 'Screen Reader', score: 88, status: 'good', icon: '🔊' },
    { label: 'Focus Management', score: 90, status: 'excellent', icon: '🎯' },
    { label: 'Alt Text', score: 85, status: 'good', icon: '🖼️' },
  ];

  const wcagChecklist = [
    { criterion: '1.1.1 Non-text Content', description: 'جميع الصور لها نص بديل', status: true, level: 'A' },
    { criterion: '1.3.1 Info and Relationships', description: 'البنية الدلالية صحيحة', status: true, level: 'A' },
    { criterion: '1.4.1 Use of Color', description: 'لا يعتمد على اللون فقط', status: true, level: 'A' },
    { criterion: '1.4.3 Contrast (Minimum)', description: 'تباين الألوان 4.5:1 على الأقل', status: true, level: 'AA' },
    { criterion: '2.1.1 Keyboard', description: 'جميع الوظائف بلوحة المفاتيح', status: true, level: 'A' },
    { criterion: '2.4.1 Bypass Blocks', description: 'روابط تخطي المحتوى', status: true, level: 'A' },
    { criterion: '2.4.2 Page Titled', description: 'عنوان وصفي لكل صفحة', status: true, level: 'A' },
    { criterion: '2.4.6 Headings and Labels', description: 'عناوين وأوصاف واضحة', status: true, level: 'AA' },
    { criterion: '3.3.1 Error Identification', description: 'تحديد الأخطاء بوضوح', status: true, level: 'A' },
    { criterion: '4.1.2 Name, Role, Value', description: 'ARIA attributes صحيحة', status: true, level: 'A' },
  ];

  const accessibilityFeatures = [
    { feature: 'Skip to Content Link', description: 'رابط لتخطي إلى المحتوى الرئيسي', status: true, icon: '⏭️' },
    { feature: 'Keyboard Shortcuts', description: 'اختصارات لوحة المفاتيح', status: true, icon: '⌨️' },
    { feature: 'High Contrast Mode', description: 'وضع التباين العالي', status: true, icon: '🎨' },
    { feature: 'Screen Reader Support', description: 'دعم قارئات الشاشة', status: true, icon: '🔊' },
    { feature: 'Focus Indicators', description: 'مؤشرات التركيز الواضحة', status: true, icon: '🎯' },
    { feature: 'ARIA Labels', description: 'تسميات ARIA شاملة', status: true, icon: '🏷️' },
    { feature: 'Semantic HTML', description: 'HTML دلالي صحيح', status: true, icon: '📝' },
    { feature: 'Form Labels', description: 'تسميات النماذج واضحة', status: true, icon: '📋' },
    { feature: 'Error Messages', description: 'رسائل خطأ واضحة', status: true, icon: '⚠️' },
    { feature: 'Language Attributes', description: 'سمات اللغة الصحيحة', status: true, icon: '🌐' },
  ];

  const keyboardShortcuts = [
    { keys: 'Tab', action: 'التنقل بين العناصر', icon: '⌨️' },
    { keys: 'Shift + Tab', action: 'التنقل العكسي', icon: '⌨️' },
    { keys: 'Enter / Space', action: 'تفعيل العنصر', icon: '⌨️' },
    { keys: 'Escape', action: 'إغلاق النافذة', icon: '⌨️' },
    { keys: 'Alt + 1', action: 'الانتقال للرئيسية', icon: '⌨️' },
    { keys: 'Alt + 2', action: 'تخطي للتنقل', icon: '⌨️' },
    { keys: 'Alt + 3', action: 'تخطي للمحتوى', icon: '⌨️' },
  ];

  return (
    <section id="accessibility" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">Accessibility</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ♿ محسّن إمكانية الوصول
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ضمان وصول الموقع لجميع المستخدمين
          </p>
        </div>

        {/* Accessibility Score */}
        <div className="glass-card p-8 mb-8 text-center">
          <div className="inline-block px-8 py-4 rounded-2xl bg-purple-500/20 mb-4">
            <div className="text-6xl font-black text-purple-400">{accessibilityScore}</div>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">تقييم إمكانية الوصول</h3>
          <p className="text-gray-400">جيد جداً! الموقع متوافق مع معايير WCAG 2.1</p>
        </div>

        {/* Accessibility Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {accessibilityMetrics.map((metric, i) => (
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
          {/* WCAG Checklist */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">✓ قائمة التحقق WCAG 2.1</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {wcagChecklist.map((item, i) => (
                <div key={i} className="glass-card-light p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-emerald-400 text-xl mt-0.5">{item.status ? '✓' : '✗'}</span>
                      <div className="flex-1">
                        <div className="text-white font-bold text-sm mb-1">{item.criterion}</div>
                        <div className="text-gray-400 text-xs">{item.description}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      item.level === 'A' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      Level {item.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🛠️ ميزات إمكانية الوصول</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {accessibilityFeatures.map((feature, i) => (
                <div key={i} className="glass-card-light p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <div className="text-white font-bold text-sm">{feature.feature}</div>
                      <div className="text-gray-400 text-xs">{feature.description}</div>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-xl">{feature.status ? '✓' : '✗'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4">⌨️ اختصارات لوحة المفاتيح</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {keyboardShortcuts.map((shortcut, i) => (
              <div key={i} className="glass-card-light p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{shortcut.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm font-mono">{shortcut.keys}</div>
                    <div className="text-gray-400 text-xs">{shortcut.action}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility Tips */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '🎨', title: 'تباين عالي', desc: 'نسبة 4.5:1 على الأقل' },
            { icon: '⌨️', title: 'لوحة مفاتيح', desc: 'تنقل كامل بدون ماوس' },
            { icon: '🔊', title: 'قارئات شاشة', desc: 'دعم كامل' },
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
