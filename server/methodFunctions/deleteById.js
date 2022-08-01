const deleteById = (id, model, placeholder, req, res) => {
  model.findByIdAndDelete(id, (err, placeholder) => {
    if (err) {
      console.error(err)
      res.status(400).end()
      return
    }

    if (placeholder) {
      res.status(200).send(`${placeholder} was deleted.`)
      return
    }
  })
}

module.exports = deleteById;