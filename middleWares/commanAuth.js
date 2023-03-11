const { decodeToken } = require('../middleWares/auth');
const { checkAuthKey } = require('../middleWares/authKey');


const commonAuth = (req, res, next) => {
    
  decodeToken(req, res, (err) => {
    if (err) {
      console.log("inside err in commonAth");
      return checkAuthKey(req, res, next);
    }
    next();
  });
};

module.exports = {commonAuth};
