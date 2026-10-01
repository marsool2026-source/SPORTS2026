import { useState } from 'react';

interface Notification {
  id: number;
  type: 'urgent' | 'normal' | 'promo' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

const notifications: Notification[] = [
  { id: 1, type: 'urgent', title: 'إلغاء تدريب اليوم', message: 'تم إلغاء تدريب الناشئين U10 اليوم بسبب سوء الأحوال الجوية', time: 'منذ 5 دقائق', read: false, icon: '⚠️' },
  { id: 2, type: 'normal', title: 'تذكير بالتدريب', message: 'تدريب الغد الساعة 4:00 مساءً في الملعب الرئيسي', time: 'منذ ساعة', read: false, icon: '📅' },
  { id: 3, type: 'promo', title: 'عرض خاص!', message: 'خصم 20% على جميع المنتجات لمدة 48 ساعة فقط', time: 'منذ 3 ساعات', read: true, icon: '🎁' },
  { id: 4, type: 'system', title: 'تحديث النظام', message: 'تم تحديث التطبيق بنسخة جديدة مع ميزات محسنة', time: 'أمس', read: true, icon: '🔄' },
  { id: 5, type: 'normal', title: 'تقرير الأداء', message: 'تقرير الأداء الشهري جاهز للمراجعة', time: 'منذ يومين', read: true, icon: '📊' },
];

export default function NotificationCenter() {
  const [items, setItems] = useState<Notification[]>(notifications);
  const [filter, setFilter] = useState<'all' | 'unread' | Notification['type']>('all');

  const unreadCount = items.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredItems = items.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const getTypeColor = (type: Notification['type']) => {
    const colors = {
      urgent: 'border-red-500/30 bg-red-500/5',
      normal: 'border-blue-500/30 bg-blue-500/5',
      promo: 'border-amber-500/30 bg-amber-500/5',
      system: 'border-gray-500/30 bg-gray-500/5',
    };
    return colors[type];
  };

  return (
    <section id="notifications" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-300 text-xs font-semibold">مركز الإشعارات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔔 مركز <span className="gradient-text">الإشعارات</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            جميع التنبيهات والتحديثات في مكان واحد
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{unreadCount}</div>
            <div className="text-xs text-gray-400">غير مقروء</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{items.length - unreadCount}</div>
            <div className="text-xs text-gray-400">مقروء</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{items.length}</div>
            <div className="text-xs text-gray-400">الإجمالي</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'all', label: 'الكل', count: items.length },
            { id: 'unread', label: 'غير مقروء', count: unreadCount },
            { id: 'urgent', label: '⚠️ عاجل', count: items.filter(n => n.type === 'urgent').length },
            { id: 'normal', label: '📋 عادي', count: items.filter(n => n.type === 'normal').length },
            { id: 'promo', label: '🎁 عروض', count: items.filter(n => n.type === 'promo').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                filter === tab.id
                  ? 'bg-gradient-to-l from-blue-500 to-cyan-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Mark All as Read */}
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="w-full mb-4 py-2 glass-card text-blue-300 text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            ✓ تحديد الكل كمقروء
          </button>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredItems.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`glass-card p-4 cursor-pointer transition-all hover:scale-[1.02] border ${getTypeColor(notification.type)} ${
                !notification.read ? 'ring-1 ring-white/20' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{notification.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-sm ${!notification.read ? 'text-white' : 'text-gray-400'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed mb-1">
                    {notification.message}
                  </p>
                  <div className="text-gray-500 text-[10px]">{notification.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔕</div>
            <p className="text-gray-400">لا توجد إشعارات</p>
          </div>
        )}

        {/* Settings */}
        <div className="mt-8 glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>⚙️</span> إعدادات الإشعارات
          </h3>
          <div className="space-y-3">
            {[
              { label: 'إشعارات التدريبات', enabled: true },
              { label: 'إشعارات البطولات', enabled: true },
              { label: 'إشعارات مالية', enabled: true },
              { label: 'عروض وخصومات', enabled: false },
              { label: 'تحديثات النظام', enabled: true },
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between glass-card-light p-3">
                <span className="text-white text-sm">{setting.label}</span>
                <button className={`w-10 h-5 rounded-full transition-colors ${
                  setting.enabled ? 'bg-emerald-500' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                    setting.enabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
