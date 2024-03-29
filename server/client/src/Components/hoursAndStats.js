import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { submitHandler } from '../utils/submitHandler';

import { HeaderInsert } from '../utils/headerInsert';
import { AuthorizationAlert } from '../utils/authorizationAlert';

const HoursAndStats = () => {
  const initialState = {
    travelHours: 0,
    trainingHours: 0,
    totalHours: '',
    mileage: 0,
    tolls: 0,
    associatedLog: ''
  }
  const initialStateArray = ['travelHours', 'trainingHours', 'mileage', 'tolls'];
  const [formValues, setFormValue] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  let initialRender = useRef(true);
  const location = useLocation();
  const logId = location.state.logId;
  
  let navigate = useNavigate()

  const calculateTotalHours = () => {
    const travHours = parseFloat(formValues.travelHours);
    const trainHours = parseFloat(formValues.trainingHours);
    const sum = travHours + trainHours;
    return sum;
  }

  //HOOKS
  useEffect(() => {
    if(initialRender.current) {
      initialRender.current = false;
    } else if (Object.keys(formErrors).length > 0) {
      alert('One or more of the request categories was not filled in. Please fill in any missing categories.')
    } else {
      const postForm = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/logs/hoursAndStats`, {
          travel_hours: formValues.travelHours,
          training_hours: formValues.trainingHours,
          total_hours: calculateTotalHours(), 
          mileage: formValues.mileage, 
          tolls: formValues.tolls, 
          associatedLog: logId
        },
        HeaderInsert()
        )
        .then(res => {
          navigate("/trainingInfo", {state: 
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
    
        console.log('hoursAndStats submitted')
      }
      postForm()

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])
  
  return (
    <div>
      <h2>Hours and Travel</h2>
      <form>
        {formPopulater('travel-hours', 'Travel Hours', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'travelHours', formErrors, 'travelHours')}
       
        {formPopulater('training-hours', 'Training Hours', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'trainingHours', formErrors, 'trainingHours')}

        <h3>Total Hours: {calculateTotalHours()}</h3>

        {formPopulater('mileage', 'Mileage', 'number', 'Provide a number. Can use decimals...', setFormValue, formValues, 'mileage', formErrors, 'mileage')}

        {formPopulater('tolls', 'Tolls', 'number', 'Provide a number...', setFormValue, formValues, 'tolls', formErrors, 'tolls')}

        <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Next</button>
        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  )
}

export default HoursAndStats;