import { useState } from 'react';
import { Collapse } from 'reactstrap';

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true);

    return(
        <div style={{ position: 'absolute', height: '100vh', backgroundColor: 'white' }}>
            <div style={{ position: 'absolute', right: 0, height: '100vh' }}>
                <div style={{ position: 'absolute', left: 0, width: 20, height: '100vh', backgroundColor: 'gray' }}>
                    <button onClick={() => setIsOpen(!isOpen)} style={styles.toggleButton}>{isOpen ? 'close' : 'open'}</button>
                </div>
            </div>
            <Collapse horizontal isOpen={isOpen}>
                <div style={{ width: 300 }}>
                    sidebar
                </div>
            </Collapse>
        </div>
    );
}

const styles = {
    toggleButton: {
        position: 'absolute',
        padding: '1em',
        paddingLeft: 0,
        border: 'none',
        borderRadius: '0 100% 100% 0',
        top: '50%',
        transform: 'translateY(-50%)'
    }
}

export default Sidebar;