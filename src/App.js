import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import BodySection from './components/BodySection/BodySection';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Header />
      <HeroSection />
      <BodySection />
      <Footer />
    </div>
  );
}

export default App;