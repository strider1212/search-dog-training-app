import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

import { RenderHeader } from "../utils/ViewIndividualLog/renderHeader";
import { RenderIndividualInfo } from "../utils/ViewIndividualLog/renderIndividualInfo";
import { RenderColumn } from "../utils/ViewIndividualLog/renderColumn";

const ViewIndividualLog = () => {
  const location = useLocation()
  
  const navigate = useNavigate()

  const logIdFromProps = location.state._id;

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
      time: ''
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
      
      const headerInfoDataInputGenerater = (category) => {
        if (res.data[category] !== undefined) {
          return res.data[category]
        } else {
          return '';
        }
      }
      
      const dataInputGenerater = (category, subCategory) => {
        if (res.data[category] !== undefined) {
          return res.data[category][subCategory]
        } else {
          return ''
        }
      }

      setIndividualLogValues({
        ...individualLogValues,
        address: headerInfoDataInputGenerater('address'),
        // date
        date: headerInfoDataInputGenerater('date'),
        // log_created_by
        log_created_by: headerInfoDataInputGenerater('log_created_by'),
        // team
        team: headerInfoDataInputGenerater('team'),
        // time
        time: headerInfoDataInputGenerater('time'),
        individual_runs: {
          blind: dataInputGenerater('individual_runs', 'blind'),
          distractions: dataInputGenerater('individual_runs', 'distractions'),
          k9: dataInputGenerater('individual_runs', 'k9'),
          notes: dataInputGenerater('individual_runs', 'notes'),
          times: dataInputGenerater('individual_runs', 'times')
        },
        training_info: {
          placed_by: dataInputGenerater('training_info', 'placed_by'),
          placement_description: dataInputGenerater('training_info', 'placement_description'),
          scent_source: dataInputGenerater('training_info', 'scent_source'),
          source_container: dataInputGenerater('training_info', 'source_container'),
          training_type: dataInputGenerater('training_info', 'training_type')
        },
        water: {
          depth: res.data.water?.depth,
          open: dataInputGenerater('water', 'depth'),
          salt_water: dataInputGenerater('water', 'salt_water'),
          submerged: dataInputGenerater('water', 'submerged'),
          temperature: dataInputGenerater('water', 'temperature'),
          water_type: dataInputGenerater('water', 'water_type')
        },
        weather: {
          humidity: dataInputGenerater('weather', 'humidity'),
          temperature: dataInputGenerater('weather', 'temperature'),
          weather: dataInputGenerater('weather', 'weather'),
          wind_speed: dataInputGenerater('weather', 'wind_speed')
        },
        hours_and_stats: {
          mileage: dataInputGenerater('hours_and_stats', 'mileage'),
          tolls: dataInputGenerater('hours_and_stats', 'tolls'),
          total_hours: dataInputGenerater('hours_and_stats', 'total_hours'),
          training_hours: dataInputGenerater('hours_and_stats', 'training_hours'),
          travel_hours: dataInputGenerater('hours_and_stats', 'travel_hours')
        }
      })
    })
    .catch(err => console.log(err))
  }, [])

  const formattedDate = new Date(individualLogValues.date)

  const dateAndTimeInfo = (
    <div className="row">
      <div className="col view-individual-log-main">
        {`${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`} @ {individualLogValues.time}
      </div>
    </div>
  )

  const booleanRenderer = (boolean) => {
    if (boolean) {
      return 'Yes'
    } else {
      return 'No'
    }
  }
  
  return (
    <div>
      <button type='button' className="btn btn-secondary" onClick={() => navigate('/editLogs')}>Go Back</button>
      <div className="container">
        <div className="row grey-background">
          <div className="col">
            {RenderHeader('General Info')}
              <div className="row">
                {RenderColumn(
                  RenderIndividualInfo('', individualLogValues.address), 
                  RenderIndividualInfo('Created by: ', individualLogValues.log_created_by, ''))}
                {RenderColumn(
                  dateAndTimeInfo, 
                  RenderIndividualInfo('Team: ', individualLogValues.team))}
              </div>
            {RenderHeader('Weather Info')}
              <div className="row">
                {RenderColumn(
                  RenderIndividualInfo('Weather Description: ', individualLogValues.weather.weather),
                  RenderIndividualInfo('Humidity: ', individualLogValues.weather.humidity, '%')
                )}
                {RenderColumn(
                  RenderIndividualInfo('Temperature: ', individualLogValues.weather.temperature, '°F'),
                  RenderIndividualInfo('Wind speed: ', individualLogValues.weather.wind_speed, ' mph')
                )}
              </div>
            {RenderHeader('Time and Mileage')}
              <div className="row">
                {RenderColumn(
                  RenderIndividualInfo('Mileage: ', individualLogValues.hours_and_stats.mileage),
                  RenderIndividualInfo('Training Hours: ', individualLogValues.hours_and_stats.training_hours),
                  RenderIndividualInfo('Total Hours: ', individualLogValues.hours_and_stats.total_hours)
                )}
                {RenderColumn(
                  RenderIndividualInfo('Tolls: ', individualLogValues.hours_and_stats.tolls),
                  RenderIndividualInfo('Travel Hours: ', individualLogValues.hours_and_stats.travel_hours)
                )}
              </div>
            {RenderHeader('Training Information')}
              <div className="row">
                {RenderColumn(
                  RenderIndividualInfo('Training Type: ', individualLogValues.training_info.training_type),
                  RenderIndividualInfo('Placed by: ', individualLogValues.training_info.placed_by),
                  RenderIndividualInfo('Scent Source: ', individualLogValues.training_info.scent_source)
                )}
                {RenderColumn(
                  RenderIndividualInfo(),
                  RenderIndividualInfo('Placement Description: ', individualLogValues.training_info.placement_description),
                  RenderIndividualInfo('Source Container: ', individualLogValues.training_info.source_container)
                )}
              </div>
            {RenderHeader('Water Information')}
              <div className="row">
                {RenderColumn(
                  RenderIndividualInfo('Open Water?: ', booleanRenderer(individualLogValues.water.open)),
                  RenderIndividualInfo('Water Type: ', individualLogValues.water.water_type),
                  RenderIndividualInfo('Salt Water?: ', booleanRenderer(individualLogValues.water.salt_water))
                )}
                {RenderColumn(
                  RenderIndividualInfo('Depth: ', individualLogValues.water.depth, ' ft.'),
                  RenderIndividualInfo('Temperature: ', individualLogValues.water.temperature, '°F')
                )}
              </div>
            {RenderHeader('Individual Runs')}
              <div className="row">
                {RenderColumn(
                  RenderIndividualInfo('K9: ', individualLogValues.individual_runs.k9),
                  RenderIndividualInfo('Blind?: ', booleanRenderer(individualLogValues.individual_runs.blind)),
                  RenderIndividualInfo('Time: ', individualLogValues.individual_runs.time, ' minutes'),
                )}
                {RenderColumn(
                  RenderIndividualInfo('Distractions: ', individualLogValues.individual_runs.distractions), 
                  RenderIndividualInfo('Notes: ', individualLogValues.individual_runs.notes)
                )} 
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewIndividualLog;