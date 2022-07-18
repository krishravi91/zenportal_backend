const express=require('express');
const router=express.Router();
const {insertUser,getUserByEmail}=require('../model/user/User.model')
const {hashPassword,comparePassword}=require('../helpers/bcrypt.helper');
const { json } = require('body-parser');
const User=require('../model/user/User.schema')
const {userAuthorization}=require('../middlewares/authorization.middleware')
const ResetPin=require('../model/restPin/RestPin.schema')
const {emailProcessor}=require('../helpers/email.helper')

router.all('/',(req,res,next)=>{
    //res.json({message:'return from the user'})
    next();
})

router.get('/',userAuthorization,async(req,res)=>{
    //const _id=req.userId;
    //const userProf=await User.getUserById(_id)
    res.json({user:req.user})
})

//create new user router
router.post('/',async (req,res)=>{
    const {name ,company,address,phone,email,password}=req.body
    try{
        //hash password
        const hashedPass=await hashPassword(password)
        const newUserbj={
            name,
            company,
            address,
            phone,
            email,
            password:hashedPass
        }


        const result=new User(newUserbj)
        await result.save();
        console.log(result);
        const token=await result.generateAuthToken()
        res.cookie("jwt",token);


        res.json({message:"new user created",result})
    }catch(error){
        console.log(error);
        res.json({ status:"error",message:error.message})
    }
    
})

//user sign in router
router.post('/login',async (req,res)=>{
    
    const{email,password}=req.body

    if(!email || !password){
        res.json({status:"error" ,message:"Invalid form submission"})

    }
    const user=await User.getUserByEmail(email)
    console.log(user);
    

    const passFromDb= user && user._id ? user.password : null;

    if(!passFromDb) {
       return res.json({status:"error" ,message:"Invalid email or password "})
    }

    const result=await comparePassword(password, passFromDb)
    console.log(result);
    if(!result){
        return res.json({status:"error" ,message:"Invalid email or password "})
    }
    const token=await user.generateAuthToken()
    //res.cookie("jwt",token);
    //console.log(token);
   
    res.json({status:"success" ,message:"login successsfully",token:token})

})
//user logout
router.post('/logout',userAuthorization,(req,res)=>{
    try{
        req.user.tokens=[]
        req.user.save()
        res.json({status:"success" ,message:"logout successsfully"})

    }catch(e){
        res.status(500).send()

    }
   
})


module.exports=router;