import { ThemeProvider } from './contexts/ThemeContext';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import DesignPreview from './components/DesignPreview';
import ThemeSelector from './components/ThemeSelector';
import LoginScreen from './components/LoginScreen';
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
import FinancialSystem from './components/FinancialSystem';
import IntegrationFlow from './components/IntegrationFlow';
import Architecture from './components/Architecture';
import Summary from './components/Summary';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-white overflow-x-hidden">
        <ProgressBar />
        <Navigation />
        <Hero />
        <DesignPreview />
        <ThemeSelector />
        <LoginScreen />
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
        <FinancialSystem />
        <IntegrationFlow />
        <Architecture />
        <Summary />
        <FAQ />
        <CallToAction />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
