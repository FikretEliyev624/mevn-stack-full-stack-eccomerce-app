const nodeMailer = require("nodemailer");

async function mainMail(name, email, subject, message){
    const transporter = await nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.PASSWORD,
        },
      });
      const mailOption = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: subject,
        html: `You got a message from 
        Email : ${email}
        Name: ${name}
        Message: ${message}`,
      };
      try {
        await transporter.sendMail(mailOption);
        return Promise.resolve("Message Sent Successfully!");
      } catch (error) {
        return Promise.reject(error);
      }
}

const contactUs=async(req,res,next)=>{
    const { name, email, subject, message } = req.body;
    try {
      await mainMail(name, email, subject, message);
      res.send("Message Successfully Sent!");
    } catch (error) {
      res.send("Message Could not be Sent");
      console.log(error);
    }
}

module.exports={contactUs}