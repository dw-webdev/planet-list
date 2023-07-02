import { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { getOrbitCoords } from '../../utils/orbitUtils';

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

const PlanetSprite = ({ planet, selectPlanet, planets, center }) => {

    const [hover, setHover] = useState(false);
    const position = planet.orbitElements ? getOrbitCoords(planet.orbitElements, 0) : [0, 0, 0];
    const imgIcon = useLoader(TextureLoader, 'img/planet-icons/' + planet.icon + '.png');

    return (
        <group position={center}>
            <sprite
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
            <line geometry={planet.orbitGeometry}>
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
            />
            ))}
        </group>
    );
};

export default PlanetSprite;