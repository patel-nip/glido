// src/utils/pricingCalculator.js

// Distance-based pricing tiers (in miles)
const DISTANCE_TIERS = [
    { min: 0, max: 1, rate: 6.00 },
    { min: 2, max: 20, rate: 3.00 },
    { min: 21, max: 40, rate: 2.50 },
    { min: 41, max: 72, rate: 2.25 },
    { min: 73, max: Infinity, rate: 2.00 }
];

// Vehicle multipliers (updated to match new vehicle types)
export const VEHICLE_MULTIPLIERS = {
    'saloon': 1.0,
    'executive': 1.5,
    'estate': 1.15,
    'mvp': 1.35,
    'mvp-executive': 1.75,
    '7seater': 1.6,
    '9seater': 2.0
};

// London Congestion Zone postcodes
const CONGESTION_ZONE_POSTCODES = [
    'EC1', 'EC2', 'EC3', 'EC4',
    'WC1', 'WC2',
    'W1',
    'SW1',
    'SE1',
    'NW1',
    'E1'
];

// Special dates when fare doubles
const DOUBLE_FARE_DATES = [
    { month: 12, day: 25 }, // Christmas
    { month: 12, day: 26 }, // Boxing Day
    { month: 12, day: 31 }, // New Year's Eve
    { month: 1, day: 1 }    // New Year's Day
];

/**
 * Calculate price based on distance in miles
 */
export const calculateDistancePrice = (miles) => {
    if (!miles || miles <= 0) return 0;

    let totalPrice = 0;
    let remainingMiles = miles;

    for (const tier of DISTANCE_TIERS) {
        if (remainingMiles <= 0) break;

        if (miles >= tier.min) {
            let milesInThisTier;

            if (tier.max === Infinity) {
                milesInThisTier = remainingMiles;
            } else {
                const tierRange = tier.max - tier.min + 1;
                milesInThisTier = Math.min(remainingMiles, tierRange);
            }

            totalPrice += milesInThisTier * tier.rate;
            remainingMiles -= milesInThisTier;
        }
    }

    return totalPrice;
};

/**
 * Check if location is in London Congestion Zone
 */
export const isInCongestionZone = (postcode) => {
    if (!postcode) return false;

    const cleanPostcode = postcode.toUpperCase().replace(/\s/g, '');

    return CONGESTION_ZONE_POSTCODES.some(zone =>
        cleanPostcode.startsWith(zone)
    );
};

/**
 * Check if date is a special date (double fare)
 */
export const isDoubleFareDate = (date) => {
    if (!date) return false;

    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();

    return DOUBLE_FARE_DATES.some(specialDate =>
        specialDate.month === month && specialDate.day === day
    );
};

/**
 * Calculate total price with all modifiers
 */
export const calculateTotalPrice = (options) => {
    const {
        distanceMiles = 0,
        vehicleMultiplier = 1.0,
        pickupPostcode = '',
        dropoffPostcode = '',
        bookingDate = null,
        surgeMultiplier = 1.0,
        isRoundTrip = false
    } = options;

    // Base price from distance
    let basePrice = calculateDistancePrice(distanceMiles);

    // Apply vehicle type multiplier
    basePrice *= vehicleMultiplier;

    // Add congestion zone charge
    const congestionCharge =
        (isInCongestionZone(pickupPostcode) || isInCongestionZone(dropoffPostcode))
            ? 12.00
            : 0;

    basePrice += congestionCharge;

    // Apply surge pricing
    basePrice *= surgeMultiplier;

    // Double fare on special dates
    if (isDoubleFareDate(bookingDate)) {
        basePrice *= 2.0;
    }

    // Round trip (10% discount applied, so multiply by 1.9 instead of 2.0)
    if (isRoundTrip) {
        basePrice *= 1.9; // 10% discount on round trips
    }

    return Math.max(basePrice, 0);
};

/**
 * Calculate prices for all vehicle types
 */
export const calculateAllVehiclePrices = (options) => {
    const prices = {};

    Object.keys(VEHICLE_MULTIPLIERS).forEach(vehicleId => {
        prices[vehicleId] = calculateTotalPrice({
            ...options,
            vehicleMultiplier: VEHICLE_MULTIPLIERS[vehicleId]
        });
    });

    return prices;
};

/**
 * Extract postcode from address string
 */
export const extractPostcode = (address) => {
    if (!address) return '';

    // UK postcode regex pattern
    const postcodePattern = /([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})/gi;
    const match = address.match(postcodePattern);

    return match ? match[0] : '';
};
