import { usePlanetsProvider } from '../providers/PlanetsProvider';

const PlanetDesc = () => {

    const { selectedPlanet } = usePlanetsProvider();

    return (
        <div style={{
            position: 'absolute',
            top: '0.5em',
            left: '1em',
            color: '#80a0c0',
            pointerEvents: 'none'
        }}>Click and drag to rotate 3D view. Click planets to select.<br />{selectedPlanet ? selectedPlanet.name + (selectedPlanet.desc ? ': ' + selectedPlanet.desc : ''): ''}</div>
    );
};

export default PlanetDesc;