const postNew = (instantiation, res) => {
  instantiation
  instantiation.save((err) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
    }
  });
  res.status(201).send(instantiation);
}

module.exports = postNew;