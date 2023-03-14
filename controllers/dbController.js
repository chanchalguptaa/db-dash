const dbService = require("../db_services/masterDbService")
const { prepareErrorResponse, prepareSuccessResponse, generateIdentifier } = require("../services/utilityService.js");
const sqlDbService = require("../sql_db_services/databaseService")
const Db = require("../models/dbModel")
const userService = require("../db_services/userDbService")
const {addTable} = require("../db_services/tableDbService");
const tableService = require("../sql_db_services/tableService")




const createDb = async (req, res) => {
    try {
        if (!Object.keys(req.body.name).length) return res.send("Name can't empty");
        const db = new Db(req?.body)
        const org_id = req?.params?.orgId
        const sqlDbName = db?.name + "_" + org_id
        const user_id = req?.body?.user_id
        db.org_id = req?.params?.orgId
        const conUrl = await sqlDbService.createDatabase(sqlDbName)
        try {
            db.con_url = conUrl
            const data = await dbService.saveDb(db);
            const dbId = data?._id + ""
            const tableId = "tbl" + generateIdentifier(6);
            const result = await userService.addDbIdInUSerSchema(user_id, dbId)             
            const ans = await tableService.createTableService(tableId, data)    
            const data1 = await addTable(data?._id,"untittled",tableId)
            return res.status(201).json(prepareSuccessResponse({ data: db, message: "Successfully create db" }));
        } catch (error) {
            await sqlDbService.dropDatabase(sqlDbName)
            return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));

        }
    } catch (error) {
        return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));

    }
}

const getAllDb = async (req, res) => {
    try {
        const db = await dbService.getDbs()
        return res.status(201).json(prepareSuccessResponse({ data: db, message: "Successfully get db" }));

    } catch (error) {
        return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));

    }
}

const getDbById = async (req, res) => {
    try {
        const dbId = req.params.dbId
        const db = await dbService.getDbById(dbId)
        if(db==null){
            return res.status(404).json(prepareErrorResponse({message:"db is not exist with id "+dbId ,data:Db}))
        }
        return res.status(201).json(prepareSuccessResponse({ data: db, message: "Successfully get db" }));

    } catch (error) {
        return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));

    }
}

const getDbByOrgId = async (req, res) => {
    try {
        const org_id = req.params.org_id;
        const db = await dbService.getDbByOrgId(org_id);
        return res.status(201).json(prepareSuccessResponse({ data: db, message: "Successfully get db" }));
    } catch (error) {
        return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));
    }
}

const deleteDb = async (req, res) => {
    try {

        const id = req?.params?.id;
        const dbId = [id];
        const orgId = req?.params?.orgId;
        const orgCount= await dbService.getDbCountByOrgId(orgId)
        if(orgCount>=2){
            const deleteDbFromUser = await userService.deleteDbInUser(dbId);
            const db = await dbService.deleteDb(id)
            if (!db) {
                return res.status(404).json(prepareErrorResponse({ message: "db not found with id" }));
    
            }
            const sqlDbName = db?.name + "_" + db?.org_id
            await sqlDbService.dropDatabase(sqlDbName)
            return res.status(201).json(prepareSuccessResponse({ data: db, message: "Successfully delete db" }));
        } else{
            return res.status(404).json(prepareErrorResponse({ message: "Can't Delete DB becuase this Org have only one DB"}));
        }

    } catch (error) {
        return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));
    }
}

const renameDb = async (req, res) => {
    try {
        const id = req?.params?.id
        const newDB = req?.body
        const db = await dbService.getDbById(id)
        if (!db) {
            return res.status(404).json(prepareErrorResponse({ message: "rename cancelled", data: { error } }));

        }

        const newDbName = newDB?.name + "_" + db?.org_id
        const oldDbName = db?.name + "_" + db?.org_id;
        Object.assign(db, newDB);
        
        const conUrl = await sqlDbService.renameDatabase(oldDbName, newDbName);

        db.con_url = conUrl;
        const data = await dbService.renameDb(id,newDB);
    
        return res.status(201).json(prepareSuccessResponse({ data: db, message: "Successfully rename db" }));

    } catch (error) {
        return res.status(404).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));

    }
}

module.exports = { createDb, getAllDb, deleteDb, renameDb, getDbByOrgId, getDbById }