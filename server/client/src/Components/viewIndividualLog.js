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
    address: ''
  }
  
  const [individualLogValues, setIndividualLogValues] = useState(initialState)

  useEffect(() => {
    axios.get(`http://localhost:3000/logs/${standInLogId}`)
    .then(res => {
      console.log(res)
      setIndividualLogValues({
        ...individualLogValues,
        address: res.data.address
      })
    })
  })

  return (
    <div>
      <div style={{color: 'white'}}>{individualLogValues.address}</div>
    </div>
  )
}

export default ViewIndividualLog;