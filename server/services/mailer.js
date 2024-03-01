const nodemailer = require("nodemailer");

module.exports = function sendMail({ from, appPassword, to, subject, text }) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: text,
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: from, pass: appPassword },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      error ? reject(error) : resolve(info);
    });
  });
};
