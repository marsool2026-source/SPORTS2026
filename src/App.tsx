import { lazy, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
const LoadingScreen = lazy(() => import('./components/UIElements').then(m => ({ default: m.LoadingScreen })));

// Lazy load ALL components for better performance
const Hero = lazy(() => import('./components/Hero'));
const HeroVideo = lazy(() => import('./components/HeroVideo'));
const DesignPreview = lazy(() => import('./components/DesignPreview'));
const ThemeSelector = lazy(() => import('./components/ThemeSelector'));
const LoginScreen = lazy(() => import('./components/LoginScreen'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const Overview = lazy(() => import('./components/Overview'));
const SystemOverview = lazy(() => import('./components/SystemOverview'));
const Timeline = lazy(() => import('./components/Timeline'));
const DigitalCardSystem = lazy(() => import('./components/DigitalCardSystem'));
const AttendanceSystem = lazy(() => import('./components/AttendanceSystem'));
const CommunicationSystem = lazy(() => import('./components/CommunicationSystem'));
const TournamentsSection = lazy(() => import('./components/TournamentsSection'));
const PerformanceTracking = lazy(() => import('./components/PerformanceTracking'));
const BusManagement = lazy(() => import('./components/BusManagement'));
const ProductsStore = lazy(() => import('./components/ProductsStore'));
const ScheduleCalendar = lazy(() => import('./components/ScheduleCalendar'));
const PricingPlans = lazy(() => import('./components/PricingPlans'));
const NotificationCenter = lazy(() => import('./components/NotificationCenter'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const CoachesSection = lazy(() => import('./components/CoachesSection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const LiveStats = lazy(() => import('./components/LiveStats'));
const PackageQuiz = lazy(() => import('./components/PackageQuiz'));
const WorldRecordsSystem = lazy(() => import('./components/WorldRecordsSystem'));
const AIAnalysis = lazy(() => import('./components/AIAnalysis'));
const LiveStreaming = lazy(() => import('./components/LiveStreaming'));
const ReferralSystem = lazy(() => import('./components/ReferralSystem'));
const CouponSystem = lazy(() => import('./components/CouponSystem'));
const InvoiceSystem = lazy(() => import('./components/InvoiceSystem'));
// Presentation is very large (635KB) - load only when needed
const Presentation = lazy(() => import('./components/Presentation'));
const InteractiveDashboard = lazy(() => import('./components/InteractiveDashboard'));
const FieldBooking = lazy(() => import('./components/FieldBooking'));
const RewardsSystem = lazy(() => import('./components/RewardsSystem'));
const PushNotifications = lazy(() => import('./components/PushNotifications'));
const BMICalculator = lazy(() => import('./components/InteractiveTools').then(m => ({ default: m.BMICalculator })));
const FreeTrialBooking = lazy(() => import('./components/InteractiveTools').then(m => ({ default: m.FreeTrialBooking })));
const ContactMap = lazy(() => import('./components/ContactMap'));
const BlogSection = lazy(() => import('./components/BlogSection'));
const PartnersSection = lazy(() => import('./components/PartnersSection'));
const FinancialSystem = lazy(() => import('./components/FinancialSystem'));
const IntegrationFlow = lazy(() => import('./components/IntegrationFlow'));
const Architecture = lazy(() => import('./components/Architecture'));
const Summary = lazy(() => import('./components/Summary'));
const FAQ = lazy(() => import('./components/FAQ'));
const LegalPages = lazy(() => import('./components/LegalPages').then(m => ({ default: m.LegalPages })));
const CookieConsent = lazy(() => import('./components/LegalPages').then(m => ({ default: m.CookieConsent })));
const BackToTop = lazy(() => import('./components/UIElements').then(m => ({ default: m.BackToTop })));
const PackageComparison = lazy(() => import('./components/AdditionalFeatures').then(m => ({ default: m.PackageComparison })));
const UpcomingEvents = lazy(() => import('./components/AdditionalFeatures').then(m => ({ default: m.UpcomingEvents })));
const CallToAction = lazy(() => import('./components/CallToAction'));
const Footer = lazy(() => import('./components/Footer'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-10">
    <div className="text-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-gray-400 text-xs">جاري التحميل...</p>
    </div>
  </div>
);

// Section wrapper for lazy loaded components
const Section = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-white overflow-x-hidden">
        {/* Core components - loaded immediately */}
        <LoadingScreen />
        <ProgressBar />
        <Navigation />
        
        {/* All other sections - lazy loaded */}
        <Section><HeroVideo /></Section>
        <Section><Hero /></Section>
        <Section><DesignPreview /></Section>
        <Section><ThemeSelector /></Section>
        <Section><LoginScreen /></Section>
        <Section><AboutUs /></Section>
        <Section><Overview /></Section>
        <Section><SystemOverview /></Section>
        <Section><Timeline /></Section>
        <Section><DigitalCardSystem /></Section>
        <Section><AttendanceSystem /></Section>
        <Section><CommunicationSystem /></Section>
        <Section><TournamentsSection /></Section>
        <Section><PerformanceTracking /></Section>
        <Section><BusManagement /></Section>
        <Section><ProductsStore /></Section>
        <Section><ScheduleCalendar /></Section>
        <Section><PricingPlans /></Section>
        <Section><NotificationCenter /></Section>
        <Section><TestimonialsSection /></Section>
        <Section><CoachesSection /></Section>
        <Section><GallerySection /></Section>
        <Section><LiveStats /></Section>
        <Section><PackageQuiz /></Section>
        <Section><WorldRecordsSystem /></Section>
        <Section><AIAnalysis /></Section>
        <Section><LiveStreaming /></Section>
        <Section><ReferralSystem /></Section>
        <Section><CouponSystem /></Section>
        <Section><InvoiceSystem /></Section>
        <Section><Presentation /></Section>
        <Section><BMICalculator /></Section>
        <Section><FreeTrialBooking /></Section>
        <Section><ContactMap /></Section>
        <Section><BlogSection /></Section>
        <Section><PartnersSection /></Section>
        <Section><PackageComparison /></Section>
        <Section><UpcomingEvents /></Section>
        <Section><FinancialSystem /></Section>
        <Section><IntegrationFlow /></Section>
        <Section><Architecture /></Section>
        <Section><Summary /></Section>
        <Section><FAQ /></Section>
        <Section><LegalPages /></Section>
        <Section><InteractiveDashboard /></Section>
        <Section><FieldBooking /></Section>
        <Section><RewardsSystem /></Section>
        <Section><PushNotifications /></Section>
        <Section><CallToAction /></Section>
        <Section><Footer /></Section>
        <Section><BackToTop /></Section>
        <Section><CookieConsent /></Section>
      </div>
    </ThemeProvider>
  );
}
