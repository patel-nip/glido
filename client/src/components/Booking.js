// src/components/Booking.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DateTimePicker from './DateTimePicker';
import TimeOnlyPicker from './TimeOnlyPicker';
import VehicleSelection from './VehicleSelection';
import { calculateDistance } from '../services/osrmService';
import { calculateAllVehiclePrices, extractPostcode } from '../utils/pricingCalculator';
import LocationPicker from './LocationPicker';
import './Booking.css';

const Booking = () => {
    const navigate = useNavigate();
    const [tripType, setTripType] = useState('oneway');
    const [showOutboundPicker, setShowOutboundPicker] = useState(false);
    const [showReturnPicker, setShowReturnPicker] = useState(false);
    const [showArrivalTimePicker, setShowArrivalTimePicker] = useState(false);

    // Location states
    const [outboundPickupDetails, setOutboundPickupDetails] = useState(null);
    const [outboundDropoffDetails, setOutboundDropoffDetails] = useState(null);
    const [returnPickupDetails, setReturnPickupDetails] = useState(null);
    const [returnDropoffDetails, setReturnDropoffDetails] = useState(null);

    // Distance and pricing
    const [outboundDistance, setOutboundDistance] = useState(null);
    const [returnDistance, setReturnDistance] = useState(null);
    const [calculatedPrices, setCalculatedPrices] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const [formData, setFormData] = useState({
        outboundPickup: '',
        outboundDropoff: '',
        outboundDateTime: null,
        returnPickup: '',
        returnDropoff: '',
        returnDateTime: null,
        passengerName: '',
        passengerPhone: '',
        passengerEmail: '',
        childSeats: false,
        childSeatsCount: 1,
        flightNumber: '',
        arrivalTime: '',
        specialRequests: '',
    });

    // Check if vehicle selection should be shown
    const shouldShowVehicles = () => {
        const hasOutboundLocations = formData.outboundPickup && formData.outboundDropoff;
        const hasOutboundDateTime = formData.outboundDateTime;

        if (tripType === 'round') {
            const hasReturnLocations = formData.returnPickup && formData.returnDropoff;
            const hasReturnDateTime = formData.returnDateTime;
            return hasOutboundLocations && hasOutboundDateTime && hasReturnLocations && hasReturnDateTime;
        }

        return hasOutboundLocations && hasOutboundDateTime;
    };

    useEffect(() => {
        const calculateDistanceAndPrice = async () => {
            if (!outboundPickupDetails || !outboundDropoffDetails) return;

            setIsCalculating(true);

            try {
                // Calculate outbound distance
                const outboundResult = await calculateDistance(
                    { lat: outboundPickupDetails.lat, lng: outboundPickupDetails.lng },
                    { lat: outboundDropoffDetails.lat, lng: outboundDropoffDetails.lng }
                );

                setOutboundDistance(outboundResult.distance);

                let totalDistance = outboundResult.distance;

                // Calculate return distance if round trip
                if (tripType === 'round' && returnPickupDetails && returnDropoffDetails) {
                    const returnResult = await calculateDistance(
                        { lat: returnPickupDetails.lat, lng: returnPickupDetails.lng },
                        { lat: returnDropoffDetails.lat, lng: returnDropoffDetails.lng }
                    );
                    setReturnDistance(returnResult.distance);
                    totalDistance += returnResult.distance;
                }

                // Calculate prices for all vehicles
                const prices = calculateAllVehiclePrices({
                    distanceMiles: totalDistance,
                    pickupPostcode: outboundPickupDetails.postcode || extractPostcode(formData.outboundPickup),
                    dropoffPostcode: outboundDropoffDetails.postcode || extractPostcode(formData.outboundDropoff),
                    bookingDate: formData.outboundDateTime,
                    surgeMultiplier: 1.0,
                    isRoundTrip: tripType === 'round'
                });

                setCalculatedPrices(prices);

            } catch (error) {
                console.error('Error calculating distance:', error);
                alert('Could not calculate distance. Please check the addresses.');
            } finally {
                setIsCalculating(false);
            }
        };

        if (shouldShowVehicles()) {
            calculateDistanceAndPrice();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [outboundPickupDetails, outboundDropoffDetails, returnPickupDetails, returnDropoffDetails, tripType, formData.outboundDateTime, formData.outboundPickup, formData.outboundDropoff]);


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleOutboundDateSelect = (date) => {
        setFormData({
            ...formData,
            outboundDateTime: date
        });
    };

    const handleReturnDateSelect = (date) => {
        setFormData({
            ...formData,
            returnDateTime: date
        });
    };

    const handleArrivalTimeSelect = (time) => {
        setFormData({
            ...formData,
            arrivalTime: time
        });
    };

    const handleVehicleSelect = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        if (!formData.outboundDateTime) {
            alert('Please select outbound date and time');
            return;
        }

        if (tripType === 'round' && !formData.returnDateTime) {
            alert('Please select return date and time');
            return;
        }

        if (!selectedVehicle) {
            alert('Please select a vehicle');
            return;
        }

        if (!formData.flightNumber) {
            alert('Please enter flight/train number');
            return;
        }

        if (!formData.arrivalTime) {
            alert('Please select arrival/departure time');
            return;
        }

        // Calculate final price including child seats
        const basePrice = calculatedPrices[selectedVehicle.id];
        const childSeatsPrice = formData.childSeats ? (formData.childSeatsCount || 0) * 10 : 0;
        const finalTotalPrice = basePrice + childSeatsPrice;

        const bookingData = {
            tripType: tripType,
            outboundPickup: formData.outboundPickup,
            outboundDropoff: formData.outboundDropoff,
            outboundDateTime: formData.outboundDateTime?.toISOString(),
            outboundDistance: outboundDistance,
            returnPickup: formData.returnPickup || null,
            returnDropoff: formData.returnDropoff || null,
            returnDateTime: formData.returnDateTime?.toISOString() || null,
            returnDistance: returnDistance || null,
            passengerName: formData.passengerName,
            passengerPhone: formData.passengerPhone,
            passengerEmail: formData.passengerEmail,
            flightNumber: formData.flightNumber,
            arrivalTime: formData.arrivalTime,
            childSeats: formData.childSeats,
            childSeatsCount: formData.childSeatsCount || 0,
            specialRequests: formData.specialRequests || '',
            selectedVehicle: selectedVehicle,
            basePrice: basePrice,
            childSeatsPrice: childSeatsPrice,
            totalPrice: finalTotalPrice
        };

        // Navigate to payment page
        navigate('/payment', {
            state: { bookingData }
        });
    };


    const formatDateTime = (date) => {
        if (!date) return 'Select date & time';
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="booking-page">
            <div className="booking-container">
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="booking-main">
                        {/* Journey Details */}
                        <section className="journey-details-section">
                            <div className="section-header">
                                <h2>JOURNEY DETAILS</h2>
                                <span className="round-trip-discount">Save 10% on Round Trips</span>
                            </div>

                            <div className="trip-type-buttons">
                                <button
                                    type="button"
                                    className={`trip-btn ${tripType === 'oneway' ? 'active' : ''}`}
                                    onClick={() => setTripType('oneway')}
                                >
                                    → ONE WAY
                                </button>
                                <button
                                    type="button"
                                    className={`trip-btn ${tripType === 'round' ? 'active' : ''}`}
                                    onClick={() => setTripType('round')}
                                >
                                    ⇄ ROUND TRIP
                                </button>
                            </div>

                            {/* Outbound Section */}
                            <div className="journey-section">
                                <div className="section-title">
                                    <span className="icon">✈️</span>
                                    <span>OUTBOUND</span>
                                </div>

                                <LocationPicker
                                    label="PICK UP"
                                    onLocationSelect={(location) => {
                                        setFormData({ ...formData, outboundPickup: location.address });
                                        setOutboundPickupDetails({
                                            address: location.address,
                                            lat: location.lat,
                                            lng: location.lng,
                                            postcode: extractPostcode(location.address)
                                        });
                                    }}
                                />

                                <LocationPicker
                                    label="DROP OFF"
                                    onLocationSelect={(location) => {
                                        setFormData({ ...formData, outboundDropoff: location.address });
                                        setOutboundDropoffDetails({
                                            address: location.address,
                                            lat: location.lat,
                                            lng: location.lng,
                                            postcode: extractPostcode(location.address)
                                        });
                                    }}
                                />

                                <div className="form-group">
                                    <label>DATE & TIME *</label>
                                    <div
                                        className="datetime-display"
                                        onClick={() => setShowOutboundPicker(true)}
                                    >
                                        {formatDateTime(formData.outboundDateTime)}
                                    </div>
                                </div>

                                <div className="info-notes">
                                    <p className="note">
                                        <span className="note-icon">ℹ️</span>
                                        Bookings must be made at least <strong>3 hours</strong> in advance.
                                    </p>
                                </div>
                            </div>

                            {/* Return Section */}
                            {tripType === 'round' && (
                                <div className="journey-section">
                                    <div className="section-title">
                                        <span className="icon">✈️</span>
                                        <span>RETURN</span>
                                    </div>

                                    <LocationPicker
                                        label="PICK UP"
                                        onLocationSelect={(location) => {
                                            setFormData({ ...formData, returnPickup: location.address });
                                            setReturnPickupDetails({
                                                address: location.address,
                                                lat: location.lat,
                                                lng: location.lng,
                                                postcode: extractPostcode(location.address)
                                            });
                                        }}
                                    />

                                    <LocationPicker
                                        label="DROP OFF"
                                        onLocationSelect={(location) => {
                                            setFormData({ ...formData, returnDropoff: location.address });
                                            setReturnDropoffDetails({
                                                address: location.address,
                                                lat: location.lat,
                                                lng: location.lng,
                                                postcode: extractPostcode(location.address)
                                            });
                                        }}
                                    />

                                    <div className="form-group">
                                        <label>RETURN DATE & TIME *</label>
                                        <div
                                            className="datetime-display"
                                            onClick={() => setShowReturnPicker(true)}
                                        >
                                            {formatDateTime(formData.returnDateTime)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Vehicle Selection - Only show when destinations and dates are selected */}
                        {shouldShowVehicles() && (
                            <>
                                {isCalculating ? (
                                    <div className="calculating-message">
                                        <div className="spinner">⏳</div>
                                        <p>Calculating distance and prices...</p>
                                    </div>
                                ) : (
                                    <VehicleSelection
                                        selectedVehicle={selectedVehicle}
                                        onSelectVehicle={handleVehicleSelect}
                                        distance={outboundDistance}
                                        calculatedPrices={calculatedPrices}
                                    />
                                )}
                            </>
                        )}

                        {/* Passenger Details */}
                        <section className="passenger-section">
                            <h2>PASSENGER DETAILS</h2>

                            <div className="subsection">
                                <h3>
                                    <span className="icon">👤</span>
                                    Contact Information
                                </h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>PASSENGER NAME *</label>
                                        <input
                                            type="text"
                                            name="passengerName"
                                            placeholder="John Doe"
                                            value={formData.passengerName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>PHONE *</label>
                                        <input
                                            type="tel"
                                            name="passengerPhone"
                                            placeholder="+44 7XXX XXXXXX"
                                            value={formData.passengerPhone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>EMAIL *</label>
                                    <input
                                        type="email"
                                        name="passengerEmail"
                                        placeholder="john@example.com"
                                        value={formData.passengerEmail}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="subsection">
                                <h3>
                                    <span className="icon">🧸</span>
                                    Child Seats
                                </h3>

                                <div className="child-seats-control">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="childSeats"
                                            checked={formData.childSeats}
                                            onChange={handleInputChange}
                                        />
                                        <span>Required</span>
                                    </label>

                                    {formData.childSeats && (
                                        <div className="child-seats-quantity">
                                            <input
                                                type="number"
                                                name="childSeatsCount"
                                                min="1"
                                                max="8"
                                                value={formData.childSeatsCount || 1}
                                                onChange={handleInputChange}
                                                className="seats-number-input"
                                            />
                                        </div>
                                    )}
                                </div>

                                <p className="extra-charge">£10 extra per child seat</p>

                                {formData.childSeats && formData.childSeatsCount && (
                                    <p className="child-seats-total">
                                        Total: £{(formData.childSeatsCount * 10).toFixed(2)}
                                    </p>
                                )}
                            </div>


                            <div className="subsection">
                                <h3>
                                    <span className="icon">✈️</span>
                                    Flight Details *
                                </h3>
                                <div className="info-note">
                                    <span className="info-icon">ℹ️</span>
                                    We will monitor your flight for delays and pick you up when you land. If no flight, enter "N/A".
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>FLIGHT/TRAIN NUMBER *</label>
                                        <input
                                            type="text"
                                            name="flightNumber"
                                            placeholder="e.g. BA123 or N/A"
                                            value={formData.flightNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>ARRIVAL/DEPARTURE TIME *</label>
                                        <div
                                            className="time-display"
                                            onClick={() => setShowArrivalTimePicker(true)}
                                        >
                                            {formData.arrivalTime || 'Select time'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="subsection">
                                <h3>
                                    <span className="icon">💬</span>
                                    Special Requests (Optional)
                                </h3>
                                <textarea
                                    name="specialRequests"
                                    placeholder="e.g. Specific pickup instructions, wheelchair access, etc."
                                    value={formData.specialRequests}
                                    onChange={handleInputChange}
                                    rows="4"
                                ></textarea>
                            </div>
                        </section>
                    </div>

                    {/* Journey Summary Sidebar */}
                    <aside className="journey-summary">
                        <h3>JOURNEY SUMMARY</h3>

                        <div className="summary-item">
                            <label>TRIP TYPE</label>
                            <p>{tripType === 'oneway' ? 'One Way' : 'Round Trip (Save 10%)'}</p>
                        </div>

                        <div className="summary-item">
                            <label>OUTBOUND</label>
                            <p>{formData.outboundPickup || 'Not selected'}</p>
                            <p className="arrow">↓</p>
                            <p>{formData.outboundDropoff || 'Not selected'}</p>
                            {formData.outboundDateTime && (
                                <p className="date-time">{formatDateTime(formData.outboundDateTime)}</p>
                            )}
                            {outboundDistance && (
                                <p className="distance">📍 {outboundDistance.toFixed(1)} miles</p>
                            )}
                        </div>

                        {tripType === 'round' && (
                            <div className="summary-item">
                                <label>RETURN</label>
                                <p>{formData.returnPickup || 'Not selected'}</p>
                                <p className="arrow">↓</p>
                                <p>{formData.returnDropoff || 'Not selected'}</p>
                                {formData.returnDateTime && (
                                    <p className="date-time">{formatDateTime(formData.returnDateTime)}</p>
                                )}
                                {returnDistance && (
                                    <p className="distance">📍 {returnDistance.toFixed(1)} miles</p>
                                )}
                            </div>
                        )}

                        <div className="summary-item">
                            <label>VEHICLE</label>
                            <p>{selectedVehicle ? selectedVehicle.name : 'Not selected'}</p>
                            {selectedVehicle && (
                                <div className="vehicle-info">
                                    <span>👥 {selectedVehicle.passengers} passengers</span>
                                </div>
                            )}
                        </div>

                        <div className="summary-item">
                            <label>PASSENGER</label>
                            <p>{formData.passengerName || '-'}</p>
                            {formData.passengerPhone && <p className="contact">{formData.passengerPhone}</p>}
                        </div>

                        {/* Child Seats Summary */}
                        {formData.childSeats && formData.childSeatsCount > 0 && (
                            <div className="summary-item">
                                <label>CHILD SEATS</label>
                                <p>{formData.childSeatsCount} seat{formData.childSeatsCount > 1 ? 's' : ''}</p>
                                <p className="price-addon">+£{(formData.childSeatsCount * 10).toFixed(2)}</p>
                            </div>
                        )}

                        {/* Price Breakdown */}
                        {selectedVehicle && calculatedPrices && (
                            <div className="price-display">
                                <div className="price-row">
                                    <label>Journey price</label>
                                    <p className="price">£{calculatedPrices[selectedVehicle.id].toFixed(2)}</p>
                                </div>

                                {formData.childSeats && formData.childSeatsCount > 0 && (
                                    <div className="price-row">
                                        <label>Child seats ({formData.childSeatsCount})</label>
                                        <p className="price-addon">£{(formData.childSeatsCount * 10).toFixed(2)}</p>
                                    </div>
                                )}

                                <div className="total-divider"></div>

                                <div className="price-row total-row">
                                    <label className="total-label">Total</label>
                                    <p className="total-price">
                                        £{(
                                            calculatedPrices[selectedVehicle.id] +
                                            (formData.childSeats ? formData.childSeatsCount * 10 : 0)
                                        ).toFixed(2)}
                                    </p>
                                </div>

                                <p className="tax-info">Includes all taxes and fees</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="book-now-btn"
                            disabled={!selectedVehicle}
                        >
                            BOOK NOW
                        </button>

                        <p className="terms-text">
                            By booking you agree to our{' '}
                            <a href="/terms" target="_blank" rel="noopener noreferrer">
                                terms and conditions
                            </a>
                        </p>
                    </aside>

                </form>
            </div>

            {/* Date Time Pickers */}
            <DateTimePicker
                isOpen={showOutboundPicker}
                onClose={() => setShowOutboundPicker(false)}
                onSelect={handleOutboundDateSelect}
                minHoursFromNow={3}
                initialDate={formData.outboundDateTime}
            />

            <DateTimePicker
                isOpen={showReturnPicker}
                onClose={() => setShowReturnPicker(false)}
                onSelect={handleReturnDateSelect}
                minHoursFromNow={3}
                initialDate={formData.returnDateTime}
            />

            <TimeOnlyPicker
                isOpen={showArrivalTimePicker}
                onClose={() => setShowArrivalTimePicker(false)}
                onSelect={handleArrivalTimeSelect}
                initialTime={formData.arrivalTime}
            />
        </div>
    );
};

export default Booking;
