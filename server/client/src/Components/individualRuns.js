import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from '../utils/checkboxFormPopulater';
import { submitHandler } from '../utils/submitHandler';

import { HeaderInsert } from '../utils/headerInsert';
import { AuthorizationAlert } from '../utils/authorizationAlert';

const IndividualRuns = () => {
  const initialState = {
    time: 0,
    blind: false,
    k9: '', 
    distractions: '',
    notes: ''
  }
  const initialStateArray = ['time', 'k9'];
  const [formValues, setFormValue] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  let initialRender = useRef(true);
  const location = useLocation();
  const logId = location.state.logId;
  
  let navigate = useNavigate()

  //HOOKS
  useEffect(() => {
    if(initialRender.current) {
      initialRender.current = false;
    } else if (Object.keys(formErrors).length > 0) {
      alert('One or more of the request categories was not filled in. Please fill in any missing categories.')
    } else {
      const postForm = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/logs/individual_runs`, {
          time: formValues.time,
          blind: formValues.blind,
          k9: formValues.k9, 
          distractions: formValues.distractions, 
          notes: formValues.notes, 
          associatedLog: logId
        },
        HeaderInsert()
        )
        .then(res => {
          navigate("/")
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
    
        console.log('Individual run submitted')
      }
      postForm()

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])
  return (
    <div>
      <h2>Individual Drill</h2>
      <form>
        {formPopulater('time', 'Time', 'number', 'How long did it take you (minutes)?...', setFormValue, formValues, 'time', formErrors, 'time')}

        {checkboxFormPopulater('blind', 'Was it blind?', setFormValue, formValues, 'blind')}

        {formPopulater('k9', 'K9', 'text', 'Name of the k9...', setFormValue, formValues, 'k9', formErrors, 'k9')}

        {formPopulater('distractions', 'Distractions', 'text', 'List any distractions to the k9 that may have occured...', setFormValue, formValues, 'distractions', formErrors, 'distractions')}

        {formPopulater('notes', 'Notes', 'text', 'Record any notes here...', setFormValue, formValues, 'notes', formErrors, 'notes')}

        <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Next</button>

        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
        
    </form>
    </div>
  )
}

export default IndividualRuns