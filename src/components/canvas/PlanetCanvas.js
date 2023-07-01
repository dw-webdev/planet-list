import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PlanetSprite from './PlanetSprite';

const PlanetCanvas = ({ planets, setPlanetSelected }) => {

    return(
        <Canvas style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: -1 }}>
            <OrbitControls />
            <color attach="background" args={["black"]} />
            <ambientLight intensity={0.5} />
            {planets.map(planet => (<PlanetSprite planet={planet} setPlanetSelected={setPlanetSelected} />))}
        </Canvas>
    );
};

export default PlanetCanvas;