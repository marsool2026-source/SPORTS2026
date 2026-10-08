import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

// ============================================
// 📱 نظام صفحات المستخدمين الكامل
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'coach' | 'admin' | 'financial' | 'parent';
  avatar?: string;
  joinDate: string;
  subscriptionStatus: 'active' | 'pending' | 'expired';
  subscriptionExpiry: string;
}

interface UserActivity {
  id: string;
  type: 'attendance' | 'payment' | 'achievement' | 'login';
  title: string;
  description: string;
  date: string;
  icon: string;
}

export default function UserPages() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'settings' | 'activity'>('dashboard');
  
  // بيانات المستخدم الحالي (محاكاة)
  const currentUser: User = {
    id: 'USR-001',
    name: 'أحمد محمد علي',
    email: 'ahmed@example.com',
    phone: '+20 100 123 4567',
    role: 'player',
    avatar: '👨‍🎓',
    joinDate: '2025-09-15',
    subscriptionStatus: 'active',
    subscriptionExpiry: '2026-09-15',
  };

  // نشاط المستخدم
  const userActivities: UserActivity[] = [
    {
      id: '1',
      type: 'attendance',
      title: 'حضور تدريب',
      description: 'تم تسجيل حضورك في تدريب كرة القدم',
      date: '2026-01-20 16:30',
      icon: '✅',
    },
    {
      id: '2',
      type: 'payment',
      title: 'دفع اشتراك',
      description: 'تم دفع اشتراك الشهر بنجاح',
      date: '2026-01-15 10:00',
      icon: '💳',
    },
    {
      id: '3',
      type: 'achievement',
      title: 'إنجاز جديد',
      description: 'حصلت على شارة "هداف الشهر"',
      date: '2026-01-10 18:00',
      icon: '🏆',
    },
    {
      id: '4',
      type: 'login',
      title: 'تسجيل دخول',
      description: 'تم تسجيل الدخول من جهاز جديد',
      date: '2026-01-20 09:00',
      icon: '🔐',
    },
  ];

  // QR Code Data
  const qrData = JSON.stringify({
    userId: currentUser.id,
    name: currentUser.name,
    role: currentUser.role,
    expiry: currentUser.subscriptionExpiry,
    signature: 'SA-2026-VERIFIED',
  });

  return (
    <section id="user-pages" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">User Portal</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📱 صفحات المستخدمين
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            لوحة تحكم شاملة لكل مستخدم مع QR Code احترافي
          </p>
        </div>

        {/* User Card */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl shadow-2xl">
                {currentUser.avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm border-2 border-slate-900">
                ✓
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-right">
              <h3 className="text-white font-bold text-2xl mb-1">{currentUser.name}</h3>
              <p className="text-gray-400 text-sm mb-2">
                {currentUser.role === 'player' ? 'لاعب' : 
                 currentUser.role === 'coach' ? 'مدرب' : 
                 currentUser.role === 'admin' ? 'مدير' : 
                 currentUser.role === 'financial' ? 'مدير مالي' : 'ولي أمر'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                  ✓ اشتراك نشط
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                  📅 ينتهي: {currentUser.subscriptionExpiry}
                </span>
              </div>
            </div>

            {/* QR Code */}
            <div className="glass-card-light p-4 text-center">
              <div className="bg-white p-3 rounded-xl mb-2">
                <QRCodeSVG
                  value={qrData}
                  size={120}
                  level="H"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </div>
              <div className="text-gray-400 text-xs">QR Code الخاص بك</div>
              <div className="text-blue-400 text-xs font-mono mt-1">{currentUser.id}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'dashboard', label: '🏠 لوحة التحكم' },
            { id: 'profile', label: '👤 الملف الشخصي' },
            { id: 'settings', label: '⚙️ الإعدادات' },
            { id: 'activity', label: '📊 النشاط' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-5 text-center">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-2xl font-black text-blue-400">24</div>
                <div className="text-gray-400 text-xs">حضور هذا الشهر</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-black text-amber-400">5</div>
                <div className="text-gray-400 text-xs">إنجازات</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl mb-2">💳</div>
                <div className="text-2xl font-black text-emerald-400">12</div>
                <div className="text-gray-400 text-xs">مدفوعات</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-black text-purple-400">2,450</div>
                <div className="text-gray-400 text-xs">نقاط الولاء</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">⚡ إجراءات سريعة</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="glass-card-light p-4 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-white text-sm font-bold">حجز حصة</div>
                </button>
                <button className="glass-card-light p-4 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">💳</div>
                  <div className="text-white text-sm font-bold">دفع اشتراك</div>
                </button>
                <button className="glass-card-light p-4 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-white text-sm font-bold">عرض الأداء</div>
                </button>
                <button className="glass-card-light p-4 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🎁</div>
                  <div className="text-white text-sm font-bold">المكافآت</div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">📊 النشاط الأخير</h3>
              <div className="space-y-3">
                {userActivities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="glass-card-light p-4 flex items-center gap-4">
                    <div className="text-3xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{activity.title}</div>
                      <div className="text-gray-400 text-xs">{activity.description}</div>
                    </div>
                    <div className="text-gray-500 text-xs">{activity.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">👤 المعلومات الشخصية</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    defaultValue={currentUser.phone}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">الدور</label>
                  <input
                    type="text"
                    defaultValue={currentUser.role === 'player' ? 'لاعب' : 'مدرب'}
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-400"
                  />
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-gradient-to-l from-blue-500 to-purple-600 text-white font-bold rounded-lg">
                💾 حفظ التغييرات
              </button>
            </div>

            {/* QR Code Section */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">📱 QR Code الخاص بك</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-white p-6 rounded-xl inline-block mb-4">
                    <QRCodeSVG
                      value={qrData}
                      size={200}
                      level="H"
                      includeMargin={true}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                    />
                  </div>
                  <div className="text-gray-400 text-sm">امسح هذا الرمز لتسجيل الحضور</div>
                </div>
                <div className="space-y-3">
                  <div className="glass-card-light p-4">
                    <div className="text-gray-400 text-xs mb-1">معرف المستخدم</div>
                    <div className="text-white font-mono font-bold">{currentUser.id}</div>
                  </div>
                  <div className="glass-card-light p-4">
                    <div className="text-gray-400 text-xs mb-1">تاريخ الانضمام</div>
                    <div className="text-white">{currentUser.joinDate}</div>
                  </div>
                  <div className="glass-card-light p-4">
                    <div className="text-gray-400 text-xs mb-1">انتهاء الاشتراك</div>
                    <div className="text-emerald-400 font-bold">{currentUser.subscriptionExpiry}</div>
                  </div>
                  <button className="w-full py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-bold">
                    📥 تحميل QR Code
                  </button>
                </div>
              </div>
            </div>

            {/* Subscription Info */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">💎 معلومات الاشتراك</h3>
              <div className="glass-card-light p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-white font-bold">الباقة المتقدمة</div>
                    <div className="text-gray-400 text-sm">12 حصة شهرياً + مدرب معتمد</div>
                  </div>
                  <div className="text-emerald-400 font-bold text-xl">800 ج.م/شهر</div>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-l from-emerald-500 to-teal-600" style={{ width: '65%' }} />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>استخدمت 18 من 30 حصة</span>
                  <span>يتبقى 12 حصة</span>
                </div>
              </div>
              <button className="mt-4 w-full py-3 bg-gradient-to-l from-amber-500 to-orange-600 text-white font-bold rounded-lg">
                🔄 تجديد الاشتراك
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Notification Settings */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">🔔 إعدادات الإشعارات</h3>
              <div className="space-y-3">
                {[
                  { label: 'إشعارات التدريبات', enabled: true },
                  { label: 'إشعارات الدفع', enabled: true },
                  { label: 'إشعارات البطولات', enabled: false },
                  { label: 'إشعارات التسويق', enabled: false },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between glass-card-light p-4">
                    <span className="text-white">{setting.label}</span>
                    <button className={`w-12 h-6 rounded-full transition-colors ${
                      setting.enabled ? 'bg-emerald-500' : 'bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Settings */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">🔒 إعدادات الأمان</h3>
              <div className="space-y-3">
                <button className="w-full glass-card-light p-4 text-right hover:bg-white/10 transition-colors">
                  <div className="text-white font-bold">تغيير كلمة المرور</div>
                  <div className="text-gray-400 text-xs">آخر تغيير: منذ 3 أشهر</div>
                </button>
                <button className="w-full glass-card-light p-4 text-right hover:bg-white/10 transition-colors">
                  <div className="text-white font-bold">تفعيل المصادقة الثنائية</div>
                  <div className="text-gray-400 text-xs">حماية إضافية لحسابك</div>
                </button>
                <button className="w-full glass-card-light p-4 text-right hover:bg-white/10 transition-colors">
                  <div className="text-white font-bold">الأجهزة المسجلة</div>
                  <div className="text-gray-400 text-xs">3 أجهزة نشطة</div>
                </button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">🔐 إعدادات الخصوصية</h3>
              <div className="space-y-3">
                {[
                  { label: 'إظهار ملفي الشخصي للعامة', enabled: false },
                  { label: 'السماح برسائل من اللاعبين الآخرين', enabled: true },
                  { label: 'مشاركة إحصائيات الأداء', enabled: false },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between glass-card-light p-4">
                    <span className="text-white">{setting.label}</span>
                    <button className={`w-12 h-6 rounded-full transition-colors ${
                      setting.enabled ? 'bg-emerald-500' : 'bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            {/* Activity Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-5 text-center">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-2xl font-black text-blue-400">156</div>
                <div className="text-gray-400 text-xs">إجمالي الحضور</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl mb-2">💳</div>
                <div className="text-2xl font-black text-emerald-400">12</div>
                <div className="text-gray-400 text-xs">مدفوعات</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-black text-amber-400">5</div>
                <div className="text-gray-400 text-xs">إنجازات</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl mb-2">🔐</div>
                <div className="text-2xl font-black text-purple-400">89</div>
                <div className="text-gray-400 text-xs">تسجيل دخول</div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">📊 سجل النشاط</h3>
              <div className="space-y-3">
                {userActivities.map((activity) => (
                  <div key={activity.id} className="glass-card-light p-4 flex items-center gap-4">
                    <div className="text-3xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-bold">{activity.title}</div>
                      <div className="text-gray-400 text-sm">{activity.description}</div>
                      <div className="text-gray-500 text-xs mt-1">{activity.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">📥 تصدير البيانات</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <button className="glass-card-light p-4 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-white font-bold">تقرير الحضور</div>
                  <div className="text-gray-400 text-xs">PDF</div>
                </button>
                <button className="glass-card-light p-4 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">💳</div>
                  <div className="text-white font-bold">سجل المدفوعات</div>
                  <div className="text-gray-400 text-xs">Excel</div>
                </button>
                <button className="glass-card-light p-4 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-white font-bold">شهادة الإنجازات</div>
                  <div className="text-gray-400 text-xs">PDF</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
