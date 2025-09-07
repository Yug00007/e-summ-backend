//swagatsahu556
const mongoose = require('mongoose');
const organizerSchema = new mongoose.Schema({
    name : {type:String},
    email:{type:String}
},{timestamps:true});

const Organizer = mongoose.model('Organizer',organizerSchema);
module.exports= {
    Organizer
}