import { useState, useEffect } from 'react';

// ============================================
// 📱 نظام QR المتقدم للحضور والانصراف
// ============================================

interface AttendanceSession {
  id: string;
  personId: string;
  personName: string;
  personType: 'player' | 'coach';
  checkIn: string;
  checkOut?: string;
  duration?: string;
  location: { lat: number; lng: number };
  group?: string;
  points: number;
  status: 'present' | 'late' | 'early-leave';
}

interface QRCode {
  data: string;
  personId: string;
  personName: string;
  personType: 'player' | 'coach';
  expiresAt: string;
}

const mockSessions: AttendanceSession[] = [
  {
    id: 's1',
    personId: 'p1',
    personName: 'أحمد محمد علي',
    personType: 'player',
    checkIn: '2026-01-20T16:05:00',
    checkOut: '2026-01-20T18:00:00',
    duration: '1h 55m',
    location: { lat: 30.0444, lng: 31.2357 },
    group: 'ناشئين U10',
    points: 50,
    status: 'present'
  },
  {
    id: 's2',
    personId: 'c1',
    personName: 'كابتن محمود أحمد',
    personType: 'coach',
    checkIn: '2026-01-20T15:45:00',
    checkOut: '2026-01-20T18:30:00',
    duration: '2h 45m',
    location: { lat: 30.0444, lng: 31.2357 },
    group: 'ناشئين U10',
    points: 75,
    status: 'present'
  },
  {
    id: 's3',
    personId: 'p2',
    personName: 'محمد خالد حسن',
    personType: 'player',
    checkIn: '2026-01-20T16:15:00',
    location: { lat: 30.0444, lng: 31.2357 },
    group: 'ناشئين U11',
    points: 30,
    status: 'late'
  },
];

