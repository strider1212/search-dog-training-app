const arrayKeyChecker = (array, key) => {
  const holder = [];

  const match = key;
  
  array.map(key => {
    if (key === match) {
      holder.push(match)
    }
  })

  if (holder.length > 0) {
    return true
  } else {
    return false
  }
}

module.exports = arrayKeyChecker;
