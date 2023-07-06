import { BufferGeometry } from 'three';
import { getOrbitPoints } from '../utils/orbitUtils';
import { getOrbitalPeriod } from '../utils/physicsUtils';

let planetCounter = 0;

export const EXAGERATE_MOON_ORBIT = 100;

const nextId = () => ++planetCounter;

export const planetsReducer = (planets, action) => {

    const createPlanet = (data) => {
        return {
            id: data.id || nextId(),
            isMoon: data.isMoon || false,
            mass: data.mass || 1,
            radius: data.radius || 1,
            name: data.name || '',
            desc: data.desc || '',
            icon: data.icon || 'simple',
            iconSize: data.iconSize || 'small',
            iconColor: data.iconColor || '#808080',
            orbit: data.orbit ? createOrbit(data.orbit, data.isMoon) : null
        };
    };

    const createOrbit = (orbit, exagerate = false) => {

        return {
            ...orbit,
            period: getOrbitalPeriod(planets.find(planet => planet.id === orbit.primaryId).mass, orbit.semi),
            geom: new BufferGeometry().setFromPoints(getOrbitPoints(orbit)),
            geomEx: exagerate ? new BufferGeometry().setFromPoints(getOrbitPoints({...orbit, semi: orbit.semi * EXAGERATE_MOON_ORBIT})) : null
        };
    };

    switch(action.type) {

        case 'create':
            return planets.concat([createPlanet(action.data)]);
            
        case 'update-info':
            return planets.map(planet => planet.id !== action.data.id ? planet : {
                ...planet,
                name: action.data.name,
                desc: action.data.desc,
                icon: action.data.icon,
                iconSize: action.data.iconSize,
                iconColor: action.data.iconColor
            });

        case 'update-orbit':
            return planets.map(planet => planet.id !== action.data.id ? planet : {
                ...planet,
                orbit: createOrbit(action.data.orbit, planet.isMoon)
            });

        case 'update-surface':
            return planets.map(planet => planet.id !== action.data.id ? planet : {
                ...planet,
                mass: action.data.mass,
                radius: action.data.radius
            });

        case 'delete':
            return planets.filter(planet => planet.id !== action.data && planet.orbit?.primaryId !== action.data);

        default:
            return planets;
    }
};

export const getInitPlanets = () => {

    const sunId = nextId();
    const earthId = nextId();

    const earthOrbit = {
        semi: 1,
        ecc: 0.02,
        inc: 0,
        meanLong: 100,
        longPeri: 102,
        longAsc: -11
    };

    const moonOrbit = {
        semi: 0.0027,
        ecc: 0.05,
        inc: 5,
        meanLong: 0,
        longPeri: 0,
        longAsc: 0
    };
    
    return [{
        id: sunId,
        mass: 333030,
        radius: 109,
        name: 'Sun',
        icon: 'sun',
        iconSize: 'huge',
        iconColor: '#ffc060'
    },{
        id: earthId,
        mass: 1,
        radius: 1,
        name: 'Earth',
        icon: 'earth',
        iconSize: 'small',
        iconColor: '#6699ff',
        orbit: {
            ...earthOrbit,
            primaryId: sunId,
            period: 1,
            geom: new BufferGeometry().setFromPoints(getOrbitPoints(earthOrbit))
        }
    },{
        id: nextId(),
        isMoon: true,
        mass: 0.0123,
        radius: 0.2727,
        name: 'Moon',
        icon: 'moon',
        iconSize: 'tiny',
        iconColor: '#999999',
        orbit: {
            ...moonOrbit,
            primaryId: earthId,
            period: 0.0748,
            geom: new BufferGeometry().setFromPoints(getOrbitPoints(moonOrbit)),
            geomEx: new BufferGeometry().setFromPoints(getOrbitPoints({...moonOrbit, semi: moonOrbit.semi * EXAGERATE_MOON_ORBIT}))
        }
    }];
};
/*
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
        mass: 333030,
        radius: 109,
        icon: 'sun',
        iconSize: sunSizes[sunVariant],
        iconColor: sunColors[sunVariant]
    }));

    for(let i = 0, l = Math.floor(Math.random() * 4) + 2; i < l; i++) {

        const planetSize = pick(planetSizes);
        const planetId = nextId();

        initPlanets.push(createPlanet({
            id: planetId,
            name: 'Planet ' + (i + 1),
            icon: pick(planetIcons[planetSize]),
            iconSize: planetSize,
            iconColor: getRandomColor(),
            orbit: {
                primaryId: sunId,
                semi: ((Math.pow(i, 2) * 0.5 + Math.random() * 0.25 + 1) * 0.5).toFixed(2),
                ecc: (Math.random() * 0.15).toFixed(2),
                inc: Math.floor(Math.random() * 10) - 5,
                meanLong: Math.round(Math.random() * 360) - 180,
                longPeri: Math.round(Math.random() * 360) - 180,
                longAsc: Math.round(Math.random() * 360) - 180
            }
        }));

        for(let j = 0, k = Math.floor(Math.random() * 3) - (2 - i); j < k; j++) {

            const moonSize = pick(moonSizes[planetSize]);

            initPlanets.push(createPlanet({
                isMoon: true,
                name: 'Moon ' + (j + 1),
                icon: pick(moonIcons[moonSize]),
                iconSize: moonSize,
                iconColor: getRandomColor(),
                orbit: {
                    primaryId: planetId,
                    semi: ((Math.pow(j, 2) * 0.5 + Math.random() * 0.25 + 1) * 0.001).toFixed(5),
                    ecc: (Math.random() * 0.15).toFixed(2),
                    inc: Math.floor(Math.random() * 10) - 5,
                    meanLong: Math.round(Math.random() * 360) - 180,
                    longPeri: Math.round(Math.random() * 360) - 180,
                    longAsc: Math.round(Math.random() * 360) - 180
                }
            }));
        }
    }

    for(let i = 0, l = Math.floor(Math.random() * 5) - 2; i < l; i++) {

        initPlanets.push(createPlanet({
            name: 'Comet ' + (i + 1),
            icon: 'potato',
            iconSize: 'tiny',
            iconColor: getRandomColor(),
            orbit: {
                primaryId: sunId,
                semi: ((Math.pow(i, 2) * 0.5 + Math.random() * 0.25 + 1) * 5).toFixed(2),
                ecc: (Math.random() * 0.2 + 0.75).toFixed(2),
                inc: Math.floor(Math.random() * 180) - 90,
                meanLong: Math.round(Math.random() * 360) - 180,
                longPeri: Math.round(Math.random() * 360) - 180,
                longAsc: Math.round(Math.random() * 360) - 180
            }
        }));
    }

    return initPlanets;
};
*/