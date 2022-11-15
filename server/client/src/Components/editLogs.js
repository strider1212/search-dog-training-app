import React, {useEffect, useState} from "react"
import axios from 'axios';

const EditLogs = () => {
  
  const [holder, setHolder] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3000/logs/')
    .then(res => {
      console.log(res)
      res.data.map(e => {
        console.log(e)
        setHolder(current => [...current, e])
      })
    })
  }, [])


  return (
    <div style={{color: 'peachpuff'}}>
      {/* {holder.map((e, i) => <p style={{color: 'peachpuff'}} key={i}>{e}</p>)} */}
      <button type='button' className="btn btn-primary" onClick={() => console.log('holder:', holder)}>Tester</button>
    </div>
  )
}

export default EditLogs