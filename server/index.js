const http = require("http");
const dotenv = require("dotenv");
const sendMail = require("./services/mailer");

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const requestOrigin = req.headers.origin;
  const corsHeaders = {
    "Access-Control-Allow-Origin": requestOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    // Handle preflight request
    if (!JSON.parse(process.env.ALLOWED_ORIGINS).includes(requestOrigin)) {
      console.log(`Request from unallowed origin: ${requestOrigin}`);
      res.writeHead(403, { "Content-Type": "text/plain" });
      return res.end("Forbidden: Request from unallowed origin");
    }
    res.writeHead(200, corsHeaders);
    res.end("ended");
  } else if (req.method === "POST" && req.url === "/send-email") {
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
          res.writeHead(200, { "Content-Type": "text/plain", ...corsHeaders });
          res.end("Email sent successfully");
        })
        .catch((error) => {
          console.error(error);
          res.writeHead(500, { "Content-Type": "text/plain", ...corsHeaders });
          res.end("Error sending email");
        });
    });
  } else if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("All Good :-)");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain", ...corsHeaders });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
