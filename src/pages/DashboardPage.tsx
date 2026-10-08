import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getPlayerStats } from '../services/players.service';
import { getTransactionStats } from '../services/transactions.service';
import { getAttendanceStats } from '../services/attendance.service';
import { getCoachStats } from '../services/coaches.service';
import { getTournamentStats } from '../services/tournaments.service';
import { getNotificationStats } from '../services/notifications.service';

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [playerStats, transactionStats, attendanceStats, coachStats, tournamentStats, notificationStats] = await Promise.all([
        getPlayerStats(),
        getTransactionStats(),
        getAttendanceStats(),
        getCoachStats(),
        getTournamentStats(),
        getNotificationStats(user?.id || ''),
      ]);

      setStats({
        players: playerStats,
        transactions: transactionStats,
        attendance: attendanceStats,
        coaches: coachStats,
        tournaments: tournamentStats,
        notifications: notificationStats,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">
            مرحباً، {userProfile?.full_name || user?.email} 👋
          </h1>
          <p className="text-gray-400">
            {userProfile?.role === 'admin' ? 'لوحة تحكم المدير' :
             userProfile?.role === 'coach' ? 'لوحة تحكم المدرب' :
             userProfile?.role === 'financial' ? 'لوحة تحكم المدير المالي' :
             'لوحة التحكم'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Players Stats */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                👥
              </div>
              <span className="text-emerald-400 text-sm font-bold">+12%</span>
            </div>
            <div className="text-3xl font-black text-white mb-1">{stats.players?.total || 0}</div>
            <div className="text-gray-400 text-sm">إجمالي اللاعبين</div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 bg-emerald-500/20 rounded-lg p-2 text-center">
                <div className="text-emerald-400 font-bold">{stats.players?.active || 0}</div>
                <div className="text-xs text-gray-400">نشط</div>
              </div>
              <div className="flex-1 bg-amber-500/20 rounded-lg p-2 text-center">
                <div className="text-amber-400 font-bold">{stats.players?.pending || 0}</div>
                <div className="text-xs text-gray-400">معلق</div>
              </div>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-2xl">
                💰
              </div>
              <span className="text-emerald-400 text-sm font-bold">+23%</span>
            </div>
            <div className="text-3xl font-black text-white mb-1">
              {stats.transactions?.approvedAmount?.toLocaleString() || 0} ج.م
            </div>
            <div className="text-gray-400 text-sm">الإيرادات المعتمدة</div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 bg-blue-500/20 rounded-lg p-2 text-center">
                <div className="text-blue-400 font-bold">{stats.transactions?.approved || 0}</div>
                <div className="text-xs text-gray-400">معتمدة</div>
              </div>
              <div className="flex-1 bg-amber-500/20 rounded-lg p-2 text-center">
                <div className="text-amber-400 font-bold">{stats.transactions?.pending || 0}</div>
                <div className="text-xs text-gray-400">معلقة</div>
              </div>
            </div>
          </div>

          {/* Attendance Stats */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-2xl">
                📅
              </div>
              <span className="text-emerald-400 text-sm font-bold">+8%</span>
            </div>
            <div className="text-3xl font-black text-white mb-1">
              {stats.attendance?.attendanceRate?.toFixed(1) || 0}%
            </div>
            <div className="text-gray-400 text-sm">معدل الحضور</div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 bg-emerald-500/20 rounded-lg p-2 text-center">
                <div className="text-emerald-400 font-bold">{stats.attendance?.present || 0}</div>
                <div className="text-xs text-gray-400">حاضر</div>
              </div>
              <div className="flex-1 bg-red-500/20 rounded-lg p-2 text-center">
                <div className="text-red-400 font-bold">{stats.attendance?.absent || 0}</div>
                <div className="text-xs text-gray-400">غائب</div>
              </div>
            </div>
          </div>

          {/* Notifications Stats */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl">
                🔔
              </div>
              {stats.notifications?.unread > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  {stats.notifications.unread}
                </span>
              )}
            </div>
            <div className="text-3xl font-black text-white mb-1">{stats.notifications?.total || 0}</div>
            <div className="text-gray-400 text-sm">إجمالي الإشعارات</div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 bg-red-500/20 rounded-lg p-2 text-center">
                <div className="text-red-400 font-bold">{stats.notifications?.urgent || 0}</div>
                <div className="text-xs text-gray-400">عاجل</div>
              </div>
              <div className="flex-1 bg-blue-500/20 rounded-lg p-2 text-center">
                <div className="text-blue-400 font-bold">{stats.notifications?.unread || 0}</div>
                <div className="text-xs text-gray-400">غير مقروء</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Coaches Stats */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-xl">
                👨‍🏫
              </div>
              <h3 className="text-white font-bold">المدربين</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">الإجمالي:</span>
                <span className="text-white font-bold">{stats.coaches?.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">النشطون:</span>
                <span className="text-emerald-400 font-bold">{stats.coaches?.active || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">متوسط التقييم:</span>
                <span className="text-amber-400 font-bold">⭐ {stats.coaches?.avgRating?.toFixed(1) || 0}</span>
              </div>
            </div>
          </div>

          {/* Tournaments Stats */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xl">
                🏆
              </div>
              <h3 className="text-white font-bold">البطولات</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">الإجمالي:</span>
                <span className="text-white font-bold">{stats.tournaments?.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">القادمة:</span>
                <span className="text-blue-400 font-bold">{stats.tournaments?.upcoming || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">الجارية:</span>
                <span className="text-emerald-400 font-bold">{stats.tournaments?.ongoing || 0}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">
                ⚡
              </div>
              <h3 className="text-white font-bold">إجراءات سريعة</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-bold hover:bg-blue-500/30 transition-colors">
                ➕ إضافة لاعب جديد
              </button>
              <button className="w-full py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm font-bold hover:bg-emerald-500/30 transition-colors">
                📅 تسجيل حضور
              </button>
              <button className="w-full py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-bold hover:bg-purple-500/30 transition-colors">
                💰 اعتماد دفعة
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>📊</span> النشاط الأخير
          </h3>
          <div className="space-y-3">
            {[
              { icon: '✅', text: 'تم تسجيل حضور أحمد محمد', time: 'منذ 5 دقائق', color: 'text-emerald-400' },
              { icon: '💰', text: 'تم اعتماد دفعة محمد خالد - 500 ج.م', time: 'منذ 15 دقيقة', color: 'text-blue-400' },
              { icon: '🏆', text: 'تم إنشاء بطولة جديدة: كأس الشتاء', time: 'منذ ساعة', color: 'text-amber-400' },
              { icon: '👤', text: 'تم تسجيل لاعب جديد: يوسف أحمد', time: 'منذ ساعتين', color: 'text-purple-400' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="text-white text-sm">{activity.text}</div>
                  <div className="text-gray-400 text-xs">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
