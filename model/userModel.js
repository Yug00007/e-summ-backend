// swagatsahu556


const mongoose = require ('mongoose')

const userScehma = new mongoose.Schema({
    name:{ type : String },
    events :[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Event',
    }],
    email :{ type: String },
    paid :{type: Boolean}
},{timestamps:true});

const User = new mongoose.model("User",userScehma);
module.exports ={
    User
}