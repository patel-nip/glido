// src/services/googleMapsService.js

/**
 * Calculate distance using Google Distance Matrix API
 */
export const calculateDistance = async (origin, destination) => {
    return new Promise((resolve, reject) => {
        if (!window.google || !window.google.maps) {
            reject(new Error('Google Maps not loaded'));
            return;
        }

        const service = new window.google.maps.DistanceMatrixService();

        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
                unitSystem: window.google.maps.UnitSystem.IMPERIAL, // Miles
            },
            (response, status) => {
                if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                    const element = response.rows[0].elements[0];
                    const distanceValue = element.distance.value; // in meters
                    const distanceMiles = distanceValue * 0.000621371; // convert to miles
                    const durationValue = element.duration.value; // in seconds
                    const durationMinutes = Math.ceil(durationValue / 60);

                    resolve({
                        distance: distanceMiles,
                        duration: durationMinutes,
                        distanceText: element.distance.text,
                        durationText: element.duration.text
                    });
                } else {
                    reject(new Error('Could not calculate distance'));
                }
            }
        );
    });
};
