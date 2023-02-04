const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "xxxxx@gmail.com",
      pass: "xxxxx",
    },
  });

  //   //ACTIVATE IN GMAIL /'LESS SECURE APP" OPTION
  // });

  // 2) define the email options
  const mailOptions = {
    from: options.clientEmail,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // 3) actually send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
