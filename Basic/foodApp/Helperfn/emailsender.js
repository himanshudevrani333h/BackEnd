const nodemailer = require("nodemailer");
const {APP_PASSWORD} = require("../auth");
// async..await is not allowed in global scope, must use a wrapper
module.exports = async function main(tobeSentData, email_ID) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true, // true for 465, false for other ports
    auth: {
      user: "jiraapp813@gmail.com", // generated ethereal user
      pass: APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FOOD APP 🍿" <foo@example.com>', // sender address
    to: email_ID, // list of receivers
    subject: "OTP ✔", // Subject line 
    html: `<b>${tobeSentData}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

