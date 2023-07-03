import { useState, useReducer } from 'react';
import { planetsReducer, getInitPlanets } from './store/planetsReducer';

import PlanetCanvas from './components/canvas/PlanetCanvas';
import Sidebar from './components/ui/Sidebar';

const App = () => {

    const [planets, planetsDispatch] = useReducer(planetsReducer, getInitPlanets());
    const [planetSelected, setPlanetSelected] = useState(null);
    const [infoTab, setInfoTab] = useState('info');
    const [addRemove, setAddRemove] = useState(false);
    const selectPlanet = (planet) => {
        if(!addRemove) {
            setPlanetSelected(planet !== planetSelected ? planet : null);
            setInfoTab('info');
        }
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
            <Sidebar
                planet={planetSelected}
                selectPlanet={selectPlanet}
                planets={planets}
                dispatch={planetsDispatch}
                addRemove={addRemove}
                setAddRemove={setAddRemove}
                infoTab={infoTab}
                setInfoTab={setInfoTab}
                showEclip={showEclip}
                setShowEclip={setShowEclip}
                exMoonOrb={exMoonOrb}
                setExMoonOrb={setExMoonOrb}
            />
        </>
    );
};

export default App;