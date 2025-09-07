const express = require('express')
const cors = require('cors');
const regRoutes = require('./routes/regRoutes.js')
const app = express();
const connectDb = require('./config/dbConnect.js')
const dotenv = require("dotenv")
const authRoutes = require('./routes/authRoute.js');
const cookieParser = require('cookie-parser');
dotenv.config();


const PORT = process.env.PORT
app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb().then();

app.use('/api/reg', regRoutes);
app.use('/api/auth', authRoutes);
//get routes
app.get('/api/get');


app.listen(PORT, () => {
    console.log(`Server Started Running on PORT ${PORT}`);
})