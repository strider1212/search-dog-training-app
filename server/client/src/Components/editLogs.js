import React, {useEffect, useState} from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditLogs = () => {
  
  const [logsState, setLogsState] = useState([])

  const tokenFromLocalStorage = localStorage.getItem('token')

  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`http://localhost:3000/logs/`, {
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
    const formattedDate = new Date(log.date);
    return (
      <li 
      key={index} 
      className="list-group-item list-group-item-action">
      {`${formattedDate.getMonth()}/${formattedDate.getDay()}/${formattedDate.getFullYear()}: ${log.address}`}
      </li>
    )
  })


  return (
    <div style={{color: 'peachpuff'}}>
      <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Go Back</button>
      <div className="row">
        <div className="col-5 mx-auto">
          <ul className="list-group">{listLogs}</ul>
        </div>
      </div>
    </div>
  )
}

export default EditLogs