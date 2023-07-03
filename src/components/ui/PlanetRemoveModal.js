import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const PlanetRemoveModal = ({ isOpen, setIsOpen, planet, dispatch }) => {

    const toggle = () => setIsOpen(!isOpen);
    
    return(
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>Remove {planet?.name}?</ModalHeader>
            <ModalBody>Are you sure you want to remove {planet?.name} and its satellites?</ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {
                    dispatch({ type: 'delete', data: planet?.id });
                    toggle();
                }}>Remove</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default PlanetRemoveModal;