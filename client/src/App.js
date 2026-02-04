import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Booking from './components/Booking';
import About from './components/About';
import Services from './components/Services';
import WhatsAppWidget from './components/WhatsAppWidget';
import Support from './components/Support';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import RefundPolicy from './components/RefundPolicy';
import Payment from './components/Payment';
import './App.css';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Scroll to top button
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      role="button"
      aria-label="Scroll to top"
      tabIndex={0}
    >
      ↑
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking/initiate" element={<Booking />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cancellation-policy" element={<RefundPolicy />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/booking-success" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Booking Successful!</h1><p>Thank you for your booking. You will receive a confirmation email shortly.</p></div>} />
            <Route path="*" element={
              <div className="error-boundary">
                <h1>404</h1>
                <p>Page not found</p>
                <button onClick={() => window.location.href = '/'}>
                  Go to Home
                </button>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
        <WhatsAppWidget />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
