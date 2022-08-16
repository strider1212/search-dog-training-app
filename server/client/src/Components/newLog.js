import React, { useState, useEffect, useRef } from 'react';
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
  const [formErrors, setFormErrors] = useState({})

  const calculateTotalHours = () => {
    const sum = formValues.travelHours + formValues.trainingHours;
    return sum;
  }


  let navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.createdBy) {
      errors.createdBy = "Created By category is required"
    }

    if (!values.date) {
      errors.date = "Date category is required"
    }

    if (!values.time) {
      errors.time = "Time category is required"
    }

    if (!values.address) {
      errors.address = "Address category is required"
    }

    if (!values.team) {
      errors.team = "Team category is required"
    }

    if (!values.trainingType) {
      errors.trainingType = "Trainging Type category is required"
    }

    if (!values.trainingHours) {
      errors.trainingHours = "Training Hours category is required"
    }

    if (!values.travelHours) {
      errors.travelHours = "Travel Hours category is required"
    }

    if (!values.mileage) {
      errors.mileage = "Mileage category is required"
    }

    if (!values.tolls) {
      errors.tolls = "Tolls category is required"
    }

    if (!values.weather) {
      errors.weather = "Weather category is required"
    }

    if (!values.temperature) {
      errors.temperature = "Temperature category is required"
    }

    if (!values.windSpeed) {
      errors.windSpeed = "Wind Speed category is required"
    }

    if (!values.humidity) {
      errors.humidity = "Humidity category is required"
    }

    if (!values.placementDescription) {
      errors.placementDescription = "Placement Description category is required"
    }

    if (!values.placedBy) {
      errors.placedBy = "Placed By category is required"
    }

    if (!values.scentSource) {
      errors.scentSource = "Scent Source category is required"
    }

    if (!values.souceContainer) {
      errors.souceContainer = "Source Container category is required"
    }

    return errors;
  }

  let initialRender = useRef(true);

  useEffect(() => {
    if(initialRender.current) {
      initialRender.current = false;
    } else if (Object.keys(formErrors).length > 0) {
      alert('One of the request categories was not filled in. Please fill in any missing categories.')
    }
  }, [formErrors])
  
  // let tomorrowTemp;
  
  const submitHandler = async () => {
    setFormErrors(validate(formValues))

    // await axios.get('http://localhost:3000/logs/weather', {
    //   params: {
    //     test: 'testing'
    //   }
    // })
    // .then(res => {
    //   tomorrowTemp = res.data[0].values.temperature
    //   console.log('weather data results:', tomorrowTemp)
    //   setFormValue({
    //     ...formValues,
    //       temperature: tomorrowTemp
    //   })
    // })

    await axios.post(`http://localhost:3000/logs`, {
      log_created_by: formValues.createdBy,
      date: formValues.date,
      address: formValues.address, 
      team: formValues.team, 
      training_hours: formValues.trainingHours,
      travel_hours: formValues.travelHours,
      total_hours: calculateTotalHours(),
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
        navigate("/waterLog", {state: {logId: res.data._id}})
      }
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
      //formPopulater and checkboxFormPopulater populate the individual labels and inputs within the form.

      //formPopulater arguments: formPopulater(forAndIdAttribute, UIText, type, placeholder, setState, state, propertyInStateObject)
      //checkboxFormPopulater arguments: checkboxFormPopulater(forAndIdAttribute, UIText, setState, state, propertyInStateObject)

  return (
    <form>
      <p>{formErrors.createdBy}</p>
      {formPopulater('log_created_by', 'Created By', 'text', 'Your Name...', setFormValue, formValues, 'createdBy')}

      <p>{formErrors.date}</p>
      {formPopulater('date', 'Date', 'date', 'Date on which the drill was executed...', setFormValue, formValues, 'date')}

      <p>{formErrors.time}</p>
      {formPopulater('time', 'Time', 'time', '', setFormValue, formValues, 'time')}

      <p>{formErrors.address}</p>
      {formPopulater('address', 'Address', 'text', 'Address where the training took place...', setFormValue, formValues, 'address')}

      <p>{formErrors.team}</p>
      {formPopulater('team', 'Team', 'text', 'Team Name...', setFormValue, formValues, 'team')}

      <p>{formErrors.trainingType}</p>
      {formPopulater('training-type', 'Training Type', 'text', 'Give a brief description of the training...', setFormValue, formValues, 'trainingType')}

      <p>{formErrors.travelHours}</p>
      {formPopulater('travel-hours', 'Travel Hours', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'travelHours')}

      <p>{formErrors.trainingHours}</p>
      {formPopulater('training-hours', 'Training Hours', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'trainingHours')}

      <h3>Total Hours: {calculateTotalHours()}</h3>

      <p>{formErrors.mileage}</p>
      {formPopulater('mileage', 'Mileage', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'mileage')}

      <p>{formErrors.tolls}</p>
      {formPopulater('tolls', 'Tolls', 'number', 'Provide a number...', setFormValue, formValues, 'tolls')}

      <p>{formErrors.weather}</p>
      {formPopulater('weather', 'Weather', 'text', 'Description of the weather...', setFormValue, formValues, 'weather')}

      <p>{formErrors.temperature}</p>
      {formPopulater('temperature', 'Temperature', 'number', 'Number of degrees fahrenheit...', setFormValue, formValues, 'temperature')}

      <p>{formErrors.windSpeed}</p>
      {formPopulater('wind-speed', 'Wind Speed', 'number', 'Number of MPH...', setFormValue, formValues, 'windSpeed')}

      <p>{formErrors.humidity}</p>
      {formPopulater('humidity', 'Humidity', 'number', 'Enter a number representing a percent...', setFormValue, formValues, 'humidity')}

      <p>{formErrors.placementDescription}</p>
      {formPopulater('placement-description', 'Placement Description', 'text', 'Where and how the source was placed...', setFormValue, formValues, 'placementDescription')}

      <p>{formErrors.placedBy}</p>
      {formPopulater('placed-by', 'Placed By', 'text', 'Which teammate placed the source?...', setFormValue, formValues, 'placedBy')}

      <p>{formErrors.scentSource}</p>
      {formPopulater('scent-source', 'Scent Source', 'text', 'Kind of source used...', setFormValue, formValues, 'scentSource')}

      <p>{formErrors.souceContainer}</p>
      {formPopulater('source-container', 'Source Container', 'text', 'In what material was the source contained?...', setFormValue, formValues, 'souceContainer')}

      {checkboxFormPopulater('water', 'Water', setFormValue, formValues, 'water')}

      <button type='button' className='btn btn-primary' onClick={submitHandler}>Submit</button>
      <Link to="/">
        <button type='submit' className='btn btn-primary'>Return Home</button>
      </Link>
    </form>
  )
}
    
export default NewLog;

//cahnge total hours to aggregiate
//all for number to be 0 in form validator
