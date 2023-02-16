const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWEMAIL_PASSWORDORD
  }
});

  module.exports = sendMail = (mailOptions) =>{
    return new Promise(async (resolve) => {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
               // console.log(`Email sent: ${mailOptions?.to}, ` + info.response);
                resolve();
                // do something useful
            }
        });
    })
  }

