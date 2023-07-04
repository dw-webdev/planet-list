import {Container, Row, Col, FormGroup, Input, Label} from 'reactstrap';

const iconOpts = ['simple', 'ringed', 'earth', 'moon', 'sun', 'cracked', 'striped', 'potato', 'black-hole', 'barycenter'];
const sizeOpts = ['tiny', 'small', 'medium', 'large', 'huge'];

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);

const InfoFormFields = ({ singleCol, name, setName, desc, setDesc, icon, setIcon, size, setSize, color, setColor }) => {

    return (
        <Container style={{ padding: 0 }}>
            <Row>
                <Col md={singleCol ? 12 : 6}>
                    <FormGroup>
                        <Input
                            type='text'
                            name='name'
                            id='name'
                            placeholder='Name'
                            autoComplete='off'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type='textarea'
                            name='desc'
                            id='desc'
                            rows={5}
                            placeholder='Description'
                            autoComplete='off'
                            value={desc}
                            onChange={(event) => setDesc(event.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={singleCol ? 12 : 6}>
                    <FormGroup row>
                        <Label xs={3} for='icon'>Icon</Label>
                        <Col xs={9}>
                            <Input
                                type='select'
                                name='icon'
                                id='icon'
                                value={icon}
                                onChange={(event) => setIcon(event.target.value)}
                            >
                                {iconOpts.map(iconOpt => (
                                <option
                                    key={iconOpt}
                                    value={iconOpt}
                                >
                                    {capitalize(iconOpt)}
                                </option>
                                ))}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label xs={3} for='size'>Size</Label>
                        <Col xs={9}>
                            <Input
                                type='select'
                                name='size'
                                id='size'
                                value={size}
                                onChange={(event) => setSize(event.target.value)}
                            >
                                {sizeOpts.map(sizeOpt => (
                                <option
                                    key={sizeOpt}
                                    value={sizeOpt}
                                >
                                    {capitalize(sizeOpt)}
                                </option>
                                ))}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label xs={3} for="color">Color</Label>
                        <Col xs={9}>
                            <Input
                                type="color"
                                name="color"
                                id="color"
                                value={color}
                                style={{ height: '2.5em', padding: '0.75em' }}
                                onChange={(event) => setColor(event.target.value)}
                            />
                        </Col>
                    </FormGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default InfoFormFields;