import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from '../utils/checkboxFormPopulater';
import { submitHandler } from '../utils/submitHandler';

const TrainingInfo = () => {
  const initialState = {
    trainingType: 0,
    placementDescription: 0,
    placedBy: '',
    scentSource: 0,
    sourceContainer: 0,
    water: '', 
    associatedLog: ''
  }
  const initialStateArray = ['trainingType', 'placementDescription',  'placedBy',  'scentSource', 'water'];
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
        await axios.post(`http://localhost:3000/logs/trainingInfo`, {
          training_type: formValues.trainingType,
          placement_description: formValues.placementDescription,
          placed_by: formValues.placedBy, 
          scent_source: formValues.scentSource, 
          source_container: formValues.sourceContainer, 
          water: formValues.water,
          associatedLog: logId
        })
        .then(res => {
          navigate("/", {state: 
            {logId: logId,
            formValues: formValues
            } 
          })
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
    
        console.log('hoursAndStats submitted')
      }
      postForm()

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])
  
  return (
    <div>
      <h1>trainingInfo.js</h1>
      <p>{formErrors.trainingType}</p>
      {formPopulater('training-type', 'Training Type', 'text', 'Give a brief description of the training...', setFormValue, formValues, 'trainingType')}
      <p>{formErrors.placementDescription}</p>
      {formPopulater('placement-description', 'Placement Description', 'text', 'Where and how the source was placed...', setFormValue, formValues, 'placementDescription')}
      <p>{formErrors.placedBy}</p>
      {formPopulater('placed-by', 'Placed By', 'text', 'Which teammate placed the source?...', setFormValue, formValues, 'placedBy')}
      <p>{formErrors.scentSource}</p>
      {formPopulater('scent-source', 'Scent Source', 'text', 'Kind of source used...', setFormValue, formValues, 'scentSource')}
      <p>{formErrors.souceContainer}</p>
      {formPopulater('source-container', 'Source Container', 'text', 'In what material was the source contained?...', setFormValue, formValues, 'souceContainer')}
      {checkboxFormPopulater('water', 'Water', setFormValue, formValues, 'water')}
    </div>
  )
}

export default TrainingInfo;