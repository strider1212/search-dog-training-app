export const getDifferenceInHours = (date, time) => {
  const dateAndTime = `${date}T${time}`;
  const dateAndTimeUTC = new Date(dateAndTime);
  const current = new Date()
  const difference = current - dateAndTimeUTC;
  const equation = -Math.round(difference/3600000)

  if (equation === -0) {
    return -1
  } else {
    return equation
  }
}