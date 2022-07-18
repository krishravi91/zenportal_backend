const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')

const TicketSchema = new Schema({
    clientId:{
        type:Schema.Types.ObjectId,
    },
   subject: {
    type: String,
    maxlength: 500,
    required: true,
    default: ""
  },
  openAt:{
    type:Date,
    default:Date.now(),
    required:true
  },
  status: {
    type: String,
    maxlength: 30,
    required: true,
    default:"pending operator response"
  },
  conversations:[{
    sender:{
        type:String,
        maxlength:50,
        required:true,
        default:""
    },
    message:{
        type:String,
        maxlength:500,
        required:true,
        default:""
    },
    msgAt:{
        type:Date,
        required:true,
        default:Date.now(),
    }
  }]
  
 
});

TicketSchema.statics.getTickets=async(clientId)=>{
  const tickets=await Ticket.find({clientId})
  if(!tickets){
    throw new Error('unable to login')
  }
  return tickets
}
TicketSchema.statics.getTicketById=async(id,clientId)=>{
  const _id=id.trim();
  const tickets=await Ticket.find({_id,clientId})
  if(!tickets){
    throw new Error('unable to login')
  }
  return tickets
}
TicketSchema.statics.updateClientReply=async(id,message,sender)=>{
  const _id=id.trim();
  const tickets=await Ticket.findOneAndUpdate({_id},{
    status:'pending operator response',
    $push:{
      conversations:{message,sender}
    }
  },{new:true})
  if(!tickets){
    throw new Error('unable to login')
  }
  return tickets
}
TicketSchema.statics.updateStatusClose=async(id,clientId)=>{
  const _id=id.trim();
  const tickets=await Ticket.findOneAndUpdate({_id,clientId},{
    status:'closed',
  },{new:true})
  if(!tickets){
    throw new Error('unable to login')
  }
  return tickets
}
TicketSchema.statics.deleteTicket=async(id,clientId)=>{
  const _id=id.trim();
  const tickets=await Ticket.findOneAndDelete({_id,clientId})
   
  
  if(!tickets){
    throw new Error('unable to login')
  }
  return tickets
}


const Ticket=mongoose.model('Ticket',TicketSchema)
module.exports=Ticket
// module.exports = {
//   UserSchema: mongoose.model("User", UserSchema),
// };