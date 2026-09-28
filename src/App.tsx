import { ThemeProvider } from './contexts/ThemeContext';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import DesignPreview from './components/DesignPreview';
import ThemeSelector from './components/ThemeSelector';
import LoginScreen from './components/LoginScreen';
import AboutUs from './components/AboutUs';
import Overview from './components/Overview';
import Timeline from './components/Timeline';
import DigitalCardSystem from './components/DigitalCardSystem';
import AttendanceSystem from './components/AttendanceSystem';
import CommunicationSystem from './components/CommunicationSystem';
import TournamentsSection from './components/TournamentsSection';
import PerformanceTracking from './components/PerformanceTracking';
import BusManagement from './components/BusManagement';
import ProductsStore from './components/ProductsStore';
import ScheduleCalendar from './components/ScheduleCalendar';
import PricingPlans from './components/PricingPlans';
import NotificationCenter from './components/NotificationCenter';
import TestimonialsSection from './components/TestimonialsSection';
import CoachesSection from './components/CoachesSection';
import GallerySection from './components/GallerySection';
import LiveStats from './components/LiveStats';
import PackageQuiz from './components/PackageQuiz';
import { BMICalculator, FreeTrialBooking } from './components/InteractiveTools';
import ContactMap from './components/ContactMap';
import BlogSection from './components/BlogSection';
import PartnersSection from './components/PartnersSection';
import FinancialSystem from './components/FinancialSystem';
import IntegrationFlow from './components/IntegrationFlow';
import Architecture from './components/Architecture';
import Summary from './components/Summary';
import FAQ from './components/FAQ';
import { CookieConsent, LegalPages } from './components/LegalPages';
import { BackToTop, LoadingScreen } from './components/UIElements';
import { PackageComparison, UpcomingEvents } from './components/AdditionalFeatures';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-white overflow-x-hidden">
        <LoadingScreen />
        <ProgressBar />
        <Navigation />
        <Hero />
        <DesignPreview />
        <ThemeSelector />
        <LoginScreen />
        <AboutUs />
        <Overview />
        <Timeline />
        <DigitalCardSystem />
        <AttendanceSystem />
        <CommunicationSystem />
        <TournamentsSection />
        <PerformanceTracking />
        <BusManagement />
        <ProductsStore />
        <ScheduleCalendar />
        <PricingPlans />
        <NotificationCenter />
        <TestimonialsSection />
        <CoachesSection />
        <GallerySection />
        <LiveStats />
        <PackageQuiz />
        <BMICalculator />
        <FreeTrialBooking />
        <ContactMap />
        <BlogSection />
        <PartnersSection />
        <PackageComparison />
        <UpcomingEvents />
        <FinancialSystem />
        <IntegrationFlow />
        <Architecture />
        <Summary />
        <FAQ />
        <LegalPages />
        <CallToAction />
        <Footer />
        <BackToTop />
        <CookieConsent />
      </div>
    </ThemeProvider>
  );
}
