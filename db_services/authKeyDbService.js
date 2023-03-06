const db = require("../models/dbModel");
const { nanoid } = require("nanoid");

async function insertAuthKey(id, authObj) {
  const authKey = "AU" + nanoid(6);
  const authKeyObject = `auth_keys.${authKey}`;
   console.log("authKeyObj : ",authKeyObject)
   console.log("auth Obj : ",authObj)
  try {
    const updatedDoc = await db.updateOne(
      {_id:id},
      { $set: { [authKeyObject]: authObj } }
    );

    console.log(`Updated document: ${updatedDoc}`);
    return updatedDoc;
  } catch (error) {
    console.error(`Error while updating document: ${error}`);
    throw error;
  }
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
    return await db.findOneAndUpdate(
        { _id: id },
        {
            $set: { [ `auth_keys.${authKey}.access.${access}`]: {} }
        }
    )
}

module.exports = {insertAuthKey,deleteAuthKeyInDb,updateAuthKeyInDb}