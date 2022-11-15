import React, {useEffect, useState} from "react"
import axios from 'axios';

const EditLogs = () => {
  
  const [logsState, setLogsState] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3000/logs/')
    .then(res => {
      console.log(res)
      res.data.map(e => {
        setLogsState(current => [...current, e])
      })
    })
  }, [])

  const listLogs = logsState.map((log, index) => <li key={index} className="list-group-item">{log.address}</li>)


  return (
    <div style={{color: 'peachpuff'}}>
      <ul className="list-group">{listLogs}</ul>
    </div>
  )
}

export default EditLogs