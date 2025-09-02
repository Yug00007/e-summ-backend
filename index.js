const express = require('express')
const cors= require('cors');
 const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const getUserInfo = require('./utils/getUserInfo')

const app = express();
const connectDb = require('./config/dbConnect.js')
const dotenv = require("dotenv");
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

app.get("/events", async(req,res)=>{
    const eventList = await Event.find({eventStatus: true}, 'name prizePool organizer participants description dateOfEvent ').exec();
    res.send(eventList);
})

app.post("/register", async(req,res)=>{
    const {username, events, email} = req.body

    const User = await User.findOne({email : email}, 'name').exec() 
    if(User){
    res.status(400).send("User already Registered"); 
    }
    

    try {
    const newUser = new User({
      name: username,
      email: email,
      events: events,
    });

    // Save the user to the database
     await newUser.save();

    res.send('User Created Successfully')
  } catch (error) {
    res.status(500).send('Error creating user');
  }
})

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