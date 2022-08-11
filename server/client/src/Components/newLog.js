import React, { useState } from 'react';
import axios from 'axios';

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
  

  const submitHandler = async () => {
    console.log(scentSource)
    // await axios.post('/logs')
    // .then(res => console.log(res))
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="created_by">Created by:</label>
        <input 
        type="text" 
        className="form-control" 
        id="created_by" 
        placeholder="Your Name..." 
        onInput={(e) => setCreatedBy(e.target.valuej)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input 
        type="date" 
        className="form-control" 
        id="date" 
        placeholder="Date on which the drill was executed..." 
        onInput={(e) => setDate(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">Time:</label>
        <input 
        type="time" 
        className="form-control" 
        id="time" 
        onInput={(e) => setTime(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input 
        type="text" 
        className="form-control" 
        id="address" 
        placeholder="Address of the training..." 
        onInput={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="team">Team:</label>
        <input 
        type="text" 
        className="form-control" 
        id="team" 
        placeholder="Team Name..." 
        onInput={(e) => setTeam(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="training-type">Training Type:</label>
        <input 
        type="text" 
        className="form-control" 
        id="training-type" 
        placeholder="Training type..." 
        onInput={(e) => setTrainingType(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="training-hours">Training Hours:</label>
        <input 
        type="number" 
        className="form-control" 
        id="training-hours" 
        placeholder="Enter a number (can use decimals)..." 
        onInput={(e) => {setTrainingHours(e.target.value)}}
        />
      </div>

      <div className="form-group">
        <label htmlFor="travel-hours">Travel Hours:</label>
        <input 
        type="number" 
        className="form-control" 
        id="travel-hours" 
        placeholder="Enter a number (can use decimals)..." 
        onInput={(e) => setTravelHours(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="aggregiate-hours">Aggregiate Hours:</label>
        <input 
        type="number" 
        className="form-control" 
        id="aggregiate-hours" 
        placeholder="Enter a number (can use decimals)..." 
        onInput={(e) => setAggregiateHours(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="number">Mileage:</label>
        <input 
        type="text" 
        className="form-control" 
        id="mileage" 
        placeholder="Enter a number for the number of miles driven..." 
        onInput={(e) => setMileage(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tolls">Tolls:</label>
        <input 
        type="number" 
        className="form-control" 
        id="tolls" 
        placeholder="Enter a number..." 
        onInput={(e) => setTolls(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="weather">Weather:</label>
        <input 
        type="text" 
        className="form-control" 
        id="weather" 
        placeholder="Description of the weather..."
        onInput={(e) => setWeather(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tempterature">Temperature:</label>
        <input 
        type="number" 
        className="form-control" 
        id="tempterature" 
        placeholder="Enter a number for degrees fahrenheit..." 
        onInput={(e) => setTemperature(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="wind-speed">Wind Speed:</label>
        <input 
        type="number" 
        className="form-control" 
        id="wind-speed" 
        placeholder="Enter a number for MPH..." 
        onInput={(e) => setWindSpeed(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="humidity">Humidity:</label>
        <input 
        type="number" 
        className="form-control" 
        id="humidity" 
        placeholder="Enter a number representing a percent..." 
        onInput={(e) => setHumidity(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="placement-description">Placement Description:</label>
        <input 
        type="text" 
        className="form-control" 
        id="placement-description" 
        placeholder="Placement Description..." 
        onInput={(e) => setplacementDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="placed-by">Placed by:</label>
        <input 
        type="text" 
        className="form-control" 
        id="placed-by" 
        placeholder="Person who placed the source..." 
        onInput={(e) => setPlacedBy(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="scent-source">Scent Source:</label>
        <input 
        type="text" 
        className="form-control" 
        id="scent-source" 
        placeholder="Kind of source used..." 
        onInput={(e) => setScentSource(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="source-container">Source Container:</label>
        <input 
        type="text" 
        className="form-control" 
        id="source-container" 
        placeholder="What the source was in..." 
        />
      </div>

      <div className="form-group">
        <label htmlFor="water" className="form-check-label">Water:</label>
        <input 
        type="checkbox" 
        className="form-check-input" 
        id="water" 
        placeholder="Your Name..." 
        />
      </div>

      <button type='button' className='btn btn-primary' onClick={submitHandler}>Submit</button>
    </form>
  )   
}
    
export default NewLog;
