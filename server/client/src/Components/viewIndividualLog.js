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
    time: '',
    individual_runs: {
      blind: '',
      distractions: '',
      k9: '',
      notes: '',
      times: ''
    },
    training_info: {
      placed_by: '',
      placement_description: '',
      scent_source: '',
      source_container: '',
      training_type: ''
    }
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
        time: res.data.time,
        individual_runs: {
          // blind
          blind: res.data.individual_runs.blind,
          // distractions
          distractions: res.data.individual_runs.distractions,
          // k9
          k9: res.data.individual_runs.k9,
          // notes
          notes: res.data.individual_runs.notes,
          // times
          times: res.data.individual_runs.times
        },
        training_info: {
          placed_by: res.data.training_info.placed_by,
          placement_description: res.data.training_info.placement_description,
          scent_source: res.data.training_info.scent_source,
          source_container: res.data.training_info.source_container,
          training_type: res.data.training_info.training_type
        }


        // training_info
          // placed_by
          // placement_description
          // scent_source
          // source_container
          // training_type
      })
    })
  })

  return (
    <div>
      <div style={{color: 'turquoise'}}>Stand in</div>
    </div>
  )
}

export default ViewIndividualLog;