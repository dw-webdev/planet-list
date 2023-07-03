import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import EclipticPlane from './EclipticPlane';
import PlanetSprite from './PlanetSprite';

const PlanetCanvas = ({ planets, selectPlanet, showEclip, exMoonOrb }) => {

    return(
        <Canvas style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: -1 }}>
            <OrbitControls />
            <color attach="background" args={["black"]} />
            <ambientLight intensity={0.5} />
            {showEclip && (
            <EclipticPlane />
            )}
            {planets.filter(planet => !planet.primaryId).map(planet => (
            <PlanetSprite
                key={planet.id}
                planet={planet}
                selectPlanet={selectPlanet}
                planets={planets}
                center={[0, 0, 0]}
                exMoonOrb={exMoonOrb}
            />
            ))}
        </Canvas>
    );
};

export default PlanetCanvas;