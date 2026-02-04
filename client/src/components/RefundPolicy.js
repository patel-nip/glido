import React from 'react';
import './RefundPolicy.css';

const RefundPolicy = () => {
    return (
        <div className="refund-page">
            <div className="refund-container">
                <h1 className="refund-title">
                    REFUND & <span className="highlight">CANCELLATION POLICY</span>
                </h1>

                <p className="refund-intro">
                    This Refund and Cancellation Policy applies to all journeys and bookings made with{' '}
                    <span className="highlight">GLIDO LTD</span>.
                </p>

                {/* Section 1 */}
                <section className="refund-section">
                    <h2>1. Customer Cancellations</h2>

                    <h3>Cancellations made less than 2 hours before the scheduled journey start time</h3>
                    <p>
                        If a booking is cancelled within 2 hours of the scheduled pickup or start time, no refund will be issued and full payment will be charged. This is due to operational costs, driver allocation, and loss of availability.
                    </p>

                    <h3>Cancellations made more than 2 hours before the scheduled journey start time</h3>
                    <p>
                        If a booking is cancelled more than 2 hours prior to the scheduled start time, a partial refund may be issued at our discretion. The refunded amount may take into account:
                    </p>
                    <ul>
                        <li>Administrative and processing costs</li>
                        <li>Driver preparation or dispatch costs</li>
                        <li>Any non-recoverable expenses already incurred</li>
                    </ul>
                    <p>A cancellation fee may therefore apply.</p>
                </section>

                {/* Section 2 */}
                <section className="refund-section">
                    <h2>2. No-Shows</h2>
                    <p>
                        No-shows (failure to be present at the agreed pickup location at the scheduled time without prior notice) will be considered a late cancellation and no refund will be provided.
                    </p>
                    <p>
                        If the customer cannot be contacted after a reasonable waiting period, the journey will be marked as completed and full payment will apply.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="refund-section">
                    <h2>3. Exceptional Circumstances</h2>
                    <p>
                        In certain cases involving unforeseen circumstances such as severe weather, road closures, or other unavoidable events, partial refunds may be considered at our discretion. Supporting evidence may be requested.
                    </p>
                </section>

                {/* Section 4 */}
                <section className="refund-section">
                    <h2>4. Refund Processing</h2>
                    <p>
                        Any approved refunds will be issued via the original payment method used at the time of booking.
                    </p>
                    <p>
                        Refunds are typically processed within <strong>5–10 business days</strong>, depending on the payment provider.
                    </p>
                </section>

                {/* Section 5 */}
                <section className="refund-section">
                    <h2>5. Company Cancellations</h2>
                    <p>
                        If <span className="highlight">GLIDO LTD</span> cancels a journey due to operational reasons, the customer will be offered either:
                    </p>
                    <ul>
                        <li>A full refund, or</li>
                        <li>An alternative journey at no additional cost</li>
                    </ul>
                </section>

                {/* Section 6 */}
                <section className="refund-section">
                    <h2>6. Acceptance of Policy</h2>
                    <p>
                        By making a booking with <span className="highlight">GLIDO LTD</span>, the customer confirms that they have read, understood, and agreed to this Refund and Cancellation Policy.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default RefundPolicy;
