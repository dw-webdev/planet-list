const GRAVITATIONAL_CONSTANT = 6.6743e-11;
const EARTH_MASS_KG = 5.9722e24;
const EARTH_GRAV_MS2 = 9.807;
const EARTH_RAD_KM = 6371;
const EARTH_SEMI_KM = 149597887;

export const getVolume = (radius) => 4 / 3 * Math.PI * Math.pow(radius * EARTH_RAD_KM * 1000, 3);
export const getDensity = (mass, radius) => (mass * EARTH_MASS_KG) / getVolume(radius);
export const getMass = (density, radius) => density * getVolume(radius) / EARTH_MASS_KG;
export const getSurfaceGravity = (mass, radius) => (GRAVITATIONAL_CONSTANT * mass * EARTH_MASS_KG) / Math.pow(radius * EARTH_RAD_KM * 1000, 2) / EARTH_GRAV_MS2;
export const getOrbitalPeriod = (mass, semi) => (2 * Math.PI * Math.sqrt(Math.pow(semi * EARTH_SEMI_KM, 3) / (GRAVITATIONAL_CONSTANT * mass * EARTH_MASS_KG))) / 1000; // not sure what's going on with the / 1000