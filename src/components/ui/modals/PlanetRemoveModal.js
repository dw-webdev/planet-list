import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { usePlanetsProvider } from '../../providers/PlanetsProvider';

const PlanetRemoveModal = ({ isOpen, setIsOpen, planet }) => {

    const { planets, dispatch } = usePlanetsProvider();

    const [toRemove, setToRemove] = useState([]);
    const getToRemove = (id) => planets.filter(satellite => satellite.orbit?.primaryId === id).reduce((ids, satellite) => [...ids, ...getToRemove(satellite.id, ids)], [id]);

    useEffect(() => {
        if(isOpen) {
            setToRemove(getToRemove(planet.id));
        }
    }, [isOpen]);

    return(
        <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
            <ModalHeader className='bg-primary text-light'>Remove {planet?.name}</ModalHeader>
            <ModalBody>Are you sure you want to remove {toRemove.map(id => planets.find(planet => planet.id === id)?.name).join(', ')}?</ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => {
                    toRemove.forEach(id => dispatch({ type: 'delete', data: id }));
                    setIsOpen(false);
                }}>Remove</Button>{' '}
                <Button color="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default PlanetRemoveModal;