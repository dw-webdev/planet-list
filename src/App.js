import { useState, useEffect, useReducer } from 'react';
import { planetsReducer } from './store/planetsReducer';

import PlanetCanvas from './components/canvas/PlanetCanvas';

const App = () => {

    const [planets, planetsDispatch] = useReducer(planetsReducer, []);
    const [planetSelected, setPlanetSelected] = useState(null);

    useEffect(() => {
        planetsDispatch({
            type: 'create',
            data: {
                name: 'Test',
                icon: 'ringed',
                iconSize: 'small',
                iconColor: '#ff0000',
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
                name: 'Test2',
                icon: 'ringed',
                iconSize: 'tiny',
                iconColor: '#0000ff',
                orbitElements: {
                    semi: 1.5,
                    ecc: 0.2,
                    inc: 30,
                    meanLong: 0,
                    longPeri: 0,
                    longAsc: 0
                }
            }
        });
    }, []);

    return(
        <>
            <PlanetCanvas
                planets={planets}
                setPlanetSelected={setPlanetSelected}
            />
        </>
    );
};

export default App;