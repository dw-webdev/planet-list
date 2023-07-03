import { useState } from 'react';
import { ListGroup, ListGroupItem, Form, FormGroup, Input, Label } from 'reactstrap';
import { usePlanetsProvider } from '../providers/PlanetsProvider';
import PlanetAddModal from './PlanetAddModal';
import PlanetRemoveModal from './PlanetRemoveModal';

const PlanetList = () => {

    const { planets, dispatch, selectedPlanet, selectPlanet, editMode, setEditMode } = usePlanetsProvider();

    const getRandomPlanet = (primaryId) => {

        const existingCount = planets.filter(moon => moon.primaryId === primaryId).length;
        const isMoon = !!planets.find(primary => primary.id === primaryId).primaryId;

        return {
            primaryId,
            isMoon,
            name: (isMoon ? 'Moon ' : 'Planet ') + (existingCount + 1),
            icon: 'simple',
            iconSize: isMoon ? 'tiny' : 'small',
            iconColor: '#808080',
            orbitElements: {
                semi: (Math.pow(existingCount, 2) * 0.5 + 1) * (isMoon ? 125000 : 75000000)
            }
        }
    };

    const renderNestedList = (renderPlanet, depth) => {

        const childPlanets = planets.filter(childPlanet => childPlanet.primaryId === renderPlanet.id);

        return (
            <>
                <ListGroupItem
                    key={renderPlanet.id}
                    tag="button"
                    active={renderPlanet === selectedPlanet}
                    style={{
                        textAlign: 'left',
                        paddingLeft: (depth * 1.5 + 0.75) + 'em'
                    }}
                    onClick={() => editMode ? openRemoveModal(renderPlanet) : selectPlanet(renderPlanet)}
                    >
                    {editMode ? (
                    <span style={{ color: '#800000' }}>&times; {renderPlanet.name}</span>
                    ) : (
                    <span>{renderPlanet.name}</span>
                    )}
                </ListGroupItem>
                {childPlanets.map(childPlanet => renderNestedList(childPlanet, depth + 1))}
                {editMode && (
                <ListGroupItem
                    key={renderPlanet.id + '-add'}
                    tag="button"
                    style={{
                        textAlign: 'left',
                        paddingLeft: ((depth + 1) * 1.5 + 0.75) + 'em'
                    }}
                    onClick={() => openAddModal(renderPlanet)}
                    >
                    <span style={{ color: '#008000'}}>+ Add new&hellip;</span>
                </ListGroupItem>
                )}
            </>
        );
    };

    const openAddModal = (primary) => {
        setAddPrimary(primary);
        setAddModal(true);
    };
    
    const openRemoveModal = (planet) => {
        setRemovePlanet(planet);
        setRemoveModal(true);
    };

    const [addModal, setAddModal] = useState(false);
    const [addPrimary, setAddPrimary] = useState(null);
    const [removeModal, setRemoveModal] = useState(false);
    const [removePlanet, setRemovePlanet] = useState(null);

    const rootPlanets = planets.filter(rootPlanet => rootPlanet.primaryId === null);

    return (
        <div style={{ padding: '1em' }}>
            <Form>
                <FormGroup check inline>
                <Input type="checkbox" checked={editMode} onChange={(event) => { setEditMode(event.target.checked); selectPlanet(null); }} />
                    <Label check>Add/Remove</Label>
                </FormGroup>
            </Form>
            <ListGroup>
                {rootPlanets.map(rootPlanet => renderNestedList(rootPlanet, 0))}   
            </ListGroup>
            <PlanetAddModal
                isOpen={addModal}
                setIsOpen={setAddModal}
                primary={addPrimary}
                planets={planets}
                dispatch={dispatch}
            />
            <PlanetRemoveModal
                isOpen={removeModal}
                setIsOpen={setRemoveModal}
                planet={removePlanet}
                dispatch={dispatch}
            />
        </div>
    );
};

export default PlanetList;