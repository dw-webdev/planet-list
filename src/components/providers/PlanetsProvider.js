import { createContext, useContext, useState, useReducer } from 'react';
import { planetsReducer, getInitPlanets } from '../../store/planetsReducer';

const PlanetsContex = createContext(null);

const PlanetsProvider = ({ children }) => {

    const [planets, dispatch] = useReducer(planetsReducer, getInitPlanets());
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const selectPlanet = (planet) => { if(!editMode) setSelectedPlanet(planet); };
    const [editMode, setEditMode] = useState(false);

    return (
        <PlanetsContex.Provider value={{
            planets, dispatch,
            selectedPlanet, selectPlanet,
            editMode, setEditMode
        }}>
            {children}
        </PlanetsContex.Provider>
    );
};

const usePlanetsProvider = () => {

    const context = useContext(PlanetsContex);
    if(context === undefined) throw new Error('usePlanetsProvider can only be called inside a PlanetsProvider component');
    return context;
};

export { PlanetsProvider, usePlanetsProvider };