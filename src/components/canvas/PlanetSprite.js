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

    const position = getOrbitCoords(planet.orbitElements, 0);

    return (
        <>
            <sprite
                position={position}
                scale={[getScale(planet.iconSize), getScale(planet.iconSize), 1]}
            >
                <spriteMaterial
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