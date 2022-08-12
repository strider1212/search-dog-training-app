import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from '../utils/checkboxFormPopulater';

const NewLog = () => {

  const initialState = {
    createdBy: '',
    date: '',
    time: '',
    address: '',
    team: '',
    trainingType: '',
    trainingHours: 0,
    travelHours: 0,
    aggregiateHours: 0,
    mileage: 0,
    tolls: 0,
    weather: '',
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    placementDescription: '',
    placedBy: '',
    scentSource: '',
    souceContainer: '',
    water: false
  }

  const [formValues, setFormValue] = useState(initialState);

  let navigate = useNavigate();

  const submitHandler = async () => {

    await axios.post(`http://localhost:3000/logs`, {
      log_created_by: formValues.createdBy,
      date: formValues.date,
      address: formValues.address, 
      team: formValues.team, 
      training_hours: formValues.trainingHours,
      travel_hours: formValues.travelHours,
      aggregate_hours: formValues.aggregiateHours,
      mileage: formValues.mileage,
      tolls: formValues.tolls,
      weather: formValues.weather,
      temperature: formValues.temperature,
      wind_speed: formValues.windSpeed,
      humidity: formValues.humidity,
      placement_description: formValues.placementDescription,
      placed_by: formValues.placedBy,
      scent_source: formValues.scentSource,
      source_container: formValues.souceContainer,
      time: formValues.time,
      water: formValues.water,
      training_type: formValues.trainingType
    })
    .then(res => {
      if (res.data.water) {
        navigate("/waterLog")
      }
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
      {formPopulater('created_by', 'Created By', 'text', 'Your Name...', setFormValue, formValues, 'log_created_by')}
      {formPopulater('date', 'Date', 'date', 'Date on which the drill was executed...', setFormValue, formValues, 'date')}
      {formPopulater('time', 'Time', 'time', '', setFormValue, formValues, 'time')}
      {/* 
      {formPopulater('time', 'Time', 'time', 'form-control', '', setTime)}
      {formPopulater('address', 'Address', 'text', 'form-control', 'Address of the training...', setAddress)}
      {formPopulater('team', 'Team', 'text', 'form-control', 'Team Name...', setTeam)}
      {formPopulater('training-type', 'Training Type', 'text', 'form-control', 'Training type...', setTrainingType)}
      {formPopulater('training-hours', 'Training Hours', 'number', 'form-control', 'Enter a number (can use decimals)...', setTrainingHours)}
      {formPopulater('travel-hours', 'Travel Hours', 'number', 'form-control', 'Enter a number (can use decimals)...', setTravelHours)}
      {formPopulater('aggregiate-hours', 'Aggregiate Hours', 'number', 'form-control', 'Enter a number (can use decimals)...', setAggregiateHours)}
      {formPopulater('mileage', 'Mileage', 'number', 'form-control', 'Enter a number for the number of miles driven...', setMileage)}
      {formPopulater('tolls', 'Tolls', 'number', 'form-control', 'Enter a number...', setTolls)}
      {formPopulater('weather', 'Weather', 'text', 'form-control', 'Description of the weather...', setWeather)}
      {formPopulater('temperature', 'Temperature', 'number', 'form-control', 'Enter a number for degrees fahrenheit...', setTemperature)}
      {formPopulater('wind-speed', 'Wind Speed', 'number', 'form-control', 'Enter a number in MPH...', setWindSpeed)}
      {formPopulater('humidity', 'Humidity', 'number', 'form-control', 'Enter a number representing a percent...', setHumidity)}
      {formPopulater('placement-description', 'Placement Description', 'text', 'form-control', 'Placement Description...', setplacementDescription)}
      {formPopulater('placed-by', 'Placed by', 'text', 'form-control', 'Person who placed the source...', setPlacedBy)}
      {formPopulater('scent-source', 'Scent Source', 'text', 'form-control', 'Kind of source used...', setScentSource)}
      {formPopulater('source-container', 'Source Container', 'text', 'form-control', 'What the source was in...', setsouceContainer)}
      {checkboxFormPopulater('water', 'Water', setWater)} 
      */}
      <button type="button" className='btn btn-secondary' onClick={() => console.log(formValues)}>Tester</button>
      <button type='button' className='btn btn-primary' onClick={submitHandler}>Submit</button>
      <Link to="/">
        <button type='button' className='btn btn-primary'>Return Home</button>
      </Link>
    </form>
  )
}
    
export default NewLog;
