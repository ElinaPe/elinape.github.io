import { CalculatorProvider } from './components/CalculatorContext';
import ListedResults from './pages/ResultsList';
import SimpleTabs from './pages/Tabs';


function App() {


    return (
        <>
        <CalculatorProvider>
            <SimpleTabs />
            {/* <ListedResults/> */}
        </CalculatorProvider>
            
        </>
    );
}

export default App;