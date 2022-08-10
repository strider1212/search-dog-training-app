import { Login } from "./Components/login";
import { Routes, Route } from 'react-router-dom';
import { Registration } from "./Components/registration";
import Header from './Components/header';
import Home from './Components/home'
import NewLog from "./Components/newLog";


function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/registration' element={<Registration />}/>
        <Route path='/newLog' element={<NewLog />}/>
      </Routes>
    </div>
    
  );
}

export default App;
