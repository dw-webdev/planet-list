import { useState } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { usePlanetsProvider } from '../providers/PlanetsProvider';
import PlanetAddModal from './modals/PlanetAddModal';
import PlanetRemoveModal from './modals/PlanetRemoveModal';

const PlanetList = () => {

    const { planets, selectedPlanet, selectPlanet, editMode, setEditMode } = usePlanetsProvider();

    const renderNestedList = (planet, depth) => {

        const satellites = planets.filter(satellite => satellite.orbit?.primaryId === planet.id);
        const planetName = planet.name || '<Unnamed>';

        return (
            <>
                <ListGroupItem
                    key={planet.id}
                    tag="button"
                    active={planet === selectedPlanet}
                    style={{
                        textAlign: 'left',
                        paddingLeft: (depth * 0.75 + 0.75) + 'em'
                    }}
                    onClick={() => editMode ? openRemoveModal(planet) : selectPlanet(planet)}
                    >
                    {editMode ? (
                    <span className='text-danger'>&times; {planetName}</span>
                    ) : (
                    <span>{planetName}</span>
                    )}
                </ListGroupItem>
                {editMode && depth < 2 && (
                <ListGroupItem
                    key={planet.id + '-add'}
                    tag="button"
                    style={{
                        textAlign: 'left',
                        paddingLeft: ((depth + 1) * 0.75 + 0.75) + 'em'
                    }}
                    onClick={() => openAddModal(planet)}
                    >
                    <span className='text-success'>+ Add {depth === 0 ? 'Planet' : 'Moon'}&hellip;</span>
                </ListGroupItem>
                )}
                {satellites.map(satellite => renderNestedList(satellite, depth + 1))}
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

    const rootPlanets = planets.filter(rootPlanet => !rootPlanet.orbit);

    return (
        <div style={{ marginTop: '0.5em' }}>
            <Button
                block
                color={!editMode ? 'primary' : 'secondary'}
                style={{ marginBottom: '1.5em' }}
                onClick={() => {
                    selectPlanet(null);
                    setEditMode(!editMode);
                }}
            >
                {!editMode ? 'Edit System' : 'Finish Editing'}
            </Button>
            <ListGroup style={{ marginBottom: '1em' }}>
                {rootPlanets.map(rootPlanet => renderNestedList(rootPlanet, 0))}   
            </ListGroup>
            <PlanetAddModal
                isOpen={addModal}
                setIsOpen={setAddModal}
                primary={addPrimary}
            />
            <PlanetRemoveModal
                isOpen={removeModal}
                setIsOpen={setRemoveModal}
                planet={removePlanet}
            />
        </div>
    );
};

export default PlanetList;