import { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

const iconOpts = ['simple', 'ringed', 'earth', 'moon', 'sun', 'cracked', 'striped', 'potato', 'black-hole', 'barycenter'];
const sizeOpts = ['tiny', 'small', 'medium', 'large', 'huge'];

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);

const InfoForm = ({ planet, dispatch }) => {

    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [iconSize, setIconSize] = useState('');
    const [iconColor, setIconColor] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'update-info', data: {
            id: planet.id,
            name: event.target['name'].value,
            icon: event.target['icon'].value,
            iconSize: event.target['iconSize'].value,
            iconColor: event.target['iconColor'].value
        }});
    }

    useEffect(() => {
        setName(planet.name);
        setIcon(planet.icon);
        setIconSize(planet.iconSize);
        setIconColor(planet.iconColor);
    }, [planet]);

    return (
        <Form onSubmit={handleSubmit}>
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
            <Button type='submit'>Apply Changes</Button>
        </Form>
    );
}

export default InfoForm;