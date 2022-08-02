const getById = (model, req, res) => {
  //require id be 24 characters on the front end
  const id = req.params.id;
  model.findById(id, (err, placeholder) =>{
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

module.exports = getById;