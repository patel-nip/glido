import React, { useState } from 'react';
import './TrackBooking.css';

const TrackBooking = () => {
    const [trackingData, setTrackingData] = useState({
        bookingId: '',
        passengerName: ''
    });
    const [bookingInfo, setBookingInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTrackingData({
            ...trackingData,
            [name]: value
        });
    };

    const handleTrackBooking = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setBookingInfo(null);

        try {
            const response = await fetch(
                `http://localhost:5000/api/bookings/track?bookingId=${trackingData.bookingId}&passengerName=${encodeURIComponent(trackingData.passengerName)}`
            );

            const data = await response.json();

            if (response.ok) {
                setBookingInfo(data);
            } else {
                setError(data.message || 'Booking not found. Please check your details.');
            }
        } catch (error) {
            console.error('Error tracking booking:', error);
            setError('Unable to track booking. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return '#4CAF50';
            case 'pending':
                return '#FFA500';
            case 'completed':
                return '#2196F3';
            case 'cancelled':
                return '#f44336';
            default:
                return '#666';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return '✓';
            case 'pending':
                return '⏳';
            case 'completed':
                return '✓';
            case 'cancelled':
                return '✕';
            default:
                return '•';
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="track-booking-page">
            <div className="track-container">
                <div className="track-header">
                    <h1>Track Your Booking</h1>
                    <p>Enter your booking details to track your journey</p>
                </div>

                <form onSubmit={handleTrackBooking} className="track-form">
                    <div className="form-group">
                        <label>Booking ID *</label>
                        <input
                            type="text"
                            name="bookingId"
                            value={trackingData.bookingId}
                            onChange={handleInputChange}
                            placeholder="e.g., GLIDO-12345"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Passenger Name *</label>
                        <input
                            type="text"
                            name="passengerName"
                            value={trackingData.passengerName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="track-btn" disabled={loading}>
                        {loading ? 'TRACKING...' : 'TRACK BOOKING'}
                    </button>
                </form>

                {bookingInfo && (
                    <div className="booking-details">
                        <div className="details-header">
                            <h2>Booking Details</h2>
                            <div
                                className="status-badge"
                                style={{ background: getStatusColor(bookingInfo.booking_status) }}
                            >
                                <span className="status-icon">{getStatusIcon(bookingInfo.booking_status)}</span>
                                {bookingInfo.booking_status?.toUpperCase()}
                            </div>
                        </div>

                        <div className="details-grid">
                            {/* Journey Information */}
                            <div className="detail-card">
                                <h3>
                                    <span className="card-icon">🚗</span>
                                    Journey Information
                                </h3>
                                <div className="detail-item">
                                    <label>Booking ID:</label>
                                    <span className="detail-value">#{bookingInfo.id}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Trip Type:</label>
                                    <span className="detail-value">
                                        {bookingInfo.tripType === 'round' ? 'Round Trip' : 'One Way'}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <label>Pickup Location:</label>
                                    <span className="detail-value">{bookingInfo.outboundPickup}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Dropoff Location:</label>
                                    <span className="detail-value">{bookingInfo.outboundDropoff}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Date & Time:</label>
                                    <span className="detail-value">
                                        {formatDateTime(bookingInfo.outboundDateTime)}
                                    </span>
                                </div>
                                {bookingInfo.outboundDistance && (
                                    <div className="detail-item">
                                        <label>Distance:</label>
                                        <span className="detail-value">
                                            {bookingInfo.outboundDistance.toFixed(1)} miles
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Passenger Information */}
                            <div className="detail-card">
                                <h3>
                                    <span className="card-icon">👤</span>
                                    Passenger Information
                                </h3>
                                <div className="detail-item">
                                    <label>Name:</label>
                                    <span className="detail-value">{bookingInfo.passengerName}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Phone:</label>
                                    <span className="detail-value">{bookingInfo.passengerPhone}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Email:</label>
                                    <span className="detail-value">{bookingInfo.passengerEmail}</span>
                                </div>
                                {bookingInfo.flightNumber && (
                                    <div className="detail-item">
                                        <label>Flight/Train Number:</label>
                                        <span className="detail-value">{bookingInfo.flightNumber}</span>
                                    </div>
                                )}
                                {bookingInfo.arrivalTime && (
                                    <div className="detail-item">
                                        <label>Arrival Time:</label>
                                        <span className="detail-value">{bookingInfo.arrivalTime}</span>
                                    </div>
                                )}
                            </div>

                            {/* Vehicle & Driver Information */}
                            <div className="detail-card">
                                <h3>
                                    <span className="card-icon">🚙</span>
                                    Vehicle & Driver
                                </h3>
                                {bookingInfo.selectedVehicle ? (
                                    <>
                                        <div className="detail-item">
                                            <label>Vehicle Type:</label>
                                            <span className="detail-value">
                                                {bookingInfo.selectedVehicle.name || 'Standard Sedan'}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Passengers:</label>
                                            <span className="detail-value">
                                                {bookingInfo.selectedVehicle.passengers || 4} passengers
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="detail-item">
                                        <label>Vehicle:</label>
                                        <span className="detail-value">To be assigned</span>
                                    </div>
                                )}

                                {bookingInfo.driver ? (
                                    <>
                                        <div className="detail-item">
                                            <label>Driver Name:</label>
                                            <span className="detail-value">{bookingInfo.driver.name}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Driver Phone:</label>
                                            <span className="detail-value">{bookingInfo.driver.phone}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Vehicle Number:</label>
                                            <span className="detail-value">{bookingInfo.driver.vehicleNumber}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="detail-item pending-assignment">
                                        <p>Driver will be assigned 24 hours before pickup time</p>
                                    </div>
                                )}

                                {bookingInfo.childSeats && (
                                    <div className="detail-item">
                                        <label>Child Seats:</label>
                                        <span className="detail-value">
                                            {bookingInfo.childSeatsCount || 1} seat(s)
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Pricing Information */}
                            <div className="detail-card">
                                <h3>
                                    <span className="card-icon">💰</span>
                                    Pricing
                                </h3>
                                {bookingInfo.basePrice && (
                                    <div className="detail-item">
                                        <label>Base Price:</label>
                                        <span className="detail-value">£{bookingInfo.basePrice.toFixed(2)}</span>
                                    </div>
                                )}
                                {bookingInfo.childSeatsPrice > 0 && (
                                    <div className="detail-item">
                                        <label>Child Seats:</label>
                                        <span className="detail-value">£{bookingInfo.childSeatsPrice.toFixed(2)}</span>
                                    </div>
                                )}
                                {bookingInfo.totalPrice && (
                                    <div className="detail-item total-price">
                                        <label>Total Amount:</label>
                                        <span className="detail-value price-highlight">
                                            £{bookingInfo.totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {bookingInfo.specialRequests && (
                            <div className="special-requests">
                                <h3>
                                    <span className="card-icon">💬</span>
                                    Special Requests
                                </h3>
                                <p>{bookingInfo.specialRequests}</p>
                            </div>
                        )}

                        <div className="contact-support">
                            <p>Need to modify or cancel your booking?</p>
                            <a href="tel:+442036575772" className="support-btn">
                                📞 Contact Support: +44 20 3657 5772
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackBooking;
