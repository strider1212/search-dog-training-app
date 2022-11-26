import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { RetrieveCurrentUsernameFromToken } from '../utils/retrieveCurrentUsernameFromToken';

const EditLogs = () => {
  
  const [logsState, setLogsState] = useState([])
  console.log('logState: ', logsState)

  const tokenFromLocalStorage = localStorage.getItem('token')
  
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`http://localhost:3000/logs/username/${RetrieveCurrentUsernameFromToken()}`, {
      headers: {
        authorizationToken: tokenFromLocalStorage
      }
    })
    .then(res => {
      console.log(res)
      res.data.map(e => {
        setLogsState(current => [...current, e])
      })
    })
  }, [])

  const deleteSelectedLog = (index) => {
    const logId = logsState[index]._id
    axios.delete(`http://localhost:3000/logs/${logId}`)
    .then(() => setLogsState([
      ...logsState.slice(0, index),
      ...logsState.slice(index + 1, logsState.length)
    ]))
  }

  const listLogs = logsState.map((log, index) => {
    const logId = log._id
    const readableId = logId.slice(logId.length - 4, logId.length)
    const formattedDate = new Date(log.date);
    
    return (
      <li 
        type="button"
        key={index} 
        className="list-group-item list-group-item-action">
        <div>{`ID#: ${readableId}`}</div>
        <div>{`${formattedDate.getMonth()}/${formattedDate.getDay()}/${formattedDate.getFullYear()}: ${log.address}`}</div>
        <button type='button' className="btn btn-danger" onClick={() => deleteSelectedLog(index)}>Delete</button>
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