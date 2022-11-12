import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/header";
import axios from 'axios';

const Home = () => {

  let navigate = useNavigate()
  
  const editLogsClickHandler = () => {
    axios.post('http://localhost:3000/logs/editRequest')
    .then(res => {
      if (res.data.access === 'granted') {
        navigate('/editLogs')
      } else {
        alert('Must be signed in to access this feature')
      }
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
              <Link to="/newLog">
                <button type="button" className="btn btn-primary">New Log</button>
              </Link>
            </div>
          </div>
          <div className="row home-margin">
            <div className="col">
              <button type="button" className="btn btn-primary" onClick={() => editLogsClickHandler()}>Edit Logs</button>
              {/* <Link to="/editLogs">
                <button type="button" className="btn btn-primary">Edit Logs</button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home;