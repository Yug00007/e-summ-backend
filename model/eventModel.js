// swagatsahu556

const mongoose = require ('mongoose');

const eventSchema = new mongoose.Schema({
    name:{type:String},
    prizePool : {type:Number},
    organizer : {type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    participants : [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    description:{type:String},
    dateOfEvent : {type:String},
    eventStatus : {type:Boolean}
})

const Event = mongoose.model('Events',eventSchema);

module.exports ={
    Event
}