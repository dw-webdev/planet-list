import { useState } from 'react';
import { Collapse, Container, Row, Col } from 'reactstrap';
import ViewControls from './ViewControls';
import PlanetInfo from './PlanetInfo';
import PlanetList from './PlanetList';

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true);

    return(
        <div style={{ position: 'absolute', height: '100vh', backgroundColor: 'white' }}>
            <div style={{ position: 'absolute', right: 0, height: '100vh' }}>
                <div style={{ position: 'absolute', left: 0, width: 18, height: '100vh', backgroundColor: '#c0c0c0' }}>
                    <button onClick={() => setIsOpen(!isOpen)} style={styles.toggleButton}>{isOpen ? 'close' : 'open'}</button>
                </div>
            </div>
            <Collapse horizontal isOpen={isOpen}>
                <Container style={{ width: 500, height: '100vh', overflowY: 'scroll' }}>
                    <Row>
                        <Col>
                            <ViewControls />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <PlanetList />
                        </Col>
                        <Col md='6'>
                            <PlanetInfo />
                        </Col>
                    </Row>
                </Container>
            </Collapse>
        </div>
    );
}

const styles = {
    toggleButton: {
        position: 'absolute',
        padding: '1em',
        paddingLeft: '0.5em',
        border: 'none',
        borderRadius: '0 100% 100% 0',
        top: '50%',
        transform: 'translateY(-50%)'
    }
}

export default Sidebar;