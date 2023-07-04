import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { usePlanetsProvider } from '../../providers/PlanetsProvider';

const PlanetRemoveModal = ({ isOpen, setIsOpen, planet }) => {

    const { planets, dispatch, setEditMode } = usePlanetsProvider();

    const satellites = planet ? planets.filter(satellite => satellite.primaryId === planet.id) : [];
    
    return(
        <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
            <ModalHeader className='bg-danger text-light'>Remove {planet?.name}</ModalHeader>
            <ModalBody>Are you sure you want to remove {planet?.name}{satellites.length > 0 ? (satellites.length > 1 ? ' and its satellites ' : ' and its satellite ') + (satellites.map(satellite => satellite.name).join(', ')) : ''}?</ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => {
                    dispatch({ type: 'delete', data: planet?.id });
                    setEditMode(false);
                    setIsOpen(false);
                }}>Remove</Button>{' '}
                <Button color="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default PlanetRemoveModal;