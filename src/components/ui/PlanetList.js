import { ListGroup, ListGroupItem, Form, FormGroup, Input, Label } from 'reactstrap';
import { usePlanetsProvider } from '../providers/PlanetsProvider';

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

    const addPlanet = (primaryId) => {
        dispatch({ type: 'create', data: getRandomPlanet(primaryId) });
        //console.log('add planet');
    };

    const removePlanet = (id) => {
        dispatch({ type: 'delete', data: id });
        //console.log('remove planet ' + id);
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
                    onClick={() => editMode ? removePlanet(renderPlanet.id) : selectPlanet(renderPlanet)}
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
                    onClick={() => addPlanet(renderPlanet.id)}
                    >
                    <span style={{ color: '#008000'}}>+ Add new&hellip;</span>
                </ListGroupItem>
                )}
            </>
        );
    };    

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
        </div>
    );
};

export default PlanetList;