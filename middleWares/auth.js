const userDbService = require('../db_services/userDbService');
const jwt = require("jsonwebtoken");

exports.decodeToken =async  (req, res,next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).json({message:"invalid token"});
  }
  const token = authHeader;

  console.log(token);
  

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    console.log("decodeToken",decodedToken);
  } catch (err) {
    console.log(err)
  return res.status(401).json({message:"unauthorized user"});
  }
  if (!decodedToken) {
    return res.status(401).json({message:"data not found"});
  }
  const userFromDb = await userDbService.getUserByEmail(decodedToken?.userEmail);
  if(userFromDb){
    return next();
  }
  else{
    return res.status(404).json({message:"data not found"});
  }
};