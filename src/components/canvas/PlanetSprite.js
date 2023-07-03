import { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { getOrbitCoords } from '../../utils/orbitUtils';
import { EXAGERATE_MOON_ORBIT } from '../../store/planetsReducer';

const HOVER_COLOR = '#ffffff';

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

    const [hover, setHover] = useState(false);
    const imgIcon = useLoader(TextureLoader, 'img/planet-icons/' + planet.icon + '.png');
    const position = planet.orbitElements ? getOrbitCoords(exMoonOrb && planet.isMoon ? {...planet.orbitElements, semi: planet.orbitElements.semi * EXAGERATE_MOON_ORBIT} : planet.orbitElements, 0) : [0, 0, 0];

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
            {planet.orbitGeometry && (
            <line renderOrder={1} geometry={exMoonOrb && planet.isMoon ? planet.orbitGeometryEx : planet.orbitGeometry}>
                <lineBasicMaterial color={hover ? HOVER_COLOR : planet.iconColor} />
            </line>
            )}
            {planets.filter(moon => moon.primaryId === planet.id).map(moon => (
            <PlanetSprite
                key={moon.id}
                planet={moon}
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