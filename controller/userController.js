const response = require("../utils/responseHandler.js");
const { User } = require("../model/userModel.js");
const sendData = async (req, res) => {

    try {
        let user = await User.findById(req.user.userId);
        if (!user) {
            return response(res, 404, "User Not Found");
        }
        if (user.isVerified == true) {
            const { name, address, profileImage, age, email, events } = req.body;
            
            //use webhook to create payment request fet theri reponse and proceed to submit and create a pass for the user
            //the above statement will only execute after payment is succesfull
            const paymentVerdict = 1;

            if (true) {
                user.isPaid = true;
                user.name= name;
                user.address = address;
                user.profileImage = profileImage;
                user.age = age;
                user.email = email;
                user.events = events;
                await user.save();
            }
            else{
                return response(res, 402 , "Payment Incomplete required to proceed");
            }
            return response(res, 201, "User Created Successfully", user)
        }
    } catch (error) {
        console.error(error)
        return response(res, 500, "internal Server error userController")
    }
}

module.exports = {
    sendData
}