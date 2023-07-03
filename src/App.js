import { useState, useReducer } from 'react';
import { planetsReducer, getInitPlanets } from './store/planetsReducer';

import PlanetCanvas from './components/canvas/PlanetCanvas';
import PlanetInfo from './components/ui/PlanetInfo';
import PlanetControls from './components/ui/PlanetControls';

const App = () => {

    const [planets, planetsDispatch] = useReducer(planetsReducer, getInitPlanets());
    const [planetSelected, setPlanetSelected] = useState(null);
    const [infoTab, setInfoTab] = useState('moons');
    const selectPlanet = (planet) => {
        setPlanetSelected(planet !== planetSelected ? planet : null);
        setInfoTab('moons');
    };

    const [showEclip, setShowEclip] = useState(false);
    const [exMoonOrb, setExMoonOrb] = useState(true);

    return(
        <>
            <PlanetCanvas
                planets={planets}
                selectPlanet={selectPlanet}
                showEclip={showEclip}
                exMoonOrb={exMoonOrb}
            />
            <PlanetInfo
                planet={planetSelected}
                selectPlanet={selectPlanet}
                planets={planets}
                dispatch={planetsDispatch}
                infoTab={infoTab}
                setInfoTab={setInfoTab}
            />
            <PlanetControls
                showEclip={showEclip}
                setShowEclip={setShowEclip}
                exMoonOrb={exMoonOrb}
                setExMoonOrb={setExMoonOrb}
            />
        </>
    );
};

export default App;