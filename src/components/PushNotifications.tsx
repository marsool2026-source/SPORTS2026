import { useState, useEffect } from 'react';
import { NotificationManager, PlatformDetector } from '../utils/compatibility';

interface AppNotification {
  id: number;
  title: string;
  message: string;
  type: 'training' | 'payment' | 'tournament' | 'system';
  time: string;
  read: boolean;
  icon: string;
}

export default function PushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    if (PlatformDetector.supportsNotifications()) {
      setPermission(NotificationManager.getPermission());
    }
  }, []);

  const requestPermission = async () => {
    if (PlatformDetector.supportsNotifications()) {
      const result = await NotificationManager.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        showNotification('تم التفعيل!', 'ستصلك الإشعارات الآن', 'system');
      }
    } else {
      // Fallback: عرض رسالة للمستخدم
      alert('الإشعارات غير مدعومة على هذا الجهاز');
    }
  };

  const showNotification = (title: string, message: string, type: AppNotification['type']) => {
    const icons = {
      training: '⚽',
      payment: '💰',
      tournament: '🏆',
      system: '🔔'
    };

    const newNotification: AppNotification = {
      id: Date.now(),
      title,
      message,
      type,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      icon: icons[type]
    };

    setNotifications(prev => [newNotification, ...prev]);

    // استخدام NotificationManager الآمن
    if (permission === 'granted' && PlatformDetector.supportsNotifications()) {
      NotificationManager.show(title, {
        body: message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }
  };

  const simulateNotifications = () => {
    setShowDemo(true);
    
    setTimeout(() => {
      showNotification('تذكير بالتدريب', 'تدريبك غداً الساعة 4:00 مساءً', 'training');
    }, 1000);

    setTimeout(() => {
      showNotification('تأكيد الدفع', 'تم استلام دفعتك بنجاح', 'payment');
    }, 2500);

    setTimeout(() => {
      showNotification('بطولة قادمة', 'بطولة الناشئين بعد 3 أيام', 'tournament');
    }, 4000);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <section id="push-notifications" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-300 text-xs font-semibold">إشعارات فورية</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔔 نظام <span className="gradient-text">الإشعارات</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            إشعارات فورية للتدريبات والدفع والبطولات
          </p>
        </div>

        {/* Permission Status */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">حالة الإشعارات</h3>
              <p className="text-gray-400 text-sm">
                {permission === 'granted' && '✓ مفعلة - ستصلك الإشعارات'}
                {permission === 'denied' && '✗ مرفوضة - لن تصلك إشعارات'}
                {permission === 'default' && '⏸ غير مفعلة - اضغط للتفعيل'}
              </p>
            </div>
            {permission !== 'granted' && (
              <button
                onClick={requestPermission}
                className="px-6 py-3 bg-gradient-to-l from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
              >
                تفعيل الإشعارات 🔔
              </button>
            )}
          </div>

          {/* Notification Types */}
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { type: 'training', icon: '⚽', label: 'تذكيرات التدريبات', desc: 'مواعيد وتغييرات' },
              { type: 'payment', icon: '💰', label: 'إشعارات الدفع', desc: 'تأكيدات وفواتير' },
              { type: 'tournament', icon: '🏆', label: 'البطولات', desc: 'مواعيد ونتائج' },
              { type: 'system', icon: '🔔', label: 'إشعارات النظام', desc: 'تحديثات وإعلانات' },
            ].map((item, i) => (
              <div key={i} className="glass-card-light p-3 flex items-center gap-3">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold">{item.label}</div>
                  <div className="text-gray-400 text-xs">{item.desc}</div>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                  <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Button */}
        <div className="text-center mb-6">
          <button
            onClick={simulateNotifications}
            className="px-8 py-4 bg-gradient-to-l from-purple-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            🎬 تجربة الإشعارات
          </button>
        </div>

        {/* Notifications List */}
        {notifications.length > 0 && (
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>📨</span> الإشعارات الواردة ({notifications.length})
            </h3>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`glass-card-light p-4 cursor-pointer transition-all hover:bg-white/10 ${
                    !notification.read ? 'border-r-4 border-red-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{notification.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-bold text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-gray-300 text-xs mb-1">{notification.message}</p>
                      <div className="text-gray-500 text-[10px]">{notification.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { icon: '⚡', title: 'فوري', desc: 'إشعارات لحظية' },
            { icon: '🎯', title: 'مخصص', desc: 'حسب اهتماماتك' },
            { icon: '🔒', title: 'آمن', desc: 'مشفر ومحمي' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
