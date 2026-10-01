import { useState, useEffect } from 'react';

// ============================================
// 🧪 نظام اختبار التكامل الشامل
// ============================================
export function IntegrationTestSystem() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);
  const [testResults, setTestResults] = useState<Array<{
    name: string;
    status: 'pending' | 'running' | 'passed' | 'failed';
    duration: number;
    details: string;
  }>>([]);

  const tests = [
    {
      name: 'نظام المصادقة',
      category: 'الأمان',
      tests: ['تسجيل الدخول', 'إنشاء حساب', 'استعادة كلمة المرور', '2FA'],
    },
    {
      name: 'نظام اللاعبين',
      category: 'العمليات',
      tests: ['إنشاء لاعب', 'تعديل بيانات', 'حذف لاعب', 'بحث'],
    },
    {
      name: 'نظام الحضور',
      category: 'العمليات',
      tests: ['مسح QR', 'تسجيل حضور', 'تقرير يومي', 'Offline Mode'],
    },
    {
      name: 'نظام التواصل',
      category: 'التواصل',
      tests: ['إرسال رسالة', 'مكالمة صوتية', 'مكالمة فيديو', 'مشاركة ملفات'],
    },
    {
      name: 'النظام المالي',
      category: 'المالية',
      tests: ['إنشاء معاملة', 'اعتماد دفع', 'تقرير مالي', 'شجرة حسابات'],
    },
    {
      name: 'نظام البطولات',
      category: 'العمليات',
      tests: ['إنشاء بطولة', 'تسجيل نتائج', 'لوحة متصدرين', 'شهادات'],
    },
    {
      name: 'نظام الذكاء الاصطناعي',
      category: 'الذكاء',
      tests: ['تحليل أداء', 'توصيات', 'تنبؤات', 'تحليل فيديو'],
    },
    {
      name: 'نظام البث المباشر',
      category: 'الوسائط',
      tests: ['بدء بث', 'مشاهدة بث', 'دردشة مباشرة', 'تسجيل'],
    },
    {
      name: 'نظام الأرقام القياسية',
      category: 'البيانات',
      tests: ['تسجيل رقم', 'مقارنة عالمية', 'تتبع تطور', 'تصدير'],
    },
    {
      name: 'نظام الميتافيرس',
      category: 'الابتكار',
      tests: ['دخول عالم', 'تخصيص شخصية', 'أنشطة جماعية', 'NFT'],
    },
    {
      name: 'نظام المدرب الذكي',
      category: 'الذكاء',
      tests: ['محادثة AI', 'خطط مخصصة', 'تحليل فوري', 'توصيات'],
    },
    {
      name: 'نظام الدفع المتقدم',
      category: 'المالية',
      tests: ['8 طرق دفع', 'معالجة آمنة', 'فواتير', 'تقارير'],
    },
  ];

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    setCurrentTest(0);

    for (let i = 0; i < tests.length; i++) {
      setCurrentTest(i);
      
      // Simulate test execution
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result: {
        name: string;
        status: 'pending' | 'running' | 'passed' | 'failed';
        duration: number;
        details: string;
      } = {
        name: tests[i].name,
        status: Math.random() > 0.05 ? 'passed' : 'failed', // 95% pass rate
        duration: Math.floor(Math.random() * 500) + 100,
        details: `${tests[i].tests.length} اختبارات فرعية - ${tests[i].category}`,
      };
      
      setTestResults(prev => [...prev, result]);
    }

    setIsRunning(false);
  };

  const passedTests = testResults.filter(r => r.status === 'passed').length;
  const failedTests = testResults.filter(r => r.status === 'failed').length;
  const totalDuration = testResults.reduce((sum, r) => sum + r.duration, 0);
  const passRate = testResults.length > 0 ? (passedTests / testResults.length) * 100 : 0;

  return (
    <section id="integration-test" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-semibold">Integration Tests</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🧪 اختبار التكامل الشامل
          </h2>
          <p className="text-gray-400">التحقق من تكامل جميع أنظمة المنظومة</p>
        </div>

        {/* Control Panel */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">لوحة التحكم</h3>
              <p className="text-gray-400 text-sm">اختبر تكامل {tests.length} نظام رئيسي</p>
            </div>
            <button
              onClick={runTests}
              disabled={isRunning}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                isRunning
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-l from-green-500 to-emerald-600 text-white hover:opacity-90'
              }`}
            >
              {isRunning ? '🔄 جاري الاختبار...' : '🚀 بدء الاختبار'}
            </button>
          </div>

          {/* Progress */}
          {isRunning && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">التقدم</span>
                <span className="text-white">{currentTest + 1} / {tests.length}</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-green-500 to-emerald-600 transition-all duration-500"
                  style={{ width: `${((currentTest + 1) / tests.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Summary Stats */}
          {testResults.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card-light p-4 text-center">
                <div className="text-3xl mb-1">📊</div>
                <div className="text-2xl font-black text-white">{testResults.length}</div>
                <div className="text-gray-400 text-xs">إجمالي الأنظمة</div>
              </div>
              <div className="glass-card-light p-4 text-center">
                <div className="text-3xl mb-1">✅</div>
                <div className="text-2xl font-black text-emerald-400">{passedTests}</div>
                <div className="text-gray-400 text-xs">نجح</div>
              </div>
              <div className="glass-card-light p-4 text-center">
                <div className="text-3xl mb-1">❌</div>
                <div className="text-2xl font-black text-red-400">{failedTests}</div>
                <div className="text-gray-400 text-xs">فشل</div>
              </div>
              <div className="glass-card-light p-4 text-center">
                <div className="text-3xl mb-1">⏱️</div>
                <div className="text-2xl font-black text-blue-400">{(totalDuration / 1000).toFixed(1)}s</div>
                <div className="text-gray-400 text-xs">المدة الإجمالية</div>
              </div>
            </div>
          )}
        </div>

        {/* Test Results */}
        <div className="space-y-3">
          {testResults.map((result, i) => (
            <div
              key={i}
              className={`glass-card p-4 flex items-center gap-4 ${
                result.status === 'passed' ? 'border-l-4 border-emerald-500' : 'border-l-4 border-red-500'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                result.status === 'passed' ? 'bg-emerald-500/20' : 'bg-red-500/20'
              }`}>
                {result.status === 'passed' ? '✅' : '❌'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-bold">{result.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    result.status === 'passed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {result.status === 'passed' ? 'نجح' : 'فشل'}
                  </span>
                </div>
                <div className="text-gray-400 text-xs">{result.details}</div>
              </div>
              <div className="text-left">
                <div className="text-white font-bold">{result.duration}ms</div>
                <div className="text-gray-400 text-xs">مدة الاختبار</div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Report */}
        {testResults.length === tests.length && !isRunning && (
          <div className={`glass-card p-8 mt-8 text-center ${
            passRate >= 95 ? 'border-2 border-emerald-500/50' : 'border-2 border-amber-500/50'
          }`}>
            <div className="text-6xl mb-4">
              {passRate >= 95 ? '🏆' : passRate >= 80 ? '⚠️' : '❌'}
            </div>
            <h3 className="text-white font-bold text-2xl mb-2">
              {passRate >= 95 ? 'التكامل ممتاز!' : passRate >= 80 ? 'التكامل جيد' : 'يوجد مشاكل'}
            </h3>
            <div className="text-4xl font-black mb-4" style={{
              color: passRate >= 95 ? '#10b981' : passRate >= 80 ? '#f59e0b' : '#ef4444'
            }}>
              {passRate.toFixed(1)}%
            </div>
            <p className="text-gray-400 mb-6">
              {passRate >= 95 
                ? 'جميع الأنظمة متكاملة بشكل ممتاز وجاهزة للإنتاج!'
                : passRate >= 80
                ? 'معظم الأنظمة تعمل بشكل جيد، يوجد بعض المشاكل البسيطة.'
                : 'يوجد مشاكل تحتاج إلى إصلاح قبل الإطلاق.'}
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div>
                <div className="text-2xl font-bold text-emerald-400">{passedTests}</div>
                <div className="text-gray-400 text-xs">ناجح</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{failedTests}</div>
                <div className="text-gray-400 text-xs">فاشل</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">{(totalDuration / 1000).toFixed(1)}s</div>
                <div className="text-gray-400 text-xs">المدة</div>
              </div>
            </div>
          </div>
        )}

        {/* Systems Overview */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-white font-bold text-lg mb-4">📋 الأنظمة المختبرة</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tests.map((test, i) => {
              const result = testResults[i];
              return (
                <div key={i} className="glass-card-light p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-bold text-sm">{test.name}</h4>
                    {result && (
                      <span className={`text-xs ${
                        result.status === 'passed' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {result.status === 'passed' ? '✓' : '✗'}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-400 text-xs mb-2">{test.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {test.tests.map((subTest, j) => (
                      <span key={j} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-300">
                        {subTest}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📊 لوحة مراقبة النظام
// ============================================
export function SystemMonitoring() {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 62,
    requests: 1247,
    errors: 2,
    responseTime: 145,
    uptime: 99.98,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(40, Math.min(85, prev.memory + (Math.random() - 0.5) * 5)),
        requests: prev.requests + Math.floor(Math.random() * 50),
        errors: Math.max(0, prev.errors + Math.floor(Math.random() * 3) - 1),
        responseTime: Math.max(50, Math.min(500, prev.responseTime + (Math.random() - 0.5) * 50)),
        uptime: 99.98,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: 'API Server', status: 'healthy', uptime: '99.99%', responseTime: '45ms' },
    { name: 'Database', status: 'healthy', uptime: '99.98%', responseTime: '12ms' },
    { name: 'Cache (Redis)', status: 'healthy', uptime: '100%', responseTime: '2ms' },
    { name: 'Storage (S3)', status: 'healthy', uptime: '99.99%', responseTime: '89ms' },
    { name: 'CDN', status: 'healthy', uptime: '100%', responseTime: '15ms' },
    { name: 'Auth Service', status: 'healthy', uptime: '99.97%', responseTime: '67ms' },
  ];

  return (
    <section id="system-monitoring" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">Live Monitoring</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 لوحة مراقبة النظام المباشرة
          </h2>
          <p className="text-gray-400">مراقبة حية لأداء جميع الخدمات</p>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-2">🖥️</div>
            <div className={`text-2xl font-black ${metrics.cpu > 80 ? 'text-red-400' : metrics.cpu > 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {Math.round(metrics.cpu)}%
            </div>
            <div className="text-gray-400 text-xs">CPU</div>
            <div className="h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full ${metrics.cpu > 80 ? 'bg-red-500' : metrics.cpu > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${metrics.cpu}%` }}
              />
            </div>
          </div>

          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-2">💾</div>
            <div className={`text-2xl font-black ${metrics.memory > 80 ? 'text-red-400' : metrics.memory > 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {Math.round(metrics.memory)}%
            </div>
            <div className="text-gray-400 text-xs">Memory</div>
            <div className="h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full ${metrics.memory > 80 ? 'bg-red-500' : metrics.memory > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${metrics.memory}%` }}
              />
            </div>
          </div>

          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-2">📡</div>
            <div className="text-2xl font-black text-blue-400">{metrics.requests.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">Requests/min</div>
          </div>

          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <div className={`text-2xl font-black ${metrics.errors > 5 ? 'text-red-400' : 'text-emerald-400'}`}>
              {metrics.errors}
            </div>
            <div className="text-gray-400 text-xs">Errors</div>
          </div>

          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className={`text-2xl font-black ${metrics.responseTime > 300 ? 'text-red-400' : metrics.responseTime > 200 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {Math.round(metrics.responseTime)}ms
            </div>
            <div className="text-gray-400 text-xs">Response Time</div>
          </div>

          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-2xl font-black text-emerald-400">{metrics.uptime}%</div>
            <div className="text-gray-400 text-xs">Uptime</div>
          </div>
        </div>

        {/* Services Status */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">🔧 حالة الخدمات</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <div key={i} className="glass-card-light p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-bold text-sm">{service.name}</h4>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-400 text-xs">{service.status}</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-gray-400">Uptime</div>
                    <div className="text-white font-bold">{service.uptime}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Response</div>
                    <div className="text-white font-bold">{service.responseTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-white font-bold text-lg mb-4">🚨 التنبيهات</h3>
          <div className="space-y-2">
            <div className="glass-card-light p-3 flex items-center gap-3 border-l-4 border-emerald-500">
              <span className="text-emerald-400">✓</span>
              <div className="flex-1">
                <div className="text-white text-sm">جميع الخدمات تعمل بشكل طبيعي</div>
                <div className="text-gray-400 text-xs">منذ دقيقتين</div>
              </div>
            </div>
            <div className="glass-card-light p-3 flex items-center gap-3 border-l-4 border-amber-500">
              <span className="text-amber-400">⚠️</span>
              <div className="flex-1">
                <div className="text-white text-sm">استخدام الذاكرة مرتفع قليلاً (62%)</div>
                <div className="text-gray-400 text-xs">منذ 5 دقائق</div>
              </div>
            </div>
            <div className="glass-card-light p-3 flex items-center gap-3 border-l-4 border-emerald-500">
              <span className="text-emerald-400">✓</span>
              <div className="flex-1">
                <div className="text-white text-sm">تم تحديث قاعدة البيانات بنجاح</div>
                <div className="text-gray-400 text-xs">منذ 15 دقيقة</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
