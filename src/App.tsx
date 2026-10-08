// ============================================
// 🏆 منظومة أكاديمية الرياضات الاحترافية
// الإصدار 6.0.0 - النسخة النهائية الكاملة
// ============================================

import { useState } from 'react';
import AdvancedLoyalty from './components/AdvancedLoyalty';
import ChatbotAI from './components/ChatbotAI';
import BackupSystem from './components/BackupSystem';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import PublicAPI from './components/PublicAPI';
import MultiLanguage, { LanguageProvider, useLanguage } from './components/MultiLanguage';
import { ARTraining, BlockchainCertificates, IoTDevices, FaceRecognition } from './components/AdvancedFeatures1';
import { FacilityBooking, ReviewsRatings, AdvancedSearch, SmartRecommendations, AffiliateMarketing } from './components/AdvancedFeatures2';
import { ECertificates, NewsBlog, Surveys, AdvancedLiveStream, PredictiveAnalytics, AdvancedCustomization } from './components/AdvancedFeatures3';
import { GamificationSystem, VideoAnalysisAI, NFTCertificates, MultiBranchSystem, BigDataAnalytics } from './components/AdvancedFeatures4';
import { APIIntegration, SocialMediaIntegration, AutoContentCreation, AutomationSystem, PersonalizedML } from './components/AdvancedFeatures5';
import { PredictionSystem, InteractiveMaps, AdvancedMultiLanguage, AdvancedSubscriptions, GiftsAndDonations } from './components/AdvancedFeatures6';
import { MetaverseSystem, AICoach, AdvancedPaymentSystem } from './components/AdvancedFeatures7';
import { IntegrationTestSystem, SystemMonitoring } from './components/IntegrationTestSystem';
import { CRMSystem, InventorySystem, AdvancedFinancialReports, EmployeeManagement } from './components/AdvancedFeatures8';
import { InterAcademyCompetitions, PodcastSystem, PartnershipsSystem } from './components/AdvancedFeatures9';
import UserPages from './components/UserPages';
import ProfessionalQRCode from './components/ProfessionalQRCode';
import Settings from './components/Settings';
import { UserAnalytics, AutoSupport, FeedbackSystem, AdvancedReferral } from './components/AdvancedFeatures10';
import { AutoContent, B2BSystem, MobileAppInfo } from './components/AdvancedFeatures11';
import FullPresentation from './components/FullPresentation';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SecurityEnhancement from './components/SecurityEnhancement';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import SEOEnhancement from './components/SEOEnhancement';
import AccessibilityEnhancement from './components/AccessibilityEnhancement';
import MonitoringSystem from './components/MonitoringSystem';

// ============================================
// 📦 البيانات التجريبية
// ============================================

const mockPlayers = [
  { id: '1', name: 'أحمد محمد علي', age: 10, sport: 'كرة قدم', serialNumber: 'SA-2014-FT-0001', qrCode: 'QR-001', subscriptionStatus: 'active' as const, phone: '01012345678', performance: { speed: 85, strength: 78, endurance: 92, accuracy: 88, agility: 80 }, achievements: ['بطل المنطقة 2025'] },
  { id: '2', name: 'محمد خالد حسن', age: 11, sport: 'كرة سلة', serialNumber: 'SA-2013-BK-0002', qrCode: 'QR-002', subscriptionStatus: 'active' as const, phone: '01098765432', performance: { speed: 78, strength: 85, endurance: 88, accuracy: 82, agility: 75 }, achievements: ['أفضل حارس 2025'] },
  { id: '3', name: 'يوسف أحمد سعيد', age: 9, sport: 'سباحة', serialNumber: 'SA-2015-SW-0003', qrCode: 'QR-003', subscriptionStatus: 'pending' as const, phone: '01112345678', performance: { speed: 92, strength: 75, endurance: 95, accuracy: 85, agility: 88 }, achievements: ['رقم قياسي محلي'] },
];

const mockCoaches = [
  { id: 'c1', name: 'كابتن محمود أحمد', specialty: 'كرة قدم', experience: '15 سنة', certifications: ['UEFA Pro', 'FIFA'], playersCount: 25, rating: 4.9 },
  { id: 'c2', name: 'كابتن سارة علي', specialty: 'كرة سلة', experience: '10 سنوات', certifications: ['FIBA Level 3'], playersCount: 18, rating: 4.8 },
  { id: 'c3', name: 'كابتن محمد حسن', specialty: 'سباحة', experience: '12 سنة', certifications: ['FINA Coach'], playersCount: 15, rating: 4.9 },
];

