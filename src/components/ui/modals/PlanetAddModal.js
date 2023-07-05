import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Button } from 'reactstrap';
import { usePlanetsProvider } from '../../providers/PlanetsProvider';
import InfoFormFields from '../forms/InfoFormFields';

const PlanetAddModal = ({ isOpen, setIsOpen, primary }) => {

    const { planets, dispatch } = usePlanetsProvider();

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [icon, setIcon] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        if(isOpen) {
            setName((isMoon ? 'Moon ' : 'Planet ') + (satellites.length + 1));
            setDesc('');
            setIcon('simple');
            setSize(isMoon ? 'tiny' : 'small');
            setColor('#808080');
        }
    }, [isOpen]);

    const satellites = primary ? planets.filter(satellite => satellite.primaryId === primary.id) : [];
    const isMoon = primary ? !!planets.find(planet => planet.id === primary.id).primaryId : false;

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'create', data: {
            primaryId: primary.id,
            isMoon,
            name: event.target['name'].value,
            desc: event.target['desc'].value,
            icon: event.target['icon'].value,
            iconSize: event.target['size'].value,
            iconColor: event.target['color'].value,
            orbitElements: {
                semi: (Math.pow(satellites.length, 2) * 0.5 + 1) * (isMoon ? 0.001 : 0.5)
            }
        }});
        setIsOpen(false);
        console.log(planets[planets.length - 1]);
    }
    
    return(
        <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader className='bg-primary text-light'>New satellite of {primary?.name}</ModalHeader>
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