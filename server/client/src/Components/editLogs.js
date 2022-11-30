import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { RetrieveCurrentUsernameFromToken } from '../utils/retrieveCurrentUsernameFromToken';
import { PassTokenFromLocalStorageInHeaders } from "../utils/passTokenFromLocalStorageInHeaders";

const EditLogs = () => {
  
  const [logsState, setLogsState] = useState([])
  
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`http://localhost:3000/logs/username/${RetrieveCurrentUsernameFromToken()}`, PassTokenFromLocalStorageInHeaders())
    .then(res => {
      console.log(res)
      res.data.map(e => {
        setLogsState(current => [...current, e])
      })
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
            <div>{`${formattedMonth}/${formattedDay}/${formattedDate.getFullYear()}: ${log.address}`}</div>
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