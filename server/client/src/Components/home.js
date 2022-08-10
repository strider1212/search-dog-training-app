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
          <div className="row">
            <Link to="/newLog">
              <button type="button" className="btn btn-primary">New Log</button>
            </Link>
          </div>
          <div className="row">
            <button type="button" className="btn btn-primary">Edit Logs</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home;