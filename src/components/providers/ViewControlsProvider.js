import { createContext, useContext, useState } from 'react';

const ViewControlsContex = createContext(null);

const ViewControlsProvider = ({ children }) => {

    const [exMoonOrb, setExMoonOrb] = useState(true);
    const [showEclip, setShowEclip] = useState(false);

    return (
        <ViewControlsContex.Provider value={{
            exMoonOrb, setExMoonOrb,
            showEclip, setShowEclip
        }}>
            {children}
        </ViewControlsContex.Provider>
    );
};

const useViewControlsProvider = () => {

    const context = useContext(ViewControlsContex);
    if(context === undefined) throw new Error('useViewControlsProvider can only be called inside a ViewControlsProvider component');
    return context;
};

export { ViewControlsProvider, useViewControlsProvider };