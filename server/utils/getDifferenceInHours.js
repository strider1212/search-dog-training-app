const getDifferenceInHours = (date, time) => {
  const dateAndTime = date + ', ' + time;
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

module.exports = getDifferenceInHours;