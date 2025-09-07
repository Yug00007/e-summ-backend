// swagatsahu556

const mongoose = require ('mongoose');

const eventSchema = new mongoose.Schema({
    name:{type:String},
    prizePool : {type:Number},
    organizer : {type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        default : null
    },
    participants : [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }],
    description:{type:String},
    dateOfEvent : {type:String},
    eventStatus : {type:Boolean}
},{timestamps:true})

const Event = mongoose.model('Events',eventSchema);

module.exports ={
    Event
}