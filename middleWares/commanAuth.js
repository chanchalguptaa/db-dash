const { decodeToken } = require('../middleWares/auth');
const { checkAuthKey } = require('../middleWares/authKey');
const { prepareErrorResponse} = require("../services/utilityService.js");


const commonAuth = (req, res, next) => {
    
  decodeToken(req, res, (err) => {
    if (err) {
      console.log("inside err in commonAth");
      if (err.message === "Token expired") {
        return res.status(401).json(prepareErrorResponse("Token expired"));
      } else if (err.message === "unauthorized user") {
        return res.status(401).json(prepareErrorResponse("Unauthorized user"));
      } else if (err.message === "data not found") {
        return res.status(404).json(prepareErrorResponse("Data not found"));
      } else {
        return checkAuthKey(req, res, next);
      }
    }
    next();
  });
};

module.exports = {commonAuth};
