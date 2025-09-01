const express = require('express')
const cors= require('cors');
 const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const getUserInfo = require('./utils/getUserInfo')

const app = express();
const connectDb = require('./config/dbConnect.js')
const dotenv = require("dotenv")
dotenv.config();


const PORT = process.env.PORT
app.use(cors()) 

app.use(express.urlencoded());

connectDb().then();


// const checkJwt = auth({
//     audience: process.env.audience,
//     issuerBaseURL: process.env.issuerBaseURL,
// });

// app.get("/speakers", (req,res)=>{
//     const data = ["dummy"];
//     res.send(data);
// })

// app.post("/register", async(req,res)=>{
//     const {username,email, events, contactNo} = req.body
//     const newUser = 'dummy' // db query to create newUser in table after validation
//     if(!newUser){
//     res.status(500).send("Server error, Please contact this no. 2839247483"); // if newUser unsuccessful
//     }

//     res.send("success") // newUser created, reflect data on client-side
// })

// app.post("/login",checkJwt, async(req,res)=>{
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//     if(!token) res.status(401).send("Unauthorized")
    
//     try {
//         const userData = await getUserInfo(token)

//     } catch (error) {
//         res.send("Server error. Contact this no. 2823899293 for further support");
//     }

//     res.send({user: userData});
// })

app.listen(PORT,()=>{
    console.log(`Server Started Running on PORT ${PORT}`);
})