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

  const [addressState, setAddressState] = useState('')

  const initialState = {
    address: ''
  }
  
  const [individualLogValues, setIndividualLogValues] = useState(initialState)

  useEffect(() => {
    axios.get(`http://localhost:3000/logs/${standInLogId}`)
    .then(res => {
      setIndividualLogValues({
        ...individualLogValues,
        address: res.data.address
      })
    })
  })

  

  const stateTesterHandler = () => {
    setIndividualLogValues({
      ...individualLogValues,
      address: 'here'
    })
    console.log(individualLogValues)
  }

  return (
    <div>
      <div style={{color: 'white'}}>{addressState}</div>
      <button type="button" className="btn btn-primary" onClick={() => console.log(addressState)}>Tester</button>
      <button type="button" className="btn btn-primary" onClick={() => stateTesterHandler()}>State Tester</button>
    </div>
  )
}

export default ViewIndividualLog;