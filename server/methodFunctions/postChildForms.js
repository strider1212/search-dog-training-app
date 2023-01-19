const postChildrenSchemas = require("./postChildrenSchemas");
const { Log } = require('../mongoose/log');

const postChildForms = async (req, res, postLog, key) => {
  //key should match the corresponding property in POST "/"
  const value = postLog;
  const keyValuePair = {[key]: value};

  await postChildrenSchemas(postLog, Log, req.body.associatedLog, keyValuePair, res);
}

module.exports = postChildForms;
