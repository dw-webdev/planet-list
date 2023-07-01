import { useState, useEffect, useReducer } from 'react';
import { planetsReducer } from './store/planetsReducer';

import PlanetCanvas from './components/canvas/PlanetCanvas';
import PlanetDetails from './components/ui/PlanetDetails';

const App = () => {

    const [planets, planetsDispatch] = useReducer(planetsReducer, []);
    const [planetSelected, setPlanetSelected] = useState(null);
    const selectPlanet = (planet) => {
        setPlanetSelected(planet !== planetSelected ? planet : null);
    };

    useEffect(() => {
        planetsDispatch({
            type: 'create',
            data: {
                name: 'Sun',
                icon: 'sun',
                iconSize: 'huge',
                iconColor: '#ffff00'
            }
        });
        planetsDispatch({
            type: 'create',
            data: {
                name: 'Caladan',
                icon: 'earth',
                iconSize: 'tiny',
                iconColor: '#0000ff',
                orbitElements: {
                    semi: 1,
                    ecc: 0,
                    inc: 0,
                    meanLong: 0,
                    longPeri: 0,
                    longAsc: 0
                }
            }
        });
        planetsDispatch({
            type: 'create',
            data: {
                name: 'Arakis',
                icon: 'moon',
                iconSize: 'small',
                iconColor: '#ff0000',
                orbitElements: {
                    semi: 1.5,
                    ecc: 0.2,
                    inc: 30,
                    meanLong: 90,
                    longPeri: 0,
                    longAsc: 0
                }
            }
        });
    }, []);

    return(
        <>
            <PlanetCanvas planets={planets} selectPlanet={selectPlanet} />
            <PlanetDetails planet={planetSelected} dispatch={planetsDispatch} />
        </>
    );
};

export default App;