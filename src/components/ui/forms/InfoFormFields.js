import { Container, Row, Col, FormGroup, Input, Label, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import PLANET_NAMES from '../../../data/PLANET_NAMES.json';

const iconOpts = ['simple', 'ringed', 'earth', 'moon', 'sun', 'cracked', 'striped', 'potato', 'black-hole'];
const sizeOpts = ['tiny', 'small', 'medium', 'large', 'huge'];

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const pick = (array) => array[Math.floor(array.length * Math.random())];

const InfoFormFields = ({ singleCol, name, setName, desc, setDesc, icon, setIcon, size, setSize, color, setColor, setChanged }) => {

    return (
        <Container style={{ padding: 0 }}>
            <Row>
                <Col md={singleCol ? 12 : 6}>
                    <FormGroup row>
                        <Row>
                            <Col xs={10} style={{ paddingRight: 0 }}>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    autoComplete='off'
                                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                    value={name}
                                    onChange={(event) => {
                                        setName(event.target.value);
                                        if(setChanged) setChanged(true);
                                    }}
                                />
                            </Col>
                            <Col xs={2} style={{ paddingLeft: 0 }}>
                                <Button
                                    style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setName(pick(PLANET_NAMES));
                                        if(setChanged) setChanged(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faDice} />
                                </Button>
                            </Col>
                        </Row>
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
                            onChange={(event) => {
                                setDesc(event.target.value);
                                if(setChanged) setChanged(true);
                            }}
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
                                onChange={(event) => {
                                    setIcon(event.target.value);
                                    if(setChanged) setChanged(true);
                                }}
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
                                onChange={(event) => {
                                    setSize(event.target.value);
                                    if(setChanged) setChanged(true);
                                }}
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
                                onChange={(event) => {
                                    setColor(event.target.value);
                                    if(setChanged) setChanged(true);
                                }}
                            />
                        </Col>
                    </FormGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default InfoFormFields;