import { Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { useViewControlsProvider } from '../providers/ViewControlsProvider';

const PlanetControls = () => {

    const { showEclip, setShowEclip, exMoonOrb, setExMoonOrb } = useViewControlsProvider();
    
    return (
        <Card style={{ margin: '1em 0' }}>
            <CardBody style={{ padding: '0.5em 0.75em' }}>
                <Form>
                    <FormGroup switch inline>
                        <Input role='switch' type='switch' checked={exMoonOrb} onChange={(event) => setExMoonOrb(event.target.checked)} />
                        <Label check>Exaggerate Scale</Label>
                    </FormGroup>
                    <FormGroup switch inline>
                        <Input role='switch' type='switch' checked={showEclip} onChange={(event) => setShowEclip(event.target.checked)} />
                        <Label check>Show Ecliptic</Label>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
};

export default PlanetControls;