import NexusButton from './components/NexusButton/NexusButton';
import { ReactComponent as PlusIcon } from './assets/icons/plus.svg'
import './App.css';

const App = () => {

  return (
    <div className={"dev-test"}>
      <NexusButton icon={PlusIcon}>
        Create a project
      </NexusButton>
    </div>
  );
}

export default App;
