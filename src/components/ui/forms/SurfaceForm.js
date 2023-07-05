import { useState, useEffect } from 'react';
import { Form, FormGroup, Col, Input, Label, UncontrolledTooltip, Button } from 'reactstrap';
import { getDensity, getSurfaceGravity } from '../../../utils/physicsUtils';

const SurfaceForm = ({ planet, dispatch }) => {

    const [mass, setMass] = useState(0);
    const [rad, setRad] = useState(0);
    const [den, setDen] = useState(0);
    const [grav, setGrav] = useState(0);
    const [changed, setChanged] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'update-surface', data: {
            id: planet.id,
            mass: mass,
            radius: rad
        }});
        setChanged(false);
    }

    useEffect(() => {
        setMass(planet.mass);
        setRad(planet.radius);
        setDen(getDensity(planet.mass, planet.radius).toFixed(2));
        setGrav(getSurfaceGravity(planet.mass, planet.radius).toFixed(2));
    }, [planet]);

    return (
        <Form onSubmit={handleSubmit}>
            <UncontrolledTooltip target='tooltipMass' placement='right'>Mass (Earth masses)</UncontrolledTooltip>
            <FormGroup row id='tooltipMass'>
                <Label xs={2} for='mass' style={{ fontStyle: 'italic' }}>M</Label>
                <Col xs={10}>
                    <Input
                        name='mass'
                        id='mass'
                        type='number'
                        value={mass}
                        onChange={(event) => {
                            setMass(event.target.value);
                            setDen(getDensity(event.target.value, rad).toFixed(2));
                            setGrav(getSurfaceGravity(event.target.value, rad).toFixed(2));
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipRad' placement='right'>Radius (Earth radii)</UncontrolledTooltip>
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
                            setDen(getDensity(mass, event.target.value).toFixed(2));
                            setGrav(getSurfaceGravity(mass, event.target.value).toFixed(2));
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
                        readOnly
                        name='den'
                        id='den'
                        value={den}
                        className='border-primary'
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipGrav' placement='right'>Surface Gravity (Earth gravity)</UncontrolledTooltip>
            <FormGroup row id='tooltipGrav'>
                <Label xs={2} for='grav' style={{ fontStyle: 'italic' }} className='text-primary'>g</Label>
                <Col xs={10}>
                    <Input
                        readOnly
                        name='grav'
                        id='grav'
                        value={grav}
                        className='border-primary'
                    />
                </Col>
            </FormGroup>
            <Button type='submit' block color='primary' disabled={!changed}>Apply Changes</Button>
        </Form>
    );
}

export default SurfaceForm;