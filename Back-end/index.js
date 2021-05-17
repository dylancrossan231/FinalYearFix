import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// import routes from './src/routes/crmRoutes';
const dotenv = require('dotenv');
const router = express.Router();
dotenv.config();

const app = express();

//import routes
const authRoute = require('./src/routes/auth')
const workoutsRoute = require('./src/routes/workouts')
const exercisesRoute = require('./src/routes/exercises')
const weightsRoute = require("./src/routes/weights")
const sleepRoute = require("./src/routes/sleep");
const nutritionRoute = require("./src/routes/nutrition");


const PORT = 3000;
// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true,useUnifiedTopology: true}, ()=>   
         console.log("connected to DBs :)")     
, );

app.use(express.json());
//Route middlewares
app.use('/api/user', authRoute);
app.use("/api/exercises", exercisesRoute);
app.use('/api/workouts', workoutsRoute);
app.use("/api/weights", weightsRoute);
app.use("/api/sleep", sleepRoute);
app.use("/api/nutrition", nutritionRoute);



// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serving static files
app.use(express.static('public'));




app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);
app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);

