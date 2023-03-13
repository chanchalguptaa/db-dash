const _ = require("lodash");
let { nanoid } = require("nanoid");
const alphabetSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
function generateIdentifier(length=6) {
  if (alphabetSet) {
    let nanoid = customAlphabet(alphabetSet, length);
    return nanoid();
  }
  return nanoid(length);
}
const prepareSuccessResponse = ({ data, message ,isCached}) => {
    if( data && (data?.dataValues || data[0]?.dataValues||data?.identifier ))
    {
      data = validateResponse(data)
    }
    return {
      success: true,
      message: !_.isEmpty(message) ? message : "",
      data: !_.isEmpty(data) ? data : null,
      isCached
    }
  }
  
  const prepareErrorResponse = ({ data, message }) => {
    return {
      success: false,
      message: !_.isEmpty(message) ? message : "",
      data: !_.isEmpty(data) ? data : null
    }
  }

  module.exports = {
    prepareSuccessResponse,
    prepareErrorResponse,
    generateIdentifier
  };