interface Transaction {
  id: string;
  playerId: string;
  playerName: string;
  amount: number;
  type: 'subscription' | 'product' | 'bus';
  paymentMethod: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

const mockTransactions: Transaction[] = [
  { id: 't1', playerId: '1', playerName: 'أحمد محمد علي', amount: 500, type: 'subscription', paymentMethod: 'فودافون كاش', status: 'approved', date: '2026-01-15' },
  { id: 't2', playerId: '2', playerName: 'محمد خالد حسن', amount: 500, type: 'subscription', paymentMethod: 'فودافون كاش', status: 'pending', date: '2026-01-14' },
  { id: 't3', playerId: '3', playerName: 'يوسف أحمد سعيد', amount: 250, type: 'product', paymentMethod: 'انستاباي', status: 'pending', date: '2026-01-13' },
];

// ============================================
// 🎨 المكونات المشتركة
// ============================================

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl ${className}`}>
      {children}
    </div>
  );
}

// ============================================
// 🏠 Header Component
// ============================================

function Header() {
  const { language, setLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: '🏠' },
    { id: 'players', label: 'اللاعبين', icon: '👥' },
    { id: 'coaches', label: 'المدربين', icon: '👨‍🏫' },
    { id: 'finance', label: 'المالية', icon: '💰' },
    { id: 'loyalty', label: 'الولاء', icon: '🏆' },
    { id: 'chatbot', label: 'المساعد', icon: '🤖' },
    { id: 'analytics', label: 'التحليلات', icon: '📊' },
    { id: 'backup', label: 'النسخ', icon: '💾' },
    { id: 'api', label: 'API', icon: '🔌' },
    { id: 'ar', label: 'AR', icon: '🥽' },
    { id: 'blockchain', label: 'Blockchain', icon: '🔗' },
    { id: 'iot', label: 'IoT', icon: '📡' },
    { id: 'face', label: 'الوجه', icon: '👤' },
    { id: 'booking', label: 'الحجز', icon: '🏟️' },
    { id: 'reviews', label: 'التقييمات', icon: '⭐' },
    { id: 'search', label: 'البحث', icon: '🔍' },
    { id: 'recommendations', label: 'التوصيات', icon: '🎯' },
    { id: 'affiliate', label: 'العمولة', icon: '🤝' },
    { id: 'certificates', label: 'الشهادات', icon: '🏅' },
    { id: 'blog', label: 'المدونة', icon: '📰' },
    { id: 'surveys', label: 'الاستطلاعات', icon: '📊' },
    { id: 'livestream', label: 'البث', icon: '📱' },
    { id: 'predictions', label: 'التنبؤات', icon: '📈' },
    { id: 'customize', label: 'التخصيص', icon: '🎨' },
    { id: 'gamification', label: 'الألعاب', icon: '🎮' },
    { id: 'video-ai', label: 'تحليل فيديو', icon: '🤖' },
    { id: 'nft', label: 'NFT', icon: '🔗' },
    { id: 'branches', label: 'الفروع', icon: '🌍' },
    { id: 'bigdata', label: 'Big Data', icon: '📊' },
    { id: 'api-integration', label: 'API', icon: '🔌' },
    { id: 'social', label: 'سوشيال', icon: '📱' },
    { id: 'auto-content', label: 'محتوى AI', icon: '🎥' },
    { id: 'automation', label: 'أتمتة', icon: '⚙️' },
    { id: 'ml', label: 'تعلم آلي', icon: '🧠' },
    { id: 'maps', label: 'خرائط', icon: '🗺️' },
    { id: 'multilang', label: 'لغات', icon: '🌐' },
    { id: 'subscriptions', label: 'اشتراكات', icon: '💎' },
    { id: 'gifts', label: 'هدايا', icon: '🎁' },
    { id: 'metaverse', label: 'ميتافيرس', icon: '🌐' },
    { id: 'ai-coach', label: 'مدرب AI', icon: '🤖' },
    { id: 'payment', label: 'دفع', icon: '💳' },
    { id: 'integration-test', label: 'اختبار', icon: '🧪' },
    { id: 'monitoring', label: 'مراقبة', icon: '📊' },
    { id: 'crm', label: 'CRM', icon: '💼' },
    { id: 'inventory', label: 'مخزون', icon: '🏋️' },
    { id: 'financial-reports', label: 'تقارير مالية', icon: '📊' },
    { id: 'employees', label: 'موظفين', icon: '👥' },
    { id: 'competitions', label: 'مسابقات', icon: '🏆' },
    { id: 'podcast', label: 'بودكاست', icon: '🎙️' },
    { id: 'partnerships', label: 'شراكات', icon: '🤝' },
    { id: 'user-pages', label: 'صفحات المستخدم', icon: '📱' },
    { id: 'qr-code', label: 'QR Code', icon: '📱' },
    { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
    { id: 'user-analytics', label: 'تحليلات المستخدمين', icon: '📊' },
    { id: 'support', label: 'الدعم', icon: '🎧' },
    { id: 'feedback', label: 'التغذية الراجعة', icon: '💬' },
    { id: 'referral', label: 'الإحالات', icon: '🤝' },
    { id: 'content-gen', label: 'المحتوى', icon: '📝' },
    { id: 'b2b', label: 'B2B', icon: '🏢' },
    { id: 'mobile-app', label: 'التطبيق', icon: '📱' },
    { id: 'full-presentation', label: 'العرض الكامل', icon: '📋' },
    { id: 'analytics-dashboard', label: 'التحليلات', icon: '📊' },
    { id: 'security', label: 'الأمان', icon: '🔒' },
    { id: 'performance', label: 'الأداء', icon: '⚡' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'accessibility', label: 'الوصول', icon: '♿' },
    { id: 'monitoring-system', label: 'المراقبة', icon: '📡' },
    { id: 'language', label: 'اللغة', icon: '🌍' },
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
              <p className="text-xs text-white/80">Sports Academy System v6.0.0</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm"
            >
              <option value="ar" className="bg-gray-800">🇸🇦 العربية</option>
              <option value="en" className="bg-gray-800">🇺🇸 English</option>
              <option value="fr" className="bg-gray-800">🇫🇷 Français</option>
              <option value="es" className="bg-gray-800">🇪🇸 Español</option>
            </select>
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

// ============================================
// 📊 Dashboard Component
// ============================================

function Dashboard() {
  const stats = [
    { label: 'إجمالي اللاعبين', value: mockPlayers.length, icon: '👥', color: 'from-blue-500 to-cyan-500' },
    { label: 'المدربين', value: mockCoaches.length, icon: '👨‍🏫', color: 'from-purple-500 to-violet-500' },
    { label: 'المعاملات المعلقة', value: mockTransactions.filter(t => t.status === 'pending').length, icon: '⏳', color: 'from-amber-500 to-orange-500' },
    { label: 'الإيرادات', value: `${mockTransactions.filter(t => t.status === 'approved').reduce((sum, t) => sum + t.amount, 0)} ج.م`, icon: '💰', color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black mb-2">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              لوحة التحكم الرئيسية
            </span>
          </h2>
          <p className="text-gray-400">نظرة شاملة على جميع أنظمة الأكاديمية</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <GlassCard key={i} className="p-5 hover:scale-105 transition-transform">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl mb-3`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 👥 Players Section
// ============================================

function PlayersSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          👥 إدارة <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">اللاعبين</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlayers.map((player) => (
            <GlassCard key={player.id} className="p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                  ⚽
                </div>
                <div>
                  <h3 className="text-white font-bold">{player.name}</h3>
                  <p className="text-gray-400 text-sm">{player.sport} • {player.age} سنة</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">الرقم التسلسلي:</span>
                  <span className="text-white font-mono text-xs">{player.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">الحالة:</span>
                  <span className={player.subscriptionStatus === 'active' ? 'text-emerald-400' : 'text-amber-400'}>
                    {player.subscriptionStatus === 'active' ? '✓ نشط' : '⏳ معلق'}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 👨‍🏫 Coaches Section
// ============================================

function CoachesSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          👨‍🏫 فريق <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">المدربين</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCoaches.map((coach) => (
            <GlassCard key={coach.id} className="p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="text-white font-bold">{coach.name}</h3>
                  <p className="text-purple-400 text-sm">{coach.specialty}</p>
                  <p className="text-gray-400 text-xs">{coach.experience}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {coach.certifications.map((cert, i) => (
                  <span key={i} className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-xs">
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 💰 Finance Section
// ============================================

function FinanceSection() {
  const [transactions, setTransactions] = useState(mockTransactions);

  const approveTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' as const } : t));
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          💰 النظام <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">المالي</span>
        </h2>

        <GlassCard className="p-6 mb-6 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h4 className="text-amber-300 font-bold text-sm mb-2">سياسة السداد المعتمدة</h4>
              <div className="text-gray-300 text-xs space-y-1">
                <p>1️⃣ رفع الإيصال → 2️⃣ حالة "معلق" → 3️⃣ التحقق الفعلي → 4️⃣ الاعتماد النهائي</p>
                <p className="text-amber-200 font-semibold mt-2">⚠️ لا يمكن للإداري التشغيلي تجاوز هذه السياسة</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <GlassCard key={transaction.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">{transaction.playerName}</div>
                  <div className="text-gray-400 text-sm">
                    {transaction.type === 'subscription' ? 'اشتراك' : 'منتج'} • {transaction.paymentMethod}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-white">{transaction.amount} ج.م</div>
                  <div className={`text-xs font-bold ${
                    transaction.status === 'pending' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {transaction.status === 'pending' ? '⏳ معلق' : '✓ معتمد'}
                  </div>
                </div>
                {transaction.status === 'pending' && (
                  <button
                    onClick={() => approveTransaction(transaction.id)}
                    className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm font-bold"
                  >
                    ✓ اعتماد
                  </button>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎯 Main App Component
// ============================================

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'players': return <PlayersSection />;
      case 'coaches': return <CoachesSection />;
      case 'finance': return <FinanceSection />;
      case 'loyalty': return <AdvancedLoyalty />;
      case 'chatbot': return <ChatbotAI />;
      case 'analytics': return <AdvancedAnalytics />;
      case 'backup': return <BackupSystem />;
      case 'api': return <PublicAPI />;
      case 'ar': return <ARTraining />;
      case 'blockchain': return <BlockchainCertificates />;
      case 'iot': return <IoTDevices />;
      case 'face': return <FaceRecognition />;
      case 'booking': return <FacilityBooking />;
      case 'reviews': return <ReviewsRatings />;
      case 'search': return <AdvancedSearch />;
      case 'recommendations': return <SmartRecommendations />;
      case 'affiliate': return <AffiliateMarketing />;
      case 'certificates': return <ECertificates />;
      case 'blog': return <NewsBlog />;
      case 'surveys': return <Surveys />;
      case 'livestream': return <AdvancedLiveStream />;
      case 'predictions': return <PredictiveAnalytics />;
      case 'customize': return <AdvancedCustomization />;
      case 'gamification': return <GamificationSystem />;
      case 'video-ai': return <VideoAnalysisAI />;
      case 'nft': return <NFTCertificates />;
      case 'branches': return <MultiBranchSystem />;
      case 'bigdata': return <BigDataAnalytics />;
      case 'api-integration': return <APIIntegration />;
      case 'social': return <SocialMediaIntegration />;
      case 'auto-content': return <AutoContentCreation />;
      case 'automation': return <AutomationSystem />;
      case 'ml': return <PersonalizedML />;
      case 'maps': return <InteractiveMaps />;
      case 'multilang': return <AdvancedMultiLanguage />;
      case 'subscriptions': return <AdvancedSubscriptions />;
      case 'gifts': return <GiftsAndDonations />;
      case 'metaverse': return <MetaverseSystem />;
      case 'ai-coach': return <AICoach />;
      case 'payment': return <AdvancedPaymentSystem />;
      case 'integration-test': return <IntegrationTestSystem />;
      case 'monitoring': return <SystemMonitoring />;
      case 'crm': return <CRMSystem />;
      case 'inventory': return <InventorySystem />;
      case 'financial-reports': return <AdvancedFinancialReports />;
      case 'employees': return <EmployeeManagement />;
      case 'competitions': return <InterAcademyCompetitions />;
      case 'podcast': return <PodcastSystem />;
      case 'partnerships': return <PartnershipsSystem />;
      case 'user-pages': return <UserPages />;
      case 'qr-code': return <ProfessionalQRCode />;
      case 'settings': return <Settings />;
      case 'user-analytics': return <UserAnalytics />;
      case 'support': return <AutoSupport />;
      case 'feedback': return <FeedbackSystem />;
      case 'referral': return <AdvancedReferral />;
      case 'content-gen': return <AutoContent />;
      case 'b2b': return <B2BSystem />;
      case 'mobile-app': return <MobileAppInfo />;
      case 'full-presentation': return <FullPresentation />;
      case 'analytics-dashboard': return <AnalyticsDashboard />;
      case 'security': return <SecurityEnhancement />;
      case 'performance': return <PerformanceOptimizer />;
      case 'seo': return <SEOEnhancement />;
      case 'accessibility': return <AccessibilityEnhancement />;
      case 'monitoring-system': return <MonitoringSystem />;
      case 'language': return <MultiLanguage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      {renderPage()}
      
      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-lg border-t border-white/10 p-8 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-2">صُنع بـ ❤️ بواسطة فريق Sports Academy</p>
          <p className="text-gray-500 text-sm">الإصدار 6.0.0 - النسخة النهائية الكاملة</p>
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {['62+ مكون', '19 نظام', '4 لغات', '15 ميزة جديدة', 'API عام'].map((item, i) => (
              <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">{item}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// 🌍 App with Router + Auth Provider
// ============================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

// Public Route Component (redirect to dashboard if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppContent />
                </ProtectedRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/auth" replace />} />

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
