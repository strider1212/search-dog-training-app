const postChildForms = async (req, res, postLog, key) => {
//key should match the corresponding property in POST "/"
const value = postLog;
const keyValuePair = {[key]: value};

await postChildrenSchemas(postLog, Log, req.body.associatedLog, keyValuePair, res);
await Log.findByIdAndUpdate(req.body.associatedLog, {[key]: postLog})
}

module.exports = postChildForms;
