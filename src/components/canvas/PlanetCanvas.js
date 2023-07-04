import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import EclipticPlane from './EclipticPlane';
import PlanetSprite from './PlanetSprite';

import { usePlanetsProvider } from '../providers/PlanetsProvider';
import { useViewControlsProvider } from '../providers/ViewControlsProvider';

const PlanetCanvas = () => {

    const { planets, selectPlanet } = usePlanetsProvider();
    const { showEclip, exMoonOrb } = useViewControlsProvider();

    return(
        <Canvas style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: -1 }}>
            <OrbitControls />
            <color attach="background" args={["#002040"]} />
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