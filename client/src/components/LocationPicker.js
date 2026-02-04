import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LocationPicker.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map clicks
function LocationMarker({ position, setPosition, setAddress }) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);

            // Reverse geocoding to get address
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`, {
                headers: {
                    'User-Agent': 'GLIDO-App/1.0'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setAddress(data.display_name);
                })
                .catch(error => console.error('Error getting address:', error));
        },
    });

    return position ? <Marker position={position} /> : null;
}

const LocationPicker = ({ onLocationSelect, initialPosition, label }) => {
    const [position, setPosition] = useState(initialPosition || [23.0225, 72.5714]); // Ahmedabad default
    const [address, setAddress] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Live search as user types
    useEffect(() => {
        if (searchQuery.length < 3) {
            setSearchResults([]);
            setShowSuggestions(false);
            return;
        }

        const searchTimeout = setTimeout(async () => {
            setIsSearching(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`,
                    {
                        headers: {
                            'User-Agent': 'GLIDO-App/1.0'
                        }
                    }
                );
                const data = await response.json();
                setSearchResults(data);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Error searching location:', error);
            } finally {
                setIsSearching(false);
            }
        }, 500); // Debounce 500ms

        return () => clearTimeout(searchTimeout);
    }, [searchQuery]);

    const handleSearch = async (e) => {
        e.preventDefault(); // PREVENT PAGE RELOAD!

        if (!searchQuery || searchResults.length === 0) return;

        // Use first result
        const firstResult = searchResults[0];
        selectLocation(firstResult);
    };

    const selectLocation = (result) => {
        const { lat, lon, display_name } = result;
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setAddress(display_name);
        setSearchQuery('');
        setShowSuggestions(false);
        setSearchResults([]);
    };

    const handleConfirm = () => {
        onLocationSelect({
            lat: position[0],
            lng: position[1],
            address: address || `${position[0].toFixed(6)}, ${position[1].toFixed(6)}`
        });
        setIsOpen(false);
    };

    return (
        <div className="location-picker-container">
            <label>{label || 'Select Location'}</label>

            <div className="location-input-group">
                <input
                    type="text"
                    value={address || `${position[0].toFixed(6)}, ${position[1].toFixed(6)}`}
                    readOnly
                    placeholder="Click to select location on map"
                    className="location-display"
                />
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="open-map-btn"
                >
                    📍 Select on Map
                </button>
            </div>

            {isOpen && (
                <div className="map-modal">
                    <div className="map-modal-content">
                        <div className="map-modal-header">
                            <h3>{label || 'Select Location'}</h3>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="close-map-btn"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSearch} className="map-search">
                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for a location..."
                                    className="map-search-input"
                                    autoComplete="off"
                                />
                                <button type="submit" className="map-search-btn">
                                    {isSearching ? '⏳' : 'Search'}
                                </button>

                                {/* Autocomplete Suggestions Dropdown */}
                                {showSuggestions && searchResults.length > 0 && (
                                    <div className="search-suggestions">
                                        {searchResults.map((result, index) => (
                                            <div
                                                key={index}
                                                className="suggestion-item"
                                                onClick={() => selectLocation(result)}
                                            >
                                                <span className="suggestion-icon">📍</span>
                                                <span className="suggestion-text">{result.display_name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {showSuggestions && searchResults.length === 0 && !isSearching && (
                                    <div className="search-suggestions">
                                        <div className="suggestion-item no-results">
                                            No results found
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>

                        <div className="map-instructions">
                            Click anywhere on the map to select a location
                        </div>

                        <MapContainer
                            center={position}
                            zoom={13}
                            style={{ height: '400px', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker
                                position={position}
                                setPosition={setPosition}
                                setAddress={setAddress}
                            />
                        </MapContainer>

                        <div className="map-modal-footer">
                            <p className="selected-address">
                                {address || 'Click on the map to select a location'}
                            </p>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="confirm-location-btn"
                            >
                                Confirm Location
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
