import 'dotenv/config';
import exp from 'express'
import {connect} from 'mongoose'
import { employeeApp } from './API/Employeeapi.js';
import cors from 'cors'
//cross origin resource sharing 
const app=exp()

app.use(cors());
app.use(exp.json());
//forward req to userApp if path starts with /user-api
app.use('/employee-api', employeeApp);

const port = process.env.PORT || 4000;
const mongoUrl = process.env.DB_URL || "mongodb+srv://mrudhu2306_db_user:mrudhula@cluster0.4kspcxl.mongodb.net/employeeDB?appName=Cluster0";

async function connectDB(){
    try{
        await connect(mongoUrl);
        console.log("database connection successful");

        // start server only after successful DB connection
        app.listen(port, () => console.log(`server running on port ${port}..`));
    }
    catch(err)
    {
        console.error("err in DB connection :", err);
        process.exit(1);
    }
}
connectDB();

//error handling in middleware
app.use((err,req,res,next)=>{
    res.json({message:"error occured",error:err.message})
    next();
})