const http = require("http");
const dotenv = require("dotenv");
const sendMail = require("./services/mailer");

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/send-email") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));

    req.on("end", () => {
      const { name, email, subject, message } = JSON.parse(body);
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
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Email sent successfully");
        })
        .catch((error) => {
          console.error(error);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error sending email");
        });
    });
  } else if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("All Good :-)");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
