import { Form, FormGroup, Input, Label } from 'reactstrap';

const InfoForm = ({ planetSelected, planetsDispatch }) => {

    return (
        <Form>
            <FormGroup>
                <Label for='name'>Name</Label>
                <Input type='text' name='name' id='name' />
            </FormGroup>
            <FormGroup>
                <Label for='icon'>Icon</Label>
                <Input type='select' name='icon' id='icon'>
                    <option value='simple'>Simple</option>
                    <option value='ringed'>Ringed</option>
                    <option value='earth'>Earth</option>
                    <option value='moon'>Moon</option>
                    <option value='sun'>Sun</option>
                    <option value='cracked'>Cracked</option>
                    <option value='striped'>Striped</option>
                    <option value='potato'>Potato</option>
                    <option value='black-hole'>Black Hole</option>
                    <option value='barycenter'>Barycenter</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for='iconSize'>Size</Label>
                <Input type='select' name='iconSize' id='iconSize'>
                    <option value='tiny'>Tiny</option>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                    <option value='huge'>Huge</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="iconColor">Color</Label>
                <Input type="color" name="iconColor" id="iconColor" />
            </FormGroup>
        </Form>
    );
}

export default InfoForm;