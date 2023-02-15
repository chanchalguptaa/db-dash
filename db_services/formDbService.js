const form = require("../models/formModel")

async function saveForm(form){
    await form.save()
}
module.exports = {saveForm}