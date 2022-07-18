const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'demarco.gulgowski73@ethereal.email',
        pass: 'Xyu66nXTAQq9a6exbk'
    }
});

const send=(info)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let result = await transporter.sendMail(info);
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            resolve(result)

        
        } catch (error) {
            console.log(error);
            
        }

    })
    
    
}

const emailProcessor=(email,pin)=>{
    const info={
        from: '"CRM COMPANY" <demarco.gulgowski73@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "password reset pin", // Subject line
        text: "Here is Your Password Reset pin" +pin+"This pin will expires in 1day", // plain text body
        html: `<b>Hello world?</b>
        Here is Your Password Reset pin
        <b>${pin}</b>
        This pin will expires in 1day
        <p></p>`,
        
    }
    send(info)
}
module.exports={
    emailProcessor,
}