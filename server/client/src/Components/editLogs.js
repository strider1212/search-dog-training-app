import React, {useEffect} from "react"
import axios from 'axios';

const EditLogs = () => {
  
  useEffect(() => {
    axios.get('http://localhost:3000/logs/')
    .then(res => console.log(res))
  })

  return (
    <div style={{color: 'peachpuff'}}>
      test
    </div>
  )
}

export default EditLogs