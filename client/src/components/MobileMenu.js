import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
    // Close menu on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="mobile-menu-overlay" onClick={onClose}>
            <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                <button
                    className="close-button"
                    onClick={onClose}
                    aria-label="Close menu"
                >
                    ✕
                </button>

                <nav className="mobile-nav">
                    <Link to="/" onClick={onClose}>HOME</Link>
                    <Link to="/booking/initiate" onClick={onClose}>TRACK BOOKING</Link>
                    <Link to="/services" onClick={onClose}>FLEET</Link>
                    <Link to="/login" onClick={onClose}>SIGN IN</Link>
                    <Link to="/register" onClick={onClose}>SIGN UP</Link>
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;
