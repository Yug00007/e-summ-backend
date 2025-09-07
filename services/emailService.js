const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

transporter.verify((error,success) => {
    if(error){
        console.error(error)
    }
    else{
        console.log("Ready to Send Emails")
    }
})

const sendOtpToEmail = async (email,otp) => {
    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; color: #333; padding: 30px; max-width: 600px; margin: auto; border-radius: 8px; border: 1px solid #ddd;">
      
      <h2 style="color: #1119b3ff; text-align: center; margin-bottom: 10px;">Esummit Verification</h2>
      <p style="text-align: center; font-size: 14px; color: #555; margin-top: 0;">
        Secure your account in just one step
      </p>

      <div style="background-color: #ffffff; padding: 25px; border-radius: 6px; margin-top: 20px; border: 1px solid #e5e7eb;">
        <p style="font-size: 16px; margin-bottom: 10px;">Hi there,</p>
        <p style="font-size: 15px; margin-bottom: 20px;">
          Your one-time password (OTP) to verify your SogyChat account is:
        </p>

        <div style="text-align: center; margin: 25px 0;">
          <span style="
            font-size: 28px; 
            font-weight: bold; 
            background-color: #e0f7fa; 
            color: #000; 
            padding: 12px 28px; 
            display: inline-block; 
            border-radius: 6px; 
            letter-spacing: 3px;">
            ${otp}
          </span>
        </div>

        <p style="font-size: 14px; margin-bottom: 15px;">
          <strong>This OTP is valid for the next 5 minutes.</strong>  
          Please do not share this code with anyone.
        </p>

        <p style="font-size: 14px; margin-bottom: 0;">
          If you did not request this OTP, simply ignore this email.
        </p>
      </div>

      <p style="margin-top: 25px; font-size: 14px; text-align: center; color: #444;">
        Thanks & Regards,<br/>
        <strong>Swagat Sahu</strong><br/>
        Indian Institute of Information Technology Bhagalpur
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

      <p style="font-size: 12px; color: #777; text-align: center;">
        This is an automated message. Please do not reply.
      </p>
    </div>
  `;
  await transporter.sendMail({
    from : process.env.EMAIL_USER,
    to: email,
    subject : "Your OTP Verification for Esummit 2025",
    html
  });
};

module.exports = sendOtpToEmail;