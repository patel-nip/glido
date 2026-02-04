// src/components/DateTimePicker.js
import React, { useState, useEffect, useRef } from 'react';
import './DateTimePicker.css';

const DateTimePicker = ({ isOpen, onClose, onSelect, minHoursFromNow = 3, initialDate = null }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(4);
  const [selectedMinute, setSelectedMinute] = useState(0);
  
  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);

  // Generate hours array (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // Generate minutes array (0, 5, 10, 15, ..., 55)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      now.setHours(now.getHours() + minHoursFromNow);
      
      if (initialDate) {
        setSelectedDate(new Date(initialDate));
        setSelectedHour(initialDate.getHours());
        setSelectedMinute(Math.floor(initialDate.getMinutes() / 5) * 5);
      } else {
        setSelectedDate(now);
        setSelectedHour(now.getHours());
        setSelectedMinute(Math.floor(now.getMinutes() / 5) * 5);
      }
      setCurrentMonth(initialDate || now);
    }
  }, [isOpen, initialDate, minHoursFromNow]);

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

  const getMinDateTime = () => {
    const minTime = new Date();
    minTime.setHours(minTime.getHours() + minHoursFromNow);
    return minTime;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    const minDate = getMinDateTime();
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const minDateOnly = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    return dateOnly < minDateOnly;
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isToday = (date) => {
    return isSameDay(date, new Date());
  };

  const handleDateClick = (date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleOk = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    const finalDateTime = new Date(selectedDate);
    finalDateTime.setHours(selectedHour);
    finalDateTime.setMinutes(selectedMinute);
    finalDateTime.setSeconds(0);
    finalDateTime.setMilliseconds(0);

    const minDateTime = getMinDateTime();
    if (finalDateTime < minDateTime) {
      alert(`Booking must be at least ${minHoursFromNow} hours from now`);
      return;
    }

    onSelect(finalDateTime);
    onClose();
  };

  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const dayNames = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  return (
    <div className="datetime-picker-overlay" onClick={onClose}>
      <div className="datetime-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="datetime-picker-header">
          <span className="calendar-icon">📅</span>
          <h3>Select Date & Time (Minimum {minHoursFromNow} hours from now)</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="datetime-picker-content">
          <div className="date-section">
            <label>PICK DATE</label>
            
            <div className="calendar-header">
              <button type="button" onClick={handlePrevMonth} className="nav-btn">‹</button>
              <span className="current-month">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button type="button" onClick={handleNextMonth} className="nav-btn">›</button>
            </div>

            <div className="calendar-grid">
              {dayNames.map(day => (
                <div key={day} className="day-name">{day}</div>
              ))}
              {getDaysInMonth(currentMonth).map((date, index) => (
                <div
                  key={index}
                  className={`calendar-day ${!date ? 'empty' : ''} 
                    ${isDateDisabled(date) ? 'disabled' : ''} 
                    ${isSameDay(date, selectedDate) ? 'selected' : ''}
                    ${isToday(date) ? 'today' : ''}`}
                  onClick={() => date && handleDateClick(date)}
                >
                  {date ? date.getDate() : ''}
                </div>
              ))}
            </div>
          </div>

          <div className="time-section">
            <label>PICK TIME (24-HOUR FORMAT)</label>
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
        </div>

        <button className="ok-btn" onClick={handleOk}>OK</button>
      </div>
    </div>
  );
};

export default DateTimePicker;
