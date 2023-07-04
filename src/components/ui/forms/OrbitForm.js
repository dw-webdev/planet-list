import { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

const OrbitForm = ({ planet, dispatch }) => {

    const [semi, setSemi] = useState(1);
    const [ecc, setEcc] = useState(0);
    const [inc, setInc] = useState(0);
    const [meanLong, setMeanLong] = useState(0);
    const [longPeri, setLongPeri] = useState(0);
    const [longAsc, setLongAsc] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'update-orbit', data: {
            id: planet.id,
            orbitElements: {
                semi: event.target['semi'].value,
                ecc: event.target['ecc'].value,
                inc: event.target['inc'].value,
                meanLong: event.target['meanLong'].value,
                longPeri: event.target['longPeri'].value,
                longAsc: event.target['longAsc'].value
            }
        }});
    }

    useEffect(() => {
        setSemi(planet.orbitElements?.semi || 1);
        setEcc(planet.orbitElements?.ecc || 0);
        setInc(planet.orbitElements?.inc || 0);
        setMeanLong(planet.orbitElements?.meanLong || 0);
        setLongPeri(planet.orbitElements?.longPeri || 0);
        setLongAsc(planet.orbitElements?.longAsc || 0);
    }, [planet]);

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for='semi'>Semi-major Axis</Label>
                <Input
                    name='semi'
                    id='semi'
                    type='number'
                    value={semi}
                    min={1}
                    onChange={(event) => setSemi(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='ecc'>Eccentricity</Label>
                <Input
                    name='ecc'
                    id='ecc'
                    type='number'
                    value={ecc}
                    min={0}
                    max={0.95}
                    step={0.01}
                    onChange={(event) => setEcc(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='inc'>Inclination</Label>
                <Input
                    name='inc'
                    id='inc'
                    type='number'
                    value={inc}
                    min={0}
                    max={90}
                    onChange={(event) => setInc(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='meanLong'>Mean Longitude</Label>
                <Input
                    name='meanLong'
                    id='meanLong'
                    type='number'
                    value={meanLong}
                    min={-180}
                    max={180}
                    onChange={(event) => setMeanLong(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='longPeri'>Longitude of Periapsis</Label>
                <Input
                    name='longPeri'
                    id='longPeri'
                    type='number'
                    value={longPeri}
                    min={-180}
                    max={180}
                    onChange={(event) => setLongPeri(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='longAsc'>Longitude of Ascending Node</Label>
                <Input
                    name='longAsc'
                    id='longAsc'
                    type='number'
                    value={longAsc}
                    min={-180}
                    max={180}
                    onChange={(event) => setLongAsc(event.target.value)}
                />
            </FormGroup>
            <Button type='submit' block color='primary'>Apply Changes</Button>
        </Form>
    );
}

export default OrbitForm;