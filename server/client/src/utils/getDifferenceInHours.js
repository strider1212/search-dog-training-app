export const getDifferenceInHours = (date, time) => {
  const dateAndTime = date + ', ' + time;
  console.log('dateAndTime in getDifferenceInHours(): ', dateAndTime)
  const dateAndTimeUTC = new Date(dateAndTime);
  console.log('dateAndTimeUTC in getDifferenceInHours(): ', dateAndTimeUTC)
  const current = new Date()
  console.log('current in getDifferenceInHours(): ', current)
  const difference = current - dateAndTimeUTC;
  console.log('difference in getDifferenceInHours(): ', difference)
  const equation = -Math.round(difference/3600000)
  console.log('equation in getDifferenceInHours(): ', equation)

  if (equation === -0) {
    return -1
  } else {
    return equation
  }
}