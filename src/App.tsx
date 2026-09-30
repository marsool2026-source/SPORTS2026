import { ThemeProvider } from './contexts/ThemeContext';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Overview from './components/Overview';
import SystemOverview from './components/SystemOverview';
import Timeline from './components/Timeline';
import DigitalCardSystem from './components/DigitalCardSystem';
import AttendanceSystem from './components/AttendanceSystem';
import CommunicationSystem from './components/CommunicationSystem';
import FinancialSystem from './components/FinancialSystem';
import IntegrationFlow from './components/IntegrationFlow';
import Summary from './components/Summary';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { BackToTop } from './components/UIElements';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-white overflow-x-hidden">
        <ProgressBar />
        <Navigation />
        <Hero />
        <Overview />
        <SystemOverview />
        <Timeline />
        <DigitalCardSystem />
        <AttendanceSystem />
        <CommunicationSystem />
        <FinancialSystem />
        <IntegrationFlow />
        <Summary />
        <FAQ />
        <CallToAction />
        <Footer />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}
