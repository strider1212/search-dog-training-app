import { validator } from "./validator";

export const submitHandler = (setErrorStateFunc, state, stateArray, setSubmitFunc) => {
  setErrorStateFunc(validator(state, stateArray));
  setSubmitFunc(true);
}