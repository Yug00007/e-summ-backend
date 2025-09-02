// swagatsahu556


const mongoose = require ('mongoose')

const userScehma = new mongoose.Schema({
    name:{ type : String },
    address : { type : String },
    profileImage : { type : String },
    events :[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Event',
    }],
    age: {type : Number},
    email :{ type: String }
},{timestamps:true});

const User = new mongoose.model("User",userScehma);
module.exports ={
    User
}