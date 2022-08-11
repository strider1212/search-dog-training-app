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
  const [depth, setDepth] = useState(false);
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
    console.log(depth)
  }
  
  return (
    <form>
      {checkboxFormPopulater('open', 'Open Water?', setOpen)}
      {checkboxFormPopulater('submerged', 'Source Submerged?', setSubmerged)}
      {formPopulater('depth', 'Depth', 'number', 'form-control', 'How many feet below the surface was the source?...', setDepth)}
      <button type="button" className="btn btn-primary" onClick={submitHandler}>Submit</button>
    </form>
  )
}

export default WaterLog;