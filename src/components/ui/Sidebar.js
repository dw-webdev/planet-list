import { useState, useEffect } from 'react';
import { Collapse, Container, Row, Col, Button } from 'reactstrap';
import ViewControls from './ViewControls';
import PlanetInfo from './PlanetInfo';
import PlanetList from './PlanetList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [sidebarCss, setSidebarCss] = useState();
    const [columnCss, setColumnCss] = useState();

    useEffect(() => {
        const onResize = () => {
            const gte400 = window.matchMedia('(min-width: 400px)').matches;
            const gte500 = window.matchMedia('(min-width: 500px)').matches;
            const gte600 = window.matchMedia('(min-width: 600px)').matches;
            const width = gte600 ? 550 : gte500 ? 450 : gte400 ? 350 : 250;
            setSidebarCss({
                width: width,
                height: '100vh',
                overflowY: 'scroll'
            });
            setColumnCss(gte500 ? {
                float: 'left',
                width: '50%',
                padding: '0 1em',
                boxSizing: 'border-box'
            } : {
                float: 'none',
                width: '100%',
                padding: '0 1em',
                boxSizing: 'border-box'
            });
        };
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize); // cleanup
    }, []);

    return(
        <div style={{ position: 'absolute', height: '100vh', backgroundColor: 'white' }}>
            <div style={{ position: 'absolute', right: 0, height: '100vh' }}>
                <div className='bg-primary' style={{ position: 'absolute', left: 0, width: 2, height: '100vh' }}>
                    <Button
                        style={styles.toggleButtonLeft}
                        onClick={() => setIsOpen(false)}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                    <Button
                        style={styles.toggleButtonRight}
                        onClick={() => setIsOpen(true)}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </div>
            </div>
            <Collapse horizontal isOpen={isOpen}>
                <div style={sidebarCss}>
                    <div style={{ padding: '0 1em' }}>
                        <ViewControls />
                    </div>
                    <div style={columnCss}>
                        <PlanetList />
                    </div>
                    <div style={columnCss}>
                        <PlanetInfo />
                    </div>
                    <div style={{ clear: 'both' }} />
                </div>
            </Collapse>
        </div>
    );
}

const styles = {
    toggleButtonLeft: {
        position: 'absolute',
        right: '50%',
        top: '50%',
        zIndex: 1,
        transform: 'translateY(-50%)',
        borderRadius: '100% 0 0 100%'
    },
    toggleButtonRight: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        zIndex: 1,
        transform: 'translateY(-50%)',
        borderRadius: '0 100% 100% 0'
    }
}

export default Sidebar;