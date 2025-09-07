const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const generateToken = (userId) => 
{
    const token = jwt.sign({userId:userId},process.env.JWT_SECRET_KEY,{
        expiresIn:'1h'
    })
    return token;
}
module.exports = generateToken;