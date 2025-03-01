const sendMail = require("../services/mailer");

const sendMailController = (corsHeaders, data, res) => {
  const { name, email, subject, message } = data;

  const mailOptions = {
    from: process.env.MAIL_ADDRESS,
    appPassword: process.env.APP_PASSWORD,
    to: process.env.MAIL_ADDRESS,
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  sendMail(mailOptions)
    .then((info) => {
      console.log("Email sent: " + info.response);
      res.writeHead(200, { "Content-Type": "text/plain", ...corsHeaders });
      res.end("Email sent successfully");
    })
    .catch((error) => {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain", ...corsHeaders });
      res.end("Error sending email");
    });
};

module.exports = { sendMailController };
