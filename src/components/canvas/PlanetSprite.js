import { useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { getOrbitCoords } from '../../utils/orbitUtils';
import { EXAGERATE_MOON_ORBIT } from '../../store/planetsReducer';

const HOVER_COLOR = '#ffffff';
const SECONDS_PER_ORBIT = 60;

const getScale = (iconSize) => {

    switch(iconSize) {

        case 'tiny':
            return 0.05;

        case 'small':
            return 0.075;
            
        case 'medium':
            return 0.1;

        case 'large':
            return 0.125;

        case 'huge':
            return 0.15;

        default:
            return 0.075;
    }
};

const PlanetSprite = ({ planet, selectPlanet, planets, center, exMoonOrb }) => {

    const imgIcon = useLoader(TextureLoader, 'img/planet-icons/' + planet.icon + '.png');
    
    const [hover, setHover] = useState(false);

    const [orbitElapsed, setOrbitElapsed] = useState(0);
    const [position, setPosition] = useState([0, 0, 0]);

    useFrame((_, delta) => {
        if(planet.orbit) {
            setOrbitElapsed(orbitElapsed + delta <= (planet.orbit.period * SECONDS_PER_ORBIT) ? orbitElapsed + delta : 0);
            setPosition(getOrbitCoords(exMoonOrb && planet.orbit.geomEx ? {...planet.orbit, semi: planet.orbit.semi * EXAGERATE_MOON_ORBIT} : planet.orbit, orbitElapsed / (planet.orbit.period * SECONDS_PER_ORBIT)));
        }
    });

    return (
        <group position={center}>
            <sprite
                renderOrder={2}
                position={position}
                scale={[getScale(planet.iconSize), getScale(planet.iconSize), 1]}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={() => selectPlanet(planet)}
            >
                <spriteMaterial
                    map={imgIcon}
                    color={hover ? HOVER_COLOR : planet.iconColor}
                    sizeAttenuation={false}
                />
            </sprite>
            {planet.orbit && (
            <line renderOrder={1} geometry={exMoonOrb && planet.orbit.geomEx ? planet.orbit.geomEx : planet.orbit.geom}>
                <lineBasicMaterial color={hover ? HOVER_COLOR : planet.iconColor} />
            </line>
            )}
            {planets.filter(satellite => satellite.orbit?.primaryId === planet.id).map(satellite => (
            <PlanetSprite
                key={satellite.id}
                planet={satellite}
                selectPlanet={selectPlanet}
                planets={planets}
                center={position}
                exMoonOrb={exMoonOrb}
            />
            ))}
        </group>
    );
};

export default PlanetSprite;