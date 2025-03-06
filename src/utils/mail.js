const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: "Gmail",
  secure: false,
  port: 25,
  auth: {
    user: "kevinwebmyne@gmail.com",
    pass: "zzmgzpokkrnlnylz",
  },
});

const sendEmail = (email, subject, html) => {
  const mailSend = {
    to: email,
    subject: subject,
    html: html,
  };

  const mail = transport.sendMail(mailSend, function (error) {
    if (error) {
      console.log(
        "+=========================+++++++++++++++=================",
        error
      );
    } else {
      console.info("Email is  sent");
    }
  });
  return mail;
};

module.exports = { sendEmail };
