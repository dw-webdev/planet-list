import { useState, useReducer } from 'react';
import { planetsReducer, getInitPlanets } from './store/planetsReducer';

import PlanetCanvas from './components/canvas/PlanetCanvas';
import PlanetInfo from './components/ui/PlanetInfo';

const App = () => {

    const [planets, planetsDispatch] = useReducer(planetsReducer, getInitPlanets());
    const [planetSelected, setPlanetSelected] = useState(null);
    const [infoTab, setInfoTab] = useState('moons');
    const selectPlanet = (planet) => {
        setPlanetSelected(planet !== planetSelected ? planet : null);
        setInfoTab('moons');
    };

    return(
        <>
            <PlanetCanvas
                planets={planets}
                selectPlanet={selectPlanet}
            />
            <PlanetInfo
                planet={planetSelected}
                selectPlanet={selectPlanet}
                planets={planets}
                dispatch={planetsDispatch}
                infoTab={infoTab}
                setInfoTab={setInfoTab}
            />
        </>
    );
};

export default App;