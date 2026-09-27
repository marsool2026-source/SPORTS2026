import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Timeline from './components/Timeline';
import Architecture from './components/Architecture';
import Summary from './components/Summary';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Overview />
      <Timeline />
      <Architecture />
      <Summary />
      <Footer />
    </div>
  );
}
