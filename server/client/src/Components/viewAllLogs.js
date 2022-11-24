import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { HeaderInsert } from '../utils/headerInsert';

const ViewAllLogs = () => {
  const [logsState, setLogsState] = useState([])
  
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/logs/', {something: 'something'}, HeaderInsert())
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
    
    return (
      <li 
      key={index} 
      className="list-group-item list-group-item-action">
      <div>{`ID#: ${readableId}`}</div>
      <div>{`${formattedDate.getMonth()}/${formattedDate.getDay()}/${formattedDate.getFullYear()}: ${log.address}`}</div>
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

export default ViewAllLogs;