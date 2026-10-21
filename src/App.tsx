import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StarryBackground from './components/layout/StarryBackground';
import LoadingScreen from './components/layout/LoadingScreen';
import BackToTop from './components/common/BackToTop';
import ScrollToTop from './components/common/ScrollToTop';
import PageTracker from './components/common/PageTracker';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Members from './pages/Members';
import MemberPage from './pages/MemberPage';
import Referrals from './pages/Referrals';
import MemberEdit from './pages/MemberEdit';
import BNI from './pages/BNI';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

import { AuthProvider } from './contexts/AuthContext';

const AnimatedRoutes = () => {
  const location = useLocation();

  // Force external browser for social App WebViews (LINE, FB, IG)
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || '';
    const isLine = /Line\//i.test(ua);
    const isFb = /FBAN|FBAV/i.test(ua);
    const isIg = /Instagram/i.test(ua);

    const isInApp = isLine || isFb || isIg;
    const hasParam = window.location.search.includes('openExternalBrowser=1');

    // For LINE: openExternalBrowser=1 is a magic parameter that forces the browser out.
    // For FB/IG: it doesn't force a jump but we keep it to signal the state.
    if (isInApp && !hasParam) {
      const url = new URL(window.location.href);
      url.searchParams.set('openExternalBrowser', '1');
      window.location.replace(url.toString());
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/bni" element={<BNI />} />
        <Route path="/members" element={<Members />} />
        <Route path="/member/:slug" element={<MemberPage />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/member-edit" element={<MemberEdit />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <LoadingScreen />
        <PageTracker />
        <ScrollToTop />
        <StarryBackground />
        <div className="flex flex-col min-h-screen relative z-10">
          <Navbar />
          <main className="flex-grow pb-[70px] md:pb-0">
            <AnimatedRoutes />
          </main>
          <Footer />
          <BackToTop />
          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
