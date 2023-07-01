import { BufferGeometry } from 'three';
import { getOrbitPoints } from '../utils/orbitUtils.js';

let planetCounter = 0;

const createOrbitGeometry = (orbitElements) => new BufferGeometry().setFromPoints(getOrbitPoints(orbitElements, 100));

export const planetsReducer = (planets, action) => {

    switch(action.type) {

        case 'create':
            return planets.concat([{
                id: ++planetCounter,
                name: action.data.name || 'New Planet',
                icon: action.data.icon || 'simple',
                iconSize: action.data.iconSize || 'small',
                iconColor: action.data.iconColor || '#ffffff',
                orbitElements: action.data.orbitElements || null,
                orbitGeometry: action.data.orbitElements ? createOrbitGeometry(action.data.orbitElements) : null
            }]);

        case 'update-name':
            return planets.map(planet => planet.id !== action.data.id ? planet : {
                ...planet,
                name: action.data.name
            });

        case 'update-icon':
            return planets.map(planet => planet.id !== action.data.id ? planet : {
                ...planet,
                icon: action.data.icon,
                iconSize: action.data.iconSize,
                iconColor: action.data.iconColor
            });

        case 'update-orbit':
            return planets.map(planet => planet.id !== action.data.id ? planet : {
                ...planet,
                orbitElements: action.data.orbitElements || null,
                orbitGeometry: action.data.orbitElements ? createOrbitGeometry(action.data.orbitElements) : null
            });

        case 'delete':
            return planets.filter(planet => planet.id !== action.data);

        default:
            return planets;
    }
};