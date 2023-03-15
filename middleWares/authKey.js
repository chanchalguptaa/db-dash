const { getDbById } = require("../db_services/masterDbService");
const { prepareErrorResponse } = require("../services/utilityService.js");

const checkAuthKey = async (req, res, next) => {
  try {
    const authkey = req?.headers['key'];
    const db_id = req?.params?.dbId;
    const tableName = req?.params?.tableName;

    const data = await getDbById(db_id);

    if (!data.auth_keys[authkey]) {
      return res.status(400).json(prepareErrorResponse({ message: "Invalid token" }));
    }

    const { access, scope } = data.auth_keys[authkey];

    if (access === 1) {
      if (scope === 'write' || (scope === 'read' && req.method === 'GET')) {
        return next();
      } else {
        return res.status(400).json(prepareErrorResponse({ message: "Invalid request call" }));
      }
    } else if (access.includes(tableName)) {
      if (scope === 'write' || (scope === 'read' && req.method === 'GET')) {
        return next();
      } else {
        return res.status(400).json(prepareErrorResponse({ message: "Invalid request call" }));
      }
    } else {
      return res.status(400).json(prepareErrorResponse({ message: "Invalid token" }));
    }
  } catch (err) {
    return res.status(400).json(prepareErrorResponse({ message: `Something error in server ${err.message}` }));
  }
}

module.exports = { checkAuthKey };
