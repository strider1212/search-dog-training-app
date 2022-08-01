const keyChecker = require('../utils/keyChecker');
const arrayKeyChecker = require('../utils/arrayKeyChecker');

const putById = (model, placeholder, arrayKeyCheckerArray, keyCheckerArray, req, res) => {
  const id = req.params.id;
  const key = req.query.key;
  const value = req.query.value;

  if (arrayKeyChecker(arrayKeyCheckerArray, key)) {
    res.status(404).send('Cannot update this category in this way. Can only add or delete this category.').end()
    return
  }

  if (!keyChecker(key, keyCheckerArray)) {
    console.error("Key must match userSchema.")
    res.status(404).end()
    return
  }

  model.findByIdAndUpdate(id, {[key]: value}, {new: true, lean: true}, (err, placeholder) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
   }


    if (placeholder) {
      res.status(200).send(placeholder)
      return
    }
    
   console.error('how did we get here?')
  })
}

module.exports = putById;