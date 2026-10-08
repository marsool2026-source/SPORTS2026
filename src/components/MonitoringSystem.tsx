import { useState, useEffect } from 'react';

// ============================================
// 📊 نظام المراقبة
// ============================================

export default function MonitoringSystem() {
  const [systemStatus, setSystemStatus] = useState<'healthy' | 'warning' | 'critical'>('healthy');
  const [uptime, setUptime] = useState(99.98);
  const [responseTime, setResponseTime] = useState(145);
  const [errorRate, setErrorRate] = useState(0.02);

  useEffect(() => {
    // محاكاة تحديث البيانات
    const interval = setInterval(() => {
      setResponseTime(Math.floor(Math.random() * 100) + 100);
      setErrorRate(Math.random() * 0.05);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: 'API Server', status: 'healthy', uptime: 99.99, responseTime: 45, icon: '🖥️' },
    { name: 'Database', status: 'healthy', uptime: 99.98, responseTime: 12, icon: '🗄️' },
    { name: 'Cache (Redis)', status: 'healthy', uptime: 100, responseTime: 2, icon: '⚡' },
    { name: 'Storage (S3)', status: 'healthy', uptime: 99.99, responseTime: 89, icon: '💾' },
    { name: 'CDN', status: 'healthy', uptime: 100, responseTime: 15, icon: '🌐' },
    { name: 'Auth Service', status: 'healthy', uptime: 99.97, responseTime: 67, icon: '🔐' },
    { name: 'Email Service', status: 'healthy', uptime: 99.95, responseTime: 234, icon: '📧' },
    { name: 'Payment Gateway', status: 'healthy', uptime: 99.99, responseTime: 156, icon: '💳' },
  ];

  const alerts = [
    { id: 1, type: 'info', title: 'نشر جديد', message: 'تم نشر الإصدار 10.0.0 بنجاح', time: 'منذ 5 دقائق', status: 'resolved' },
    { id: 2, type: 'warning', title: 'استخدام عالي', message: 'استخدام الذاكرة 78%', time: 'منذ 15 دقيقة', status: 'monitoring' },
    { id: 3, type: 'info', title: 'نسخة احتياطية', message: 'تم إنشاء نسخة احتياطية', time: 'منذ ساعة', status: 'resolved' },
    { id: 4, type: 'success', title: 'أداء ممتاز', message: 'جميع الخدمات تعمل بشكل طبيعي', time: 'منذ ساعتين', status: 'resolved' },
  ];

  const metrics = [
    { label: 'وقت التشغيل', value: `${uptime}%`, icon: '✅', color: 'text-emerald-400' },
    { label: 'وقت الاستجابة', value: `${responseTime}ms`, icon: '⚡', color: 'text-blue-400' },
    { label: 'معدل الأخطاء', value: `${(errorRate * 100).toFixed(2)}%`, icon: '⚠️', color: 'text-amber-400' },
    { label: 'الطلبات/الثانية', value: '1,247', icon: '📊', color: 'text-purple-400' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy': return 'يعمل';
      case 'warning': return 'تحذير';
      case 'critical': return 'حرج';
      default: return 'غير معروف';
    }
  };

  return (
    <section id="monitoring" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">Live Monitoring</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 نظام المراقبة المباشر
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            مراقبة حية لأداء جميع الخدمات
          </p>
        </div>

        {/* System Status */}
        <div className={`glass-card p-8 mb-8 text-center border-2 ${
          systemStatus === 'healthy' ? 'border-emerald-500/50' :
          systemStatus === 'warning' ? 'border-amber-500/50' : 'border-red-500/50'
        }`}>
          <div className={`inline-block px-8 py-4 rounded-2xl mb-4 ${
            systemStatus === 'healthy' ? 'bg-emerald-500/20' :
            systemStatus === 'warning' ? 'bg-amber-500/20' : 'bg-red-500/20'
          }`}>
            <div className={`text-6xl font-black ${
              systemStatus === 'healthy' ? 'text-emerald-400' :
              systemStatus === 'warning' ? 'text-amber-400' : 'text-red-400'
            }`}>
              {systemStatus === 'healthy' ? '✓' : systemStatus === 'warning' ? '⚠' : '✗'}
            </div>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">
            حالة النظام: {systemStatus === 'healthy' ? 'صحي' : systemStatus === 'warning' ? 'تحذير' : 'حرج'}
          </h3>
          <p className="text-gray-400">
            {systemStatus === 'healthy' ? 'جميع الخدمات تعمل بشكل طبيعي' :
             systemStatus === 'warning' ? 'بعض الخدمات تحتاج انتباه' :
             'هناك مشاكل تحتاج معالجة فورية'}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className={`text-2xl font-black ${metric.color} mb-1`}>{metric.value}</div>
              <div className="text-gray-400 text-xs">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Services Status */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4">🔧 حالة الخدمات</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <div key={i} className="glass-card-light p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{service.icon}</div>
                    <div>
                      <div className="text-white font-bold text-sm">{service.name}</div>
                      <div className="text-gray-400 text-xs">
                        <span className={getStatusColor(service.status).replace('bg-', 'text-')}>
                          {getStatusText(service.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)} animate-pulse`} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-gray-400">Uptime</div>
                    <div className="text-white font-bold">{service.uptime}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Response</div>
                    <div className="text-white font-bold">{service.responseTime}ms</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">🚨 التنبيهات</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`glass-card-light p-4 border-l-4 ${
                alert.type === 'info' ? 'border-blue-500' :
                alert.type === 'warning' ? 'border-amber-500' :
                alert.type === 'error' ? 'border-red-500' :
                'border-emerald-500'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-2xl">
                      {alert.type === 'info' ? 'ℹ️' :
                       alert.type === 'warning' ? '⚠️' :
                       alert.type === 'error' ? '❌' : '✅'}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm mb-1">{alert.title}</div>
                      <div className="text-gray-400 text-xs mb-1">{alert.message}</div>
                      <div className="text-gray-500 text-xs">{alert.time}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    alert.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-300' :
                    alert.status === 'monitoring' ? 'bg-amber-500/20 text-amber-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {alert.status === 'resolved' ? '✓ محلول' :
                     alert.status === 'monitoring' ? '⏳ قيد المراقبة' : 'ℹ️ معلومات'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monitoring Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '📊', title: 'مراقبة حية', desc: 'بيانات فورية' },
            { icon: '🚨', title: 'تنبيهات ذكية', desc: 'إشعارات تلقائية' },
            { icon: '📈', title: 'تحليلات متقدمة', desc: 'تقارير مفصلة' },
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
