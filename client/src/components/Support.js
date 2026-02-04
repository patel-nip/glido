import React from 'react';
import './Support.css';

const Support = () => {
    return (
        <div className="support-page">
            <div className="support-container">
                <h1 className="support-title">
                    CUSTOMER <span className="highlight">SUPPORT</span>
                </h1>

                <div className="support-content-grid">
                    {/* Left Side - Description */}
                    <div className="support-description">
                        <p className="support-text">
                            At <span className="highlight">GLIDO</span>, customer satisfaction is at the core of everything we do. Our dedicated support team is available to assist you before, during, and after your journey.
                        </p>

                        <p className="support-text">
                            Whether you need help with bookings, trip modifications, vehicle details, or general enquiries, we ensure clear communication and prompt resolution.
                        </p>

                        <p className="support-text">
                            We believe in transparent service, fast response times, and reliable assistance — so you can travel with confidence and peace of mind.
                        </p>
                    </div>

                    {/* Right Side - Support Cards */}
                    <div className="support-cards">
                        <div className="support-card">
                            <h3 className="card-title">Booking Assistance</h3>
                            <p className="card-description">
                                Get help with new reservations, cancellations, changes, and special requests related to your journey.
                            </p>
                        </div>

                        <div className="support-card">
                            <h3 className="card-title">Trip & Vehicle Support</h3>
                            <p className="card-description">
                                Questions about pickup times, routes, driver details, or vehicle information are handled efficiently by our team.
                            </p>
                        </div>

                        <div className="support-card">
                            <h3 className="card-title">Corporate & Account Enquiries</h3>
                            <p className="card-description">
                                Dedicated support for corporate clients, invoicing queries, and long-term transport solutions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
