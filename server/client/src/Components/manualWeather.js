import { useNavigate } from "react-router-dom";

const ManualWeather = () => {
  let navigate = useNavigate()

  return (
    <div>
      <div>manualWeather.js</div>

      {/*DEV ONLY*/}
      <button type='button' className="btn btn-secondary" onClick={() => navigate('/newLog')}>go back</button>
    </div>
    
  )
}

export default ManualWeather;