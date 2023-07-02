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

    const pick = (array) => array[Math.floor(Math.random() * array.length)];

    // https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex

    const hslToHex = (h, s, l) => {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0'); // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    };

    const randomColor = () => hslToHex(Math.floor(Math.random() * 360), Math.floor(Math.random() * 40) + 40, Math.floor(Math.random() * 40) + 40);

    const initPlanets = [];

    const sunId = nextId();
    const sunSizes = ['medium', 'large', 'huge'];
    const sunColors = ['#ff9900', '#ffcc33', '#ffff66'];
    const sunVariant = Math.floor(Math.random() * 3);

    const planetSizes = ['small', 'small', 'small', 'medium', 'medium', 'large'];
    const planetIcons = {
        small: ['earth', 'moon', 'cracked', 'striped'],
        medium: ['earth', 'ringed', 'moon', 'cracked', 'striped'],
        large: ['ringed', 'moon', 'cracked', 'striped']
    };
    const planetSemis = {
        small: 150000000,
        medium: 300000000,
        large: 450000000
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
    const moonSemis = {
        tiny: 25000000,
        small: 50000000,
        medium: 75000000
    };

    initPlanets.push({
        id: sunId,
        name: 'Star',
        icon: 'sun',
        iconSize: sunSizes[sunVariant],
        iconColor: sunColors[sunVariant]
    });

    for(let i = 0, l = Math.floor(Math.random() * 3) + 3, planetSemi = 0; i < l; i++) {

        const planetSize = pick(planetSizes);
        planetSemi += Math.floor(Math.random() * planetSemis[planetSize] * 0.5 + planetSemis[planetSize] * 0.5);
        const planetId = nextId();
        const planetOrbit = {
            semi: planetSemi,
            ecc: (Math.random() * 0.15).toFixed(2),
            inc: Math.floor(Math.random() * 5),
            meanLong: Math.round(Math.random() * 360) - 180,
            longPeri: Math.round(Math.random() * 360) - 180,
            longAsc: Math.round(Math.random() * 360) - 180
        };

        initPlanets.push({
            id: planetId,
            primaryId: sunId,
            name: 'Planet ' + (i + 1),
            icon: pick(planetIcons[planetSize]),
            iconSize: planetSize,
            iconColor: randomColor(),
            orbitElements: planetOrbit,
            orbitGeometry: createOrbitGeometry(planetOrbit)
        });

        for(let j = 0, k = Math.floor(Math.random() * 3) - (2 - i), moonSemi = 0; j < k; j++) {

            const moonSize = pick(moonSizes[planetSize]);
            moonSemi += Math.floor(Math.random() * moonSemis[moonSize] * 0.5 + moonSemis[moonSize] * 0.5);
            const moonOrbit = {
                semi: moonSemi,
                ecc: (Math.random() * 0.3).toFixed(2),
                inc: Math.floor(Math.random() * 10),
                meanLong: Math.round(Math.random() * 360) - 180,
                longPeri: Math.round(Math.random() * 360) - 180,
                longAsc: Math.round(Math.random() * 360) - 180
            }

            initPlanets.push({
                id: nextId(),
                primaryId: planetId,
                name: 'Moon ' + (j + 1),
                icon: pick(moonIcons[moonSize]),
                iconSize: moonSize,
                iconColor: randomColor(),
                orbitElements: moonOrbit,
                orbitGeometry: createOrbitGeometry(moonOrbit)
            });
        }
    }

    for(let i = 0, l = Math.floor(Math.random() * 5) - 2; i < l; i++) {

        const cometOrbit = {
            semi: Math.floor(Math.random() * 500000000) + 500000000,
            ecc: (Math.random() * 0.2 + 0.75).toFixed(2),
            inc: Math.floor(Math.random() * 90),
            meanLong: Math.round(Math.random() * 360) - 180,
            longPeri: Math.round(Math.random() * 360) - 180,
            longAsc: Math.round(Math.random() * 360) - 180
        }

        initPlanets.push({
            id: nextId(),
            primaryId: sunId,
            name: 'Comet ' + (i + 1),
            icon: 'potato',
            iconSize: 'tiny',
            iconColor: randomColor(),
            orbitElements: cometOrbit,
            orbitGeometry: createOrbitGeometry(cometOrbit)
        });
    }

    return initPlanets;
};