import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { submitHandler } from '../utils/submitHandler';

const NewLog = () => {

  //STATE
  const initialState = {
    createdBy: '',
    date: '',
    time: '',
    address: '',
    team: ''
  }
  const initialStateArray = ['createdBy', 'date', 'time', 'address', 'team'];
  const [formValues, setFormValue] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  let initialRender = useRef(true);
  // let autoTemp = useRef(0);

  //HOOKS
  let navigate = useNavigate();
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
            navigate("/manualWeather", {state: {logId: res.data._id}})
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
      <h2>Enter Date and Time info:</h2>
      <form>
        {/* Eventually auto populated */}
        <p>{formErrors.createdBy}</p>
        {formPopulater('log_created_by', 'Created By', 'text', 'Your Name...', setFormValue, formValues, 'createdBy')}
        <p>{formErrors.team}</p>
        {formPopulater('team', 'Team', 'text', 'Team Name...', setFormValue, formValues, 'team')}

        {/* Time and Place */}
        <p>{formErrors.date}</p>
        {formPopulater('date', 'Date', 'date', 'Date on which the drill was executed...', setFormValue, formValues, 'date')}
        <p>{formErrors.time}</p>
        {formPopulater('time', 'Time', 'time', '', setFormValue, formValues, 'time')}
        <p>{formErrors.address}</p>
        {formPopulater('address', 'Address', 'text', 'Address where the training took place...', setFormValue, formValues, 'address')}
        {/* eventually add an "add manual weather" checkbox which, when false, automatically pulls from tomorrow.io and adds auto weather based on time and address */}

        <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Next</button>
        <Link to="/">
          <button type='submit' className='btn btn-secondary'>Cancel</button>
        </Link>
      </form>
    </div>
  )
}
    
export default NewLog;

/*
  TO DO List:
    -make confirm swith on click for cancel
    -use navigate instead of a link for the cancel
 */




   //CALL TOMORROW.IO WILL EVENTUALL BE SET UP TO BE AUTOMATICA AFTER TIME AND PLACE FORM,
        //UNLESS MANUAL WEATHER CHECKBOX IS CLICKED

        // await axios.get('http://localhost:3000/logs/weather', {
        //   params: {
        //     temperature: [65.42687069854928, -137.40147447498097]
        //   }
        // })
        // .then(res => {
        //   autoTemp.current = res.data[0].values.temperature;
        //   console.log('weather data results:', res.data[0].values)
        //   console.log('temperature:', autoTemp.current)
        // })


// {/* <form>
//       {/* Eventually auto populated */}
//       <p>{formErrors.createdBy}</p>
//       {formPopulater('log_created_by', 'Created By', 'text', 'Your Name...', setFormValue, formValues, 'createdBy')}
//       <p>{formErrors.team}</p>
//       {formPopulater('team', 'Team', 'text', 'Team Name...', setFormValue, formValues, 'team')}

//       {/* Time and Place */}
//       <p>{formErrors.date}</p>
//       {formPopulater('date', 'Date', 'date', 'Date on which the drill was executed...', setFormValue, formValues, 'date')}
//       <p>{formErrors.time}</p>
//       {formPopulater('time', 'Time', 'time', '', setFormValue, formValues, 'time')}
//       <p>{formErrors.address}</p>
//       {formPopulater('address', 'Address', 'text', 'Address where the training took place...', setFormValue, formValues, 'address')}
//       {/* eventually add an "add manual weather" checkbox which, when false, automatically pulls from tomorrow.io and adds auto weather based on time and address */}

//       {/* manual weather */}
//       <p>{formErrors.weather}</p>
//       {formPopulater('weather', 'Weather', 'text', 'Description of the weather...', setFormValue, formValues, 'weather')}
//       <p>{formErrors.temperature}</p>
//       {formPopulater('temperature', 'Temperature', 'number', 'Number of degrees fahrenheit...', setFormValue, formValues, 'temperature')}
//       <p>{formErrors.windSpeed}</p>
//       {formPopulater('wind-speed', 'Wind Speed', 'number', 'Number of MPH...', setFormValue, formValues, 'windSpeed')}
//       <p>{formErrors.humidity}</p>
//       {formPopulater('humidity', 'Humidity', 'number', 'Enter a number representing a percent...', setFormValue, formValues, 'humidity')}

//       {/* Training hours and stats*/}
//       <p>{formErrors.travelHours}</p>
//       {formPopulater('travel-hours', 'Travel Hours', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'travelHours')}
//       <p>{formErrors.trainingHours}</p>
//       {formPopulater('training-hours', 'Training Hours', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'trainingHours')}
//       <h3>Total Hours: {calculateTotalHours()}</h3>
//       <p>{formErrors.mileage}</p>
//       {formPopulater('mileage', 'Mileage', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'mileage')}
//       <p>{formErrors.tolls}</p>
//       {formPopulater('tolls', 'Tolls', 'number', 'Provide a number...', setFormValue, formValues, 'tolls')}

//       {/* training info */}
//       <p>{formErrors.trainingType}</p>
//       {formPopulater('training-type', 'Training Type', 'text', 'Give a brief description of the training...', setFormValue, formValues, 'trainingType')}
//       <p>{formErrors.placementDescription}</p>
//       {formPopulater('placement-description', 'Placement Description', 'text', 'Where and how the source was placed...', setFormValue, formValues, 'placementDescription')}
//       <p>{formErrors.placedBy}</p>
//       {formPopulater('placed-by', 'Placed By', 'text', 'Which teammate placed the source?...', setFormValue, formValues, 'placedBy')}
//       <p>{formErrors.scentSource}</p>
//       {formPopulater('scent-source', 'Scent Source', 'text', 'Kind of source used...', setFormValue, formValues, 'scentSource')}
//       <p>{formErrors.souceContainer}</p>
//       {formPopulater('source-container', 'Source Container', 'text', 'In what material was the source contained?...', setFormValue, formValues, 'souceContainer')}
//       {checkboxFormPopulater('water', 'Water', setFormValue, formValues, 'water')}

//       {/* water info will conditionally render after this */}

//       {/* buttons */}
//       <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Submit</button>
//       <Link to="/">
//         <button type='submit' className='btn btn-primary'>Return Home</button>
//       </Link>
//     </form> */}

//  //FUNCTIONS
//  const calculateTotalHours = () => {
//   const travHours = parseInt(formValues.travelHours);
//   const trainHours = parseInt(formValues.trainingHours);
//   const sum = travHours + trainHours
//   return sum;
// }

