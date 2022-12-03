import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { submitHandler } from '../utils/submitHandler';

import { HeaderInsert } from '../utils/headerInsert';
import { AuthorizationAlert } from '../utils/authorizationAlert';

const ManualWeather = () => {
  //STATE
  const location = useLocation();
  const logId = location.state.logId;
  let weatherLocation = '';
  let temperatureLocation = '';
  let windspeedLocation = '';
  let humidityLocation = '';

  if (location.state.weatherValues != null) {
    weatherLocation = location.state.weatherValues.weather;
    temperatureLocation = location.state.weatherValues.temperature;
    windspeedLocation = location.state.weatherValues.windSpeed;
    humidityLocation = location.state.weatherValues.humidity;
  }
  
  const initialState = {
    weather: weatherLocation,
    temperature: temperatureLocation,
    windSpeed: windspeedLocation,
    humidity: humidityLocation,
    associatedLog: ''
  }
  const initialStateArray = ['weather', 'temperature', 'windSpeed', 'humidity'];
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
      const postForm = () => {
        axios.post(`http://localhost:3000/logs/manualWeather`, {
          weather: formValues.weather,
          temperature: formValues.temperature,
          wind_speed: formValues.windSpeed, 
          humidity: formValues.humidity, 
          associatedLog: logId
        },
        HeaderInsert()
        )
        .then(res => {
          navigate("/hoursAndStats", {state: 
            {logId: logId,
            formValues: formValues
            } 
          })
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
    
        console.log('manualWeather submitted')
      }
      postForm()

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])

  return (
    <div>
      <form>
        
        
       {/* <p>{formErrors.weather}</p>
       <label htmlFor='weather'>Weather:</label>
        <input
        type='text'
        className="form-control"
        id='weather'
        placeholder='Description of the weather...'
        onInput={(e) => setFormValue({
          ...formValues,
            weather: e.target.value
        })}
        defaultValue={weatherLocation}
        /> */}

       {/* <p>{formErrors.temperature}</p>
       <label htmlFor='temperature'>Temperature:</label>
        <input
        type='number'
        className="form-control"
        id='temperature'
        placeholder='Number of degrees fahrenheit...'
        onInput={(e) => setFormValue({
          ...formValues,
          temperature: e.target.value
        })}
        defaultValue={temperatureLocation}
        /> */}

       {/* <p>{formErrors.windSpeed}</p>
       <label htmlFor='wind-speed'>Wind Speed:</label>
        <input
        type='number'
        className="form-control"
        id='wind-speed'
        placeholder='Number of MPH...'
        onInput={(e) => setFormValue({
          ...formValues,
          windSpeed: e.target.value
        })}
        defaultValue={windspeedLocation}
        /> */}

       {/* <p>{formErrors.humidity}</p>
       <label htmlFor='humidity'>Humidity:</label>
        <input
        type='number'
        className="form-control"
        id='humidity'
        placeholder='Enter a number representing a percent...'
        onInput={(e) => setFormValue({
          ...formValues,
          humidity: e.target.value
        })}
        defaultValue={humidityLocation}
        /> */}
      
      <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Next</button>
      <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
    
  )
}

export default ManualWeather;