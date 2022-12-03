import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { submitHandler } from '../utils/submitHandler';

import { HeaderInsert } from '../utils/headerInsert';
import { AuthorizationAlert } from '../utils/authorizationAlert';
import { FormPopulaterForWeather } from './formPopulaterForWeather';

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
        
        {FormPopulaterForWeather('weather', 'Weather', 'text', 'Description of the weather...', setFormValue, formValues, 'weather', formErrors, 'weather', weatherLocation)}
      
        {FormPopulaterForWeather('temperature', 'Temperature', 'number', 'Number of degrees fahrenheit...', setFormValue, formValues, 'temperature', formErrors, 'temperature', temperatureLocation)}

        {FormPopulaterForWeather('wind-speed', 'Wind Speed', 'number', 'Number of MPH...', setFormValue, formValues, 'windSpeed', formErrors, 'windSpeed', windspeedLocation)}

        {FormPopulaterForWeather('humidity', 'Humidity', 'number', 'Enter a number representing a percent...', setFormValue, formValues, 'humidity', formErrors, 'humidity', humidityLocation)}
      
      <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Next</button>
      <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
    
  )
}

export default ManualWeather;