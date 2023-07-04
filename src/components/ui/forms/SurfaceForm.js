import { useState, useEffect } from 'react';
import { Form, FormGroup, Col, Input, Label, UncontrolledTooltip, Button } from 'reactstrap';

const SurfaceForm = ({ planet, dispatch }) => {

    const [grav, setGrav] = useState(0);
    const [rad, setRad] = useState(0);
    const [den, setDen] = useState(0);
    const [mass, setMass] = useState(0);
    const [changed, setChanged] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        /*dispatch({ type: 'update-surface', data: {
            id: planet.id
        }});*/
        setChanged(false);
    }

    useEffect(() => {
        setGrav(9.8);
        setRad(6371);
        setDen(5515);
        setMass(1);
    }, [planet]);

    return (
        <Form onSubmit={handleSubmit}>
            <UncontrolledTooltip target='tooltipGrav' placement='right'>Gravitational Acceleration<br />at Surface (m/s<sup>2</sup>)</UncontrolledTooltip>
            <FormGroup row id='tooltipGrav'>
                <Label xs={2} for='grav' style={{ fontStyle: 'italic' }}>g</Label>
                <Col xs={10}>
                    <Input
                        name='grav'
                        id='grav'
                        type='number'
                        value={grav}
                        onChange={(event) => {
                            setGrav(event.target.value);
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipRad' placement='right'>Equitorial Radius (km)</UncontrolledTooltip>
            <FormGroup row id='tooltipRad'>
                <Label xs={2} for='rad' style={{ fontStyle: 'italic' }}>R</Label>
                <Col xs={10}>
                    <Input
                        name='rad'
                        id='rad'
                        type='number'
                        value={rad}
                        onChange={(event) => {
                            setRad(event.target.value);
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipDen' placement='right'>Density (kg/m<sup>3</sup>)</UncontrolledTooltip>
            <FormGroup row id='tooltipDen'>
                <Label xs={2} for='den' style={{ fontStyle: 'italic' }} className='text-primary'>d</Label>
                <Col xs={10}>
                    <Input
                        name='den'
                        id='den'
                        value={den}
                        className='border-primary'
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipMass' placement='right'>Mass (M&#x2A01;)</UncontrolledTooltip>
            <FormGroup row id='tooltipMass'>
                <Label xs={2} for='den' style={{ fontStyle: 'italic' }} className='text-primary'>M</Label>
                <Col xs={10}>
                    <Input
                        name='mass'
                        id='mass'
                        value={mass}
                        className='border-primary'
                    />
                </Col>
            </FormGroup>
            <Button type='submit' block color='primary' disabled={!changed}>Apply Changes</Button>
        </Form>
    );
}

// sun symbol = &#x2A00;

export default SurfaceForm;