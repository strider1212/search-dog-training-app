import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { RetrieveCurrentUsernameFromToken } from '../utils/retrieveCurrentUsernameFromToken';
import { PassTokenFromLocalStorageInHeaders } from "../utils/passTokenFromLocalStorageInHeaders";
import { AuthorizationAlert } from "../utils/authorizationAlert";

const EditLogs = () => {
  
  const [logsState, setLogsState] = useState([])
  
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/logs/username/${RetrieveCurrentUsernameFromToken()}`, PassTokenFromLocalStorageInHeaders())
    .then(res => {
      res.data.map(e => 
        setLogsState(current => [...current, e])
      )
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
  }, [])


  const listLogs = logsState.map((log, index) => {
      const logId = log._id
      const readableId = logId.slice(logId.length - 4, logId.length)
      const formattedDate = new Date(log.date);
      const formattedMonth = formattedDate.getMonth() + 1
      const formattedDay = formattedDate.getDate()
    
      const navigateToIndividualLog = (Id) => {
          navigate('/viewIndividualLog', {state: {_id: Id}})
      }
      
      return (
        <li 
          key={index} 
          className="list-group-item list-group-item-action light-grey-background text-white"
          onClick={() => navigateToIndividualLog(logId)}
          >
            <div>{`ID#: ${readableId}`}</div>
            <div>{`${formattedMonth}/${formattedDay + 1}/${formattedDate.getFullYear()}: ${log.address}`}</div>
        </li>
      )
  })


  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Go Back</button>
      <div className="row">
        <div className="col-7 mx-auto">
          <ul className="list-group">{listLogs}</ul>
        </div>
      </div>
    </div>
  )
}

export default EditLogs