import { Form, FormGroup, Label, Input } from 'reactstrap';

const PlanetControls = ({ showEclip, setShowEclip, exMoonOrb, setExMoonOrb }) => {

    return (
        <Form style={{ padding: '1em' }}>
            <FormGroup check inline>
            <Input type="checkbox" checked={showEclip} onChange={(event) => setShowEclip(event.target.checked)} />
                <Label check>Show Ecliptic</Label>
            </FormGroup>
            <FormGroup check inline>
                <Input type="checkbox" checked={exMoonOrb} onChange={(event) => setExMoonOrb(event.target.checked)} />
                <Label check>Exagerate Moon Orbits</Label>
            </FormGroup>
        </Form>
    );
};

export default PlanetControls;