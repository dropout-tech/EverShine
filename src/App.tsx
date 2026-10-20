import { lazy, Suspense, useEffect } from 'react';
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
import { AuthProvider } from './contexts/AuthContext';

const Members = lazy(() => import('./pages/Members'));
const Referrals = lazy(() => import('./pages/Referrals'));
const MemberEdit = lazy(() => import('./pages/MemberEdit'));
const BNI = lazy(() => import('./pages/BNI'));
const Login = lazy(() => import('./pages/Login'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AnimatedRoutes = () => {
  const location = useLocation();

  // Force external browser for social App WebViews (LINE, FB, IG)
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
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
      <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/bni" element={<BNI />} />
          <Route path="/members" element={<Members />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/login" element={<Login />} />
          <Route path="/member-edit" element={<MemberEdit />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
