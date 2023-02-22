const db = require("../models/dbModel")
let  {nanoid}  = require("nanoid");

async function insertAuthKey(id, access) {

    console.log('access',access)
    const authkey = "AU"+nanoid(6);
    var authKeyObject=""
    if(access==1){
        authKeyObject = `auth_keys.${authkey}.access`;
    }
    else{
        authKeyObject = `auth_keys.${authkey}.access.${access}`;
        access ={};
    }
    const obj = await db.findOneAndUpdate(

        { _id: id },

        {
            $set: { [authKeyObject]: access }
        }

    )
    return obj
    }
    


async function deleteAuthKeyInDb(id, authKey) {
    return await db.findOneAndUpdate(
        { _id: id },
        {
            $unset: { [`auth_keys.${authKey}`]: "" }
        }
    )
}


async function updateAuthKeyInDb(id,authKey, access) {
    console.log(id,authKey,access)
    return await db.findOneAndUpdate(
        { _id: id },
        {
            $set: { [ `auth_keys.${authKey}.access.${access}`]: {} }
        }
    )
}

module.exports = {insertAuthKey,deleteAuthKeyInDb,updateAuthKeyInDb}