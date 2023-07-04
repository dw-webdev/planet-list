import { useState, useEffect } from 'react';
import { Form, FormGroup, Col, Input, Label, UncontrolledTooltip, Button } from 'reactstrap';

const OrbitForm = ({ planet, dispatch }) => {

    const [semi, setSemi] = useState(1);
    const [ecc, setEcc] = useState(0);
    const [inc, setInc] = useState(0);
    const [meanLong, setMeanLong] = useState(0);
    const [longPeri, setLongPeri] = useState(0);
    const [longAsc, setLongAsc] = useState(0);
    const [changed, setChanged] = useState(false);

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
        setChanged(false);
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
            <UncontrolledTooltip target='tooltipSemi' placement='right'>Semi-major Axis</UncontrolledTooltip>
            <FormGroup row id='tooltipSemi'>
                <Label xs={2} for='semi' style={{ fontStyle: 'italic' }}>a</Label>
                <Col xs={10}>
                    <Input
                        name='semi'
                        id='semi'
                        type='number'
                        value={semi}
                        min={1}
                        onChange={(event) => {
                            setSemi(event.target.value);
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipEcc' placement='right'>Eccentricity</UncontrolledTooltip>
            <FormGroup row id='tooltipEcc'>
                <Label xs={2} for='ecc' style={{ fontStyle: 'italic' }}>e</Label>
                <Col xs={10}>
                    <Input
                        name='ecc'
                        id='ecc'
                        type='number'
                        value={ecc}
                        min={0}
                        max={0.95}
                        step={0.01}
                        onChange={(event) => {
                            setEcc(event.target.value);
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipInc' placement='right'>Inclination</UncontrolledTooltip>
            <FormGroup row id='tooltipInc'>
                <Label xs={2} for='inc' style={{ fontStyle: 'italic' }}>i</Label>
                <Col xs={10}>
                    <Input
                        name='inc'
                        id='inc'
                        type='number'
                        value={inc}
                        min={-180}
                        max={180}
                        onChange={(event) => {
                            setInc(event.target.value);
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipMeanLong' placement='right'>Mean Longitude</UncontrolledTooltip>
            <FormGroup row id='tooltipMeanLong'>
                <Label xs={2} for='meanLong' style={{ fontStyle: 'italic' }}>l</Label>
                <Col xs={10}>
                    <Input
                        name='meanLong'
                        id='meanLong'
                        type='number'
                        value={meanLong}
                        min={-180}
                        max={180}
                        onChange={(event) => {
                            setMeanLong(event.target.value);
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipLongPeri' placement='right'>Longitude of Periapsis</UncontrolledTooltip>
            <FormGroup row id='tooltipLongPeri'>
                <Label xs={2} for='longPeri' style={{ fontStyle: 'italic' }}>&omega;</Label>
                <Col xs={10}>
                    <Input
                        name='longPeri'
                        id='longPeri'
                        type='number'
                        value={longPeri}
                        min={-180}
                        max={180}
                        onChange={(event) => {
                            setLongPeri(event.target.value);
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipLongAsc' placement='right'>Longitude of<br />Ascending Node</UncontrolledTooltip>
            <FormGroup row id='tooltipLongAsc'>
                <Label xs={2} for='longAsc' style={{ fontStyle: 'italic' }}>&Omega;</Label>
                <Col xs={10}>
                    <Input
                        name='longAsc'
                        id='longAsc'
                        type='number'
                        value={longAsc}
                        min={-180}
                        max={180}
                        onChange={(event) => {
                            setLongAsc(event.target.value);
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <Button type='submit' block color='primary' disabled={!changed}>Apply Changes</Button>
        </Form>
    );
}

export default OrbitForm;