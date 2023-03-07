const { decodeToken } = require('./auth');
const { checkAuthKey } = require('./authKey');


const commonAuth = (req, res, next) => {
    
  decodeToken(req, res, (err) => {
    if (err) {
      console.log("DecodeToken Err");
      return checkAuthKey(req, res, next);
    }
    console.log("DecodeToken Success");
    next();
  });
};

module.exports = {commonAuth};
