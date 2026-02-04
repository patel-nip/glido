import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Ann Ingram',
            role: 'Customer',
            rating: 5,
            text: 'Very punctual meeting us at the airport and very helpful with luggage and drop off.'
        },
        {
            id: 2,
            name: 'Mohamed Ibrahim',
            role: 'Customer',
            rating: 5,
            text: 'Hr is so much kind and very professional guy. I recommend him for any big group need fast and comfortable car with reasonable prices.'
        },
        {
            id: 3,
            name: 'Luqman Basharat',
            role: 'Customer',
            rating: 5,
            text: 'Amazing service provided by experienced driver. Will use them again.'
        },
        {
            id: 4,
            name: "Carlos Manzocchi",
            role: "Local Guide",
            rating: 5,
            text: "Thank you so much, great service."
        },
        {
            id: 5,
            name: "Audrey Elalouf",
            role: "Customer",
            rating: 5,
            text: "Amazing, very reliable, quick, nice! I recommend him."
        },
        {
            id: 6,
            name: "Sam Malik",
            role: "Customer",
            rating: 5,
            text: "Excellent experience with this taxi company. The driver arrived on time, was very professional and friendly, and made the ride comfortable and stress-free. Clean vehicle, safe driving, and fair pricing. I'll definitely use them again and recommend them to others."
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? 'star filled' : 'star'}>
                ★
            </span>
        ));
    };

    return (
        <section className="testimonials-section">
            <div className="container">
                <h2 className="section-title">
                    VOICES THAT <span className="highlight">BUILD TRUST</span>
                </h2>

                <div className="testimonials-slider">
                    <button
                        className="slider-btn prev"
                        onClick={prevSlide}
                        aria-label="Previous testimonial"
                    >
                        ← PREV
                    </button>

                    <div className="testimonials-container">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`testimonial-card ${index === currentIndex ? 'active' : ''
                                    } ${index === currentIndex - 1 ||
                                        (currentIndex === 0 && index === testimonials.length - 1)
                                        ? 'prev'
                                        : ''
                                    } ${index === currentIndex + 1 ||
                                        (currentIndex === testimonials.length - 1 && index === 0)
                                        ? 'next'
                                        : ''
                                    }`}
                            >
                                <div className="quote-icon">❝</div>
                                <div className="stars">{renderStars(testimonial.rating)}</div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="testimonial-divider"></div>
                                <h4 className="testimonial-name">{testimonial.name}</h4>
                                <p className="testimonial-role">{testimonial.role}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        className="slider-btn next"
                        onClick={nextSlide}
                        aria-label="Next testimonial"
                    >
                        NEXT →
                    </button>
                </div>

                {/* Dots indicator */}
                <div className="dots-container">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
