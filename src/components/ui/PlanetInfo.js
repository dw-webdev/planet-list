import { useState } from 'react';
import { Card, CardBody, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import InfoForm from './forms/InfoForm';
import OrbitForm from './forms/OrbitForm';
import SurfaceForm from './forms/SurfaceForm';
import { usePlanetsProvider } from '../providers/PlanetsProvider';

const PlanetInfo = () => {

    const { selectedPlanet, planets, dispatch, editMode } = usePlanetsProvider();
    const [infoTab, setInfoTab] = useState('info');

    return (
        <div style={{ marginTop: '0.5em', marginBottom: '1em' }}>
            <Card className='border-primary text-primary mb-4'>
                <CardBody style={{ padding: '1em 1.5em'}}>{selectedPlanet ? selectedPlanet.name + (selectedPlanet.desc ? ': ' + selectedPlanet.desc : '') : editMode ? 'Finish editing system to show/edit details of objects.' : 'Click  an object in the list or 3D view to show/edit details.'}</CardBody>
            </Card>
            {selectedPlanet && (
            <Accordion open={infoTab} toggle={(id) => setInfoTab(id !== infoTab ? id : '')}>
                <AccordionItem>
                    <AccordionHeader targetId="info">Display</AccordionHeader>
                    <AccordionBody accordionId="info">
                        <InfoForm planet={selectedPlanet} dispatch={dispatch} />
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="orbit">Orbit</AccordionHeader>
                    <AccordionBody accordionId="orbit">
                        <OrbitForm planet={selectedPlanet} planets={planets} dispatch={dispatch} />
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="surface">Surface</AccordionHeader>
                    <AccordionBody accordionId="surface">
                        <SurfaceForm planet={selectedPlanet} planets={planets} dispatch={dispatch} />
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
            )}
        </div>
    );
}

export default PlanetInfo;