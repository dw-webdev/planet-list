import { ListGroup, ListGroupItem, Button } from 'reactstrap';

const MoonForm = ({ planet, selectPlanet, planets, dispatch }) => {

    const getRandomPlanet = (primaryId) => {

        const existingCount = planets.filter(moon => moon.primaryId === primaryId).length;
        const primaryIsSun = !planets.find(primary => primary.id === primaryId).primaryId;

        return {
            primaryId,
            name: (primaryIsSun ? 'Planet ' : 'Moon ') + (existingCount + 1),
            icon: 'simple',
            iconSize: primaryIsSun ? 'small' : 'tiny',
            iconColor: '#808080',
            orbitElements: {
                semi: (Math.pow(existingCount, 2) * 0.5 + 1) * (primaryIsSun ? 150000000 : 250000)
            }
        }
    };

    return(
        <>
            <ul style={{ paddingLeft: 0, listStyle: 'none'}}>
                {planets.filter(moon => moon.primaryId === planet.id).map(moon => (
                <li key={moon.id}>
                    {moon.name}
                    <div style={{ float: 'right' }}>
                        <Button onClick={() => selectPlanet(moon)}>&rarr;</Button>
                        <Button onClick={() => dispatch({ type: 'delete', data: moon.id })}>&times;</Button>
                    </div>
                    <div style={{ clear: 'both' }} />
                </li>
                ))}
            </ul>
            <Button onClick={() => dispatch({ type: 'create', data: getRandomPlanet(planet.id) })} style={{ float: 'right' }}>Add New...</Button>
        </>
    );
};

export default MoonForm;