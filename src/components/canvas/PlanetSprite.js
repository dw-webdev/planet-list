import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { getOrbitCoords } from '../../utils/orbitUtils';

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

const PlanetSprite = ({ planet, setPlanetSelected }) => {

    const position = planet.orbitElements ? getOrbitCoords(planet.orbitElements, 0) : [0, 0, 0];
    const imgIcon = useLoader(TextureLoader, 'img/planet-icons/' + planet.icon + '.png');

    return (
        <>
            <sprite
                key={planet.id}
                position={position}
                scale={[getScale(planet.iconSize), getScale(planet.iconSize), 1]}
            >
                <spriteMaterial
                    map={imgIcon}
                    color={planet.iconColor}
                    sizeAttenuation={false}
                />
            </sprite>
            {planet.orbitGeometry && (
                <line geometry={planet.orbitGeometry}>
                    <lineBasicMaterial color={planet.iconColor} />
                </line>
            )}
        </>
    );
};

export default PlanetSprite;