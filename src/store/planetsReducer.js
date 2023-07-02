import { BufferGeometry } from 'three';
import { getOrbitPoints } from '../utils/orbitUtils.js';

let planetCounter = 0;

const createOrbitGeometry = (orbitElements) => new BufferGeometry().setFromPoints(getOrbitPoints(orbitElements));

export const nextId = () => ++planetCounter;

export const planetsReducer = (planets, action) => {

    switch(action.type) {

        case 'create':
            return planets.concat([{
                id: action.data.id || nextId(),
                primaryId: action.data.primaryId || null,
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
        semi: 150000000,
        ecc: 0,
        inc: 0,
        meanLong: 0,
        longPeri: 0,
        longAsc: 0
    };

    const arakisOrbit = {
        semi: 225000000,
        ecc: 0.2,
        inc: 30,
        meanLong: 90,
        longPeri: 0,
        longAsc: 0
    };

    const sunId = nextId();

    return[
        {
            id: sunId,
            name: 'Sun',
            icon: 'sun',
            iconSize: 'huge',
            iconColor: '#ffff66'
        },
        {
            id: nextId(),
            primaryId: sunId,
            name: 'Caladan',
            icon: 'earth',
            iconSize: 'small',
            iconColor: '#3366ff',
            orbitElements: caladanOrbit,
            orbitGeometry: createOrbitGeometry(caladanOrbit)
        },
        {
            id: nextId(),
            primaryId: sunId,
            name: 'Arakis',
            icon: 'cracked',
            iconSize: 'medium',
            iconColor: '#ff6633',
            orbitElements: arakisOrbit,
            orbitGeometry: createOrbitGeometry(arakisOrbit)
        }
    ];
};