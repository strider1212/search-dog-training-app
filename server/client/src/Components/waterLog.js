import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from "../utils/checkboxFormPopulater";

const WaterLog = () => {
  const initialState = {
    open: false,
    submerged: false,
    depth: 0, 
    saltWater: false,
    waterType: '',
    temperature: 0
  }

  const [formValues, setFormValue] = useState(initialState)

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    console.log('LogId state in waterLog', location.state.logId)
  })
  
  const submitHandler = async () => {

    await axios.post(`http://localhost:3000/logs/water`, {
      open: formValues.open, 
      submerged: formValues.submerged,
      depth: formValues.depth,
      salt_water: formValues.saltWater,
      water_type: formValues.waterType,
      temperature: formValues.temperature
    })
    .then(res => {
        console.log(res)
        navigate("/")
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('error.response.data', error.response.data);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('error.request', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('error.message', error.message);
      }
      console.log('error.config', error.config);
    })

    console.log('Log submitted')
  }
  
  return (
    <form>
      {checkboxFormPopulater('open', 'Open Water?', setFormValue, formValues, 'open')}
      {checkboxFormPopulater('salt', 'Salt Water?', setFormValue, formValues, 'saltWater')}
      {checkboxFormPopulater('submerged', 'Source Submerged?', setFormValue, formValues, 'submerged')}
      {formPopulater('depth', 'Depth', 'number', 'How many feet below the surface was the source?...', setFormValue, formValues, 'depth')}
      {formPopulater('water-type', 'Water Type', 'text', 'Describe the type of water source it was (e.g. bay, river, etc.)...', setFormValue, formValues, 'waterType')}
      {formPopulater('temperature', 'Temperature', 'number', 'Give a number for the temperature in degrees fahrenheit?...', setFormValue, formValues, 'temperature')}
      <button type="button" className="btn btn-primary" onClick={submitHandler}>Submit</button> 
     
    </form>
  )
}

export default WaterLog;