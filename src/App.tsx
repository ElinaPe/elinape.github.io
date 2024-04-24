import { CalculatorProvider } from './components/CalculatorContext';
import SimpleTabs from './pages/Tabs';


function App() {


    return (
        <>
        <CalculatorProvider>
            <SimpleTabs />
        </CalculatorProvider>
            
        </>
    );
}

export default App;