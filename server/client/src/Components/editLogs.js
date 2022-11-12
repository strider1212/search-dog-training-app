import React, {useEffect} from 'react';

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

  // useEffect(() => testingUseEffect())

  // const arrayOne = [1, 2, 3, 4]

  // const mapTest = arrayOne.map(i => {
  //   return `the next number is ${i}`
  // })
  
  return (
    <p>{editLogsDisplayGrid()}</p>
  )
}

export default EditLogs