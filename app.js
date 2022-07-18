require('dotenv').config()
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const helmet=require('helmet');
const morgan=require('morgan');
const userRouter=require('./src/routers/user.router');
const ticketRouter=require('./src/routers/ticket.router');
const handleError=require('./src/utils/errorHandler');
const mongoose =require('mongoose');
const cookieparser = require('cookie-parser');
mongoose.connect(process.env.MONGO_URL);

app.use(cookieparser());

if(process.env.NODE_ENV !== 'production'){
    const mDb=mongoose.connection;
    mDb.on('open',()=>{
        console.log('mongodb connected');
    })
    mDb.on('error',()=>{
        console.log(error);
    })
    
//logger
app.use(morgan("tiny"));

}


//API security
app.use(helmet());

//handle cors error
app.use(cors())


//set bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port=process.env.PORT || 3000;

app.use('/v1/user',userRouter)
app.use('/v1/ticket',ticketRouter)

app.use((req,res,next)=>{
    const error=new Error("resource not found");
    error.status=404
    next(error)
})

app.use((error,req,res,next)=>{
    handleError(error,res)
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})