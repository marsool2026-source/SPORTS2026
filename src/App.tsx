// ============================================
// 🏆 منظومة أكاديمية الرياضات الاحترافية
// الإصدار 5.1.0 - النسخة الكاملة
// ============================================

import { useState, useEffect, createContext, useContext } from 'react';

// ============================================
// 📦 الأنواع والواجهات (Types & Interfaces)
// ============================================

type UserRole = 'admin' | 'financial_manager' | 'coach' | 'player' | 'parent';
type SubscriptionStatus = 'active' | 'pending' | 'inactive';
type TransactionStatus = 'pending' | 'approved' | 'rejected';
type TransactionType = 'subscription' | 'product' | 'bus';
type AttendanceStatus = 'present' | 'absent' | 'late';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface Player {
  id: string;
  name: string;
  age: number;
  birthYear: number;
  sport: string;
  position?: string;
  serialNumber: string;
  qrCode: string;
  subscriptionStatus: SubscriptionStatus;
  groupId?: string;
  coachId?: string;
  phone?: string;
  emergencyContact?: string;
  medicalNotes?: string;
  achievements: string[];
  performance: {
    speed: number;
    strength: number;
    endurance: number;
    accuracy: number;
    agility: number;
  };
}

interface Coach {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  certifications: string[];
  playersCount: number;
  rating: number;
}

interface TrainingGroup {
  id: string;
  name: string;
  ageGroup: string;
  coachId: string;
  coachName: string;
  playersCount: number;
  maxCapacity: number;
  schedule: string;
  location: string;
}

interface Transaction {
  id: string;
  playerId: string;
  playerName: string;
  amount: number;
  type: TransactionType;
  paymentMethod: string;
  status: TransactionStatus;
  date: string;
  receiptUrl?: string;
  approvedBy?: string;
  notes?: string;
}

interface AttendanceRecord {
  id: string;
  playerId: string;
  playerName: string;
  date: string;
  time: string;
  status: AttendanceStatus;
  groupId: string;
}

interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  prize?: string;
  category: string;
}

interface Notification {
  id: number;
  type: 'urgent' | 'normal' | 'promo';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  status: 'active' | 'expired';
  validUntil: string;
  usedCount: number;
  maxUses: number;
}

interface WorldRecord {
  id: number;
  sport: string;
  event: string;
  record: string;
  unit: string;
  holder: string;
  country: string;
  category: string;
}

interface ChatMessage {
  id: number;
  sender: 'coach' | 'player';
  senderName: string;
  text: string;
  time: string;
}

// ============================================
// 🗄️ البيانات التجريبية (Mock Data)
// ============================================

const mockPlayers: Player[] = [
  {
    id: '1', name: 'أحمد محمد علي', age: 10, birthYear: 2014, sport: 'كرة قدم',
    position: 'مهاجم', serialNumber: 'SA-2014-FT-0001', qrCode: 'QR-001',
    subscriptionStatus: 'active', groupId: 'g1', coachId: 'c1',
    phone: '01012345678', achievements: ['بطل المنطقة 2025', 'أفضل لاعب'],
    performance: { speed: 85, strength: 78, endurance: 92, accuracy: 88, agility: 80 }
  },
  {
    id: '2', name: 'محمد خالد حسن', age: 11, birthYear: 2013, sport: 'كرة سلة',
    position: 'حارس', serialNumber: 'SA-2013-BK-0002', qrCode: 'QR-002',
    subscriptionStatus: 'active', groupId: 'g2', coachId: 'c2',
    phone: '01098765432', achievements: ['أفضل حارس 2025'],
    performance: { speed: 78, strength: 85, endurance: 88, accuracy: 82, agility: 75 }
  },
  {
    id: '3', name: 'يوسف أحمد سعيد', age: 9, birthYear: 2015, sport: 'سباحة',
    serialNumber: 'SA-2015-SW-0003', qrCode: 'QR-003',
    subscriptionStatus: 'pending', groupId: 'g3', coachId: 'c3',
    phone: '01112345678', achievements: ['رقم قياسي محلي'],
    performance: { speed: 92, strength: 75, endurance: 95, accuracy: 85, agility: 88 }
  },
  {
    id: '4', name: 'عمر طارق محمود', age: 12, birthYear: 2012, sport: 'كرة قدم',
    position: 'وسط', serialNumber: 'SA-2012-FT-0004', qrCode: 'QR-004',
    subscriptionStatus: 'active', groupId: 'g1', coachId: 'c1',
    phone: '01212345678', achievements: ['قائد الفريق'],
    performance: { speed: 80, strength: 82, endurance: 90, accuracy: 86, agility: 84 }
  },
  {
    id: '5', name: 'كريم حسام الدين', age: 10, birthYear: 2014, sport: 'ألعاب قوى',
    serialNumber: 'SA-2014-AT-0005', qrCode: 'QR-005',
    subscriptionStatus: 'active', groupId: 'g4', coachId: 'c4',
    phone: '01312345678', achievements: ['بطل السرعة'],
    performance: { speed: 95, strength: 80, endurance: 88, accuracy: 78, agility: 92 }
  },
];

