import React, {useEffect, useState} from "react";
import axios from 'axios';

const ViewIndividualLog = () => {

  const logIdFromProps = '637f502fe5a2feca81424f15'

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
    },
    water: {
      depth: '',
      open: '',
      salt_water: '',
      submerged: '',
      temperature: '',
      water_type: ''
    },
    weather: {
      humidity: '',
      temperature: '',
      weather: '',
      wind_speed: ''
    },
    hours_and_stats: {
      mileage: '',
      tolls: '',
      total_hours: '',
      training_hours: '',
      travel_hours: ''
    }
  }
  
  const [individualLogValues, setIndividualLogValues] = useState(initialState)

  useEffect(() => {
    axios.get(`http://localhost:3000/logs/${logIdFromProps}`)
    .then(res => {
      console.log('res from individual log get():', res.data)
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
        },
        water: {
          depth: res.data.water.depth,
          open: res.data.water.open,
          salt_water: res.data.water.salt_water,
          submerged: res.data.water.submerged,
          temperature: res.data.water.temperature,
          water_type: res.data.water.water_type
        },
        weather: {
          humidity: res.data.weather.humidity,
          temperature: res.data.weather.temperature,
          weather: res.data.weather.weather,
          wind_speed: res.data.weather.wind_speed
        },
        hours_and_stats: {
          mileage: res.data.hours_and_stats.mileage,
          tolls: res.data.hours_and_stats.tolls,
          total_hours: res.data.hours_and_stats.total_hours,
          training_hours: res.data.hours_and_stats.training_hours,
          travel_hours: res.data.hours_and_stats.travel_hours
        }
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