import React, { useState } from 'react';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = '442036575772'; // +44 20 3657 5772 without spaces and +

    const handleClick = () => {
        const message = encodeURIComponent('Hello! I would like to inquire about your services.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="whatsapp-widget">
            <button
                className="whatsapp-button"
                onClick={handleClick}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                aria-label="Chat on WhatsApp"
            >
                <svg
                    viewBox="0 0 32 32"
                    width="32"
                    height="32"
                    fill="white"
                >
                    <path d="M16 0C7.164 0 0 7.164 0 16c0 2.829.745 5.496 2.04 7.814L0 32l8.36-2.196A15.931 15.931 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm8.244 22.784c-.355.997-1.764 1.83-2.884 2.068-.752.16-1.733.286-5.038-.996-4.229-1.638-6.962-5.924-7.172-6.197-.21-.273-1.714-2.28-1.714-4.347s1.084-3.084 1.469-3.506c.385-.422.84-.527 1.12-.527.28 0 .56.001.805.015.258.013.604-.098.944.72.355.853 1.204 2.936 1.309 3.148.105.212.175.458.035.731-.14.273-.21.442-.42.682-.21.24-.442.535-.63.718-.21.21-.428.436-.183.856.245.42 1.089 1.795 2.338 2.908 1.607 1.433 2.962 1.878 3.382 2.09.42.212.665.175.91-.105.245-.28 1.05-1.225 1.33-1.645.28-.42.56-.35.945-.21.385.14 2.447 1.155 2.867 1.365.42.21.7.315.805.49.105.175.105 1.015-.25 2.012z" />
                </svg>

                {isOpen && (
                    <div className="whatsapp-tooltip">
                        Chat with us!
                    </div>
                )}
            </button>
        </div>
    );
};

export default WhatsAppWidget;
