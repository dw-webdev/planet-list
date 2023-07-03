import { Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';

const PlanetControls = ({ showEclip, setShowEclip, exMoonOrb, setExMoonOrb }) => {

    return (
        <Card style={{position: 'absolute', top: 0, right: 0, width: 375 }}>
            <CardBody>
                <Form>
                    <FormGroup check inline>
                    <Input type="checkbox" checked={showEclip} onChange={(event) => setShowEclip(event.target.checked)} />
                        <Label check>Show Ecliptic</Label>
                    </FormGroup>
                    <FormGroup check inline>
                        <Input type="checkbox" checked={exMoonOrb} onChange={(event) => setExMoonOrb(event.target.checked)} />
                        <Label check>Exagerate Moon Orbits</Label>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
};

export default PlanetControls;