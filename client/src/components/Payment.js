// src/components/Payment.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state?.bookingData;

    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [selectedPaymentType, setSelectedPaymentType] = useState('card');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    useEffect(() => {
        // Redirect if no booking data
        if (!bookingData) {
            navigate('/booking/initiate');
        }
    }, [bookingData, navigate]);

    if (!bookingData) {
        return null;
    }

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cardNumber') {
            // Format card number with spaces
            const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            setCardDetails({ ...cardDetails, [name]: formatted.slice(0, 19) });
        } else if (name === 'expiryDate') {
            // Format MM / YY
            let formatted = value.replace(/\D/g, '');
            if (formatted.length >= 2) {
                formatted = formatted.slice(0, 2) + ' / ' + formatted.slice(2, 4);
            }
            setCardDetails({ ...cardDetails, [name]: formatted });
        } else if (name === 'cvv') {
            setCardDetails({ ...cardDetails, [name]: value.replace(/\D/g, '').slice(0, 4) });
        } else {
            setCardDetails({ ...cardDetails, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agreeTerms) {
            alert('Please agree to the Terms & Conditions');
            return;
        }

        if (paymentMethod === 'online' && selectedPaymentType === 'card') {
            if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
                alert('Please fill in all card details');
                return;
            }
        }

        // TODO: Process payment when Stripe is integrated
        // For now, just save the booking

        alert('Payment method selected! In production, this will process the payment via Stripe.');

        // TODO: Save booking to Firebase/Firestore
        console.log('Booking Data:', bookingData);
        console.log('Payment Method:', paymentMethod);
        console.log('Payment Type:', selectedPaymentType);

        // Navigate to success page (you can create this later)
        navigate('/booking-success');
    };

    const formatDateTime = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Calculate price (placeholder - will be dynamic based on vehicle selection)
    const basePrice = 47.62;
    const totalPrice = basePrice;

    return (
        <div className="payment-page">
            <div className="payment-container">
                <div className="payment-main">
                    <h1>Select Payment Method</h1>

                    {/* Pay with Cash */}
                    <div
                        className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('cash')}
                    >
                        <div className="option-icon cash-icon">💵</div>
                        <div className="option-content">
                            <h3>Pay with Cash</h3>
                            <p>Cash payments must be made in full to the driver before the journey begins</p>
                        </div>
                    </div>

                    {/* Pay Online */}
                    <div
                        className={`payment-option pay-online ${paymentMethod === 'online' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('online')}
                    >
                        <div className="option-icon card-icon">💳</div>
                        <div className="option-content">
                            <h3>Pay Online</h3>
                            <p>Secure payment with Credit/Debit Card</p>
                            <div className="payment-logos">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Google_Pay_Logo.svg" alt="Google Pay" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" />
                                <span className="checkmark">✓</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods (shown when Pay Online is selected) */}
                    {paymentMethod === 'online' && (
                        <div className="payment-methods-section">
                            <h2>💳 Payment Methods</h2>

                            <label className="payment-method-option">
                                <input
                                    type="radio"
                                    name="paymentType"
                                    value="card"
                                    checked={selectedPaymentType === 'card'}
                                    onChange={(e) => setSelectedPaymentType(e.target.value)}
                                />
                                <span className="radio-icon">💳</span>
                                <span>Credit/Debit Card</span>
                                <div className="card-logos-small">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" />
                                </div>
                            </label>

                            <label className="payment-method-option">
                                <input
                                    type="radio"
                                    name="paymentType"
                                    value="paypal"
                                    checked={selectedPaymentType === 'paypal'}
                                    onChange={(e) => setSelectedPaymentType(e.target.value)}
                                />
                                <span className="radio-icon">🅿️</span>
                                <span>PayPal</span>
                            </label>

                            {/* Card Details Form */}
                            {selectedPaymentType === 'card' && (
                                <div className="card-details-form">
                                    <h2>Card Details</h2>

                                    <div className="form-group">
                                        <label>Card Number</label>
                                        <div className="card-input-wrapper">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                placeholder="1234 1234 1234 1234"
                                                value={cardDetails.cardNumber}
                                                onChange={handleCardInputChange}
                                            />
                                            <div className="card-security-badges">
                                                <span className="badge">🔒 link</span>
                                                <span className="badge visa-secure">Visa 3409</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                placeholder="MM / YY"
                                                value={cardDetails.expiryDate}
                                                onChange={handleCardInputChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>CVV</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                placeholder="CVC"
                                                value={cardDetails.cvv}
                                                onChange={handleCardInputChange}
                                            />
                                        </div>
                                    </div>

                                    <p className="privacy-notice">
                                        Your personal data will be used to process your order and for other purposes described in our{' '}
                                        <a href="/privacy" target="_blank">privacy policy</a>.
                                    </p>

                                    <label className="terms-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                        />
                                        <span>
                                            I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> and{' '}
                                            <a href="/privacy" target="_blank">Privacy Policy</a>
                                        </span>
                                    </label>

                                    <button
                                        type="button"
                                        className="accept-terms-btn"
                                        onClick={handleSubmit}
                                        disabled={!agreeTerms}
                                    >
                                        <span className="btn-icon">👍</span>
                                        Accept Terms & Conditions
                                    </button>

                                    <p className="ssl-notice">
                                        🔒 Secure checkout powered by SSL encryption
                                    </p>
                                </div>
                            )}

                            {/* PayPal Payment (placeholder) */}
                            {selectedPaymentType === 'paypal' && (
                                <div className="paypal-section">
                                    <p>You will be redirected to PayPal to complete your payment.</p>
                                    <button
                                        type="button"
                                        className="paypal-btn"
                                        onClick={handleSubmit}
                                    >
                                        Continue to PayPal
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Cash Payment Submit */}
                    {paymentMethod === 'cash' && (
                        <div className="cash-payment-section">
                            <label className="terms-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                />
                                <span>
                                    I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> and{' '}
                                    <a href="/privacy" target="_blank">Privacy Policy</a>
                                </span>
                            </label>

                            <button
                                type="button"
                                className="confirm-booking-btn"
                                onClick={handleSubmit}
                                disabled={!agreeTerms}
                            >
                                Confirm Booking (Pay Cash on Arrival)
                            </button>
                        </div>
                    )}
                </div>

                {/* Booking Summary Sidebar */}
                <aside className="booking-summary">
                    <div className="summary-header">
                        <h3>Booking Summary</h3>
                        <button className="edit-btn" onClick={() => navigate('/booking/initiate', { state: { bookingData } })}>
                            Edit
                        </button>
                    </div>

                    <div className="summary-section">
                        <label>FROM</label>
                        <p>{bookingData.outboundPickup || 'Not specified'}</p>
                    </div>

                    <div className="summary-section">
                        <label>TO</label>
                        <p>{bookingData.outboundDropoff || 'Not specified'}</p>
                    </div>

                    <div className="summary-section">
                        <label>DATE & TIME</label>
                        <p>{formatDateTime(bookingData.outboundDateTime)}</p>
                    </div>

                    <div className="summary-section">
                        <label>VEHICLE</label>
                        <p>Saloon</p>
                        <div className="vehicle-details">
                            <span>👥 4 seats</span>
                            <span>• 💼 1 Suitcase</span>
                            <span>• 👜 3 Handbags</span>
                        </div>
                    </div>

                    <div className="summary-section">
                        <label>PASSENGER</label>
                        <p>{bookingData.passengerName}</p>
                        <p className="contact-info">{bookingData.passengerEmail}</p>
                        <p className="contact-info">{bookingData.passengerPhone}</p>
                    </div>

                    <div className="price-breakdown">
                        <div className="price-row">
                            <span>Outbound Trip</span>
                            <span>£{basePrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="total-price">
                        <span>Total</span>
                        <span className="amount">£{totalPrice.toFixed(2)}</span>
                    </div>

                    <p className="tax-notice">Includes all taxes and fees</p>

                    <div className="cancellation-policy">
                        <span className="check-icon">✓</span>
                        Free cancellation up to 2 hours before pickup
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Payment;
