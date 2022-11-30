import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { RetrieveCurrentUsernameFromToken } from '../utils/retrieveCurrentUsernameFromToken';

const EditLogs = () => {
  
  const [logsState, setLogsState] = useState([])

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


  const listLogs = logsState.map((log, index) => {
      const logId = log._id
      const readableId = logId.slice(logId.length - 4, logId.length)
      const formattedDate = new Date(log.date);
      const formattedMonth = formattedDate.getMonth() + 1
      const formattedDay = formattedDate.getDate()
      
      let stateHolder = 0;

      const deleteSelectedLog = (index) => {
        stateHolder += 1;
        const logId = logsState[index]._id
        const confirmation = window.confirm(`You are about to delete Log #${logId}. Are you sure that you want to do that?`)
        if (confirmation) {
          axios.delete(`http://localhost:3000/logs/${logId}`)
          .then(() => setLogsState([
            ...logsState.slice(0, index),
            ...logsState.slice(index + 1, logsState.length)
          ]))
        }
      }
    
      const navigateToIndividualLog = (Id) => {
        if (stateHolder === 0) {
          navigate('/viewIndividualLog', {state: {_id: Id}})
        }
      }
      
      return (
        <li 
          key={index} 
          className="list-group-item list-group-item-action light-grey-background text-white"
          onClick={() => navigateToIndividualLog(logId)}
          >
            <div>{`ID#: ${readableId}`}</div>
            <div>{`${formattedMonth}/${formattedDay}/${formattedDate.getFullYear()}: ${log.address}`}</div>
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