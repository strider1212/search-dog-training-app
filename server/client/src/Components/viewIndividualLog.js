import React, {useEffect, useState} from "react";
import axios from 'axios';

const ViewIndividualLog = () => {

  const standInLogId = '637f502fe5a2feca81424f15'

  useEffect(() => {
    axios.get(`http://localhost:3000/logs/${standInLogId}`)
    .then(res => console.log(res.data))
  })

  return (
    <div style={{color: 'white'}}>View Inidividual Logs here</div>
  )
}

export default ViewIndividualLog;