import React, {useEffect} from 'react';
import axios from 'axios';

const EditLogs = () => {

  const arrayOfLogs = []

  const arrayOfLogDisplayed = arrayOfLogs.map((e, i) => {
    return `Number ${i} is ${e}`
  })
  
  const editLogsDisplayGrid = () => {
    console.log(arrayOfLogDisplayed.length)
    if (arrayOfLogDisplayed.length === 0) {
      return 'No logs loaded'
    } else {
      return arrayOfLogDisplayed;
    }
  }
  // const testingUseEffect = () => {
  //   console.log('testing useEffect')
  // }

  useEffect(() => {
    axios.get('http://localhost:3000/logs')
    .then(res => console.log(res))
  })

  // const arrayOne = [1, 2, 3, 4]

  // const mapTest = arrayOne.map(i => {
  //   return `the next number is ${i}`
  // })
  
  return (
    <p>{editLogsDisplayGrid()}</p>
  )
}

export default EditLogs