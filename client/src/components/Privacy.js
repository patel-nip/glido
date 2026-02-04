import React from 'react';
import './Privacy.css';

const Privacy = () => {
    return (
        <div className="privacy-page">
            <div className="privacy-container">
                <h1 className="privacy-title">
                    PRIVACY <span className="highlight">POLICY</span>
                </h1>

                <p className="privacy-intro">
                    <span className="highlight">GLIDO</span> is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you use our services.
                </p>

                {/* Section 1 */}
                <section className="privacy-section">
                    <h2>1. Information We Collect</h2>
                    <p>
                        We may collect personal information including your name, contact details, booking information, pickup and drop-off locations, and payment-related data necessary to deliver our services.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="privacy-section">
                    <h2>2. How We Use Your Information</h2>
                    <p>
                        Your information is used to process bookings, manage trips, provide customer support, improve service quality, and comply with legal obligations.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="privacy-section">
                    <h2>3. Data Sharing & Disclosure</h2>
                    <p>
                        We do not sell or rent your personal data. Information may be shared with drivers, service partners, or payment processors strictly for service fulfilment and operational purposes.
                    </p>
                </section>

                {/* Section 4 */}
                <section className="privacy-section">
                    <h2>4. Data Security</h2>
                    <p>
                        We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, or misuse.
                    </p>
                </section>

                {/* Section 5 */}
                <section className="privacy-section">
                    <h2>5. Data Retention</h2>
                    <p>
                        Personal data is retained only for as long as necessary to fulfil the purposes outlined in this policy or as required by law.
                    </p>
                </section>

                {/* Section 6 */}
                <section className="privacy-section">
                    <h2>6. Your Rights</h2>
                    <p>
                        You have the right to access, correct, or request deletion of your personal data, subject to applicable legal requirements.
                    </p>
                </section>

                {/* Section 7 */}
                <section className="privacy-section">
                    <h2>7. Cookies & Tracking</h2>
                    <p>
                        Our website may use cookies or similar technologies to enhance user experience and analyse website performance. You may control cookie preferences through your browser settings.
                    </p>
                </section>

                {/* Section 8 */}
                <section className="privacy-section">
                    <h2>8. Policy Updates</h2>
                    <p>
                        GLIDO may update this Privacy Policy from time to time. Any changes will be effective immediately upon publication on our website.
                    </p>
                </section>

                {/* Section 9 */}
                <section className="privacy-section">
                    <h2>9. Contact Information</h2>
                    <p>
                        If you have any questions regarding this Privacy Policy or how your data is handled, please contact us using the details provided on our Contact page.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
