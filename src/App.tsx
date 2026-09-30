import { useState } from 'react';

// ============================================
// الأنواع والبيانات
// ============================================

interface Player {
  id: string;
  name: string;
  age: number;
  sport: string;
  serialNumber: string;
  qrCode: string;
  subscriptionStatus: 'active' | 'pending' | 'inactive';
}

interface Coach {
  id: string;
  name: string;
  specialty: string;
  experience: string;
}

interface Transaction {
  id: string;
  playerId: string;
  playerName: string;
  amount: number;
  type: 'subscription' | 'product' | 'bus';
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

// ============================================
// البيانات التجريبية
// ============================================

const mockPlayers: Player[] = [
  { id: '1', name: 'أحمد محمد علي', age: 10, sport: 'كرة قدم', serialNumber: 'SA-2014-FT-0001', qrCode: 'QR-001', subscriptionStatus: 'active' },
  { id: '2', name: 'محمد خالد حسن', age: 11, sport: 'كرة سلة', serialNumber: 'SA-2013-BK-0002', qrCode: 'QR-002', subscriptionStatus: 'active' },
  { id: '3', name: 'يوسف أحمد سعيد', age: 9, sport: 'سباحة', serialNumber: 'SA-2015-SW-0003', qrCode: 'QR-003', subscriptionStatus: 'pending' },
];

const mockCoaches: Coach[] = [
  { id: '1', name: 'كابتن محمود أحمد', specialty: 'كرة قدم', experience: '15 سنة' },
  { id: '2', name: 'كابتن سارة علي', specialty: 'كرة سلة', experience: '10 سنوات' },
  { id: '3', name: 'كابتن محمد حسن', specialty: 'سباحة', experience: '12 سنة' },
];

const mockTransactions: Transaction[] = [
  { id: '1', playerId: '1', playerName: 'أحمد محمد علي', amount: 500, type: 'subscription', status: 'approved', date: '2026-01-15' },
  { id: '2', playerId: '2', playerName: 'محمد خالد حسن', amount: 500, type: 'subscription', status: 'pending', date: '2026-01-14' },
  { id: '3', playerId: '3', playerName: 'يوسف أحمد سعيد', amount: 250, type: 'product', status: 'pending', date: '2026-01-13' },
];

// ============================================
// المكونات
// ============================================

// Header Component
function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
            🏆
          </div>
          <div>
            <h1 className="text-xl font-bold">أكاديمية الرياضات الاحترافية</h1>
            <p className="text-sm text-white/80">Sports Academy System</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#dashboard" className="hover:text-white/80 transition">الرئيسية</a>
          <a href="#players" className="hover:text-white/80 transition">اللاعبين</a>
          <a href="#coaches" className="hover:text-white/80 transition">المدربين</a>
          <a href="#finance" className="hover:text-white/80 transition">المالية</a>
        </nav>
      </div>
    </header>
  );
}

// Dashboard Component
function Dashboard() {
  const stats = [
    { label: 'إجمالي اللاعبين', value: mockPlayers.length, icon: '👥', color: 'from-blue-500 to-cyan-500' },
    { label: 'المدربين', value: mockCoaches.length, icon: '👨‍🏫', color: 'from-purple-500 to-violet-500' },
    { label: 'المعاملات المعلقة', value: mockTransactions.filter(t => t.status === 'pending').length, icon: '⏳', color: 'from-amber-500 to-orange-500' },
    { label: 'الإيرادات', value: `${mockTransactions.filter(t => t.status === 'approved').reduce((sum, t) => sum + t.amount, 0)} ج.م`, icon: '💰', color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <section id="dashboard" className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">لوحة التحكم الرئيسية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Players Section
function PlayersSection() {
  return (
    <section id="players" className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">إدارة اللاعبين</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlayers.map((player) => (
            <div key={player.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                  ⚽
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{player.name}</h3>
                  <p className="text-gray-400 text-sm">{player.sport} • {player.age} سنة</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">الرقم التسلسلي:</span>
                  <span className="text-white font-mono">{player.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">QR Code:</span>
                  <span className="text-white">{player.qrCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">حالة الاشتراك:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    player.subscriptionStatus === 'active' ? 'bg-emerald-500/20 text-emerald-300' :
                    player.subscriptionStatus === 'pending' ? 'bg-amber-500/20 text-amber-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {player.subscriptionStatus === 'active' ? 'نشط' :
                     player.subscriptionStatus === 'pending' ? 'معلق' : 'غير نشط'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Coaches Section
function CoachesSection() {
  return (
    <section id="coaches" className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">فريق المدربين</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCoaches.map((coach) => (
            <div key={coach.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{coach.name}</h3>
                  <p className="text-gray-400 text-sm">{coach.specialty}</p>
                </div>
              </div>
              <div className="text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{coach.experience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Finance Section
function FinanceSection() {
  const [transactions, setTransactions] = useState(mockTransactions);

  const approveTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' as const } : t));
  };

  const rejectTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'rejected' as const } : t));
  };

  return (
    <section id="finance" className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">النظام المالي</h2>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-amber-400 mb-2">
              {transactions.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-gray-400">معاملات معلقة</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              {transactions.filter(t => t.status === 'approved').length}
            </div>
            <div className="text-gray-400">معاملات معتمدة</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {transactions.filter(t => t.status === 'approved').reduce((sum, t) => sum + t.amount, 0)} ج.م
            </div>
            <div className="text-gray-400">إجمالي الإيرادات</div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">المعاملات المالية</h3>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-white font-bold">{transaction.playerName}</div>
                    <div className="text-gray-400 text-sm">
                      {transaction.type === 'subscription' ? 'اشتراك' : transaction.type === 'product' ? 'منتج' : 'باص'} • {transaction.date}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">{transaction.amount} ج.م</div>
                    <div className={`text-xs font-bold ${
                      transaction.status === 'pending' ? 'text-amber-400' :
                      transaction.status === 'approved' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {transaction.status === 'pending' ? '⏳ معلق' :
                       transaction.status === 'approved' ? '✓ معتمد' : '✗ مرفوض'}
                    </div>
                  </div>
                </div>
                {transaction.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveTransaction(transaction.id)}
                      className="flex-1 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-lg text-sm font-bold hover:bg-emerald-500/30 transition"
                    >
                      ✓ اعتماد
                    </button>
                    <button
                      onClick={() => rejectTransaction(transaction.id)}
                      className="flex-1 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-sm font-bold hover:bg-red-500/30 transition"
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

// Footer Component
function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-lg border-t border-white/10 p-8 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 mb-2">صُنع بـ ❤️ بواسطة فريق Sports Academy</p>
        <p className="text-gray-500 text-sm">الإصدار 5.1.0 - النسخة النهائية الكاملة</p>
      </div>
    </footer>
  );
}

// ============================================
// التطبيق الرئيسي
// ============================================

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <Dashboard />
      <PlayersSection />
      <CoachesSection />
      <FinanceSection />
      <Footer />
    </div>
  );
}
