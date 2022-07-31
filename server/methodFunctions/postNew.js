const postNew = (instantiation, model, req, res) => {
  instantiation
  instantiation.save();
  res.status(201).send(instantiation);
}

module.exports = postNew;