import { Link } from "react-router-dom";
import Header from "../Components/header";

const Home = () => {
  
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
              <button type="button" className="btn btn-primary" onClick={() => alert('clicked')}>Edit Logs</button>
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