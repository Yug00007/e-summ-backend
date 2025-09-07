const express = require('express')
const cors = require('cors');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const getUserInfo = require('./utils/getUserInfo')
const regRoutes = require('./routes/regRoutes.js')
const app = express();
const connectDb = require('./config/dbConnect.js')
const dotenv = require("dotenv")
dotenv.config();


const PORT = process.env.PORT
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectDb().then();

app.use('/api/reg', regRoutes);

app.listen(PORT, () => {
    console.log(`Server Started Running on PORT ${PORT}`);
})