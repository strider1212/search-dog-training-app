import { useState } from "react";
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from "../utils/checkboxFormPopulater";

const WaterLog = () => {
  //state
    //open
  const [open, setOpen] = useState(false);
    //submerged
  const [submerged, setSubmerged] = useState(false);
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
    console.log(submerged)
  }
  
  return (
    <form>
      {checkboxFormPopulater('open', 'Open Water?', setOpen)}
      {checkboxFormPopulater('submerged', 'Source Submerged?', setSubmerged)}
      <button type="button" className="btn btn-primary" onClick={submitHandler}>Submit</button>
    </form>
  )
}

export default WaterLog;