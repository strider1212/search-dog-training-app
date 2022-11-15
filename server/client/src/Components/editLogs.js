import React, {useEffect} from "react"
import axios from 'axios';

const EditLogs = () => {
  
  let holder = []
  
  useEffect(() => {
    axios.get('http://localhost:3000/logs/')
    .then(res => {
      const pusher = res.data
      pusher.map((e) => {
        holder.push(e)
      })
    })
    .then(console.log('holder:', holder))
  })

  return (
    <div style={{color: 'peachpuff'}}>
      test
    </div>
  )
}

export default EditLogs