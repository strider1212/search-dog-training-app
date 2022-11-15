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

  


  return (
    <div style={{color: 'peachpuff'}}>
    </div>
  )
}

export default EditLogs