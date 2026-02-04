// src/components/TimeOnlyPicker.js
import React, { useState, useEffect, useRef } from 'react';
import './TimeOnlyPicker.css';

const TimeOnlyPicker = ({ isOpen, onClose, onSelect, initialTime = null }) => {
    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState(0);

    const hourScrollRef = useRef(null);
    const minuteScrollRef = useRef(null);

    // Generate hours array (0-23)
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // Generate minutes array (0, 5, 10, 15, ..., 55)
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

    useEffect(() => {
        if (isOpen && initialTime) {
            const [hours, minutes] = initialTime.split(':');
            setSelectedHour(parseInt(hours));
            setSelectedMinute(parseInt(minutes));
        }
    }, [isOpen, initialTime]);

    useEffect(() => {
        // Scroll to selected hour
        if (hourScrollRef.current && isOpen) {
            const selectedElement = hourScrollRef.current.querySelector('.time-option.selected');
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
        }
    }, [selectedHour, isOpen]);

    useEffect(() => {
        // Scroll to selected minute
        if (minuteScrollRef.current && isOpen) {
            const selectedElement = minuteScrollRef.current.querySelector('.time-option.selected');
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
        }
    }, [selectedMinute, isOpen]);

    if (!isOpen) return null;

    const handleOk = () => {
        const timeString = `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`;
        onSelect(timeString);
        onClose();
    };

    return (
        <div className="timeonly-picker-overlay" onClick={onClose}>
            <div className="timeonly-picker-modal" onClick={(e) => e.stopPropagation()}>
                <div className="timeonly-picker-header">
                    <span className="clock-icon">🕐</span>
                    <h3>Select Time (24-Hour Format)</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="timeonly-picker-content">
                    <div className="time-scrollers">
                        <div className="time-scroller-group">
                            <label className="time-label">Hour</label>
                            <div className="time-scroller" ref={hourScrollRef}>
                                {hours.map((hour) => (
                                    <div
                                        key={hour}
                                        className={`time-option ${selectedHour === hour ? 'selected' : ''}`}
                                        onClick={() => setSelectedHour(hour)}
                                    >
                                        {String(hour).padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="time-scroller-group">
                            <label className="time-label">Minute</label>
                            <div className="time-scroller" ref={minuteScrollRef}>
                                {minutes.map((minute) => (
                                    <div
                                        key={minute}
                                        className={`time-option ${selectedMinute === minute ? 'selected' : ''}`}
                                        onClick={() => setSelectedMinute(minute)}
                                    >
                                        {String(minute).padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <button className="ok-btn" onClick={handleOk}>OK</button>
            </div>
        </div>
    );
};

export default TimeOnlyPicker;
