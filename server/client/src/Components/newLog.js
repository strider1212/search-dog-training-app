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
  const [souceContainer, setsouceContainer] = useState('');
  

  const submitHandler = async () => {
    console.log(humidity)
    // await axios.post('/logs')
    // .then(res => console.log(res))
  }


  const formPopulater = (forAndId, UIText, type, className, placeholder, setFunction) => {

    return (
      <div className="form-group">
        <label htmlFor={forAndId}>{UIText}:</label>
        <input 
        type={type} 
        className={className} 
        id={forAndId} 
        placeholder={placeholder}
        onInput={(e) => setFunction(e.target.value)}
        />
      </div>
    )
  }

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
  formPopulater('humidity', 'Humidity', 'number', 'form-control', 'Enter a number representing a percent...', setHumidity)
];

  //     <div className="form-group">
  //       <label htmlFor="humidity">Humidity:</label>
  //       <input 
  //       type="number" 
  //       className="form-control" 
  //       id="humidity" 
  //       placeholder="Enter a number representing a percent..." 
  //       onInput={(e) => setHumidity(e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="placement-description">Placement Description:</label>
  //       <input 
  //       type="text" 
  //       className="form-control" 
  //       id="placement-description" 
  //       placeholder="Placement Description..." 
  //       onInput={(e) => setplacementDescription(e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="placed-by">Placed by:</label>
  //       <input 
  //       type="text" 
  //       className="form-control" 
  //       id="placed-by" 
  //       placeholder="Person who placed the source..." 
  //       onInput={(e) => setPlacedBy(e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="scent-source">Scent Source:</label>
  //       <input 
  //       type="text" 
  //       className="form-control" 
  //       id="scent-source" 
  //       placeholder="Kind of source used..." 
  //       onInput={(e) => setScentSource(e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="source-container">Source Container:</label>
  //       <input 
  //       type="text" 
  //       className="form-control" 
  //       id="source-container" 
  //       placeholder="What the source was in..." 
  //       onInput={(e) => setsouceContainer(e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="water" className="form-check-label">Water:</label>
  //       <input 
  //       type="checkbox" 
  //       className="form-check-input" 
  //       id="water" 
  //       placeholder="Your Name..." 
  //       />
  //     </div>

  //     <button type='button' className='btn btn-primary' onClick={submitHandler}>Submit</button>
  //   </form>
  // )   

  const formMapper = formPopulaterArray.map(func => func)

  return (
    <form>
      {formMapper}
      <button type='button' className='btn btn-primary' onClick={submitHandler}>Submit</button>
    </form>
  )


  
}
    
export default NewLog;
