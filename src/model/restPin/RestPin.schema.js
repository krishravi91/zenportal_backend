const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const {randomPinNumber}=require('../../utils/randomGenerator')
const ResetPinSchema = new Schema({
 
  pin: {
    type: String,
    maxlength: 6,
    minlength:6,
    required: true
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  }
  
});

// UserSchema.methods.generateAuthToken = async function () {
//   const user = this
//   const token = jwt.sign({ _id: user._id.toString() }, "mynameisjeel")

//   user.tokens = user.tokens.concat({ token })
//   await user.save()

//   return token
// }
ResetPinSchema.statics.setPasswordrestPin=async(email)=>{
  const pinLength=6;
  const randPin=await randomPinNumber(pinLength);
     const restObj={
      email,
      pin:randPin
     }
    // const data=await ResetPin.save(restObj)
    //const data=await restObj.save()
     return restObj;
     
}




const User=mongoose.model('ResetPin',ResetPinSchema)
module.exports=User
// module.exports = {
//   UserSchema: mongoose.model("User", UserSchema),
// };