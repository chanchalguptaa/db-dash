const userDbService = require('../db_services/userDbService');
const jwt = require("jsonwebtoken");
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");

const decodeToken =async  (req, res,next) => {
  try{
    const authHeader = req?.get("Authorization");
    if (!authHeader) {
      return next(new Error("Token decoding failed"));
    }
    const token = authHeader;
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    } catch (err) {
      return next(new Error("unauthorized user"));
    }
    if (!decodedToken) {
      return next(new Error("data not found"));
    }
  const userFromDb = await userDbService.getUser(decodedToken?.userEmail);
    if(userFromDb){
      req.profile = userFromDb;
      return next();
    }
    else{
       return next(new Error("data not found"));
    }
  }catch(err){
    throw err
  }
  }
 

module.exports ={decodeToken}