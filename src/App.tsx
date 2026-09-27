import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import DesignPreview from './components/DesignPreview';
import LoginScreen from './components/LoginScreen';
import Overview from './components/Overview';
import Timeline from './components/Timeline';
import DigitalCardSystem from './components/DigitalCardSystem';
import AttendanceSystem from './components/AttendanceSystem';
import CommunicationSystem from './components/CommunicationSystem';
import FinancialSystem from './components/FinancialSystem';
import IntegrationFlow from './components/IntegrationFlow';
import Architecture from './components/Architecture';
import Summary from './components/Summary';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <ProgressBar />
      <Navigation />
      <Hero />
      <DesignPreview />
      <LoginScreen />
      <Overview />
      <Timeline />
      <DigitalCardSystem />
      <AttendanceSystem />
      <CommunicationSystem />
      <FinancialSystem />
      <IntegrationFlow />
      <Architecture />
      <Summary />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
}
