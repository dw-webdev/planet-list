import { useState, useEffect } from 'react';
import { Form, FormGroup, Col, Input, Label, UncontrolledTooltip, Button } from 'reactstrap';
import { getMass, getSurfaceGravity, getOrbitalPeriod } from '../../../utils/physicsUtils';
import { usePlanetsProvider } from '../../providers/PlanetsProvider';

const SurfaceForm = ({ planet, dispatch }) => {

    const { planets } = usePlanetsProvider();

    const [den, setDen] = useState(0);
    const [rad, setRad] = useState(0);
    const [mass, setMass] = useState(0);
    const [grav, setGrav] = useState(0);
    const [changed, setChanged] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'update-surface', data: {
            id: planet.id,
            density: event.target['den'].value,
            radius: event.target['rad'].value,
            mass: event.target['mass'].value
        }});
        // need to update satellite orbits when primary mass changes
        planets.filter(satellite => satellite.orbit?.primaryId === planet.id).forEach(satellite => {
            dispatch({ type: 'update-orbit', data: {
                id: satellite.id,
                orbit: {
                    ...satellite.orbit,
                    period: getOrbitalPeriod(event.target['mass'].value, satellite.orbit.semi)
                }
            }});
        });
        setChanged(false);
    }

    useEffect(() => {
        setDen(planet.density);
        setRad(planet.radius);
        setMass(planet.mass);
        setGrav(getSurfaceGravity(planet.mass, planet.radius).toFixed(2));
    }, [planet]);

    return (
        <Form onSubmit={handleSubmit}>
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
                            const mass = getMass(den, event.target.value);
                            const grav = getSurfaceGravity(mass, event.target.value);
                            setRad(event.target.value);
                            setMass(mass);
                            setGrav(grav);
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipDen' placement='right'>Density (kg/m<sup>3</sup>)</UncontrolledTooltip>
            <FormGroup row id='tooltipDen'>
                <Label xs={2} for='den' style={{ fontStyle: 'italic' }}>d</Label>
                <Col xs={10}>
                    <Input
                        name='den'
                        id='den'
                        type='number'
                        value={den}
                        onChange={(event) => {
                            const mass = getMass(event.target.value, rad);
                            const grav = getSurfaceGravity(mass, rad);
                            setDen(event.target.value);
                            setMass(mass);
                            setGrav(grav);
                            setChanged(true);
                        }}
                    />
                </Col>
            </FormGroup>
            <UncontrolledTooltip target='tooltipMass' placement='right'>Mass (Earth masses)</UncontrolledTooltip>
            <FormGroup row id='tooltipMass'>
                <Label xs={2} for='mass' style={{ fontStyle: 'italic' }} className='text-primary'>M</Label>
                <Col xs={10}>
                    <Input
                        readOnly
                        name='mass'
                        id='mass'
                        value={mass}
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