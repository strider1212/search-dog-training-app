import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from '../utils/checkboxFormPopulater';
import { submitHandler } from '../utils/submitHandler';

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
      const postForm = async () => {
        await axios.post(`http://localhost:3000/logs/water`, {
          time: formValues.time,
          blind: formValues.blind,
          k9: formValues.k9, 
          distractions: formValues.distractions, 
          notes: formValues.notes, 
          associatedLog: logId
        })
        .then(res => {
          navigate("/")
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
    
        console.log('waterLog submitted')
      }
      postForm()

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])
  return (
    <form>
      {/* 
      notes: '' */}
      {/*make sure that minues are what are rendered */}
      {formPopulater('time', 'Time', 'number', 'How long did it take you (minutes)?...', setFormValue, formValues, 'time')}
      {checkboxFormPopulater('blind', 'Was it blind?', setFormValue, formValues, 'blind')}
      {formPopulater('k9', 'K9', 'text', 'Name of the k9...', setFormValue, formValues, 'k9')}
      {formPopulater('distractions', 'Distractions', 'text', 'List any distractions to the k9 that may have occured...', setFormValue, formValues, 'distractions')}
      {formPopulater('notes', 'Notes', 'text', 'Record any notes here...', setFormValue, formValues, 'notes')}

      <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Next</button>
      <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
    </form>
  )
}

export default IndividualRuns