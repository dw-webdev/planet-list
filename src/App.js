import { PlanetsProvider } from './components/providers/PlanetsProvider';
import { ViewControlsProvider } from './components/providers/ViewControlsProvider';
import PlanetCanvas from './components/canvas/PlanetCanvas';
import PlanetDesc from './components/ui/PlanetDesc';
import Sidebar from './components/ui/Sidebar';

const App = () => {

    return(
        <PlanetsProvider>
            <ViewControlsProvider>
                <PlanetCanvas/>
                <PlanetDesc />
                <Sidebar/>
            </ViewControlsProvider>
        </PlanetsProvider>
    );
};

export default App;