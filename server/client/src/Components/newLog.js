import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { submitHandler } from '../utils/submitHandler';
import { getDifferenceInHours } from '../utils/getDifferenceInHours';

import { HeaderInsert } from '../utils/headerInsert';
import { AuthorizationAlert } from '../utils/authorizationAlert';
import jwt_decode from "jwt-decode";

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

  //decode username from jwt token
  const token = localStorage.getItem('token')
  const decoded = jwt_decode(token);
  const decodedUsername = decoded.username

  //HOOKS
  let navigate = useNavigate();
  useEffect(() => {
    if(initialRender.current) {
      initialRender.current = false;
    } else if (Object.keys(formErrors).length > 0) {
      alert('One or more of the request categories was not filled in. Please fill in any missing categories.')
    } else {
      const postForm = () => {
        let logId;
        axios.post(`http://localhost:3000/logs`, {
          log_created_by: decodedUsername,
          date: formValues.date,
          address: formValues.address, 
          team: formValues.team, 
          time: formValues.time
        },
        HeaderInsert()
        )
        .then(res => logId = res.data._id)
        .then(async () => {
          if (getDifferenceInHours(formValues.date, formValues.time) < -6) {
            navigate('/manualWeather', {state:
              { logId: logId,
                formValues: formValues,
                weatherValues: null
              }
            })
          } else {
            axios.get('http://localhost:3000/logs/weather', {
            params: {
              location: formValues.address,
              date: formValues.date,
              time: formValues.time
            }
            })
            .then(res => {
              navigate("/manualWeather", {state: 
                  {logId: logId,
                  formValues: formValues,
                    weatherValues: {
                      temperature: res.data[0].values.temperature,
                      windSpeed: res.data[0].values.windSpeed,
                      humidity: res.data[0].values.humidity
                    }
                  }
                }
              )
            }
            )
            .catch(err => console.log(err))
          }
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

        

        
    
        console.log('newLog submitted')
      }
      postForm()

       
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])

  return (
    <div>
      <h2>Date and Time</h2>
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
        {formPopulater('time', 'Time (can be autopopulated within 6 hours of current time)', 'time', '', setFormValue, formValues, 'time')}
        <p>{formErrors.address}</p>
        {formPopulater('address', 'Address', 'text', 'Address where the training took place...', setFormValue, formValues, 'address')}
        

        <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Next</button>
        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  )
}
    
export default NewLog;