export default function QRAttendanceSystem() {
  const [activeTab, setActiveTab] = useState<'scan' | 'my-qr' | 'history' | 'reports'>('scan');
  const [sessions, setSessions] = useState(mockSessions);
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<AttendanceSession | null>(null);
  const [userType, setUserType] = useState<'player' | 'coach'>('player');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // توليد QR Code فريد
  const generateQR = (): QRCode => {
    const timestamp = Date.now();
    const signature = btoa(`${userType}-${timestamp}`);
    return {
      data: `SA-${userType.toUpperCase()}-${signature}`,
      personId: userType === 'player' ? 'p1' : 'c1',
      personName: userType === 'player' ? 'أحمد محمد علي' : 'كابتن محمود أحمد',
      personType: userType,
      expiresAt: new Date(Date.now() + 60000).toISOString() // صالح لمدة دقيقة
    };
  };

  // محاكاة مسح QR
  const simulateScan = (action: 'check-in' | 'check-out') => {
    setScanning(true);
    
    setTimeout(() => {
      const now = new Date();
      const session: AttendanceSession = {
        id: `s${Date.now()}`,
        personId: 'p1',
        personName: 'أحمد محمد علي',
        personType: 'player',
        checkIn: action === 'check-in' ? now.toISOString() : sessions[0]?.checkIn || now.toISOString(),
        checkOut: action === 'check-out' ? now.toISOString() : undefined,
        duration: action === 'check-out' ? '1h 45m' : undefined,
        location: { lat: 30.0444, lng: 31.2357 },
        group: 'ناشئين U10',
        points: action === 'check-in' ? 50 : 25,
        status: 'present'
      };

      if (action === 'check-in') {
        setSessions([session, ...sessions]);
      } else {
        setSessions(sessions.map(s => s.id === sessions[0]?.id ? { ...s, ...session } : s));
      }

      setLastScanned(session);
      setScanning(false);

      // إرسال إشعار
      setTimeout(() => setLastScanned(null), 3000);
    }, 1500);
  };

  const qrCode = generateQR();
  const todayStats = {
    total: sessions.length,
    present: sessions.filter(s => s.status === 'present').length,
    late: sessions.filter(s => s.status === 'late').length,
    players: sessions.filter(s => s.personType === 'player').length,
    coaches: sessions.filter(s => s.personType === 'coach').length,
  };

  return (
    <section id="qr-attendance" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">نظام متقدم</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📱 نظام <span className="gradient-text-blue">QR للحضور والانصراف</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نظام متكامل لتسجيل الحضور والانصراف للاعبين والمدربين عبر QR Code
          </p>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-black text-blue-400">{todayStats.total}</div>
            <div className="text-xs text-gray-400">إجمالي الحضور</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-black text-emerald-400">{todayStats.present}</div>
            <div className="text-xs text-gray-400">حاضر</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-black text-amber-400">{todayStats.late}</div>
            <div className="text-xs text-gray-400">متأخر</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-black text-purple-400">{todayStats.players}</div>
            <div className="text-xs text-gray-400">لاعبون</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-black text-pink-400">{todayStats.coaches}</div>
            <div className="text-xs text-gray-400">مدربون</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'scan', label: '📷 مسح QR', icon: '📷' },
            { id: 'my-qr', label: '🪪 QR الخاص بي', icon: '🪪' },
            { id: 'history', label: '📋 سجل الحضور', icon: '📋' },
            { id: 'reports', label: '📊 التقارير', icon: '📊' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scan Tab - للمدرب/المسؤول */}
        {activeTab === 'scan' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Scanner */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span>📷</span> واجهة الماسح
              </h3>

              <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-emerald-500/30">
                {/* Scanner Frame */}
                <div className="absolute inset-8 border-2 border-emerald-400/50 rounded-xl">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl" />
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl" />
                </div>

                {/* Scanning Line */}
                {scanning && (
                  <div className="absolute inset-8 overflow-hidden">
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-l from-transparent via-emerald-400 to-transparent animate-pulse" 
                      style={{ top: '50%' }} />
                  </div>
                )}

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {scanning ? (
                    <div className="text-center">
                      <div className="text-5xl mb-2 animate-pulse">📷</div>
                      <p className="text-emerald-400 text-sm font-bold">جاري المسح...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-5xl mb-2 opacity-50">📷</div>
                      <p className="text-gray-400 text-xs">وجّه الكاميرا نحو QR Code</p>
                    </div>
                  )}
                </div>

                {/* Success Flash */}
                {lastScanned && (
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">✅</div>
                      <p className="text-white font-bold">{lastScanned.personName}</p>
                      <p className="text-emerald-300 text-sm">تم التسجيل بنجاح</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() => simulateScan('check-in')}
                  disabled={scanning}
                  className="py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  ✅ تسجيل حضور
                </button>
                <button
                  onClick={() => simulateScan('check-out')}
                  disabled={scanning}
                  className="py-3 bg-gradient-to-l from-orange-500 to-red-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  🚪 تسجيل انصراف
                </button>
              </div>
            </div>

            {/* Today's Attendance */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span>📋</span> حضور اليوم
              </h3>

              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {sessions.map((session) => (
                  <div key={session.id} className="glass-card-light p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          session.personType === 'player' 
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                            : 'bg-gradient-to-br from-purple-500 to-pink-500'
                        }`}>
                          {session.personType === 'player' ? '⚽' : '👨‍🏫'}
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{session.personName}</div>
                          <div className="text-gray-400 text-xs">{session.group}</div>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className={`text-xs font-bold ${
                          session.status === 'present' ? 'text-emerald-400' :
                          session.status === 'late' ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {session.status === 'present' ? '✓ حاضر' : session.status === 'late' ? '⏰ متأخر' : '🚪 غادر'}
                        </div>
                        {session.duration && (
                          <div className="text-[10px] text-gray-500">{session.duration}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>🕐 دخول: {new Date(session.checkIn).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                      {session.checkOut && (
                        <span>🕐 خروج: {new Date(session.checkOut).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My QR Tab - للاعب/المدرب */}
        {activeTab === 'my-qr' && (
          <div className="max-w-md mx-auto">
            <div className="glass-card p-6 text-center">
              <h3 className="text-white font-bold text-lg mb-4">🪪 QR Code الخاص بك</h3>
              
              {/* User Type Selector */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setUserType('player')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold ${
                    userType === 'player' ? 'bg-blue-500 text-white' : 'glass-card-light text-gray-400'
                  }`}
                >
                  ⚽ لاعب
                </button>
                <button
                  onClick={() => setUserType('coach')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold ${
                    userType === 'coach' ? 'bg-purple-500 text-white' : 'glass-card-light text-gray-400'
                  }`}
                >
                  👨‍🏫 مدرب
                </button>
              </div>

              {/* QR Code Display */}
              <div className="bg-white rounded-2xl p-6 mb-4 inline-block">
                <div className="w-48 h-48 mx-auto grid grid-cols-21 gap-0.5" style={{ gridTemplateColumns: 'repeat(21, 1fr)' }}>
                  {Array.from({ length: 441 }).map((_, i) => {
                    const row = Math.floor(i / 21);
                    const col = i % 21;
                    const isCorner = (row < 7 && col < 7) || (row < 7 && col >= 14) || (row >= 14 && col < 7);
                    const isBorder = isCorner && (row === 0 || row === 6 || col === 0 || col === 6 || col === 14 || col === 20 || row === 14 || row === 20);
                    const isInner = isCorner && row >= 2 && row <= 4 && col >= 2 && col <= 4 || 
                                    isCorner && row >= 2 && row <= 4 && col >= 16 && col <= 18 ||
                                    isCorner && row >= 16 && row <= 18 && col >= 2 && col <= 4;
                    const isData = !isCorner && Math.random() > 0.5;
                    return (
                      <div key={i} className={`aspect-square ${isBorder || isInner || isData ? 'bg-gray-900' : 'bg-white'}`} />
                    );
                  })}
                </div>
              </div>

              {/* User Info */}
              <div className="text-white font-bold text-lg mb-1">
                {userType === 'player' ? 'أحمد محمد علي' : 'كابتن محمود أحمد'}
              </div>
              <div className="text-gray-400 text-sm mb-2">
                {userType === 'player' ? 'ناشئين U10 • كرة قدم' : 'مدرب كرة قدم'}
              </div>
              <div className="text-emerald-400 text-xs font-mono mb-4">
                {qrCode.data}
              </div>

              {/* Expiry */}
              <div className="glass-card-light p-3 mb-4">
                <div className="text-xs text-gray-400 mb-1">ينتهي في:</div>
                <div className="text-white font-bold">
                  {new Date(qrCode.expiresAt).toLocaleTimeString('ar-EG')}
                </div>
                <div className="text-xs text-amber-400 mt-1">⏰ يتجدد تلقائياً كل دقيقة</div>
              </div>

              {/* Instructions */}
              <div className="glass-card-light p-4 text-right">
                <h4 className="text-white font-bold text-sm mb-2">📋 التعليمات:</h4>
                <ul className="space-y-1 text-gray-300 text-xs">
                  <li>✅ اعرض QR عند الدخول للأكاديمية</li>
                  <li>✅ اعرض QR عند الخروج من الأكاديمية</li>
                  <li>✅ لا تشارك QR مع أي شخص</li>
                  <li>✅ QR يتجدد تلقائياً للأمان</li>
                  <li>✅ يعمل بدون إنترنت</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📋 سجل الحضور والانصراف</h3>
            
            {/* Filter */}
            <div className="flex gap-2 mb-4">
              <button className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-bold">
                اليوم
              </button>
              <button className="px-4 py-2 glass-card-light text-gray-400 text-xs">
                الأسبوع
              </button>
              <button className="px-4 py-2 glass-card-light text-gray-400 text-xs">
                الشهر
              </button>
            </div>

            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="glass-card-light p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        session.personType === 'player' 
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        {session.personType === 'player' ? '⚽' : '👨‍🏫'}
                      </div>
                      <div>
                        <div className="text-white font-bold">{session.personName}</div>
                        <div className="text-gray-400 text-xs">{session.group}</div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-emerald-400 font-bold">+{session.points} نقطة</div>
                      <div className="text-gray-500 text-xs">
                        {new Date(session.checkIn).toLocaleDateString('ar-EG')}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="glass-card p-2 text-center">
                      <div className="text-gray-400">دخول</div>
                      <div className="text-white font-bold">
                        {new Date(session.checkIn).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="glass-card p-2 text-center">
                      <div className="text-gray-400">خروج</div>
                      <div className="text-white font-bold">
                        {session.checkOut ? new Date(session.checkOut).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : '—'}
                      </div>
                    </div>
                    <div className="glass-card p-2 text-center">
                      <div className="text-gray-400">المدة</div>
                      <div className="text-white font-bold">{session.duration || '—'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Weekly Report */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">📊 تقرير الأسبوع</h3>
              <div className="space-y-3">
                {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm w-20">{day}</span>
                    <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 flex items-center justify-end px-2"
                        style={{ width: `${60 + i * 5}%` }}
                      >
                        <span className="text-white text-xs font-bold">{60 + i * 5}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">📈 ملخص الشهر</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card-light p-4 text-center">
                  <div className="text-3xl font-black text-emerald-400">92%</div>
                  <div className="text-xs text-gray-400">نسبة الحضور</div>
                </div>
                <div className="glass-card-light p-4 text-center">
                  <div className="text-3xl font-black text-blue-400">28</div>
                  <div className="text-xs text-gray-400">يوم حضور</div>
                </div>
                <div className="glass-card-light p-4 text-center">
                  <div className="text-3xl font-black text-purple-400">1,450</div>
                  <div className="text-xs text-gray-400">نقطة مكتسبة</div>
                </div>
                <div className="glass-card-light p-4 text-center">
                  <div className="text-3xl font-black text-amber-400">45h</div>
                  <div className="text-xs text-gray-400">ساعات تدريب</div>
                </div>
              </div>

              <button className="w-full mt-4 py-3 bg-gradient-to-l from-blue-500 to-cyan-600 text-white font-bold rounded-lg">
                📥 تصدير التقرير (PDF)
              </button>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          {[
            { icon: '🔒', title: 'آمن', desc: 'QR مشفر ومتجدد' },
            { icon: '📍', title: 'تحقق جغرافي', desc: 'تأكيد الموقع' },
            { icon: '📴', title: 'Offline', desc: 'يعمل بدون إنترنت' },
            { icon: '⚡', title: 'فوري', desc: 'تسجيل لحظي' },
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
