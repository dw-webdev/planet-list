import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import InfoForm from './InfoForm';
import OrbitForm from './OrbitForm';

import { usePlanetsProvider } from '../providers/PlanetsProvider';

const PlanetInfo = () => {

    const { selectedPlanet, planets, dispatch, infoTab, setInfoTab } = usePlanetsProvider();

    return (
        <div style={{ padding: '1em' }}>
            <p>{selectedPlanet ? selectedPlanet.name : 'No Planet Selected'}</p>
            {selectedPlanet && selectedPlanet.primaryId && (
            <p>Orbiting {planets.find(primary => primary.id === selectedPlanet.primaryId).name}</p>
            )}
            {selectedPlanet && (
            <Nav tabs>
                <NavItem>
                    <NavLink className={infoTab === 'info' ? 'active' : ''} onClick={() => setInfoTab('info')}>Info</NavLink>
                </NavItem>
                {selectedPlanet.orbitElements && (
                <NavItem>
                    <NavLink className={infoTab === 'orbit' ? 'active' : ''}  onClick={() => setInfoTab('orbit')}>Orbit</NavLink>
                </NavItem>
                )}
            </Nav>
            )}
            {selectedPlanet && (
            <TabContent activeTab={infoTab}>
                <TabPane tabId='info'>
                    <InfoForm planet={selectedPlanet} dispatch={dispatch} />
                </TabPane>
                {selectedPlanet.orbitElements && (<TabPane tabId='orbit'>
                    <OrbitForm planet={selectedPlanet} planets={planets} dispatch={dispatch} />
                </TabPane>)}
            </TabContent>
            )}
        </div>
    );
}

export default PlanetInfo;