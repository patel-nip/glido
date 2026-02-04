// src/services/osrmService.js
// 100% FREE - No API key needed!

/**
 * Calculate distance and duration using OSRM
 */
export const calculateDistance = async (originLocation, destinationLocation) => {
    try {
        const originLat = originLocation.lat;
        const originLng = originLocation.lng;
        const destLat = destinationLocation.lat;
        const destLng = destinationLocation.lng;

        // OSRM format: lng,lat (not lat,lng!)
        const originCoords = `${originLng},${originLat}`;
        const destCoords = `${destLng},${destLat}`;

        const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${originCoords};${destCoords}?overview=false`
        );

        if (!response.ok) {
            throw new Error('OSRM API request failed');
        }

        const data = await response.json();

        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const distanceMeters = route.distance;
            const distanceMiles = distanceMeters * 0.000621371;
            const distanceKm = distanceMeters / 1000;
            const durationSeconds = route.duration;
            const durationMinutes = Math.ceil(durationSeconds / 60);
            const durationHours = Math.floor(durationMinutes / 60);
            const remainingMinutes = durationMinutes % 60;

            let durationText;
            if (durationHours > 0) {
                durationText = `${durationHours}h ${remainingMinutes}m`;
            } else {
                durationText = `${durationMinutes} mins`;
            }

            return {
                distance: distanceMiles,
                distanceKm: distanceKm,
                duration: durationMinutes,
                distanceText: `${distanceMiles.toFixed(2)} miles`,
                distanceTextKm: `${distanceKm.toFixed(2)} km`,
                durationText: durationText,
                success: true
            };
        } else {
            throw new Error('No route found');
        }
    } catch (error) {
        console.error('OSRM error:', error);
        return {
            success: false,
            error: 'Could not calculate distance. Please check your locations.',
            distance: 0,
            duration: 0,
            distanceText: 'N/A',
            durationText: 'N/A'
        };
    }
};
