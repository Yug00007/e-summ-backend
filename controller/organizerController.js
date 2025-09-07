const response = require("../utils/responseHandler.js")
const {Organizer} = require ("../model/organizerModel.js")
//swagat sahu 556
const sendDataOrganizer = async(req,res) =>{ 
    const {name,email} = req.body;
    try {
        const newOrganizer = new Organizer({
            name,
            email
        })
        await newOrganizer.save();
        return response(res,201,"Oraganizer Created Successfully",newOrganizer)
    } catch (error) {
        console.error(error)
        return response(res,500,"Internal Server Error organizerController")
    }
}
module.exports={
    sendDataOrganizer
}