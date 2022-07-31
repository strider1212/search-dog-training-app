const keyChecker = (key, array) => {
  let holder = []
  
  array.map(prop => {
    if (key === prop) {
      holder.push(key)
    }
  })

  if (holder.length < 1) {
    return false
  } else {
    return true
  }
}

module.exports = keyChecker