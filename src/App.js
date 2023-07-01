import { useState, useReducer } from 'react';
import { planetsReducer, getInitPlanets } from './store/planetsReducer';

import PlanetCanvas from './components/canvas/PlanetCanvas';
import PlanetDetails from './components/ui/PlanetDetails';

const App = () => {

    const [planets, planetsDispatch] = useReducer(planetsReducer, getInitPlanets());
    const [planetSelected, setPlanetSelected] = useState(null);
    const selectPlanet = (planet) => {
        setPlanetSelected(planet !== planetSelected ? planet : null);
    };

    return(
        <>
            <PlanetCanvas planets={planets} selectPlanet={selectPlanet} />
            <PlanetDetails planet={planetSelected} dispatch={planetsDispatch} />
        </>
    );
};

export default App;