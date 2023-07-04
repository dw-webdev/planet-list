import { useState, useEffect } from 'react';
import { Form, Button } from 'reactstrap';
import InfoFormFields from './InfoFormFields';

const InfoForm = ({ planet, dispatch }) => {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [icon, setIcon] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'update-info', data: {
            id: planet.id,
            name: event.target['name'].value,
            desc: event.target['desc'].value,
            icon: event.target['icon'].value,
            iconSize: event.target['size'].value,
            iconColor: event.target['color'].value
        }});
    }

    useEffect(() => {
        setName(null); // to clear field if empty string
        setName(planet.name);
        setDesc(null); // to clear field if empty string
        setDesc(planet.desc);
        setIcon(planet.icon);
        setSize(planet.iconSize);
        setColor(planet.iconColor);
    }, [planet]);

    return (
        <Form onSubmit={handleSubmit}>
            <InfoFormFields
                singleCol={true}
                name={name} setName={setName}
                desc={desc} setDesc={setDesc}
                icon={icon} setIcon={setIcon}
                size={size} setSize={setSize}
                color={color} setColor={setColor}
            />
            <Button type='submit' block color='primary'>Apply Changes</Button>
        </Form>
    );
}

export default InfoForm;