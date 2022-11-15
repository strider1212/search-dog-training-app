import React, { useState } from 'react';

const EditLogs = () => {
  
  const [testState, setTestState] = useState([])
  const [baseNumber, setBaseNumber] = useState(0)


  const tester = () => {
    let newBaseNumber = baseNumber + 1
    setBaseNumber(newBaseNumber)
    setTestState([...testState, baseNumber])
  }

  return (
    <div style={{color: 'peachpuff'}}>
      {testState}
      <button type='button' className='btn btn-primary' onClick={() => tester()}>Test</button>
    </div>
  )
}

export default EditLogs