import React, {useEffect, useState} from "react";
import axios from 'axios';

import { RenderHeader } from "../utils/ViewIndividualLog/renderHeader";

const ViewIndividualLog = () => {

  const logIdFromProps = '638123912cb3b7937f20e6b2'

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

  const formattedDate = new Date(individualLogValues.date)

  

  return (
    <div>
      <div className="container">
        <div className="row grey-background">
          <div className="col">
            {RenderHeader('General Info')}
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col view-individual-log-main">
                    {individualLogValues.address}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Created by: {individualLogValues.log_created_by}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col view-individual-log-main">
                    {`${formattedDate.getMonth()}/${formattedDate.getDay()}/${formattedDate.getFullYear()}`} @ {individualLogValues.time}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Team: {individualLogValues.team}
                  </div>
                </div>
              </div>
            </div>
            {RenderHeader('Weather Info')}
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col view-individual-log-main">
                    Weather Description: {individualLogValues.weather.weather}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Humidy: {individualLogValues.weather.humidity}%
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col view-individual-log-main">
                    Temperature: {individualLogValues.weather.temperature}°
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Wind speed: {individualLogValues.weather.wind_speed} mph
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col view-individual-log-header">
                Time and Mileage:
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col view-individual-log-main">
                    Mileage: {individualLogValues.hours_and_stats.mileage}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Training Hours: {individualLogValues.hours_and_stats.training_hours}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Total Hours: {individualLogValues.hours_and_stats.total_hours}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col view-individual-log-main">
                    Tolls: {individualLogValues.hours_and_stats.tolls}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Travel Hours: {individualLogValues.hours_and_stats.travel_hours}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col view-individual-log-header">
                Training Information:
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col view-individual-log-main">
                    Training Type: {individualLogValues.training_info.training_type}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Placed by: {individualLogValues.training_info.placed_by}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Scent Source: {individualLogValues.training_info.scent_source}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col view-individual-log-main">
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Placement Description: {individualLogValues.training_info.placement_description}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Source Container: {individualLogValues.training_info.source_container}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col view-individual-log-header">
                Water Information:
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col view-individual-log-main">
                    Training Type: {individualLogValues.training_info.training_type}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Placed by: {individualLogValues.training_info.placed_by}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Scent Source: {individualLogValues.training_info.scent_source}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col view-individual-log-main">
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Placement Description: {individualLogValues.training_info.placement_description}
                  </div>
                </div>
                <div className="row">
                  <div className="col view-individual-log-main">
                    Source Container: {individualLogValues.training_info.source_container}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewIndividualLog;