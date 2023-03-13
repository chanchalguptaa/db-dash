const db = require("../models/dbModel");
const { nanoid } = require("nanoid");

async function insertAuthKey(id, authObj) {
  const authKey = "AU" + nanoid(6);
  const authKeyObject = `auth_keys.${authKey}`;
  try {
    const updatedDoc = await db.updateOne(
      {_id:id},
      { $set: { [authKeyObject]: authObj } }
    );
    return data={
      updatedDoc:updatedDoc,
      authKey:authKey
    };
  } catch (error) {
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