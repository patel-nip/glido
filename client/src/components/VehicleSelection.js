// src/components/VehicleSelection.js
import React from 'react';
import './VehicleSelection.css';

const VehicleSelection = ({
    selectedVehicle,
    onSelectVehicle,
    distance,
    calculatedPrices
}) => {
    const vehicles = [
        {
            id: 'saloon',
            name: 'Saloon',
            subtitle: 'Standard Family Size',
            passengers: 4,
            suitcases: 1,
            handbags: 3,
            multiplier: 1.0,
            image: '/images/vehicles/saloon.webp'
        },
        {
            id: 'executive',
            name: 'Executive',
            subtitle: 'Executive Car',
            passengers: 3,
            suitcases: 1,
            handbags: 2,
            multiplier: 1.5,
            premium: true,
            image: '/images/vehicles/executive.webp'
        },
        {
            id: 'estate',
            name: 'Estate',
            subtitle: 'Standard Family Size',
            passengers: 4,
            suitcases: 2,
            handbags: 3,
            multiplier: 1.15,
            image: '/images/vehicles/estate.webp'
        },
        {
            id: 'mvp',
            name: 'MVP',
            subtitle: 'Large Family Size',
            passengers: 6,
            suitcases: 3,
            handbags: 3,
            multiplier: 1.35,
            image: '/images/vehicles/mvp.webp'
        },
        {
            id: 'mvp-executive',
            name: 'MVP EXECUTIVE',
            subtitle: 'Executive MPV',
            passengers: 5,
            suitcases: 4,
            handbags: 4,
            multiplier: 1.75,
            premium: true,
            image: '/images/vehicles/mvp-executive.webp'
        },
        {
            id: '7seater',
            name: '7 SEATER',
            subtitle: 'Large Family Size',
            passengers: 6,
            suitcases: 4,
            handbags: 4,
            multiplier: 1.6,
            image: '/images/vehicles/7seater.webp'
        },
        {
            id: '9seater',
            name: '9-Seater Minibus',
            subtitle: 'Extra Large Group',
            passengers: 8,
            suitcases: 4,
            handbags: 5,
            multiplier: 2.0,
            image: '/images/vehicles/9seater.webp'
        }
    ];

    return (
        <div className="vehicle-selection-section">
            <h2>CHOOSE YOUR SERVICE</h2>

            {distance && (
                <p className="distance-info">
                    📍 Distance: {distance.toFixed(1)} miles
                </p>
            )}

            <div className="vehicles-list">
                {vehicles.map((vehicle) => {
                    const price = calculatedPrices?.[vehicle.id] || 0;

                    return (
                        <div
                            key={vehicle.id}
                            className={`vehicle-card-horizontal ${selectedVehicle?.id === vehicle.id ? 'selected' : ''}`}
                            onClick={() => onSelectVehicle(vehicle)}
                        >
                            <div className="vehicle-image-section">
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        console.warn(`Failed to load image: ${vehicle.image}`);
                                    }}
                                />
                            </div>

                            <div className="vehicle-info-section">
                                <div className="vehicle-header-row">
                                    <div>
                                        <h3>{vehicle.name}</h3>
                                        {vehicle.premium && <span className="premium-badge">PREMIUM</span>}
                                    </div>
                                </div>

                                <div className="vehicle-meta">
                                    <span>→ {distance ? `${Math.round(distance * 1.2)}min` : '18min'} - {distance ? `${distance.toFixed(1)}mi` : '9.8mi'}</span>
                                </div>

                                <div className="vehicle-capacity">
                                    <div className="capacity-item">
                                        <span className="icon">👥</span>
                                        <span>{vehicle.passengers}</span>
                                        <span className="label">Passengers</span>
                                    </div>
                                    <div className="capacity-item">
                                        <span className="icon">💼</span>
                                        <span>{vehicle.suitcases}</span>
                                        <span className="label">Suitcases</span>
                                    </div>
                                    <div className="capacity-item">
                                        <span className="icon">👜</span>
                                        <span>{vehicle.handbags}</span>
                                        <span className="label">Handbags</span>
                                    </div>
                                </div>
                            </div>

                            <div className="vehicle-price-section">
                                <div className="price-display">
                                    £{price.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VehicleSelection;
