import { useState } from "react";
import { formPopulater } from '../utils/formPopulater';
import { checkboxFormPopulater } from "../utils/checkboxFormPopulater";

const WaterLog = () => {
  const [open, setOpen] = useState(false);
  const [submerged, setSubmerged] = useState(false);
  const [depth, setDepth] = useState(0);
  const [saltWater, setSaltWater] = useState(false);  
  const [waterType, setWaterType] = useState('');  
  const [temperature, setTemperature] = useState(0);  

  //submitHandler
    //consts
    //axios
      //values
      //Navigate
  
  const submitHandler = () => {
    const opn = open;
    const submrg = submerged;
    const dpth = depth;
    const sw = saltWater;
    const wt = waterType;
    const temp = temperature;
  }
  
  return (
    <form>
      {checkboxFormPopulater('open', 'Open Water?', setOpen)}
      {checkboxFormPopulater('salt', 'Salt Water?', setSaltWater)}
      {checkboxFormPopulater('submerged', 'Source Submerged?', setSubmerged)}
      {formPopulater('depth', 'Depth', 'number', 'form-control', 'How many feet below the surface was the source?...', setDepth)}
      {formPopulater('water-type', 'Water Type', 'text', 'form-control', 'Describe the type of water source it was (e.g. bay, river, etc.)...', setWaterType)}
      {formPopulater('temperature', 'Temperature', 'number', 'form-control', 'Give a number for the temperature in degrees fahrenheit?...', setTemperature)}
      <button type="button" className="btn btn-primary" onClick={submitHandler}>Submit</button>
    </form>
  )
}

export default WaterLog;