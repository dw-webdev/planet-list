import { useState } from 'react';
import { ListGroup, ListGroupItem, Form, FormGroup, Input, Label } from 'reactstrap';

const PlanetList = ({ planet, selectPlanet, planets, dispatch, addRemove, setAddRemove }) => {

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
                    active={renderPlanet === planet}
                    style={{
                        textAlign: 'left',
                        paddingLeft: (depth * 1.5 + 0.75) + 'em'
                    }}
                    onClick={() => addRemove ? removePlanet(renderPlanet.id) : selectPlanet(renderPlanet)}
                    >
                    {addRemove && renderPlanet.primaryId !== null ? (
                    <span style={{ color: '#800000' }}>&times; {renderPlanet.name}</span>
                    ) : (
                    <span>{renderPlanet.name}</span>
                    )}
                </ListGroupItem>
                {childPlanets.map(childPlanet => renderNestedList(childPlanet, depth + 1))}
                {addRemove && (
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
                <Input type="checkbox" checked={addRemove} onChange={(event) => { setAddRemove(event.target.checked); selectPlanet(null); }} />
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