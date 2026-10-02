import { useState, useEffect } from 'react';

interface Settings {
  theme: 'dark' | 'light' | 'system';
  language: 'ar' | 'en' | 'fr' | 'es';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    training: boolean;
    payments: boolean;
    tournaments: boolean;
  };
  privacy: {
    showProfile: boolean;
    allowMessages: boolean;
    shareStats: boolean;
  };
  security: {
    twoFactor: boolean;
    loginAlerts: boolean;
  };
}

const defaultSettings: Settings = {
  theme: 'dark',
  language: 'ar',
  notifications: {
    email: true,
    push: true,
    sms: false,
    training: true,
    payments: true,
    tournaments: false,
  },
  privacy: {
    showProfile: false,
    allowMessages: true,
    shareStats: false,
  },
  security: {
    twoFactor: false,
    loginAlerts: true,
  },
};

export default function Settings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('app-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [saved, setSaved] = useState(false);

  // حفظ الإعدادات في localStorage
  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
    
    // تطبيق الوضع الداكن/الفاتح
    if (settings.theme === 'dark') {
      document.body.classList.remove('light-mode');
    } else if (settings.theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      // system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
      }
    }
  }, [settings]);

  const handleSave = () => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('app-settings');
  };

  const updateNotification = (key: keyof Settings['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const updatePrivacy = (key: keyof Settings['privacy'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value }
    }));
  };

  const updateSecurity = (key: keyof Settings['security'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, [key]: value }
    }));
  };

  return (
    <section id="settings" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">Settings</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ⚙️ الإعدادات
          </h2>
          <p className="text-gray-400">تحكم كامل في تجربتك مع الأكاديمية</p>
        </div>

        {/* Theme Settings */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>🎨</span> المظهر
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
              className={`p-4 rounded-xl transition-all ${
                settings.theme === 'light'
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg'
                  : 'glass-card-light text-gray-400 hover:text-white'
              }`}
            >
              <div className="text-3xl mb-2">☀️</div>
              <div className="font-bold">فاتح</div>
            </button>
            <button
              onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
              className={`p-4 rounded-xl transition-all ${
                settings.theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'glass-card-light text-gray-400 hover:text-white'
              }`}
            >
              <div className="text-3xl mb-2">🌙</div>
              <div className="font-bold">داكن</div>
            </button>
            <button
              onClick={() => setSettings(prev => ({ ...prev, theme: 'system' }))}
              className={`p-4 rounded-xl transition-all ${
                settings.theme === 'system'
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'glass-card-light text-gray-400 hover:text-white'
              }`}
            >
              <div className="text-3xl mb-2">💻</div>
              <div className="font-bold">تلقائي</div>
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>🌍</span> اللغة
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { code: 'ar', name: 'العربية', flag: '🇸🇦' },
              { code: 'en', name: 'English', flag: '🇺🇸' },
              { code: 'fr', name: 'Français', flag: '🇫🇷' },
              { code: 'es', name: 'Español', flag: '🇪🇸' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSettings(prev => ({ ...prev, language: lang.code as any }))}
                className={`p-3 rounded-xl transition-all ${
                  settings.language === lang.code
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg'
                    : 'glass-card-light text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-2xl mb-1">{lang.flag}</div>
                <div className="font-bold text-sm">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>🔔</span> الإشعارات
          </h3>
          <div className="space-y-3">
            {[
              { key: 'email', label: 'إشعارات البريد الإلكتروني', icon: '📧' },
              { key: 'push', label: 'إشعارات المتصفح', icon: '🔔' },
              { key: 'sms', label: 'إشعارات SMS', icon: '💬' },
              { key: 'training', label: 'تذكيرات التدريبات', icon: '📅' },
              { key: 'payments', label: 'إشعارات الدفع', icon: '💳' },
              { key: 'tournaments', label: 'إشعارات البطولات', icon: '🏆' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between glass-card-light p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-white">{item.label}</span>
                </div>
                <button
                  onClick={() => updateNotification(item.key as any, !settings.notifications[item.key as keyof typeof settings.notifications])}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.notifications[item.key as keyof typeof settings.notifications]
                      ? 'bg-emerald-500'
                      : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.notifications[item.key as keyof typeof settings.notifications]
                        ? 'translate-x-6'
                        : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>🔐</span> الخصوصية
          </h3>
          <div className="space-y-3">
            {[
              { key: 'showProfile', label: 'إظهار ملفي الشخصي للعامة', icon: '👤' },
              { key: 'allowMessages', label: 'السماح برسائل من اللاعبين الآخرين', icon: '💬' },
              { key: 'shareStats', label: 'مشاركة إحصائيات الأداء', icon: '📊' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between glass-card-light p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-white">{item.label}</span>
                </div>
                <button
                  onClick={() => updatePrivacy(item.key as any, !settings.privacy[item.key as keyof typeof settings.privacy])}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.privacy[item.key as keyof typeof settings.privacy]
                      ? 'bg-emerald-500'
                      : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.privacy[item.key as keyof typeof settings.privacy]
                        ? 'translate-x-6'
                        : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>🔒</span> الأمان
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between glass-card-light p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔐</span>
                <div>
                  <div className="text-white">المصادقة الثنائية (2FA)</div>
                  <div className="text-gray-400 text-xs">حماية إضافية لحسابك</div>
                </div>
              </div>
              <button
                onClick={() => updateSecurity('twoFactor', !settings.security.twoFactor)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.security.twoFactor ? 'bg-emerald-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.security.twoFactor ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between glass-card-light p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="text-white">تنبيهات تسجيل الدخول</div>
                  <div className="text-gray-400 text-xs">إشعار عند تسجيل الدخول من جهاز جديد</div>
                </div>
              </div>
              <button
                onClick={() => updateSecurity('loginAlerts', !settings.security.loginAlerts)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.security.loginAlerts ? 'bg-emerald-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.security.loginAlerts ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <button className="w-full glass-card-light p-4 text-right hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔑</span>
                <div>
                  <div className="text-white font-bold">تغيير كلمة المرور</div>
                  <div className="text-gray-400 text-xs">آخر تغيير: منذ 3 أشهر</div>
                </div>
              </div>
            </button>

            <button className="w-full glass-card-light p-4 text-right hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <div className="text-white font-bold">الأجهزة المسجلة</div>
                  <div className="text-gray-400 text-xs">3 أجهزة نشطة</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className={`flex-1 py-4 font-bold rounded-xl transition-all ${
              saved
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-l from-blue-500 to-purple-600 text-white hover:opacity-90'
            }`}
          >
            {saved ? '✓ تم الحفظ' : '💾 حفظ الإعدادات'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-4 glass-card text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
          >
            🔄 إعادة تعيين
          </button>
        </div>

        {/* Current Settings Preview */}
        <div className="glass-card p-6 mt-6">
          <h3 className="text-white font-bold text-lg mb-4">📋 الإعدادات الحالية</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card-light p-4">
              <div className="text-gray-400 text-xs mb-1">المظهر</div>
              <div className="text-white font-bold">
                {settings.theme === 'dark' ? '🌙 داكن' : settings.theme === 'light' ? '☀️ فاتح' : '💻 تلقائي'}
              </div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-gray-400 text-xs mb-1">اللغة</div>
              <div className="text-white font-bold">
                {settings.language === 'ar' ? '🇸🇦 العربية' :
                 settings.language === 'en' ? '🇺🇸 English' :
                 settings.language === 'fr' ? '🇫🇷 Français' : '🇪🇸 Español'}
              </div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-gray-400 text-xs mb-1">الإشعارات المفعلة</div>
              <div className="text-white font-bold">
                {Object.values(settings.notifications).filter(v => v).length} من 6
              </div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-gray-400 text-xs mb-1">الأمان</div>
              <div className="text-white font-bold">
                {settings.security.twoFactor ? '🔐 2FA مفعل' : '🔓 2FA معطل'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
