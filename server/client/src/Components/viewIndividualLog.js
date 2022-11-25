import React, {useEffect, useState} from "react";
import axios from 'axios';

const ViewIndividualLog = () => {

  const standInLogId = '637f502fe5a2feca81424f15'

  /*
    date
    log_created_by
    team
    time
    hours and stats
      mileage
      tolls
      total_hours
      training_hours
      travel_hours
    individual_runs
      blind
      distractions
      k9
      notes
      times
    training_info
      placed_by
      placement_description
      scent_source
      source_container
      training_type
    water
      depth
      open
      salt_water
      submerged
      temperature
      water_type
    weather
      humidity
      temperature
      weather
      wind_speed
  */

  const initialState = {
    address: '',
    date: '',
    log_created_by: '',
    team: '',
    time: ''
  }
  
  const [individualLogValues, setIndividualLogValues] = useState(initialState)

  useEffect(() => {
    axios.get(`http://localhost:3000/logs/${standInLogId}`)
    .then(res => {
      console.log(res.data)
      setIndividualLogValues({
        ...individualLogValues,
        address: res.data.address,
        // date
        date: res.data.date,
        // log_created_by
        log_created_by: res.data.log_created_by,
        // team
        team: res.data.team,
        // time
        time: res.data.time
      })
    })
  })

  return (
    <div>
      <div style={{color: 'white'}}>Address: {individualLogValues.address}</div>
      <div style={{color: 'white'}}>Date: {individualLogValues.date}</div>
      <div style={{color: 'white'}}>Log Creator: {individualLogValues.log_created_by}</div>
      <div style={{color: 'white'}}>Team: {individualLogValues.team}</div>
      <div style={{color: 'white'}}>Time: {individualLogValues.time}</div>
    </div>
  )
}

export default ViewIndividualLog;