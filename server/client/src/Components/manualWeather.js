import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { submitHandler } from '../utils/submitHandler';

const ManualWeather = () => {
  //STATE
  const initialState = {
    weather: '',
    temperature: '',
    windSpeed: '',
    humidity: '',
    associatedLog: ''
  }
  const initialStateArray = ['weather', 'temperature', 'windSpeed', 'humidity', 'associatedLog'];
  const [formValues, setFormValue] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  let initialRender = useRef(true);
  
  let navigate = useNavigate()

  //HOOKS
  useEffect(() => {
    if(initialRender.current) {
      initialRender.current = false;
    } else if (Object.keys(formErrors).length > 0) {
      alert('One or more of the request categories was not filled in. Please fill in any missing categories.')
    } else {
      const postForm = async () => {
        await axios.post(`http://localhost:3000/logs`, {
          log_created_by: formValues.createdBy,
          date: formValues.date,
          address: formValues.address, 
          team: formValues.team, 
          time: formValues.time
        })
        .then(res => {
            navigate("/manualWeather", {state: 
              {logId: res.data._id,
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
    
        console.log('Log submitted')
      }
      postForm()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])

  return (
    <div>
       <p>{formErrors.weather}</p>
       {formPopulater('weather', 'Weather', 'text', 'Description of the weather...', setFormValue, formValues, 'weather')}
       <p>{formErrors.temperature}</p>
       {formPopulater('temperature', 'Temperature', 'number', 'Number of degrees fahrenheit...', setFormValue, formValues, 'temperature')}
       <p>{formErrors.windSpeed}</p>
       {formPopulater('wind-speed', 'Wind Speed', 'number', 'Number of MPH...', setFormValue, formValues, 'windSpeed')}
       <p>{formErrors.humidity}</p>
       {formPopulater('humidity', 'Humidity', 'number', 'Enter a number representing a percent...', setFormValue, formValues, 'humidity')}

      
      <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Next</button>
      <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
    </div>
    
  )
}

export default ManualWeather;