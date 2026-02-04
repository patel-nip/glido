import React from 'react';
import './Services.css';

const Services = () => {
    const vehicles = [
        {
            id: 1,
            name: 'SALOON',
            image: '/images/vehicles/saloon.webp',
            seats: 4,
            suitcases: 1,
            handBags: 3
        },
        {
            id: 2,
            name: 'EXECUTIVE',
            image: '/images/vehicles/executive.webp',
            seats: 4,
            suitcases: 1,
            handBags: 2
        },
        {
            id: 3,
            name: 'ESTATE',
            image: '/images/vehicles/estate.webp',
            seats: 4,
            suitcases: 2,
            handBags: 3
        },
        {
            id: 4,
            name: 'MVP',
            image: '/images/vehicles/mvp.webp',
            seats: 6,
            suitcases: 2,
            handBags: 3
        },
        {
            id: 5,
            name: 'MVP EXECUTIVE',
            image: '/images/vehicles/mvp-executive.webp',
            seats: 5,
            suitcases: 4,
            handBags: 4
        },
        {
            id: 6,
            name: '7 SEATER',
            image: '/images/vehicles/7seater.webp',
            seats: 7,
            suitcases: 4,
            handBags: 4
        },
        {
            id: 7,
            name: '8-SEATER MINIBUS',
            image: '/images/vehicles/9seater.webp',
            seats: 8,
            suitcases: 6,
            handBags: 5
        }
    ];

    return (
        <div className="services-page">
            <div className="services-container">
                <p className="services-subtitle">PLAN AHEAD FOR A HASSLE-FREE JOURNEY.</p>
                <h1 className="services-title">Premium Comfort In Every Ride</h1>

                <div className="vehicles-grid">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="vehicle-card">
                            <div className="vehicle-image">
                                <img 
                                    src={vehicle.image} 
                                    alt={vehicle.name}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x300/2a3d52/FFA500?text=' + vehicle.name;
                                    }}
                                />
                            </div>
                            <div className="vehicle-info">
                                <h3 className="vehicle-name">{vehicle.name}</h3>
                                <div className="vehicle-specs">
                                    <div className="spec-row">
                                        <span className="spec-icon">👥</span>
                                        <div className="spec-text">
                                            <span className="spec-value">{vehicle.seats}</span>
                                            <span className="spec-label">Seats</span>
                                        </div>
                                    </div>
                                    <div className="spec-row">
                                        <span className="spec-icon">💼</span>
                                        <div className="spec-text">
                                            <span className="spec-value">{vehicle.suitcases}</span>
                                            <span className="spec-label">Suitcase</span>
                                        </div>
                                    </div>
                                    <div className="spec-row bags-row">
                                        <span className="spec-icon">🧳</span>
                                        <span className="spec-value">{vehicle.handBags} Hand Bags</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
