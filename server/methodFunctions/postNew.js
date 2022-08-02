const postNew = (instantiation, res) => {
  instantiation
  instantiation.save();
  res.status(201).send(instantiation);
}

module.exports = postNew;