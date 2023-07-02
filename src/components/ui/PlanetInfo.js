import { useState } from 'react';
import { Button, Card, CardBody, CardTitle, CardSubtitle, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import InfoForm from './InfoForm';
import OrbitForm from './OrbitForm';
import MoonForm from './MoonForm';

const PlanetInfo = ({ planet, selectPlanet, planets, dispatch, infoTab, setInfoTab }) => {

    return (
        <Card style={{position: 'absolute', top: 0, left: 0, width: 275 }}>
            <CardBody>
                <CardTitle>{planet ? planet.name : 'No Planet Selected'}</CardTitle>
                {planet && planet.primaryId && (
                <Button style={{ float: 'right' }} onClick={() => selectPlanet(planets.find(primary => primary.id === planet.primaryId))}>&larr;</Button>
                )}
                {planet && planet.primaryId && (
                <CardSubtitle>Orbiting {planets.find(primary => primary.id === planet.primaryId).name}</CardSubtitle>
                )}
            </CardBody>
            {planet && (
            <Nav tabs>
                <NavItem>
                    <NavLink className={infoTab === 'moons' ? 'active' : ''}  onClick={() => setInfoTab('moons')}>{planet.orbitElements ? 'Moons' : 'Planets'}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={infoTab === 'info' ? 'active' : ''} onClick={() => setInfoTab('info')}>Info</NavLink>
                </NavItem>
                {planet.orbitElements && (
                <NavItem>
                    <NavLink className={infoTab === 'orbit' ? 'active' : ''}  onClick={() => setInfoTab('orbit')}>Orbit</NavLink>
                </NavItem>
                )}
            </Nav>)}
            {planet && (
            <CardBody>
                <TabContent activeTab={infoTab}>
                    <TabPane tabId='info'>
                        <InfoForm planet={planet} dispatch={dispatch} />
                    </TabPane>
                    {planet.orbitElements && (<TabPane tabId='orbit'>
                        <OrbitForm planet={planet} planets={planets} dispatch={dispatch} />
                    </TabPane>)}
                    <TabPane tabId='moons'>
                        <MoonForm planet={planet} selectPlanet={selectPlanet} planets={planets} dispatch={dispatch} />
                    </TabPane>
                </TabContent>
            </CardBody>)}
        </Card>
    );
}

export default PlanetInfo;