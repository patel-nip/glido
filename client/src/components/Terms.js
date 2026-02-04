import React from 'react';
import './Terms.css';

const Terms = () => {
    return (
        <div className="terms-page">
            <div className="terms-container">
                <h1 className="terms-title">
                    TERMS & <span className="highlight">CONDITIONS</span>
                </h1>

                <p className="terms-intro">
                    These Terms and Conditions govern the use of services provided by{' '}
                    <span className="highlight">GLIDO</span>. By accessing or using our services, you agree to be bound by these terms.
                </p>

                {/* Section 1 */}
                <section className="terms-section">
                    <h2>1. Service Overview</h2>
                    <p>
                        GLIDO provides pre-booked private hire transportation services. All journeys must be booked in advance and are subject to availability, route conditions, and operational constraints.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="terms-section">
                    <h2>2. Bookings & Payments</h2>
                    <p>
                        All bookings must be completed through our authorised booking channels. Prices are agreed at the time of booking and may vary based on distance, time, vehicle type, and additional services requested.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="terms-section">
                    <h2>3. Waiting Time Policy</h2>
                    <p>
                        The following waiting time policy applies to all <span className="highlight">GLIDO</span> bookings:
                    </p>

                    <h3>Non-Airport / Local Jobs</h3>
                    <p>
                        A complimentary waiting period of <strong>10 minutes</strong> is included from the scheduled pickup time. After this period, waiting time will be charged at <strong>£20 per hour</strong>, calculated proportionally.
                    </p>

                    <h3>Airport Pickups</h3>
                    <p>
                        A complimentary waiting period of <strong>45 minutes</strong> is included from the time the flight has landed. Any additional waiting time will be charged at <strong>£20 per hour</strong>, calculated proportionally.
                    </p>
                </section>

                {/* Section 4 */}
                <section className="terms-section">
                    <h2>4. Cancellations & Amendments</h2>
                    <p>
                        Cancellation and amendment requests are subject to our cancellation policy. Late cancellations or no-shows may incur charges as outlined at the time of booking.
                    </p>
                </section>

                {/* Section 5 */}
                <section className="terms-section">
                    <h2>5. Passenger Responsibilities</h2>
                    <p>
                        Passengers must ensure accurate pickup and drop-off information is provided. Any damage caused to the vehicle due to negligence or misconduct may result in additional charges.
                    </p>
                </section>

                {/* Section 6 */}
                <section className="terms-section">
                    <h2>6. Delays & Force Majeure</h2>
                    <p>
                        GLIDO shall not be held liable for delays or service disruption caused by circumstances beyond our control, including traffic conditions, weather, accidents, or government restrictions.
                    </p>
                </section>

                {/* Section 7 */}
                <section className="terms-section">
                    <h2>7. Limitation of Liability</h2>
                    <p>
                        Our liability is limited to the value of the booked journey. GLIDO shall not be responsible for indirect, incidental, or consequential losses.
                    </p>
                </section>

                {/* Section 8 */}
                <section className="terms-section">
                    <h2>8. Privacy & Data Protection</h2>
                    <p>
                        We are committed to protecting your personal data. Information collected during booking is used solely for service delivery and managed in accordance with applicable data protection laws.
                    </p>
                </section>

                {/* Section 9 */}
                <section className="terms-section">
                    <h2>9. Changes to Terms</h2>
                    <p>
                        GLIDO reserves the right to update these Terms and Conditions at any time. Continued use of our services constitutes acceptance of any revised terms.
                    </p>
                </section>

                {/* Section 10 */}
                <section className="terms-section">
                    <h2>10. Governing Law</h2>
                    <p>
                        These Terms and Conditions are governed by and interpreted in accordance with the laws of the United Kingdom.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
