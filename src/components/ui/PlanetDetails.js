import { useState } from 'react';
import { Card, CardBody, CardTitle, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import InfoForm from './InfoForm';
import OrbitForm from './OrbitForm';

const PlanetDetails = ({ planet, dispatch }) => {

    const [tab, setTab] = useState('info');

    return (
        <Card style={{position: 'absolute', top: 0, left: 0, width: 275 }}>
            <CardBody>
                <CardTitle>{planet ? planet.name : 'No Planet Selected'}</CardTitle>
            </CardBody>
            {planet && (
            <Nav tabs>
                <NavItem>
                    <NavLink className={tab === 'info' ? 'active' : ''} onClick={() => setTab('info')}>Basic Info</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={tab === 'orbit' ? 'active' : ''}  onClick={() => setTab('orbit')}>Orbital Elements</NavLink>
                </NavItem>
            </Nav>)}
            {planet && (
            <CardBody>
                <TabContent activeTab={tab}>
                    <TabPane tabId='info'>
                        <InfoForm planet={planet} dispatch={dispatch} />
                    </TabPane>
                    <TabPane tabId='orbit'>
                        <OrbitForm planet={planet} dispatch={dispatch} />
                    </TabPane>
                </TabContent>
            </CardBody>)}
        </Card>
    );
}

export default PlanetDetails;