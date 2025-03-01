const http = require("http");
const dotenv = require("dotenv");
const { sendMailController } = require("./controllers/sendMailController");
const { sendChatController } = require("./controllers/sendChatController");

dotenv.config();
const PORT = process.env.PORT || 3000;
const allowedPostRoutes = ["/send-email", "/send-chat"];

const server = http.createServer((req, res) => {
  const requestOrigin = req.headers.origin;
  const corsHeaders = {
    "Access-Control-Allow-Origin": requestOrigin || "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };

  if (req.method === "OPTIONS") {
    // Handle preflight request
    if (!JSON.parse(process.env.ALLOWED_ORIGINS).includes(requestOrigin)) {
      console.log(`Request from forbidden origin: ${requestOrigin}`);
      res.writeHead(403, { "Content-Type": "text/plain" });
      return res.end("Forbidden: Request from forbidden origin");
    }
    res.writeHead(200, corsHeaders);
    res.end();
  } else if (req.method === "POST" && allowedPostRoutes.includes(req.url)) {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));

    req.on("end", () => {
      const data = body.trim().length ? JSON.parse(body.trim()) : {};
      const isStreamRequest = req.headers.accept?.includes("text/event-stream");
      const parameters = [corsHeaders, data, res, isStreamRequest];
      if (req.url === "/send-email") {
        sendMailController(...parameters);
      } else if (req.url === "/send-chat") {
        sendChatController(...parameters);
      }
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
