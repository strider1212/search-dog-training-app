const putById = (key, model, placeholder, req, res) => {
  const id = req.params.id;
  const value = req.query.value;

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