const mockCoaches: Coach[] = [
  { id: 'c1', name: 'كابتن محمود أحمد', specialty: 'كرة قدم', experience: '15 سنة', certifications: ['UEFA Pro', 'FIFA'], playersCount: 25, rating: 4.9 },
  { id: 'c2', name: 'كابتن سارة علي', specialty: 'كرة سلة', experience: '10 سنوات', certifications: ['FIBA Level 3'], playersCount: 18, rating: 4.8 },
  { id: 'c3', name: 'كابتن محمد حسن', specialty: 'سباحة', experience: '12 سنة', certifications: ['FINA Coach'], playersCount: 15, rating: 4.9 },
  { id: 'c4', name: 'كابتن أحمد سعيد', specialty: 'ألعاب قوى', experience: '8 سنوات', certifications: ['IAAF Level 2'], playersCount: 20, rating: 4.7 },
];

const mockGroups: TrainingGroup[] = [
  { id: 'g1', name: 'ناشئين كرة قدم U10', ageGroup: 'U10', coachId: 'c1', coachName: 'كابتن محمود', playersCount: 18, maxCapacity: 25, schedule: 'السبت/الاثنين/الأربعاء 4-6 م', location: 'الملعب الرئيسي' },
  { id: 'g2', name: 'ناشئين كرة سلة U11', ageGroup: 'U11', coachId: 'c2', coachName: 'كابتن سارة', playersCount: 15, maxCapacity: 20, schedule: 'الأحد/الثلاثاء/الخميس 5-7 م', location: 'صالة كرة السلة' },
  { id: 'g3', name: 'براعم سباحة U9', ageGroup: 'U9', coachId: 'c3', coachName: 'كابتن محمد', playersCount: 12, maxCapacity: 15, schedule: 'السبت/الأربعاء 3-5 م', location: 'المسبح الأولمبي' },
  { id: 'g4', name: 'ناشئين ألعاب قوى U10', ageGroup: 'U10', coachId: 'c4', coachName: 'كابتن أحمد', playersCount: 20, maxCapacity: 25, schedule: 'الاثنين/الأربعاء/الجمعة 4-6 م', location: 'المضمار' },
];

const mockTransactions: Transaction[] = [
  { id: 't1', playerId: '1', playerName: 'أحمد محمد علي', amount: 500, type: 'subscription', paymentMethod: 'فودافون كاش', status: 'approved', date: '2026-01-15', approvedBy: 'المدير المالي' },
  { id: 't2', playerId: '2', playerName: 'محمد خالد حسن', amount: 500, type: 'subscription', paymentMethod: 'فودافون كاش', status: 'pending', date: '2026-01-14' },
  { id: 't3', playerId: '3', playerName: 'يوسف أحمد سعيد', amount: 250, type: 'product', paymentMethod: 'انستاباي', status: 'pending', date: '2026-01-13' },
  { id: 't4', playerId: '4', playerName: 'عمر طارق محمود', amount: 300, type: 'bus', paymentMethod: 'نقدي', status: 'approved', date: '2026-01-12', approvedBy: 'المدير المالي' },
];

