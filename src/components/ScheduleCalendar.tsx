import { useState } from 'react';

interface TrainingSession {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  coach: string;
  group: string;
  location: string;
  type: 'group' | 'private' | 'tournament';
  status: 'scheduled' | 'completed' | 'cancelled';
}

const sessions: TrainingSession[] = [
  { id: 1, title: 'تدريب اللياقة', date: '2026-01-20', time: '16:00', duration: '90 دقيقة', coach: 'كابتن محمود', group: 'ناشئين U10', location: 'الملعب الرئيسي', type: 'group', status: 'scheduled' },
  { id: 2, title: 'تدريب خاص', date: '2026-01-21', time: '17:00', duration: '60 دقيقة', coach: 'كابتن أحمد', group: 'أحمد محمد', location: 'ملعب التدريب', type: 'private', status: 'scheduled' },
  { id: 3, title: 'بطولة داخلية', date: '2026-01-22', time: '15:00', duration: '120 دقيقة', coach: 'كابتن محمود', group: 'عام', location: 'الملعب الرئيسي', type: 'tournament', status: 'scheduled' },
  { id: 4, title: 'تدريب تقني', date: '2026-01-19', time: '16:00', duration: '90 دقيقة', coach: 'كابتن محمود', group: 'ناشئين U10', location: 'الملعب الرئيسي', type: 'group', status: 'completed' },
  { id: 5, title: 'تدريب تكتيكي', date: '2026-01-18', time: '16:00', duration: '90 دقيقة', coach: 'كابتن محمود', group: 'شباب U13', location: 'الملعب الرئيسي', type: 'group', status: 'cancelled' },
];

export default function ScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [showBooking, setShowBooking] = useState(false);

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const getTypeIcon = (type: TrainingSession['type']) => {
    const icons = { group: '👥', private: '👤', tournament: '🏆' };
    return icons[type];
  };

  const getStatusBadge = (status: TrainingSession['status']) => {
    const config = {
      scheduled: { label: 'مجدول', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      completed: { label: 'مكتمل', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      cancelled: { label: 'ملغي', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
    };
    return config[status];
  };

  return (
    <section id="schedule" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">الجدولة والتقويم</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📅 الجدولة <span className="gradient-text-blue">والتقويم</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            تقويم تفاعلي للتدريبات، حجز حصص خاصة، وإدارة الملاعب
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('list')}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              view === 'list'
                ? 'bg-gradient-to-l from-blue-500 to-cyan-600 text-white shadow-lg'
                : 'glass-card text-gray-400 hover:text-white'
            }`}
          >
            📋 قائمة الجلسات
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              view === 'calendar'
                ? 'bg-gradient-to-l from-blue-500 to-cyan-600 text-white shadow-lg'
                : 'glass-card text-gray-400 hover:text-white'
            }`}
          >
            📅 التقويم
          </button>
        </div>

        {view === 'list' ? (
          <div className="space-y-4">
            {sessions.map((session) => {
              const status = getStatusBadge(session.status);
              return (
                <div key={session.id} className="glass-card p-5 hover:scale-[1.02] transition-transform">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      session.type === 'group' ? 'bg-blue-500/20' :
                      session.type === 'private' ? 'bg-purple-500/20' :
                      'bg-amber-500/20'
                    }`}>
                      {getTypeIcon(session.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${status.color}`}>
                          {status.label}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {session.type === 'group' ? 'جماعي' : session.type === 'private' ? 'خاص' : 'بطولة'}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">{session.title}</h3>
                      <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          📅 {new Date(session.date).toLocaleDateString('ar-EG')}
                        </span>
                        <span className="flex items-center gap-1">
                          ⏰ {session.time} ({session.duration})
                        </span>
                        <span className="flex items-center gap-1">
                          👨‍🏫 {session.coach}
                        </span>
                        <span className="flex items-center gap-1">
                          📍 {session.location}
                        </span>
                      </div>
                      {session.group && (
                        <div className="mt-2 text-xs text-gray-500">
                          المجموعة: {session.group}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
                →
              </button>
              <h3 className="text-white font-bold text-lg">
                {selectedDate.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}
              </h3>
              <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
                ←
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map((day) => (
                <div key={day} className="text-center text-xs text-gray-400 font-semibold py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const hasSession = sessions.some(s => new Date(s.date).getDate() === day);
                return (
                  <button
                    key={day}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all ${
                      hasSession
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30'
                        : 'glass-card-light text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span>{day}</span>
                    {hasSession && <span className="text-[8px] mt-0.5">•</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Book Private Session */}
        <div className="mt-6 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <span>👤</span> حجز حصة خاصة
            </h3>
            <button
              onClick={() => setShowBooking(!showBooking)}
              className="px-4 py-2 bg-gradient-to-l from-blue-500 to-cyan-600 text-white text-xs font-bold rounded-lg"
            >
              + حجز جديد
            </button>
          </div>

          {showBooking && (
            <div className="glass-card-light p-4 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">التاريخ</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">الوقت</label>
                  <input type="time" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">المدرب</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
                    <option>كابتن محمود</option>
                    <option>كابتن أحمد</option>
                    <option>كابتن سعيد</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">المدة</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
                    <option>60 دقيقة</option>
                    <option>90 دقيقة</option>
                    <option>120 دقيقة</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg">
                  تأكيد الحجز
                </button>
                <button
                  onClick={() => setShowBooking(false)}
                  className="px-4 py-2.5 bg-gray-700 text-white text-sm rounded-lg"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
