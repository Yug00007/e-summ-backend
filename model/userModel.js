// swagatsahu556


const mongoose = require('mongoose')

const userScehma = new mongoose.Schema({
    name: { type: String  },
    address: { type: String },
    profileImage: { type: String },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    age: { type: Number , default :null },
    email: { type: String , default:null , unique:true},
    isVerified: { type: Boolean, default: false },
    emailOtp: { type: String, default:null },
    otpExpiry: { type: Date },
    isPaid: { type: Boolean, default: false }
}, { timestamps: true });

const User = new mongoose.model("User", userScehma);
module.exports = {
    User
}