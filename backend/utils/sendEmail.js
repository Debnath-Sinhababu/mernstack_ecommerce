
import nodemailer from 'nodemailer'
const sendEmail=async({email,subject,message})=>{
    let mailTransporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailDetails = {
        from:  process.env.MAIL,
        to: email,
        subject,
        text: message
    };
    mailTransporter.sendMail(mailDetails,function(error,data){
               if(error){
                console.log(error.message)
               }
    });
}
export default sendEmail