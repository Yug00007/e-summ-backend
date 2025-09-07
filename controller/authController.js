const { User } = require('../model/userModel.js');
const sendOtpToEmail = require('../services/emailService.js');
const generateToken = require('../utils/generateToken.js');
const generateOtp = require('../utils/otpGenerator.js');
const response = require('../utils/responseHandler');

const sendOtp = async (req, res) => {
    const { email } = req.body;
    const otp = generateOtp();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);
    try {
        if (email) {
            let user;
            user = await User.findOne({ email });
            if (!user) {
                user = new User({ email });
            }
            user.emailOtp = otp;
            user.otpExpiry = expiry;
            await sendOtpToEmail(email, otp);
            await user.save();
            return response(res, 200, "Otp sent success to ur email")
        }
        else {
            return response(res, 400, "Email is required")
        }
    } catch (error) {
        console.error(error)
        return response(res, 500, "Internal Server Error authController sendOTp")
    }
}

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        let user;
        if (email && otp) {
            user = await User.findOne({ email });
            if (!user) {
                return response(res, 400, "User not found with this email")
            }//user is fetched
            const now = new Date();
            if (!(user.emailOtp) || (user.emailOtp !== String(otp)) || (now > user.otpExpiry)) {
                return response(res, 404, "Invalid OTP Verification Step Maybe Missing OTP or Expired");
            }
            user.isVerified = true;
            user.emailOtp = null;
            user.otpExpiry = null;
            await user.save();
            //token generate
        }
        else {
            return response(res, 400, "Email and Otp is required")
        }
        const token = generateToken(user?._id);
        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        });
        return response(res, 200, "User verified successfully", { token, user })

    } catch (error) {
        console.error(error);
        return response(res, 500, "Internal Server Error authController verifyOtp")
    }
}

const logout = (req, res) => {
  try {
    res.cookie("auth_token", "", {
      httpOnly: true,
      expires: new Date(0), 
    });
    return response(res, 200, "Logout Successful");
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error authcontroller.js logout");
  }
};

const checkAuthenticated = async (req, res) => {
    const userId = req.user.userId;
    try {
        if (!userId) {
            return response(res, 401, "Unauthorized")
        }
        const user = await User.findById(userId);
        if (!user) {
            return response(res, 404, "User Not Found with this token Try login Again")
        }
        return response(res, 200, "user is successfully retreived and authenticated", user);
    } catch (error) {
        console.error(error);
        return response(res, 500, "internal server error authcontroller.js checkAuthenticated")
    }
}
module.exports = {
    sendOtp,
    verifyOtp,
    logout,
    checkAuthenticated
}