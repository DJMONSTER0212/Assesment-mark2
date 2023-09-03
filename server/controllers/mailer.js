const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");


let nodeConfig = {
    // host: 'smtp.ethereal.email',
    service: 'gmail',
    host: 'smtp.gmail.com',
    // port: 587,
    // secure:false,
    auth: {
        user: "devanshjain02122003@gmail.com"||process.env.EMAIL,
        pass: "tqngsotxrvrqrbyz"||process.env.PASSWORD
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let Mailgenerator = new Mailgen({
    theme:"default",
    product:{
        name:"MailGen",
        link:"https://mailgen.js/"
    }
});

const registerMail = async (req,res)=>{
    const {username,userEmail,text,subject} = req.body;
    var email = {
        body:{
            name:username,
            intro:text ||"Hello From DJ🎮!",
            outro:"Need help, or have any questions? Just reply to this email",
        }
    }
    var emailBody = Mailgenerator.generate(email);

    let message ={
        from: process.env.EMAIL,
        to: userEmail||"devanshjain02122003@gmail.com",
        subject : subject || "Signup Successfully",
        html : emailBody
    }
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg:"You should recieve and email from us."})
    })
    .catch(error=>res.status(500).send({error}))
}

module.exports = registerMail
