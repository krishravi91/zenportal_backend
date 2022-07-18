const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  company: {
    type: String,
    maxlength: 50,
    required: true,
  },
  address: {
    type: String,
    maxlength: 100,
  },
  phone: {
    type: Number,
    maxlength: 11,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  },
  tokens: [{
    token: {
        type: String,
        required: true
    }
}]
  
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, "mynameisjeel")

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}
UserSchema.statics.getUserByEmail=async(email)=>{
    const user=await User.findOne({email})
    if(!user){
      throw new Error('unable to login')
    }
    return user
}
UserSchema.statics.getUserById=async(_id)=>{
  const user=await User.findOne({_id})
  if(!user){
    //throw new Error('unable to login')
  }
  return user
}




const User=mongoose.model('User',UserSchema)
module.exports=User
// module.exports = {
//   UserSchema: mongoose.model("User", UserSchema),
// };