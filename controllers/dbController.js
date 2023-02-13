const dbService = require("../db_services/dbDbService")
const sqlDbService = require("../sql_db_services/databaseService") 

const Db = require("../models/dbModel")

const createDb = async (req,res)=>{
    try {
        const db = new Db(req?.body) 
        const sqlDbName = db?.name+"_"+db?.org_id
        console.log(sqlDbName);
        const conUrl=await sqlDbService.createDatabase(sqlDbName)
        try {
            db.con_url=conUrl
            await dbService.saveDb(db)
            res.send(db)
        } catch (error) {
            console.log("HARIOM "+error);
            await sqlDbService.dropDatabase(sqlDbName)
            res.status(400).send(error)
    }
    } catch (error) {
        console.log("ASHISH "+error);
        res.status(400).send(error)
    }
}

const getAllDb = async (req,res)=>{
    try {
        const db = await dbService.getDbs()
        res.send(db)
    } catch (error) {
        res.status(401).send(error)
    }
}

const deleteDb = async (req,res)=>{
    try {
         
        const id = req?.params?.id
        const db = await dbService.deleteDb(id)
        if(!db){
          return res.status(404).send({error:"db not found with id "+id})
        }
        const sqlDbName = db?.name+"_"+db?.org_id
        await sqlDbService.dropDatabase(sqlDbName)
        res.send({message:"delete done !",db})
     } catch (error) {
        res.status(400).send(error)
     }
}

const renameDb = async (req,res) =>{
    try {
        const id = req?.params?.id
        const newDB = req?.body
        const db = await dbService.getById(id)
        if(!db){
            return res.status(404).send("db not found with id "+id)
        }
        const newDbName = newDB?.name+"_"+db?.org_id
        const oldDbName = db?.name+"_"+db?.org_id;
        Object.assign(db, newDB);
        const conUrl=await sqlDbService.renameDatabase(oldDbName,newDbName);
        db.con_url=conUrl;
        await dbService.saveDb(db)
        res.send({message:"success",db})
    } catch (error) {
        console.error(error);
        res.status(400).send({message:"re operation failed",error})
    }
}

module.exports = {createDb,getAllDb,deleteDb,renameDb}