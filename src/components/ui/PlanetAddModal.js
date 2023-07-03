import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Button } from 'reactstrap';

const iconOpts = ['simple', 'ringed', 'earth', 'moon', 'sun', 'cracked', 'striped', 'potato', 'black-hole', 'barycenter'];
const sizeOpts = ['tiny', 'small', 'medium', 'large', 'huge'];

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);

const PlanetAddModal = ({ isOpen, setIsOpen, primary, planets, dispatch }) => {

    const toggle = () => setIsOpen(!isOpen);

    const [existingCount, setExistingCount] = useState(0);
    const [isMoon, setIsMoon] = useState(false);
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [iconSize, setIconSize] = useState('');
    const [iconColor, setIconColor] = useState('');

    useEffect(() => {
        if(primary) {
            setExistingCount(planets.filter(planet => planet.primaryId === primary.id).length);
            setIsMoon(!!planets.find(planet => planet.id === primary.id).primaryId);
        }
    }, [primary]);

    useEffect(() => {
        setName((isMoon ? 'Moon ' : 'Planet ') + (existingCount + 1));
        setIcon('simple');
        setIconSize(isMoon ? 'tiny' : 'small');
        setIconColor('#808080');
    }, [isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'create', data: {
            primaryId: primary.id,
            isMoon,
            name: event.target['name'].value,
            icon: event.target['icon'].value,
            iconSize: event.target['iconSize'].value,
            iconColor: event.target['iconColor'].value,
            orbitElements: {
                semi: (Math.pow(existingCount, 2) * 0.5 + 1) * (isMoon ? 125000 : 75000000)
            }
        }});
        setIsOpen(false);
    }
    
    return(
        <Modal isOpen={isOpen} toggle={toggle}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader>New {isMoon ? 'moon' : 'satellite'} of {primary?.name}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='name'>Name</Label>
                        <Input type='text' name='name' id='name' value={name} onChange={(event) => setName(event.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='icon'>Icon</Label>
                        <Input type='select' name='icon' id='icon' value={icon} onChange={(event) => setIcon(event.target.value)}>
                            {iconOpts.map(iconOpt => (<option key={iconOpt} value={iconOpt}>{capitalize(iconOpt)}</option>))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='iconSize'>Size</Label>
                        <Input type='select' name='iconSize' id='iconSize' value={iconSize} onChange={(event) => setIconSize(event.target.value)}>
                            {sizeOpts.map(sizeOpt => (<option key={sizeOpt} value={sizeOpt}>{capitalize(sizeOpt)}</option>))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="iconColor">Color</Label>
                        <Input type="color" name="iconColor" id="iconColor" value={iconColor} onChange={(event) => setIconColor(event.target.value)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type='submit'>Create</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default PlanetAddModal;