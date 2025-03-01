// const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const experiences = require("../data/experience.json");
const projects = require("../data/projects.json");

const sendChatController = async (corsHeaders, data, res, isStreamRequest) => {
  try {
    const { message } = data;
    if (!message || typeof message !== "string")
      throw new Error("message is required & it must be string", {
        cause: "ValidationError",
      });
    console.log(new Date(), { message });

    if (isStreamRequest) {
      res.writeHead(200, {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });
    } else {
      res.writeHead(200, {
        ...corsHeaders,
        "Content-Type": "text/plain",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const profileSections = {
      bioData: {
        name: "Sunny Gandhwani",
        firstName: "Sunny",
        lastName: "Gandhwani",
        gender: "male",
        profession: "Software Engineer",
      },
      experiences,
      projects,
    };

    const systemPrompt = `
YOU ARE A SMART, PROFESSIONAL, AND ENGAGING **PORTFOLIO CHAT ASSISTANT** DESIGNED TO ANSWER VISITORS' QUESTIONS ABOUT THE USER’S **PROFILE, EXPERIENCE, SKILLS, AND PROJECTS**.

### USER PROFILE ###
${JSON.stringify(profileSections, null, 2)}

### INSTRUCTIONS ###
1️⃣ **Understand the User’s Background & Expertise**  
2️⃣ **Respond Clearly & Concisely**  
3️⃣ **Answer Common Questions with Context**  
4️⃣ **Showcase Credentials & Impact**  
5️⃣ **Handle General Inquiries & Calls-to-Action**  
(See the detailed instructions in the original prompt)
  `;

    // Set the system instruction during model initialization
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt,
    });

    if (isStreamRequest) {
      const result = await model.generateContentStream(message);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
      res.end();
    } else {
      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: "Hello" }] },
          {
            role: "model",
            parts: [
              {
                text: "Great to meet you. What would you like to know about Sunny?",
              },
            ],
          },
        ],
      });
      // Send user message and await response
      const result = await chat.sendMessage(message);

      const text = result.response.text();
      res.end(text);
    }
  } catch (error) {
    console.error("Error in reply:", error);
    const statusCode = error.cause === "ValidationError" ? 400 : 500;
    const message =
      error.cause === "ValidationError"
        ? error.message
        : "Failed to reply, please try later";

    if (isStreamRequest) {
      res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
    }
    res.writeHead(statusCode, { "Content-Type": "text/plain", ...corsHeaders });
    res.end(message);
  }
};

module.exports = { sendChatController };
