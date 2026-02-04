import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-container">
                <h1 className="contact-title">
                    GET IN <span className="highlight">TOUCH</span>
                </h1>

                <p className="contact-subtitle">
                    We're here to support your journey. Whether you have a booking enquiry, need assistance, or require corporate transport solutions — our team is always available.
                </p>

                {/* Contact Cards Grid */}
                <div className="contact-cards-grid">
                    {/* Office Location Card */}
                    <div className="contact-card location-card">
                        <div className="card-icon">📍</div>
                        <h3 className="card-title">Office Location</h3>
                        <div className="card-content">
                            <p>29 Castleton Road</p>
                            <p>Mitcham</p>
                            <p>CR4 1NZ</p>
                            <p>United Kingdom</p>
                        </div>
                    </div>

                    {/* Phone Support Card */}
                    <div className="contact-card">
                        <div className="card-icon">📞</div>
                        <h3 className="card-title">Phone Support</h3>
                        <div className="card-content">
                            <p>Office: <a href="tel:+442036575772">020 3657 5772</a></p>
                            <p>Mobile: <a href="tel:+447836332723">078 3633 2723</a></p>
                        </div>
                    </div>

                    {/* Email Address Card */}
                    <div className="contact-card">
                        <div className="card-icon">✉️</div>
                        <h3 className="card-title">Email Address</h3>
                        <div className="card-content">
                            <p><a href="mailto:glido_ride@hotmail.com">glido_ride@hotmail.com</a></p>
                        </div>
                    </div>

                    {/* Availability Card */}
                    <div className="contact-card">
                        <div className="card-icon">🕐</div>
                        <h3 className="card-title">Availability</h3>
                        <div className="card-content">
                            <p>24/7 Customer Support</p>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="contact-footer-note">
                    For urgent travel matters, we recommend contacting us by phone for immediate assistance.
                </p>
            </div>
        </div>
    );
};

export default Contact;
