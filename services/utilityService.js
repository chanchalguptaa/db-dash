const _ = require("lodash");

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
    prepareErrorResponse
  };