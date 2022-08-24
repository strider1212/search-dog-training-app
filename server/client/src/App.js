import { Login } from "./Components/login";
import { Routes, Route } from 'react-router-dom';
import { Registration } from "./Components/registration";
import Home from './Components/home'
import NewLog from "./Components/newLog";
import WaterLog from "./Components/waterLog";
import ManualWeather from "./Components/manualWeather";
import HoursAndStats from "./Components/hoursAndStats";
import TrainingInfo from "./Components/trainingInfo";
import IndividualRuns from "./Components/individualRuns";


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/registration' element={<Registration />}/>
        <Route path='/newLog' element={<NewLog />}/>
        <Route path='/waterLog' element={<WaterLog />}/>
        <Route path='/manualWeather' element={<ManualWeather />}/>
        <Route path='/hoursAndStats' element={<HoursAndStats />}/>
        <Route path='/trainingInfo' element={<TrainingInfo />}/>
        <Route path='/individualRuns' element={<IndividualRuns />}/>
      </Routes>
    </div>
    
  );
}

export default App;
