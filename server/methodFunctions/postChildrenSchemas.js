const postChildrenSchemas = async (instantiation, model, associatedLog, res) => {
  await instantiation.save();

  await model.findByIdAndUpdate(associatedLog, {water_data: instantiation._id}, {new: true, lean: true}, (err, log) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
   }


    if (log) {
      res.status(200).send(log)
      return
    }
    
   console.error('how did we get here?')
  }).clone()
}

module.exports = postChildrenSchemas;