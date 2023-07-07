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
        }}>{selectedPlanet ? selectedPlanet.name + (selectedPlanet.desc ? ': ' + selectedPlanet.desc : ''): 'Select a planet...'}</div>
    );
};

export default PlanetDesc;