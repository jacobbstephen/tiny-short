const express = require('express')
const app = express();
const cors = require("cors");

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"], 
  }))

const dotenv = require('dotenv')
dotenv.config();

const connectToDb = require('./config/db');
connectToDb();

const userRouter = require('./routes/UserRoutes');
app.use('/user', userRouter);

const urlRouter = require('./routes/URLRoutes');
app.use('/url', urlRouter);

app.listen(3000, () => {
    console.log('Server running on PORT 3000')
})