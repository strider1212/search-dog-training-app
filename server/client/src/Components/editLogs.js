import React, {useEffect} from 'react';
import axios from 'axios';

const EditLogs = () => {

  // const arrayOfLogs = []

  // const arrayOfLogDisplayed = arrayOfLogs.map((e, i) => {
  //   return `<p>Number ${i} is ${e}</p>`
  // })
  
  // const editLogsDisplayGrid = () => {
  //   // if (arrayOfLogDisplayed.length === 0) {
  //   //   return 'No logs loaded'
  //   // } else {
  //   //   return arrayOfLogDisplayed;
  //   // }
  //   return 'test'
  // }
  // // const testingUseEffect = () => {
  // //   console.log('testing useEffect')
  // // }

  // useEffect(() => {
  //   axios.get('http://localhost:3000/logs')
  //   .then(res => {
  //     console.log('result from the get request to all logs', res)
  //     console.log('res.data array:', res.data)
  //     res.data.map(e => arrayOfLogs.push(e))
  //   })
  // })

  // // const arrayOne = [1, 2, 3, 4]

  // // const mapTest = arrayOne.map(i => {
  // //   return `the next number is ${i}`
  // // })
  
  return (
    <div>
      <p>editLogs.js</p>
    </div>
  )
}

export default EditLogs