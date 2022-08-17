export const validator = (values, initialStateArray) => {
  const errors = {};
  
  // eslint-disable-next-line array-callback-return
  initialStateArray.map(item => {
    if (!values[item]) {
      errors[item] = `${item} category is required.`
    }
  })
  return errors;
}