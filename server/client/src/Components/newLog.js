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
      {formPopulater('address', 'Address', 'text', 'Address where the training took place...', setFormValue, formValues, 'address')}
      {formPopulater('team', 'Team', 'text', 'Team Name...', setFormValue, formValues, 'team')}
      {formPopulater('training-type', 'Training Type', 'text', 'Give a brief description of the training...', setFormValue, formValues, 'trainingType')}
      {formPopulater('training-hours', 'Training Hours', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'trainingHours')}
      {formPopulater('travel-hours', 'Travel Hours', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'travelHours')}
      {formPopulater('aggregiate-hours', 'Aggregiate Hours', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'aggregiateHours')}
      {formPopulater('mileage', 'Mileage', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'mileage')}
      {formPopulater('tolls', 'Tolls', 'number', 'Provide a number...', setFormValue, formValues, 'tolls')}
      {formPopulater('weather', 'Weather', 'text', 'Description of the weather...', setFormValue, formValues, 'weather')}
      {formPopulater('temperature', 'Temperature', 'number', 'Number of degrees fahrenheit...', setFormValue, formValues, 'temperature')}
      {formPopulater('wind-speed', 'Wind Speed', 'number', 'Number of MPH...', setFormValue, formValues, 'windSpeed')}
      {formPopulater('humidity', 'Humidity', 'number', 'Enter a number representing a percent...', setFormValue, formValues, 'humidity')}
      {formPopulater('placement-description', 'Placement Description', 'text', 'Where and how the source was placed...', setFormValue, formValues, 'placementDescription')}
      {formPopulater('placed-by', 'Placed By', 'text', 'Which teammate placed the source?...', setFormValue, formValues, 'placedBy')}
      {formPopulater('scent-source', 'Scent Source', 'text', 'Kind of source used...', setFormValue, formValues, 'scentSource')}
      {formPopulater('source-container', 'Source Container', 'text', 'In what material was the source contained?...', setFormValue, formValues, 'souceContainer')}
      {/*
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
