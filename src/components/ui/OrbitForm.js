import { Form, FormGroup, Input, Label } from 'reactstrap';

const OrbitForm = ({ planetSelected, planetsDispatch }) => {

    return (
        <Form>
            <FormGroup>
                <Label for='semi'>Semi-major Axis</Label>
                <Input name='semi' id='semi' type='number' />
            </FormGroup>
            <FormGroup>
                <Label for='ecc'>Eccentricity</Label>
                <Input name='ecc' id='ecc' type='number' />
            </FormGroup>
            <FormGroup>
                <Label for='inc'>Inclination</Label>
                <Input name='inc' id='inc' type='number' />
            </FormGroup>
            <FormGroup>
                <Label for='meanLong'>Mean Longitude</Label>
                <Input name='meanLong' id='meanLong' type='number' />
            </FormGroup>
            <FormGroup>
                <Label for='longPeri'>Longitude of Periapsis</Label>
                <Input name='longPeri' id='longPeri' type='number' />
            </FormGroup>
            <FormGroup>
                <Label for='longAsc'>Longitude of Ascending Node</Label>
                <Input name='longAsc' id='longAsc' type='number' />
            </FormGroup>
        </Form>
    );
}

export default OrbitForm;