import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from '../utils/checkboxFormPopulater';
import { submitHandler } from '../utils/submitHandler';

import { HeaderInsert } from '../utils/headerInsert';
import { AuthorizationAlert } from '../utils/authorizationAlert';

const TrainingInfo = () => {
  const initialState = {
    trainingType: 0,
    placementDescription: 0,
    placedBy: '',
    scentSource: 0,
    sourceContainer: '',
    water: false, 
    associatedLog: ''
  }
  const initialStateArray = ['trainingType', 'placementDescription',  'placedBy', 'scentSource', 'sourceContainer'];
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
        axios.post(`${process.env.REACT_APP_BASE_URL}/logs/trainingInfo`, {
          training_type: formValues.trainingType,
          placement_description: formValues.placementDescription,
          placed_by: formValues.placedBy, 
          scent_source: formValues.scentSource, 
          source_container: formValues.sourceContainer, 
          water: formValues.water,
          associatedLog: logId
        },
        HeaderInsert()
        )
        .then(res => {
          if (res.data.training_info.water) {
            navigate("/waterLog", {state: 
              {logId: logId,
              formValues: formValues
              } 
            })
          } else {
            navigate("/individualRuns", {state: 
              {logId: logId,
              formValues: formValues
              } 
            })
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
    
        console.log('trainingInfo submitted')
      }
      postForm()

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])
  
  return (
    <div>
      <h2>Source Placement</h2>
      <form>

        {formPopulater('training-type', 'Training Type', 'text', 'Give a brief description of the training...', setFormValue, formValues, 'trainingType', formErrors, 'trainingType')} 

        {formPopulater('placement-description', 'Placement Description', 'text', 'Where and how the source was placed...', setFormValue, formValues, 'placementDescription', formErrors, 'placementDescription')}

        {formPopulater('placed-by', 'Placed By', 'text', 'Which teammate placed the source?...', setFormValue, formValues, 'placedBy', formErrors, 'placedBy')}

        {formPopulater('scent-source', 'Scent Source', 'text', 'Kind of source used...', setFormValue, formValues, 'scentSource', formErrors, 'scentSource')}

        {formPopulater('source-container', 'Source Container', 'text', 'In what material was the source contained?...', setFormValue, formValues, 'sourceContainer', formErrors, 'sourceContainer')}

        {checkboxFormPopulater('water', 'Source in Water?', setFormValue, formValues, 'water')}

        <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Next</button>
        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  )
}

export default TrainingInfo;