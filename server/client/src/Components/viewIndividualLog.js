import React, {useEffect, useState} from "react";
import axios from 'axios';

const ViewIndividualLog = () => {

  const standInLogId = '637f502fe5a2feca81424f15'

  // const initialState = {
  //   address: ''
  // }
  
  // const [renderValues, setRenderValues] = useState(initialState)

  const [addressState, setAddressState] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3000/logs/${standInLogId}`)
    .then(res => {
      return setAddressState(res.data.address)
    })
  })

  return (
    <div>
      <div style={{color: 'white'}}>{addressState}</div>
      <button type="button" className="btn btn-primary" onClick={() => console.log(addressState)}>Tester</button>
    </div>
  )
}

export default ViewIndividualLog;