import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Testimonials from './Testimonials';
import './Home.css';

const Home = () => {
    const [scrollY, setScrollY] = useState(0);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // Rotating hero titles
    const heroTitles = [
        'THE PREMIUM CAR',
        'THE BUSINESS SERVICE',
        'THE COURIER SERVICE',
        'THE EVENTS SERVICE',
        'THE AIRPORT TRANSFER'
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-rotate hero title every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) =>
                prevIndex === heroTitles.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero-section">
                <div
                    className="hero-background"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                ></div>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        <div className="rotating-text-container">
                            {heroTitles.map((title, index) => (
                                <span
                                    key={index}
                                    className={`rotating-text ${index === currentTextIndex ? 'active' : ''
                                        } ${index === (currentTextIndex - 1 + heroTitles.length) % heroTitles.length ? 'prev' : ''
                                        }`}
                                >
                                    {title}
                                </span>
                            ))}
                        </div>
                        <span className="highlight">YOU DESERVE</span>
                    </h1>
                    <p className="hero-subtitle">
                        Book your London private hire with GLIDO — the trusted choice for seamless travel across London.
                    </p>
                    <div className="hero-actions">
                        <Link to="/booking/initiate" className="hero-btn primary">
                            GET A QUOTE →
                        </Link>
                        <div className="hero-contact">
                            Or contact us: <a href="tel:+442036575772">+44 20 3657 5772</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview Section */}
            {/* Our Services Section - Original Design */}
            <section className="our-services-section">
                <div className="container">
                    <h2 className="section-title">OUR <span className="highlight-orange">SERVICES</span></h2>
                    <div className="services-layout">
                        <div className="services-image">
                            <img
                                src="/images/our-service (1).png"
                                alt="GLIDO Premium Fleet in London with Big Ben"
                            />
                        </div>
                        <div className="services-content">
                            <div className="service-detail">
                                <h3 className="service-title">Private Hire Passenger Transport</h3>
                                <p className="service-description">
                                    Pre-booked journeys tailored to your specification, comfort, and reliability.
                                </p>
                            </div>

                            <div className="service-detail">
                                <h3 className="service-title">Corporate & Account Services</h3>
                                <p className="service-description">
                                    Structured transport solutions for businesses, including account management,
                                    consolidated invoicing, and monthly reporting.
                                </p>
                            </div>

                            <div className="service-detail">
                                <h3 className="service-title">Airport Transfers</h3>
                                <p className="service-description">
                                    Timely and reliable airport transfers designed around business and personal travel demands.
                                </p>
                            </div>

                            <div className="service-detail">
                                <h3 className="service-title">Scheduled & Contract Transport</h3>
                                <p className="service-description">
                                    Regular journeys under contract for events, team arrangements, and corporate requirements.
                                </p>
                            </div>

                            <div className="service-detail">
                                <h3 className="service-title">Executive & Chauffeur Services</h3>
                                <p className="service-description">
                                    A refined travel experience supported by professional drivers and premium vehicles.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Professional Standards Section */}
            <section className="standards-section">
                <div className="standards-background"></div>
                <div className="standards-overlay"></div>
                <div className="container">
                    <h2 className="standards-title">PROFESSIONAL STANDARDS</h2>
                    <p className="standards-text">
                        Every journey is delivered in line with clearly defined service and conduct standards.
                        We understand the importance of confidentiality and professional conduct in every aspect of our service.
                    </p>
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials />

            {/* What Sets Us Apart Section - NEW */}
            <section className="what-sets-us-apart">
                <div className="container">
                    <h2 className="section-title-apart">
                        WHAT SETS US <span className="highlight-orange">APART</span>
                    </h2>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="30" fill="#FFA500" />
                                    <path d="M30 20L33 27L40 28L35 33L36 40L30 37L24 40L25 33L20 28L27 27L30 20Z" fill="#000" />
                                </svg>
                            </div>
                            <p className="feature-text">
                                Every journey is delivered in line with clearly defined service and conduct standards.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="30" fill="#FFA500" />
                                    <rect x="22" y="25" width="16" height="12" rx="2" fill="#000" />
                                    <path d="M26 25V23C26 21.3431 27.3431 20 29 20H31C32.6569 20 34 21.3431 34 23V25" stroke="#000" strokeWidth="2" fill="none" />
                                    <circle cx="30" cy="31" r="2" fill="#FFA500" />
                                </svg>
                            </div>
                            <p className="feature-text">
                                Our systems and processes are built to support corporate travel requirements.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="30" fill="#FFA500" />
                                    <path d="M30 20L33 27L40 28L35 33L36 40L30 37L24 40L25 33L20 28L27 27L30 20Z" fill="#000" />
                                </svg>
                            </div>
                            <p className="feature-text">
                                Punctual arrivals, well-presented drivers, and dependable service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-background"></div>
                <div className="cta-overlay"></div>
                <div className="container">
                    <h2 className="cta-title">
                        READY TO EXPERIENCE <span className="highlight">PREMIUM SERVICE?</span>
                    </h2>
                    <p className="cta-subtitle">
                        Book your journey today and discover the GLIDO difference
                    </p>
                    <Link to="/booking/initiate" className="cta-btn">
                        GET A QUOTE →
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