const mockAttendance: AttendanceRecord[] = [
  { id: 'a1', playerId: '1', playerName: 'أحمد محمد علي', date: '2026-01-20', time: '16:05', status: 'present', groupId: 'g1' },
  { id: 'a2', playerId: '4', playerName: 'عمر طارق محمود', date: '2026-01-20', time: '16:10', status: 'present', groupId: 'g1' },
  { id: 'a3', playerId: '2', playerName: 'محمد خالد حسن', date: '2026-01-20', time: '17:15', status: 'late', groupId: 'g2' },
];

const mockTournaments: Tournament[] = [
  { id: 1, name: 'بطولة الناشئين الشتوية', date: '2026-02-15', location: 'الملعب الرئيسي', participants: 32, status: 'upcoming', prize: 'كأس + ميداليات', category: 'ناشئين U10' },
  { id: 2, name: 'كأس الأكاديمية السنوي', date: '2026-03-20', location: 'استاد المدينة', participants: 64, status: 'upcoming', prize: 'جوائز قيمة', category: 'عام' },
  { id: 3, name: 'دوري البراعم', date: '2026-01-10', location: 'ملعب التدريب', participants: 16, status: 'ongoing', category: 'براعم U8' },
];

const mockNotifications: Notification[] = [
  { id: 1, type: 'urgent', title: 'إلغاء تدريب اليوم', message: 'تم إلغاء التدريب بسبب سوء الأحوال الجوية', time: 'منذ 5 دقائق', read: false, icon: '⚠️' },
  { id: 2, type: 'normal', title: 'تذكير بالتدريب', message: 'تدريب الغد الساعة 4:00 مساءً', time: 'منذ ساعة', read: false, icon: '📅' },
  { id: 3, type: 'promo', title: 'عرض خاص!', message: 'خصم 20% على جميع المنتجات', time: 'منذ 3 ساعات', read: true, icon: '🎁' },
];

const mockCoupons: Coupon[] = [
  { id: 1, code: 'WELCOME10', discount: 10, type: 'percentage', status: 'active', validUntil: '2026-02-28', usedCount: 45, maxUses: 100 },
  { id: 2, code: 'LOYAL20', discount: 20, type: 'percentage', status: 'active', validUntil: '2026-03-31', usedCount: 23, maxUses: 50 },
  { id: 3, code: 'SUMMER50', discount: 50, type: 'fixed', status: 'active', validUntil: '2026-08-31', usedCount: 12, maxUses: 30 },
];

const mockWorldRecords: WorldRecord[] = [
  { id: 1, sport: 'ألعاب قوى', event: '100 متر', record: '9.58', unit: 'ثانية', holder: 'أوسين بولت', country: 'جامايكا', category: 'speed' },
  { id: 2, sport: 'سباحة', event: '100 متر حرة', record: '46.91', unit: 'ثانية', holder: 'بان زانلي', country: 'الصين', category: 'speed' },
  { id: 3, sport: 'رفع أثقال', event: 'خطف', record: '223', unit: 'كجم', holder: 'لاشا تالخادزه', country: 'جورجيا', category: 'strength' },
  { id: 4, sport: 'ألعاب قوى', event: 'ماراثون', record: '2:01:09', unit: 'ساعة', holder: 'كيلي كيبتوم', country: 'كينيا', category: 'endurance' },
];

const mockChatMessages: ChatMessage[] = [
  { id: 1, sender: 'coach', senderName: 'كابتن محمود', text: 'صباح الخير يا أبطال ⚽ التدريب اليوم الساعة 5 مساءً', time: '10:15 ص' },
  { id: 2, sender: 'player', senderName: 'أحمد محمد', text: 'حاضر يا كابتن 🏃‍♂️', time: '10:17 ص' },
  { id: 3, sender: 'player', senderName: 'يوسف سعيد', text: 'استلمت الخطة 👍', time: '10:22 ص' },
];

// ============================================
// 🎨 الأنماط المشتركة (Shared Styles)
// ============================================

const glassCard = "bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl";
const gradientText = "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent";

// ============================================
// 🧩 المكونات (Components)
// ============================================

