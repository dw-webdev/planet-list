import { useState, useContext } from 'react';
import { Collapse } from 'reactstrap';
import ViewControls from './ViewControls';
import PlanetInfo from './PlanetInfo';
import PlanetList from './PlanetList';

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true);

    return(
        <div style={{ position: 'absolute', height: '100vh', backgroundColor: 'white' }}>
            <div style={{ position: 'absolute', right: 0, height: '100vh' }}>
                <div style={{ position: 'absolute', left: 0, width: 20, height: '100vh', backgroundColor: 'gray' }}>
                    <button onClick={() => setIsOpen(!isOpen)} style={styles.toggleButton}>{isOpen ? 'close' : 'open'}</button>
                </div>
            </div>
            <Collapse horizontal isOpen={isOpen}>
                <div style={{ width: 400, height: '100vh', overflowY: 'scroll' }}>
                    <ViewControls />
                    <PlanetList />
                    <PlanetInfo />
                </div>
            </Collapse>
        </div>
    );
}

/*
                <PlanetInfo
                    planet={planet}
                    selectPlanet={selectPlanet}
                    planets={planets}
                    dispatch={dispatch}
                    infoTab={infoTab}
                    setInfoTab={setInfoTab}
                />
*/

const styles = {
    toggleButton: {
        position: 'absolute',
        padding: '1em',
        paddingLeft: 0,
        border: 'none',
        borderRadius: '0 100% 100% 0',
        top: '50%',
        transform: 'translateY(-50%)'
    }
}

export default Sidebar;