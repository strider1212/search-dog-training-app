import { Login } from "./Components/login";
import { Routes, Route } from 'react-router-dom';
import { Registration } from "./Components/registration";


function App() {
  return (
    <div>
      <header>

      </header>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/registration' element={<Registration />}/>
      </Routes>
    </div>
    
  );
}

export default App;
