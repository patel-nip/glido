import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page-new">
            {/* Main About Section */}
            <section className="about-main-section">
                <div className="container-about">
                    <h1 className="about-page-title">
                        ABOUT <span className="highlight-orange">US</span>
                    </h1>

                    <div className="about-content-grid">
                        {/* Left - Image */}
                        <div className="about-image-container">
                            <img
                                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
                                alt="About GLIDO"
                            />
                        </div>

                        {/* Right - Text Content */}
                        <div className="about-text-content">
                            <p className="about-paragraph">
                                <span className="highlight-orange">GLIDO</span> is a premium private hire company delivering professional, pre-booked passenger transport services. Our focus is built on punctuality, discretion, and uncompromising service quality.
                            </p>

                            <p className="about-paragraph">
                                We operate through structured, transparent, and technology-driven systems, ensuring every journey is smooth, dependable, and aligned with the highest professional standards.
                            </p>

                            <p className="about-paragraph">
                                Whether serving private individuals or corporate clients, GLIDO provides consistent transport solutions designed around comfort, reliability, and efficiency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
