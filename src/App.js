import { PlanetsProvider } from './components/providers/PlanetsProvider';
import { ViewControlsProvider } from './components/providers/ViewControlsProvider';
import PlanetCanvas from './components/canvas/PlanetCanvas';
import Sidebar from './components/ui/Sidebar';

const App = () => {

    return(
        <PlanetsProvider>
            <ViewControlsProvider>
                <PlanetCanvas/>
                <Sidebar/>
            </ViewControlsProvider>
        </PlanetsProvider>
    );
};

export default App;