const response = require("../utils/responseHandler");
const {User} = require("../model/userModel");
const generateToken = require("../utils/generateToken.js")
const sendData = async (req,res) => {
    const {name,address,profileImage,age,email,events} = req.body;
    try {
        const user = new User({
            name,
            address,
            profileImage,
            events,
            age,
            email
        })
        //use webhook to create payment request fet theri reponse and proceed to submit and create a pass for the user
        //create token to verify the pass

        await user.save();
        //the above statement will only execute after payment is succesfull
        const token = generateToken(user?._id)
        
        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 
        });
        return response (res,201,"User Created Successfully",user)
    } catch (error) {
        console.error(error)
        return response (res, 500 , "internal Server error userController")
    }
}

module.exports ={
    sendData
}