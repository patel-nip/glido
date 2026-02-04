import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Header.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('user');
            alert('Logged out successfully! 👋');
            navigate('/');

            // Force page refresh to update header
            window.location.reload();
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to logout. Please try again.');
        }
    };

    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <button
                        className="menu-button"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <div className="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        MENU
                    </button>

                    <Link to="/" className="logo">
                        <div className="logo-content">
                            <span className="logo-text">GLIDO</span>
                            <div className="logo-icon">
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </div>
                        </div>
                        <div className="tagline">Your ride, your rhythm.</div>
                    </Link>

                    <div className="header-actions">
                        {user ? (
                            <button onClick={handleLogout} className="sign-in-btn">
                                LOGOUT
                            </button>
                        ) : (
                            <Link to="/login" className="sign-in-btn">
                                SIGN IN
                            </Link>
                        )}
                        <Link to="/booking/initiate" className="book-now-btn">
                            BOOK NOW
                        </Link>
                    </div>
                </div>
            </header>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
};

export default Header;
