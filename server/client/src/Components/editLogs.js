import React, {useEffect} from 'react';

const EditLogs = () => {

  // const testingUseEffect = () => {
  //   console.log('testing useEffect')
  // }

  // useEffect(() => testingUseEffect())
  const arrayOne = [1, 2, 3, 4]

  const mapTest = arrayOne.map(i => {
    return `the next number is ${i}`
  })
  
  return (
    <p>{mapTest}</p>
  )
}

export default EditLogs