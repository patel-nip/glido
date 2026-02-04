// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Booking API
export const bookingAPI = {
    createBooking: async (bookingData) => {
        try {
            const response = await api.post('/bookings', bookingData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create booking' };
        }
    },

    getBooking: async (bookingId) => {
        try {
            const response = await api.get(`/bookings/${bookingId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch booking' };
        }
    },
};

export default api;
