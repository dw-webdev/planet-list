import { BufferGeometry } from 'three';
import { getOrbitPoints } from '../utils/orbits.js';

const ORBIT_POINTS = 100;

let orbitCounter = 0;

export const orbitsReducer = (orbits, action)=> {

    switch(action.type) {

        case 'create':
            return orbits.concat([createOrbit(++orbitCounter, action.data)]);

        case 'update':
            return orbits.filter(orbit => orbit.id !== action.data.id).concat([createOrbit(action.data.id, action.data.elements)]);

        case 'delete':
            return orbits.filter(orbit => orbit.id !== action.data);
            
        default:
            return orbits;
    }
};

const createOrbit = (id, elements) => ({
    id,
    elements,
    geometry: new BufferGeometry().setFromPoints(getOrbitPoints(elements, ORBIT_POINTS))
});