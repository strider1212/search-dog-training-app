import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from '../utils/checkboxFormPopulater';

const NewLog = () => {
  const [createdBy, setCreatedBy] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [team, setTeam] = useState('');
  const [trainingType, setTrainingType] = useState('');
  const [trainingHours, setTrainingHours] = useState('');
  const [travelHours, setTravelHours] = useState('');
  const [aggregiateHours, setAggregiateHours] = useState('');
  const [mileage, setMileage] = useState('');
  const [tolls, setTolls] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [humidity, setHumidity] = useState('');
  const [placementDescription, setplacementDescription] = useState('');
  const [placedBy, setPlacedBy] = useState('');
  const [scentSource, setScentSource] = useState('');
  const [souceContainer, setsouceContainer] = useState('');
  const [water, setWater] = useState(false);

  let navigate = useNavigate();

  const formPopulaterArray = 
  [formPopulater('created_by', 'Created By', 'text', 'form-control', 'Your Name...', setCreatedBy), 
  formPopulater('"form-group"', 'Date', 'date', 'form-control', 'Date on which the drill was executed...', setDate),
  formPopulater('time', 'Time', 'time', 'form-control', '', setTime),
  formPopulater('address', 'Address', 'text', 'form-control', 'Address of the training...', setAddress),
  formPopulater('team', 'Team', 'text', 'form-control', 'Team Name...', setTeam),
  formPopulater('training-type', 'Training Type', 'text', 'form-control', 'Training type...', setTrainingType),
  formPopulater('training-hours', 'Training Hours', 'number', 'form-control', 'Enter a number (can use decimals)...', setTrainingHours),
  formPopulater('travel-hours', 'Travel Hours', 'number', 'form-control', 'Enter a number (can use decimals)...', setTravelHours),
  formPopulater('aggregiate-hours', 'Aggregiate Hours', 'number', 'form-control', 'Enter a number (can use decimals)...', setAggregiateHours),
  formPopulater('mileage', 'Mileage', 'number', 'form-control', 'Enter a number for the number of miles driven...', setMileage),
  formPopulater('tolls', 'Tolls', 'number', 'form-control', 'Enter a number...', setTolls),
  formPopulater('weather', 'Weather', 'text', 'form-control', 'Description of the weather...', setWeather),
  formPopulater('temperature', 'Temperature', 'number', 'form-control', 'Enter a number for degrees fahrenheit...', setTemperature),
  formPopulater('wind-speed', 'Wind Speed', 'number', 'form-control', 'Enter a number in MPH...', setWindSpeed),
  formPopulater('humidity', 'Humidity', 'number', 'form-control', 'Enter a number representing a percent...', setHumidity),
  formPopulater('placement-description', 'Placement Description', 'text', 'form-control', 'Placement Description...', setplacementDescription),
  formPopulater('placed-by', 'Placed by', 'text', 'form-control', 'Person who placed the source...', setPlacedBy),
  formPopulater('scent-source', 'Scent Source', 'text', 'form-control', 'Kind of source used...', setScentSource),
  formPopulater('source-container', 'Source Container', 'text', 'form-control', 'What the source was in...', setsouceContainer)
]; 

  const formMapper = formPopulaterArray.map(func => func)

  const submitHandler = async () => {
    console.log(water)

    const cb = createdBy; 
    const dt = date;
    const tim = time;
    const addr = address;
    const tem = team;
    const tt = trainingType
    const trainhrs = trainingHours;
    const travhrs = travelHours;
    const agghrs = aggregiateHours
    const mile = mileage;
    const toll = tolls;
    const weath = weather;
    const temp = temperature;
    const ws = windSpeed;
    const hum = humidity;
    const pd = placementDescription
    const pb = placedBy;
    const ss = scentSource;
    const sc = souceContainer;
    const watr = water; 

    await axios.post(`http://localhost:3000/logs`, {
      log_created_by: cb,
      date: dt,
      address: addr, 
      team: tem, 
      training_hours: trainhrs,
      travel_hours: travhrs,
      aggregate_hours: agghrs,
      mileage: mile,
      tolls: toll,
      weather: weath,
      temperature: temp,
      wind_speed: ws,
      humidity: hum,
      placement_description: pd,
      placed_by: pb,
      scent_source: ss,
      source_container: sc,
      time: tim,
      water: watr,
      training_type: tt
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
      {formMapper}
      {checkboxFormPopulater('water', setWater)}
      {/* <div className="form-group">
        <label htmlFor="water" className="form-check-label">Water:</label>
        <input 
        type="checkbox" 
        className="form-check-input" 
        id="water" 
        placeholder="Your Name..." 
        onChange={(e) => setWater(e.target.checked)}
        />
      </div> */}
      <button type='button' className='btn btn-primary' onClick={submitHandler}>Submit</button>
      <Link to="/">
        <button type='button' className='btn btn-primary'>Return Home</button>
      </Link>
    </form>
  )
}
    
export default NewLog;
