const jwt = require('jsonwebtoken')
const User=require('../model/user/User.schema');    


const userAuthorization=async (req,res,next)=>{
    try {
        // const token = req.cookies.jwt
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded =await jwt.verify(token, "mynameisjeel");

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        console.log(user);
        // console.log("this is user ",user);
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        
        res.status(404).json({message:'forbidden'})
    }
}
module.exports={
    userAuthorization,
}