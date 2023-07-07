import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Button } from 'reactstrap';
import { usePlanetsProvider } from '../../providers/PlanetsProvider';
import { getOrbitalPeriod } from '../../../utils/physicsUtils';
import InfoFormFields from '../forms/InfoFormFields';

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
            setName(isMoon ? 'New Moon' : 'New Planet');
            setDesc('');
            setIcon('simple');
            setSize(isMoon ? 'tiny' : 'small');
            setColor('#808080');
        }
    }, [isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const isMoon = !!planet.orbit;
        const satellites = planets.filter(satellite => satellite.orbit?.primaryId === planet.id);
        const greatestSemi = satellites.length > 0 ? satellites.sort((a, b) => b.orbit.semi - a.orbit.semi)[0].orbit.semi : 0;
        const semi = (isMoon ? 0.001 : 1) * (Math.random() * 2.5 + 0.5) + greatestSemi;
        dispatch({ type: 'create', data: {
            name: event.target['name'].value,
            desc: event.target['desc'].value,
            icon: event.target['icon'].value,
            iconSize: event.target['size'].value,
            iconColor: event.target['color'].value,
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