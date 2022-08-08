import { Login } from "./routes/login";
import { Routes, Route } from 'react-router-dom';
import { Registration } from "./routes/registration";


function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/registration' element={<Registration />}/>
    </Routes>
  );
}

export default App;