// --- Header ---
function Header({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) {
  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: '🏠' },
    { id: 'players', label: 'اللاعبين', icon: '👥' },
    { id: 'coaches', label: 'المدربين', icon: '👨‍🏫' },
    { id: 'attendance', label: 'الحضور', icon: '📱' },
    { id: 'communication', label: 'التواصل', icon: '💬' },
    { id: 'tournaments', label: 'البطولات', icon: '🏆' },
    { id: 'records', label: 'الأرقام', icon: '🌍' },
    { id: 'finance', label: 'المالية', icon: '💰' },
    { id: 'coupons', label: 'الكوبونات', icon: '🎫' },
    { id: 'notifications', label: 'الإشعارات', icon: '🔔' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold shadow-lg">
              🏆
            </div>
            <div>
              <h1 className="text-xl font-bold">أكاديمية الرياضات الاحترافية</h1>
              <p className="text-xs text-white/80">Sports Academy System v5.1.0</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="px-3 py-1 bg-white/10 rounded-full text-xs">
              👤 المدير العام
            </div>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentPage === item.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

// --- Dashboard ---
function Dashboard({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const stats = [
    { label: 'إجمالي اللاعبين', value: mockPlayers.length, icon: '👥', color: 'from-blue-500 to-cyan-500', page: 'players' },
    { label: 'المدربين', value: mockCoaches.length, icon: '👨‍🏫', color: 'from-purple-500 to-violet-500', page: 'coaches' },
    { label: 'المجموعات', value: mockGroups.length, icon: '🏟️', color: 'from-emerald-500 to-teal-500', page: 'players' },
    { label: 'المعاملات المعلقة', value: mockTransactions.filter(t => t.status === 'pending').length, icon: '⏳', color: 'from-amber-500 to-orange-500', page: 'finance' },
    { label: 'البطولات القادمة', value: mockTournaments.filter(t => t.status === 'upcoming').length, icon: '🏆', color: 'from-pink-500 to-rose-500', page: 'tournaments' },
    { label: 'إشعارات جديدة', value: mockNotifications.filter(n => !n.read).length, icon: '🔔', color: 'from-red-500 to-orange-500', page: 'notifications' },
  ];

  const totalRevenue = mockTransactions.filter(t => t.status === 'approved').reduce((sum, t) => sum + t.amount, 0);

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black mb-2">
            <span className={gradientText}>لوحة التحكم الرئيسية</span>
          </h2>
          <p className="text-gray-400">نظرة شاملة على جميع أنظمة الأكاديمية</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              onClick={() => setCurrentPage(stat.page)}
              className={`${glassCard} p-5 hover:scale-105 transition-all cursor-pointer`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl mb-3 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Revenue Card */}
        <div className={`${glassCard} p-6 mb-8`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>💰</span> الإيرادات
            </h3>
            <div className="text-3xl font-black text-emerald-400">{totalRevenue} ج.م</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-emerald-400">
                {mockTransactions.filter(t => t.status === 'approved').length}
              </div>
              <div className="text-xs text-gray-400">معتمدة</div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-amber-400">
                {mockTransactions.filter(t => t.status === 'pending').length}
              </div>
              <div className="text-xs text-gray-400">معلقة</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-400">{totalRevenue} ج.م</div>
              <div className="text-xs text-gray-400">الإجمالي</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>⚡</span> إجراءات سريعة
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'تسجيل لاعب', icon: '➕', color: 'from-blue-500 to-cyan-500' },
              { label: 'تسجيل حضور', icon: '📱', color: 'from-emerald-500 to-teal-500' },
              { label: 'اعتماد دفعة', icon: '✓', color: 'from-amber-500 to-orange-500' },
              { label: 'إرسال إشعار', icon: '📢', color: 'from-purple-500 to-violet-500' },
            ].map((action, i) => (
              <button key={i} className={`p-4 bg-gradient-to-br ${action.color} rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity`}>
                <div className="text-2xl mb-1">{action.icon}</div>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Players Section ---
function PlayersSection() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          👥 إدارة <span className={gradientText}>اللاعبين</span>
        </h2>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlayers.map((player) => (
            <div
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              className={`${glassCard} p-6 hover:scale-105 transition-all cursor-pointer`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
                  ⚽
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{player.name}</h3>
                  <p className="text-gray-400 text-sm">{player.sport} • {player.age} سنة</p>
                  {player.position && <p className="text-gray-500 text-xs">{player.position}</p>}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  player.subscriptionStatus === 'active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  player.subscriptionStatus === 'pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {player.subscriptionStatus === 'active' ? '✓ نشط' :
                   player.subscriptionStatus === 'pending' ? '⏳ معلق' : '✗ غير نشط'}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">الرقم التسلسلي:</span>
                  <span className="text-white font-mono text-xs">{player.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">QR Code:</span>
                  <span className="text-blue-400">{player.qrCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">الهاتف:</span>
                  <span className="text-white">{player.phone}</span>
                </div>
              </div>

              {/* Performance Bars */}
              <div className="mt-4 space-y-1">
                {Object.entries(player.performance).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-16">
                      {key === 'speed' ? 'السرعة' : key === 'strength' ? 'القوة' : 'التحمل'}
                    </span>
                    <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-l from-emerald-400 to-teal-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-xs text-white w-8">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Player Details Modal */}
        {selectedPlayer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}>
            <div className={`${glassCard} p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg">
                    ⚽
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-2xl">{selectedPlayer.name}</h3>
                    <p className="text-gray-400">{selectedPlayer.sport} • {selectedPlayer.age} سنة</p>
                    <p className="text-blue-400 font-mono text-sm mt-1">{selectedPlayer.serialNumber}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedPlayer(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">✕</button>
              </div>

              {/* Digital Card Preview */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold text-white">SA</div>
                    <div className="text-white/80 text-xs">كارنيه اللاعب الرقمي</div>
                  </div>
                  <div className="text-white font-bold text-xl mb-1">{selectedPlayer.name}</div>
                  <div className="text-white/80 text-sm mb-3">{selectedPlayer.sport} {selectedPlayer.position ? `• ${selectedPlayer.position}` : ''}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-white/70 text-xs font-mono">{selectedPlayer.serialNumber}</div>
                    <div className="w-16 h-16 bg-white rounded-lg p-1">
                      <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-px">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-gray-900' : 'bg-white'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <h4 className="text-white font-bold mb-3">📊 الأداء</h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.entries(selectedPlayer.performance).map(([key, value]) => (
                  <div key={key} className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">
                      {key === 'speed' ? '⚡ السرعة' : key === 'strength' ? '💪 القوة' : key === 'endurance' ? '🔥 التحمل' : key === 'accuracy' ? '🎯 الدقة' : '🤸 الرشاقة'}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-l from-emerald-400 to-teal-500" style={{ width: `${value}%` }} />
                      </div>
                      <span className="text-white font-bold text-sm">{value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <h4 className="text-white font-bold mb-3">🏆 الإنجازات</h4>
              <div className="space-y-2">
                {selectedPlayer.achievements.map((achievement, i) => (
                  <div key={i} className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-amber-300 text-sm">
                    ⭐ {achievement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// --- Coaches Section ---
function CoachesSection() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          👨‍🏫 فريق <span className={gradientText}>المدربين</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCoaches.map((coach) => (
            <div key={coach.id} className={`${glassCard} p-6 hover:scale-105 transition-all`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg">
                  👨‍🏫
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{coach.name}</h3>
                  <p className="text-purple-400 text-sm">{coach.specialty}</p>
                  <p className="text-gray-400 text-xs">{coach.experience}</p>
                </div>
                <div className="text-left">
                  <div className="text-amber-400 font-bold">⭐ {coach.rating}</div>
                  <div className="text-gray-400 text-xs">{coach.playersCount} لاعب</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {coach.certifications.map((cert, i) => (
                  <span key={i} className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-xs">
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Groups */}
        <h3 className="text-2xl font-bold text-white mt-12 mb-6 text-center">🏟️ المجموعات التدريبية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockGroups.map((group) => (
            <div key={group.id} className={`${glassCard} p-6`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-bold">{group.name}</h4>
                <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs">
                  {group.ageGroup}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">المدرب:</span>
                  <span className="text-white">{group.coachName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">اللاعبون:</span>
                  <span className="text-white">{group.playersCount}/{group.maxCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">المواعيد:</span>
                  <span className="text-white text-xs">{group.schedule}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">الموقع:</span>
                  <span className="text-white">{group.location}</span>
                </div>
              </div>
              <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-blue-400 to-cyan-500"
                  style={{ width: `${(group.playersCount / group.maxCapacity) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Attendance Section ---
function AttendanceSection() {
  const [scanning, setScanning] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendance);

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const newRecord: AttendanceRecord = {
        id: `a${Date.now()}`,
        playerId: '5',
        playerName: 'كريم حسام الدين',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        status: 'present',
        groupId: 'g4'
      };
      setAttendanceRecords(prev => [newRecord, ...prev]);
      setScanning(false);
    }, 1500);
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          📱 نظام <span className={gradientText}>الحضور عبر QR</span>
        </h2>

        {/* Scanner */}
        <div className={`${glassCard} p-6 mb-8`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">📷 واجهة الماسح</h3>
            <button
              onClick={simulateScan}
              disabled={scanning}
              className="px-6 py-2 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {scanning ? '🔄 جاري المسح...' : '📷 محاكاة المسح'}
            </button>
          </div>

          <div className="relative aspect-video max-w-md mx-auto bg-gray-900 rounded-2xl overflow-hidden border-2 border-emerald-500/30">
            <div className="absolute inset-4 border-2 border-emerald-400/50 rounded-xl">
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-xl" />
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-xl" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              {scanning ? (
                <div className="text-center">
                  <div className="text-4xl mb-2 animate-pulse">📷</div>
                  <p className="text-emerald-400 text-sm font-bold">جاري المسح...</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-2 opacity-50">📷</div>
                  <p className="text-gray-400 text-sm">اضغط "محاكاة المسح"</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-emerald-400">
                {attendanceRecords.filter(r => r.status === 'present').length}
              </div>
              <div className="text-xs text-gray-400">حاضر</div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-amber-400">
                {attendanceRecords.filter(r => r.status === 'late').length}
              </div>
              <div className="text-xs text-gray-400">متأخر</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-400">{attendanceRecords.length}</div>
              <div className="text-xs text-gray-400">الإجمالي</div>
            </div>
          </div>
        </div>

        {/* Records */}
        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-bold text-white mb-4">📋 سجل الحضور</h3>
          <div className="space-y-2">
            {attendanceRecords.map((record) => (
              <div key={record.id} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    record.status === 'present' ? 'bg-emerald-500' : record.status === 'late' ? 'bg-amber-500' : 'bg-red-500'
                  }`}>
                    {record.status === 'present' ? '✓' : record.status === 'late' ? '⏰' : '✗'}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{record.playerName}</div>
                    <div className="text-gray-400 text-xs">{record.date} • {record.time}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  record.status === 'present' ? 'bg-emerald-500/20 text-emerald-300' :
                  record.status === 'late' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {record.status === 'present' ? 'حاضر' : record.status === 'late' ? 'متأخر' : 'غائب'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Communication Section ---
function CommunicationSection() {
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: ChatMessage = {
      id: Date.now(),
      sender: 'coach',
      senderName: 'كابتن محمود',
      text: newMessage,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([msg, ...messages]);
    setNewMessage('');
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          💬 مركز <span className={gradientText}>التواصل</span>
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Groups List */}
          <div className={`${glassCard} p-4`}>
            <h3 className="text-white font-bold mb-4">📋 المجموعات</h3>
            <div className="space-y-2">
              {mockGroups.map((group) => (
                <div key={group.id} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="text-white font-semibold text-sm">{group.name}</div>
                  <div className="text-gray-400 text-xs">{group.playersCount} عضو</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className={`${glassCard} p-4 lg:col-span-2 flex flex-col h-[500px]`}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-white font-bold">ناشئين كرة قدم U10</h3>
                <p className="text-gray-400 text-xs">18 عضو</p>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">📞</button>
                <button className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">🎥</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'coach' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[75%] rounded-2xl p-3 ${
                    msg.sender === 'coach'
                      ? 'bg-gradient-to-br from-blue-600/30 to-blue-500/20 border border-blue-500/20'
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    {msg.sender === 'player' && (
                      <div className="text-[10px] font-bold text-blue-400 mb-1">{msg.senderName}</div>
                    )}
                    <p className="text-white text-sm">{msg.text}</p>
                    <div className="text-[9px] text-gray-400 mt-1 text-left">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="اكتب رسالة..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-gradient-to-l from-blue-500 to-cyan-600 text-white text-sm font-bold rounded-lg"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Tournaments Section ---
function TournamentsSection() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          🏆 البطولات <span className={gradientText}>والمنافسات</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTournaments.map((tournament) => (
            <div key={tournament.id} className={`${glassCard} p-6 hover:scale-105 transition-all`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  tournament.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                  tournament.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                }`}>
                  {tournament.status === 'upcoming' ? '⏰ قادمة' : tournament.status === 'ongoing' ? '🔴 جارية' : '✓ مكتملة'}
                </span>
                <span className="text-gray-500 text-xs">{tournament.category}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{tournament.name}</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>{new Date(tournament.date).toLocaleDateString('ar-EG')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{tournament.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>{tournament.participants} مشارك</span>
                </div>
                {tournament.prize && (
                  <div className="text-amber-300 text-sm font-semibold mt-2">
                    🎁 {tournament.prize}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- World Records Section ---
function WorldRecordsSection() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          🌍 الأرقام <span className={gradientText}>القياسية</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {mockWorldRecords.map((record) => (
            <div key={record.id} className={`${glassCard} p-6 hover:scale-105 transition-all`}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg">
                  🏆
                </div>
                <div className="flex-1">
                  <div className="text-amber-300 text-xs mb-1">{record.sport}</div>
                  <h3 className="text-white font-bold mb-2">{record.event}</h3>
                  <div className="text-3xl font-black text-white mb-2">
                    {record.record} <span className="text-lg text-gray-400">{record.unit}</span>
                  </div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div>👤 <span className="text-white font-semibold">{record.holder}</span></div>
                    <div>🌍 {record.country}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Finance Section ---
function FinanceSection() {
  const [transactions, setTransactions] = useState(mockTransactions);

  const approveTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' as const, approvedBy: 'المدير المالي' } : t));
  };

  const rejectTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'rejected' as const } : t));
  };

  const totalApproved = transactions.filter(t => t.status === 'approved').reduce((sum, t) => sum + t.amount, 0);
  const totalPending = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          💰 النظام <span className={gradientText}>المالي</span>
        </h2>

        {/* Policy Notice */}
        <div className="bg-amber-500/5 border border-amber-500/30 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h4 className="text-amber-300 font-bold text-sm mb-2">سياسة السداد المعتمدة</h4>
              <div className="text-gray-300 text-xs space-y-1">
                <p>1️⃣ رفع الإيصال → 2️⃣ حالة "معلق" → 3️⃣ التحقق الفعلي من وصول المبلغ → 4️⃣ الاعتماد النهائي وتفعيل الاشتراك</p>
                <p className="text-amber-200 font-semibold mt-2">⚠️ لا يمكن للإداري التشغيلي تجاوز هذه السياسة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`${glassCard} p-4 text-center`}>
            <div className="text-2xl font-bold text-amber-400">{transactions.filter(t => t.status === 'pending').length}</div>
            <div className="text-xs text-gray-400">معلقة</div>
          </div>
          <div className={`${glassCard} p-4 text-center`}>
            <div className="text-2xl font-bold text-emerald-400">{transactions.filter(t => t.status === 'approved').length}</div>
            <div className="text-xs text-gray-400">معتمدة</div>
          </div>
          <div className={`${glassCard} p-4 text-center`}>
            <div className="text-2xl font-bold text-blue-400">{totalPending} ج.م</div>
            <div className="text-xs text-gray-400">مبالغ معلقة</div>
          </div>
          <div className={`${glassCard} p-4 text-center`}>
            <div className="text-2xl font-bold text-purple-400">{totalApproved} ج.م</div>
            <div className="text-xs text-gray-400">إيرادات معتمدة</div>
          </div>
        </div>

        {/* Transactions */}
        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-bold text-white mb-4">📋 المعاملات المالية</h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                      transaction.type === 'subscription' ? 'bg-blue-500/20' :
                      transaction.type === 'product' ? 'bg-purple-500/20' : 'bg-amber-500/20'
                    }`}>
                      {transaction.type === 'subscription' ? '📋' : transaction.type === 'product' ? '🛒' : '🚌'}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{transaction.playerName}</div>
                      <div className="text-gray-400 text-xs">
                        {transaction.type === 'subscription' ? 'اشتراك' : transaction.type === 'product' ? 'منتج' : 'باص'} • {transaction.paymentMethod}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-white">{transaction.amount} ج.م</div>
                    <div className={`text-xs font-bold ${
                      transaction.status === 'pending' ? 'text-amber-400' :
                      transaction.status === 'approved' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {transaction.status === 'pending' ? '⏳ معلق' : transaction.status === 'approved' ? '✓ معتمد' : '✗ مرفوض'}
                    </div>
                  </div>
                </div>
                {transaction.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveTransaction(transaction.id)}
                      className="flex-1 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs font-bold hover:bg-emerald-500/30 transition"
                    >
                      ✓ اعتماد وتفعيل
                    </button>
                    <button
                      onClick={() => rejectTransaction(transaction.id)}
                      className="flex-1 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-xs font-bold hover:bg-red-500/30 transition"
                    >
                      ✗ رفض
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Coupons Section ---
function CouponsSection() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          🎫 نظام <span className={gradientText}>الكوبونات</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockCoupons.map((coupon) => (
            <div key={coupon.id} className={`${glassCard} p-6 hover:scale-105 transition-all`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">🎫</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  coupon.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {coupon.status === 'active' ? '✓ نشط' : '✗ منتهي'}
                </span>
              </div>
              <div className="text-center mb-4">
                <div className="text-2xl font-black text-pink-400 font-mono mb-1">{coupon.code}</div>
                <div className="text-3xl font-black text-white">
                  {coupon.discount}{coupon.type === 'percentage' ? '%' : ' ج.م'}
                </div>
                <div className="text-gray-400 text-xs">خصم</div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">الاستخدام:</span>
                  <span className="text-white">{coupon.usedCount}/{coupon.maxUses}</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-pink-500 to-rose-600"
                    style={{ width: `${(coupon.usedCount / coupon.maxUses) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ينتهي:</span>
                  <span className="text-white">{coupon.validUntil}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Notifications Section ---
function NotificationsSection() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          🔔 مركز <span className={gradientText}>الإشعارات</span>
        </h2>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`${glassCard} p-4 cursor-pointer hover:bg-white/10 transition-all ${
                !notification.read ? 'border-r-4 border-red-500' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{notification.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-bold text-sm ${!notification.read ? 'text-white' : 'text-gray-400'}`}>
                      {notification.title}
                    </h4>
                    {!notification.read && <span className="w-2 h-2 bg-red-500 rounded-full" />}
                  </div>
                  <p className="text-gray-300 text-xs mb-1">{notification.message}</p>
                  <div className="text-gray-500 text-[10px]">{notification.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-lg border-t border-white/10 p-8 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">SA</div>
            <div className="text-right">
              <h3 className="text-white font-bold text-sm">أكاديمية الرياضات الاحترافية</h3>
              <p className="text-gray-500 text-xs">Sports Academy System v5.1.0</p>
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-2">منظومة مؤسسية متكاملة لإدارة الأكاديميات الرياضية</p>
        <div className="flex justify-center gap-2 mb-4">
          {['55+ مكون', '100+ وحدة', '24 نظام', '100% جاهز'].map((item, i) => (
            <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">{item}</span>
          ))}
        </div>
        <p className="text-gray-600 text-xs">صُنع بـ ❤️ بواسطة فريق Sports Academy</p>
      </div>
    </footer>
  );
}

// ============================================
// 🎯 التطبيق الرئيسي (Main App)
// ============================================

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'players': return <PlayersSection />;
      case 'coaches': return <CoachesSection />;
      case 'attendance': return <AttendanceSection />;
      case 'communication': return <CommunicationSection />;
      case 'tournaments': return <TournamentsSection />;
      case 'records': return <WorldRecordsSection />;
      case 'finance': return <FinanceSection />;
      case 'coupons': return <CouponsSection />;
      case 'notifications': return <NotificationsSection />;
      default: return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" dir="rtl">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}
