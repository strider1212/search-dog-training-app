import { Login } from "./Components/login";
import { Routes, Route } from 'react-router-dom';
import { Registration } from "./Components/registration";
import Home from './Components/home'
import NewLog from "./Components/newLog";
import WaterLog from "./Components/waterLog";


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/registration' element={<Registration />}/>
        <Route path='/newLog' element={<NewLog />}/>
        <Route path='/waterLog' element={<WaterLog />}/>
      </Routes>
    </div>
    
  );
}

export default App;
