import { useState } from "react";
import { formPopulater } from '../utils/formPopulater';

const WaterLog = () => {
  //state
    //open
    //submerged
    //depth
    //salt_water
    //water type
    //temperature
    //associated log

  //formPopulaterArray

  //forMapper

  //submitHandler
    //consts
    //axios
      //values
      //Navigate
  
  const submitHandler = () => {
    console.log('test')
  }
  
  return (
    <form>

      <button type="button" className="btn btn-primary" onClick={submitHandler}>Submit</button>
    </form>
  )
}

export default WaterLog;