import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from '../utils/checkboxFormPopulater';
import { submitHandler } from '../utils/submitHandler';

const WaterLog = () => {
  const initialState = {
    open: false,
    submerged: false,
    depth: 0, 
    saltWater: false,
    waterType: '',
    temperature: 0
  }
  const initialStateArray = ['depth', 'waterType',  'temperature'];
  const [formValues, setFormValue] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  let initialRender = useRef(true);
  const location = useLocation();
  const logId = location.state.logId;
  
  let navigate = useNavigate()

  //HOOKS
  useEffect(() => {
    if(initialRender.current) {
      initialRender.current = false;
    } else if (Object.keys(formErrors).length > 0) {
      alert('One or more of the request categories was not filled in. Please fill in any missing categories.')
    } else {
      const postForm = async () => {
        await axios.post(`http://localhost:3000/logs/water`, {
          open: formValues.open,
          submerged: formValues.submerged,
          depth: formValues.depth, 
          salt_water: formValues.saltWater, 
          water_type: formValues.waterType, 
          temperature: formValues.temperature,
          associatedLog: logId
        })
        .then(res => {
          navigate("/", {state: 
            {logId: logId,
            formValues: formValues
            } 
          })
        })
        .catch(error => {
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
    
        console.log('waterLog submitted')
      }
      postForm()

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])
  return (
    <form>
      {checkboxFormPopulater('open', 'Open Water?', setFormValue, formValues, 'open')}
      {checkboxFormPopulater('salt', 'Salt Water?', setFormValue, formValues, 'saltWater')}
      {checkboxFormPopulater('submerged', 'Source Submerged?', setFormValue, formValues, 'submerged')}
      {formPopulater('depth', 'Depth', 'number', 'How many feet below the surface was the source?...', setFormValue, formValues, 'depth')}
      {formPopulater('water-type', 'Water Type', 'text', 'Describe the type of water source it was (e.g. bay, river, etc.)...', setFormValue, formValues, 'waterType')}
      {formPopulater('temperature', 'Temperature', 'number', 'Give a number for the temperature in degrees fahrenheit?...', setFormValue, formValues, 'temperature')}
      <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Next</button>
      <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
     
    </form>
  )
}

export default WaterLog;