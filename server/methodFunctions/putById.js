const putById = (key, value, model, placeholder, req, res) => {
  const id = req.params.id;

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