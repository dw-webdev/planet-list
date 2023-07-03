import { BufferGeometry } from 'three';
import { getOrbitPoints } from '../utils/orbitUtils';
import { getRandomColor } from '../utils/colorUtils';

let planetCounter = 0;

export const EXAGERATE_MOON_ORBIT = 100;

const nextId = () => ++planetCounter;

const createOrbitGeometry = (orbitElements) => new BufferGeometry().setFromPoints(getOrbitPoints(orbitElements));

const createPlanet = (data) => {
    return {
        id: data.id || nextId(),
        primaryId: data.primaryId || null,
        isMoon: data.isMoon || false,
        name: data.name || 'New Planet',
        icon: data.icon || 'simple',
        iconSize: data.iconSize || 'small',
        iconColor: data.iconColor || '#ffffff',
        orbitElements: data.orbitElements || null,
        orbitGeometry: data.orbitElements ? createOrbitGeometry(data.orbitElements) : null,
        orbitGeometryEx: (data.orbitElements && data.isMoon) ? createOrbitGeometry({...data.orbitElements, semi: data.orbitElements.semi * EXAGERATE_MOON_ORBIT}) : null
    };
};

export const planetsReducer = (planets, action) => {

    switch(action.type) {

        case 'create':
            return planets.concat([createPlanet(action.data)]);
            
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
                orbitGeometry: action.data.orbitElements ? createOrbitGeometry(action.data.orbitElements) : null,
                orbitGeometryEx: (action.data.orbitElements && planet.isMoon) ? createOrbitGeometry({...action.data.orbitElements, semi: action.data.orbitElements.semi * EXAGERATE_MOON_ORBIT}) : null
            });

        case 'delete':
            return planets.filter(planet => planet.id !== action.data);

        default:
            return planets;
    }
};

export const getInitPlanets = () => {

    const pick = (array) => array[Math.floor(Math.random() * array.length)];

    const initPlanets = [];

    const sunId = nextId();
    const sunSizes = ['medium', 'large', 'huge'];
    const sunColors = ['#ff6030', '#ff8040', '#ffc060'];
    const sunVariant = Math.floor(Math.random() * 3);

    const planetSizes = ['small', 'small', 'small', 'medium', 'medium', 'large'];
    const planetIcons = {
        small: ['earth', 'moon', 'cracked', 'striped'],
        medium: ['earth', 'ringed', 'moon', 'cracked', 'striped'],
        large: ['ringed', 'moon', 'cracked', 'striped']
    };
    const moonSizes = {
        small: ['tiny'],
        medium: ['tiny', 'tiny', 'small'],
        large: ['tiny', 'tiny', 'tiny', 'small', 'small', 'medium']
    };
    const moonIcons = {
        tiny: ['potato', 'moon', 'cracked'],
        small: ['potato', 'moon', 'cracked', 'striped'],
        medium: ['moon', 'cracked', 'striped']
    };

    initPlanets.push(createPlanet({
        id: sunId,
        name: 'Star',
        icon: 'sun',
        iconSize: sunSizes[sunVariant],
        iconColor: sunColors[sunVariant]
    }));

    for(let i = 0, l = Math.floor(Math.random() * 3) + 3; i < l; i++) {

        const planetSize = pick(planetSizes);
        const planetId = nextId();

        initPlanets.push(createPlanet({
            id: planetId,
            primaryId: sunId,
            name: 'Planet ' + (i + 1),
            icon: pick(planetIcons[planetSize]),
            iconSize: planetSize,
            iconColor: getRandomColor(),
            orbitElements: {
                semi: Math.round((Math.pow(i, 2) * 0.5 + Math.random() * 0.25 + 1) * 75000000),
                ecc: (Math.random() * 0.15).toFixed(2),
                inc: Math.floor(Math.random() * 5),
                meanLong: Math.round(Math.random() * 360) - 180,
                longPeri: Math.round(Math.random() * 360) - 180,
                longAsc: Math.round(Math.random() * 360) - 180
            }
        }));

        for(let j = 0, k = Math.floor(Math.random() * 3) - (2 - i); j < k; j++) {

            const moonSize = pick(moonSizes[planetSize]);

            initPlanets.push(createPlanet({
                primaryId: planetId,
                isMoon: true,
                name: 'Moon ' + (j + 1),
                icon: pick(moonIcons[moonSize]),
                iconSize: moonSize,
                iconColor: getRandomColor(),
                orbitElements: {
                    semi: Math.round(( Math.pow(j, 2) * 0.5 + Math.random() * 0.25 + 1) * 125000),
                    ecc: (Math.random() * 0.15).toFixed(2),
                    inc: Math.floor(Math.random() * 5),
                    meanLong: Math.round(Math.random() * 360) - 180,
                    longPeri: Math.round(Math.random() * 360) - 180,
                    longAsc: Math.round(Math.random() * 360) - 180
                }
            }));
        }
    }

    for(let i = 0, l = Math.floor(Math.random() * 5) - 2; i < l; i++) {

        initPlanets.push(createPlanet({
            primaryId: sunId,
            name: 'Comet ' + (i + 1),
            icon: 'potato',
            iconSize: 'tiny',
            iconColor: getRandomColor(),
            orbitElements: {
                semi: Math.round((Math.pow(i, 2) * 0.5 + Math.random() * 0.25 + 1) * 750000000),
                ecc: (Math.random() * 0.2 + 0.75).toFixed(2),
                inc: Math.floor(Math.random() * 90),
                meanLong: Math.round(Math.random() * 360) - 180,
                longPeri: Math.round(Math.random() * 360) - 180,
                longAsc: Math.round(Math.random() * 360) - 180
            }
        }));
    }

    return initPlanets;
};