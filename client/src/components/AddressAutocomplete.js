// src/components/AddressAutocomplete.js
import React, { useState, useEffect, useRef } from 'react';
import './AddressAutocomplete.css';

const AddressAutocomplete = ({
    label,
    placeholder,
    value,
    onChange,
    onPlaceSelected,
    required = false
}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
    const autocompleteService = useRef(null);
    const placesService = useRef(null);

    useEffect(() => {
        // Initialize Google Places services
        if (window.google && window.google.maps && window.google.maps.places) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
            const mapDiv = document.createElement('div');
            const map = new window.google.maps.Map(mapDiv);
            placesService.current = new window.google.maps.places.PlacesService(map);
        }
    }, []);

    useEffect(() => {
        // Handle click outside to close suggestions
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = async (e) => {
        const inputValue = e.target.value;
        onChange(inputValue);

        if (inputValue.length < 3) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setIsLoading(true);

        try {
            if (autocompleteService.current) {
                autocompleteService.current.getPlacePredictions(
                    {
                        input: inputValue,
                        componentRestrictions: { country: 'uk' }, // Restrict to UK
                        types: ['geocode', 'establishment']
                    },
                    (predictions, status) => {
                        setIsLoading(false);
                        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                            setSuggestions(predictions);
                            setShowSuggestions(true);
                        } else {
                            setSuggestions([]);
                            setShowSuggestions(false);
                        }
                    }
                );
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        onChange(suggestion.description);
        setShowSuggestions(false);

        // Get place details including coordinates
        if (placesService.current) {
            placesService.current.getDetails(
                {
                    placeId: suggestion.place_id,
                    fields: ['geometry', 'formatted_address', 'address_components']
                },
                (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        // Extract postcode
                        let postcode = '';
                        if (place.address_components) {
                            const postcodeComponent = place.address_components.find(
                                component => component.types.includes('postal_code')
                            );
                            postcode = postcodeComponent ? postcodeComponent.long_name : '';
                        }

                        onPlaceSelected({
                            address: suggestion.description,
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            placeId: suggestion.place_id,
                            postcode: postcode
                        });
                    }
                }
            );
        }
    };

    return (
        <div className="address-autocomplete" ref={inputRef}>
            <label>
                {label} {required && <span className="required">*</span>}
            </label>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    onFocus={() => value.length >= 3 && suggestions.length > 0 && setShowSuggestions(true)}
                    required={required}
                />
                {isLoading && <div className="loading-spinner">⏳</div>}
                <div className="location-icon">📍</div>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.place_id}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <span className="suggestion-icon">📍</span>
                            <div className="suggestion-text">
                                <div className="main-text">{suggestion.structured_formatting.main_text}</div>
                                <div className="secondary-text">{suggestion.structured_formatting.secondary_text}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddressAutocomplete;
