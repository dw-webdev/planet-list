import { BufferGeometry } from 'three';
import { getOrbitPoints } from '../utils/orbitUtils.js';

let planetCounter = 0;

const nextId = () => ++planetCounter;
const createOrbitGeometry = (orbitElements) => new BufferGeometry().setFromPoints(getOrbitPoints(orbitElements));

export const planetsReducer = (planets, action) => {

    switch(action.type) {

        case 'create':
            return planets.concat([{
                id: nextId(),
                name: action.data.name || 'New Planet',
                icon: action.data.icon || 'simple',
                iconSize: action.data.iconSize || 'small',
                iconColor: action.data.iconColor || '#ffffff',
                orbitElements: action.data.orbitElements || null,
                orbitGeometry: action.data.orbitElements ? createOrbitGeometry(action.data.orbitElements) : null
            }]);
            
        case 'update-info':
            return planets.map(planet => planet.id !== action.data.id ? planet : {
                ...planet,
                name: action.data.name,
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

export const getInitPlanets = () => {

    const caladanOrbit = {
        semi: 1,
        ecc: 0,
        inc: 0,
        meanLong: 0,
        longPeri: 0,
        longAsc: 0
    };

    const arakisOrbit = {
        semi: 1.5,
        ecc: 0.2,
        inc: 30,
        meanLong: 90,
        longPeri: 0,
        longAsc: 0
    };

    return[
        {
            id: nextId(),
            name: 'Sun',
            icon: 'sun',
            iconSize: 'huge',
            iconColor: '#ffff66',
            orbitElements: null,
            orbitGeometry: null
        },
        {
            id: nextId(),
            name: 'Caladan',
            icon: 'earth',
            iconSize: 'tiny',
            iconColor: '#3366ff',
            orbitElements: caladanOrbit,
            orbitGeometry: createOrbitGeometry(caladanOrbit)
        },
        {
            id: nextId(),
            name: 'Arakis',
            icon: 'cracked',
            iconSize: 'small',
            iconColor: '#ff6633',
            orbitElements: arakisOrbit,
            orbitGeometry: createOrbitGeometry(arakisOrbit)
        }
    ];
};