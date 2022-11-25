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
import SignUp from "./Components/signUp";
import SignIn from "./Components/signIn";
import EditLogs from "./Components/editLogs";
import ViewAllLogs from "./Components/viewAllLogs";
import ViewIndividualLog from "./Components/viewIndividualLog";


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
        <Route path='/signUp' element={<SignUp />}/>
        <Route path='/signIn' element={<SignIn />}/>
        <Route path='/editLogs' element={<EditLogs />} />
        <Route path='/viewAllLogs' element={<ViewAllLogs />} />
        <Route path='/viewIndividualLog' element={<ViewIndividualLog />} />
      </Routes>
    </div>
    
  );
}

export default App;
