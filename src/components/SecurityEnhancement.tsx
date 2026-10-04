import { useState } from 'react';

// ============================================
// 🔒 نظام الأمان المتقدم
// ============================================

export default function SecurityEnhancement() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);

  const securityMetrics = [
    { label: 'محاولات الدخول الفاشلة', value: '0', icon: '🚫', color: 'text-emerald-400' },
    { label: 'الجلسات النشطة', value: '1', icon: '🔐', color: 'text-blue-400' },
    { label: 'آخر تسجيل دخول', value: 'الآن', icon: '⏰', color: 'text-purple-400' },
    { label: 'مستوى الأمان', value: 'عالي', icon: '🛡️', color: 'text-emerald-400' },
  ];

  const recentActivity = [
    { action: 'تسجيل دخول ناجح', time: 'منذ 5 دقائق', location: 'القاهرة، مصر', device: 'Chrome على Windows', status: 'success' },
    { action: 'تغيير كلمة المرور', time: 'منذ يومين', location: 'القاهرة، مصر', device: 'Chrome على Windows', status: 'success' },
    { action: 'محاولة دخول فاشلة', time: 'منذ أسبوع', location: 'غير معروف', device: 'Unknown', status: 'failed' },
  ];

  const activeSessions = [
    { id: 1, device: 'Chrome على Windows', location: 'القاهرة، مصر', lastActive: 'الآن', current: true },
    { id: 2, device: 'Safari على iPhone', location: 'الإسكندرية، مصر', lastActive: 'منذ ساعتين', current: false },
  ];

  return (
    <section id="security" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-300 text-xs font-semibold">Security</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔒 نظام الأمان المتقدم
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            حماية شاملة لحسابك وبياناتك
          </p>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {securityMetrics.map((metric, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className={`text-2xl font-black ${metric.color} mb-1`}>{metric.value}</div>
              <div className="text-gray-400 text-xs">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Security Settings */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">⚙️ إعدادات الأمان</h3>
            <div className="space-y-4">
              {/* Two-Factor Authentication */}
              <div className="glass-card-light p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-white font-bold">المصادقة الثنائية (2FA)</div>
                    <div className="text-gray-400 text-xs">حماية إضافية لحسابك</div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      twoFactorEnabled ? 'bg-emerald-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                {twoFactorEnabled && (
                  <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <div className="text-emerald-300 text-xs">✓ المصادقة الثنائية مفعّلة</div>
                  </div>
                )}
              </div>

              {/* Biometric Authentication */}
              <div className="glass-card-light p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-white font-bold">المصادقة البيومترية</div>
                    <div className="text-gray-400 text-xs">بصمة الإصبع أو التعرف على الوجه</div>
                  </div>
                  <button
                    onClick={() => setBiometricEnabled(!biometricEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      biometricEnabled ? 'bg-emerald-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      biometricEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Session Timeout */}
              <div className="glass-card-light p-4">
                <div className="text-white font-bold mb-2">مهلة الجلسة</div>
                <div className="text-gray-400 text-xs mb-3">تسجيل الخروج التلقائي بعد فترة عدم نشاط</div>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                >
                  <option value="15" className="bg-gray-900">15 دقيقة</option>
                  <option value="30" className="bg-gray-900">30 دقيقة</option>
                  <option value="60" className="bg-gray-900">ساعة واحدة</option>
                  <option value="120" className="bg-gray-900">ساعتان</option>
                </select>
              </div>

              {/* Change Password */}
              <button className="w-full py-3 bg-gradient-to-l from-red-500 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                🔑 تغيير كلمة المرور
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🖥️ الجلسات النشطة</h3>
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div key={session.id} className="glass-card-light p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{session.device.includes('Chrome') ? '💻' : '📱'}</div>
                      <div>
                        <div className="text-white font-bold text-sm">{session.device}</div>
                        <div className="text-gray-400 text-xs">{session.location}</div>
                      </div>
                    </div>
                    {session.current && (
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">
                        الحالي
                      </span>
                    )}
                  </div>
                  <div className="text-gray-400 text-xs">آخر نشاط: {session.lastActive}</div>
                  {!session.current && (
                    <button className="mt-2 text-red-400 text-xs hover:text-red-300">
                      ✗ إنهاء الجلسة
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📊 النشاط الأمني الأخير</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className={`glass-card-light p-4 border-l-4 ${
                activity.status === 'success' ? 'border-emerald-500' : 'border-red-500'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {activity.status === 'success' ? '✓' : '✗'}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{activity.action}</div>
                      <div className="text-gray-400 text-xs">{activity.time}</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-gray-400 text-xs">{activity.location}</div>
                    <div className="text-gray-500 text-xs">{activity.device}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '🔐', title: 'تشفير AES-256', desc: 'حماية عالية للبيانات' },
            { icon: '🛡️', title: 'حماية CSRF', desc: 'منع الهجمات' },
            { icon: '🔒', title: 'حماية XSS', desc: 'منع الحقن' },
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
