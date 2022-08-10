import { Login } from "./Components/login";
import { Routes, Route } from 'react-router-dom';
import { Registration } from "./Components/registration";
import Header from './Components/header';


function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/registration' element={<Registration />}/>
      </Routes>
    </div>
    
  );
}

export default App;
