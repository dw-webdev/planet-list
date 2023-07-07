import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Button } from 'reactstrap';
import { usePlanetsProvider } from '../../providers/PlanetsProvider';
import { getOrbitalPeriod, getMass } from '../../../utils/physicsUtils';
import { getRandomColor } from '../../../utils/colorUtils';
import InfoFormFields from '../forms/InfoFormFields';
import PLANET_NAMES from '../../../data/PLANET_NAMES.json';

const planetSizes = ['small', 'medium', 'large'];
const planetIcons = {
    small: ['earth', 'moon', 'cracked', 'striped'],
    medium: ['earth', 'ringed', 'moon', 'cracked', 'striped'],
    large: ['ringed', 'moon', 'cracked', 'striped']
};
const moonSizes = {
    small: ['tiny'],
    medium: ['tiny', 'small'],
    large: ['tiny', 'small', 'medium']
};
const moonIcons = {
    tiny: ['potato', 'moon', 'cracked'],
    small: ['potato', 'moon', 'cracked', 'striped'],
    medium: ['moon', 'cracked', 'striped']
};

const pick = (array) => array[Math.floor(array.length * Math.random())];

const PlanetAddModal = ({ isOpen, setIsOpen, planet }) => {

    const { planets, dispatch } = usePlanetsProvider();

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [icon, setIcon] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        if(isOpen) {
            const isMoon = !!planet.orbit;
            const size = pick(isMoon ? moonSizes[planet.iconSize] : planetSizes);
            setName(pick(PLANET_NAMES));
            setDesc('');
            setIcon(pick(isMoon ? moonIcons[size] : planetIcons[size]));
            setSize(size);
            setColor(getRandomColor());
        }
    }, [isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const isMoon = !!planet.orbit;
        const satellites = planets.filter(satellite => satellite.orbit?.primaryId === planet.id);
        const greatestSemi = satellites.length > 0 ? satellites.sort((a, b) => b.orbit.semi - a.orbit.semi)[0].orbit.semi : 0;
        const semi = (isMoon ? 0.0015 : 1) * (Math.random() * 1.5 + 0.5) + greatestSemi;
        const baseRadius = (event.target['size'].value === 'tiny' ? 0.5 : event.target['size'].value === 'small' ? 1 : event.target['size'].value === 'medium' ? 2 : 4);
        const radius = baseRadius * (Math.random() * 2 + 1);
        const density = (4000 / (baseRadius / 2)) * (Math.random() * 0.2 + 0.9);
        dispatch({ type: 'create', data: {
            name: event.target['name'].value,
            desc: event.target['desc'].value,
            icon: event.target['icon'].value,
            iconSize: event.target['size'].value,
            iconColor: event.target['color'].value,
            density: density,
            radius: radius,
            mass: getMass(density, radius),
            orbit: {
                primaryId: planet.id,
                period: getOrbitalPeriod(planet.mass, semi),
                semi: semi,
                ecc: (Math.random() * 0.1).toFixed(2),
                inc: Math.floor(Math.random() * 10) - 5,
                meanLong: Math.round(Math.random() * 360) - 180,
                longPeri: Math.round(Math.random() * 360) - 180,
                longAsc: Math.round(Math.random() * 360) - 180
            }
        }});
        setIsOpen(false);
    }
    
    return(
        <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader className='bg-primary text-light'>Create {!planet?.orbit ? 'planet around' : 'moon of'} {planet?.name}</ModalHeader>
                <ModalBody>
                    <InfoFormFields
                        singleCol={false}
                        name={name} setName={setName}
                        desc={desc} setDesc={setDesc}
                        icon={icon} setIcon={setIcon}
                        size={size} setSize={setSize}
                        color={color} setColor={setColor}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type='submit'>Create</Button>
                    <Button color="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default PlanetAddModal;