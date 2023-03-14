const userDbService = require('../db_services/userDbService');
const jwt = require("jsonwebtoken");

const decodeToken =async  (req, res,next) => {
  const authHeader = req?.get("Authorization");
  if (!authHeader) {
    console.log("inside decodeToken");
    return next(new Error("Token decoding failed"));
  }
  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      return next(new Error("unauthorized user"));

    }
  } catch (err) {
    console.log(err)
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
};

module.exports ={decodeToken}