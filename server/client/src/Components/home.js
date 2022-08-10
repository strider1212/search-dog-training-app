import { Link } from "react-router-dom";

const Home = () => {
  return (
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
  )
}

export default Home;