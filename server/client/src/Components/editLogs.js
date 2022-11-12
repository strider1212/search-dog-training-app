import React, {useEffect} from 'react';

const EditLogs = () => {

  const testingUseEffect = () => {
    console.log('testing useEffect')
  }

  useEffect(() => testingUseEffect())
  
  return (
    <p>testing</p>
  )
}

export default EditLogs