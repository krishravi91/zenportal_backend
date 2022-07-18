const express=require('express');
const router=express.Router();
const Ticket=require('../model/ticket/Ticket.schema')
const {userAuthorization}=require('../middlewares/authorization.middleware')

router.all('/',(req,res,next)=>{
   // res.json({message:' return from the ticket router'})
   next()
})

router.post('/',userAuthorization,async (req,res)=>{
    const {subject,sender,message}=req.body
    // res.json({message:'todo create new ticket'})
    const userId=req.userId;
    
        const ticketObj={
            clientId:userId,
            subject,
            conversations:[{
                sender,
                message,
            }]
        }
        const result=new Ticket(ticketObj);
        await result.save();
        console.log(result);
        //console.log(ticketObj);
        if(result){
            res.json({status:"success",message:"new ticket created",result})
        }
        else{
            res.json({status:"error",message:"unable to create the ticket please try again"})
        }
        
    
})

//get all tickets for a spectific user only
router.get('/',userAuthorization,async(req,res)=>{
    const userId=req.userId
    //console.log(userId);
    const result=await Ticket.getTickets(userId)
    if(result){
        return res.json({
            status:"success",
            result
        })
    }else{
        res.json({
            status:"error",
            message:"no tickets found"
        })
    }


})

router.get('/:_id',userAuthorization,async(req,res)=>{
    
    const {_id}=req.params;
    //console.log(_id);
    const clientId=req.userId
    //console.log(clientId);
    const result=await Ticket.getTicketById(_id,clientId)
    console.log(result);
    if(result){
        return res.json({
            status:"success",
            result
        })
    }else{
        res.json({
            status:"error",
            message:"no tickets found"
        })
    }


})

router.put('/:_id',userAuthorization,async(req,res)=>{

    const {message,sender}=req.body  
    const {_id}=req.params;
    
    //const clientId=req.userId
    //console.log(clientId);
    const result=await Ticket.updateClientReply(_id,message,sender)
    console.log(result);
    if(result){
        return res.json({
            status:"success",
            result,
            message:"ticket updated"
        })
    }else{
        res.json({
            status:"error",
            message:"no tickets found"
        })
    }


})

router.patch('/close-ticket/:_id',userAuthorization,async(req,res)=>{
    const {_id}=req.params;
    const clientId=req.userId
   
    const result=await Ticket.updateStatusClose(_id,clientId)
    console.log(result);
    if(result){
        return res.json({
            status:"success",
            result,
            message:"ticket has been closed"
        })
    }else{
        res.json({
            status:"error",
            message:"no tickets found"
        })
    }


})

router.delete('/:_id',userAuthorization,async(req,res)=>{
    const {_id}=req.params;
    const clientId=req.userId
   
    const result=await Ticket.deleteTicket(_id,clientId)
    console.log(result);
    
        return res.json({
            status:"success",
            message:"ticket has been deleted"
        })
   


})


module.exports=router;