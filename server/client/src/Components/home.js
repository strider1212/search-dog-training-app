import Header from "../Components/header";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


//utils
import { HeaderInsert } from '../utils/headerInsert';
import { AuthorizationAlert } from '../utils/authorizationAlert';

const Home = () => {
  
  let navigate = useNavigate()

  const newLogClickHandler = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/logs/defaultAutRequest`, {something: 'something'}, HeaderInsert())
    .then(() => {
      navigate('/newLog')
    })
    .catch(error => {
      AuthorizationAlert(error)
      if (error.response) {
        console.log('error.response.data', error.response.data);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
      } else if (error.request) {
        console.log('error.request', error.request);
      } else {
        console.log('error.message', error.message);
      }
      console.log('error.config', error.config);
    })
  }
  
  const editLogsClickHandler = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/logs/defaultAutRequest`, {something: 'something'}, HeaderInsert())
    .then(() => {
      navigate('/editLogs')
    })
    .catch(error => {
      AuthorizationAlert(error)
      if (error.response) {
        console.log('error.response.data', error.response.data);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
      } else if (error.request) {
        console.log('error.request', error.request);
      } else {
        console.log('error.message', error.message);
      }
      console.log('error.config', error.config);
    })
  }
  
  return (
    <div>
      <header>
        <Header />
      </header>
    <div className="container">
      <div className="row">
        <div className="col-lg">
          <div className="row home-margin">
            <div className="col">
              <button type="button" className="btn btn-primary" onClick={() => newLogClickHandler()}>Create New Log</button>
            </div>
          </div>
          <div className="row home-margin">
            <div className="col">
              <button type="button" className="btn btn-primary" onClick={() => editLogsClickHandler()}>Edit My Logs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home;