import { useState } from "react";
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from "../utils/checkboxFormPopulater";

const WaterLog = () => {
  //state
    //open
  const [open, setOpen] = useState(false)
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
      {checkboxFormPopulater('open', setOpen)}
      <button type="button" className="btn btn-primary" onClick={submitHandler}>Submit</button>
    </form>
  )
}

export default WaterLog;