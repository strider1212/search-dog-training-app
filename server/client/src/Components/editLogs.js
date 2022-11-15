import React, {useEffect, useState} from "react"
import axios from 'axios';

const EditLogs = () => {
  
  const [logsState, setLogsState] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3000/logs/')
    .then(res => {
      console.log(res)
      res.data.map(e => {
        console.log(e)
        setLogsState(current => [...current, e])
      })
    })
  }, [])

  const listLogs = logsState.map(log => <li>{log.address}</li>)


  return (
    <div style={{color: 'peachpuff'}}>
      <ul>{listLogs}</ul>
    </div>
  )
}

export default EditLogs