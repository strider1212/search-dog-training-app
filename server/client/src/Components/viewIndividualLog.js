import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

import { RenderHeader } from "../utils/ViewIndividualLog/renderHeader";
import { RenderIndividualInfo } from "../utils/ViewIndividualLog/renderIndividualInfo";
import { RenderColumn } from "../utils/ViewIndividualLog/renderColumn";
import { HeaderInsert } from "../utils/headerInsert";

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
    axios.get(`${process.env.REACT_APP_BASE_URL}/logs/${logIdFromProps}`, HeaderInsert())
    .then(res => {
      
      const headerInfoDataInputGenerater = (category) => {
        if (res.data[category] !== undefined) {
          return res.data[category]
        } else {
          return '';
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
          blind: res.data.individual_runs?.blind,
          distractions: res.data.individual_runs?.distractions,
          k9: res.data.individual_runs?.k9,
          notes: res.data.individual_runs?.notes,
          time: res.data.individual_runs?.time
        },
        training_info: {
          placed_by:res.data.training_info?.placed_by,
          placement_description: res.data.training_info?.placement_description,
          scent_source: res.data.training_info?.scent_source,
          source_container: res.data.training_info?.source_container,
          training_type: res.data.training_info?.training_type
        },
        water: {
          depth: res.data.water?.depth,
          open: res.data.water?.open,
          salt_water: res.data.water?.salt_water,
          submerged: res.data.water?.submerged,
          temperature: res.data.water?.temperature,
          water_type: res.data.water?.water_type
        },
        weather: {
          humidity: res.data.weather?.humidity,
          temperature: res.data.weather?.temperature,
          weather: res.data.weather?.weather,
          wind_speed: res.data.weather?.wind_speed
        },
        hours_and_stats: {
          mileage: res.data.hours_and_stats?.mileage,
          tolls: res.data.hours_and_stats?.tolls,
          total_hours: res.data.hours_and_stats?.total_hours,
          training_hours: res.data.hours_and_stats?.training_hours,
          travel_hours: res.data.hours_and_stats?.travel_hours
        }
      })
    })
    .catch(err => console.log(err))
  }, [individualLogValues, logIdFromProps])

  const formattedDate = new Date(individualLogValues.date)

  const dateAndTimeInfo = (
    <div className="row">
      <div className="col view-individual-log-main">
        {`${formattedDate.getMonth() + 1}/${formattedDate.getDate() + 1}/${formattedDate.getFullYear()}`} @ {individualLogValues.time}
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
  
  const deleteSelectedLog = (logId) => {
    const confirmation = window.confirm(`You are about to delete Log #${logId}. Are you sure that you want to do that?`)
    if (confirmation) {
      axios.delete(`${process.env.REACT_APP_BASE_URL}/logs/${logId}`, HeaderInsert())
      .then(() => navigate('/editLogs'))
    }
  }

  return (
    <div>
      <button type='button' className="btn btn-secondary" onClick={() => navigate('/editLogs')}>Go Back</button>
      <div className="container">
        <div className="row grey-background">
          <div className="col">
            <h2 style={{color: 'white'}}>Log #{logIdFromProps}</h2>
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
      <button type="button" className="btn btn-danger" onClick={() => deleteSelectedLog(logIdFromProps)}>Delete</button>
    </div>
  )
}

export default ViewIndividualLog;