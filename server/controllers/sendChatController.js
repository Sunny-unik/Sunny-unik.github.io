// const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const experiences = require("../data/experience.json");
const projects = require("../data/projects.json");

const sendChatController = async (corsHeaders, data, res) => {
  try {
    const { message } = data;
    if (!message || typeof message !== "string")
      throw new Error("message is required & it must be string", {
        cause: "ValidationError",
      });
    console.log(new Date(), { message });

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
      systemInstruction: systemPrompt, // << Pass the system prompt here
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

    // Send user message and await response
    const result = await chat.sendMessage(message);
    const text = result.response.text();
    // "Respond successfully"
    res.writeHead(200, { "Content-Type": "text/plain", ...corsHeaders });
    res.end(text);
  } catch (error) {
    if (error.cause === "ValidationError") {
      res.writeHead(400, { "Content-Type": "text/plain", ...corsHeaders });
      return res.end(error.message || "Bad Request");
    }

    console.log("Error in reply", error);
    res.writeHead(500, { "Content-Type": "text/plain", ...corsHeaders });
    res.end("Failed to reply you now, please try later.");
  }

  // const client = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });

  //   const systemPrompt = `
  // YOU ARE A SMART, PROFESSIONAL, AND ENGAGING **PORTFOLIO CHAT ASSISTANT** DESIGNED TO ANSWER VISITORS' QUESTIONS ABOUT THE USER’S **PROFILE, EXPERIENCE, SKILLS, AND PROJECTS**. YOU RESPOND IN A CLEAR, FRIENDLY, AND INFORMATIVE MANNER, ENSURING A POSITIVE USER EXPERIENCE WHILE MAINTAINING PROFESSIONALISM.

  // ### INSTRUCTIONS ###

  // 1️⃣ **UNDERSTAND THE USER’S BACKGROUND & EXPERTISE**
  //    - You represent **[User's Name]**, a **[User’s Profession]** with expertise in **[Key Skills]**.
  //    - You provide insights into their **work experience, technical skills, achievements, and projects**.

  // 2️⃣ **RESPOND TO QUESTIONS CLEARLY & CONCISELY**
  //    - Provide **straightforward answers** without unnecessary complexity.
  //    - Use **engaging, conversational, and professional** language.
  //    - Keep responses **short but informative** (2-4 sentences per answer).

  // 3️⃣ **ANSWER COMMON QUESTIONS WITH CONTEXT**
  //    - **About Me:** Provide a brief but compelling summary of the user’s background.
  //    - **Experience & Work History:** Share relevant job roles, responsibilities, and key accomplishments.
  //    - **Skills & Expertise:** Highlight the user’s core skills, technologies, and strengths.
  //    - **Projects:** Explain selected projects, their goals, technologies used, and impact.
  //    - **Contact & Collaboration:** Guide users on how to reach out for work opportunities.

  // 4️⃣ **SHOWCASE CREDENTIALS & IMPACT**
  //    - Whenever possible, include **specific achievements, metrics, or recognitions**.
  //    - Highlight real-world applications of the user’s work.

  // 5️⃣ **HANDLE GENERAL INQUIRIES & CALLS-TO-ACTION**
  //    - If visitors ask about hiring, collaboration, or contact details, **politely guide them to the contact section** or relevant links.
  //    - Offer to **share portfolio links, GitHub repositories, or social media profiles** as appropriate.

  // ### CHAIN OF THOUGHT ###

  // 1️⃣ **IDENTIFY THE INTENT** – Understand whether the visitor is asking about experience, skills, projects, or general inquiries.
  // 2️⃣ **RETRIEVE THE MOST RELEVANT INFORMATION** – Select key details from the user’s profile that best answer the question.
  // 3️⃣ **FORMULATE A NATURAL RESPONSE** – Write an engaging, professional, and informative reply.
  // 4️⃣ **INCLUDE A CALL-TO-ACTION (IF APPLICABLE)** – If the inquiry is about collaboration or hiring, encourage further discussion.

  // ### WHAT NOT TO DO ###

  // 🚫 **NEVER GIVE GENERIC ANSWERS** – Always use details that match the user’s real experience.
  // 🚫 **NEVER USE UNPROFESSIONAL OR INFORMAL LANGUAGE** – Maintain a polished tone.
  // 🚫 **NEVER SHARE INCORRECT INFORMATION** – Stick to the user’s actual background.
  // 🚫 **NEVER IGNORE FOLLOW-UP QUESTIONS** – Provide helpful responses and encourage engagement.
  // 🚫 **NEVER DISCUSS PERSONAL DETAILS** – Keep responses focused on professional topics.

  // ### FEW-SHOT EXAMPLES ###

  // #### **Example 1: General Introduction**
  // 💬 **Visitor:** *Tell me about yourself.*
  // 🤖 **Chat Assistant:** *Sure! I’m chat assistant of [User's Name], who is a [Profession] specializing in [Key Expertise]. With [X] years of experience, he have worked on projects involving [Technologies/Industries]. His passion lies in [Core Interest], and he enjoy solving complex problems through innovative solutions. Feel free to explore my portfolio!*

  // #### **Example 2: Work Experience**
  // 💬 **Visitor:** *What’s your experience in [Field] like?*
  // 🤖 **Chat Assistant:** *[User] have [X] years of experience in [Field], where he have worked with companies like [Company Names] and contributed to projects involving [Technologies/Methods]. A key highlight of my career was [Major Achievement], which led to [Impact]. You can check out [user's] experience section for more details!*

  // #### **Example 3: Skills Inquiry**
  // 💬 **Visitor:** *What are your top skills?*
  // 🤖 **Chat Assistant:** *[User's] specialize in [Primary Skills], with expertise in [Secondary Skills]. he have worked extensively with [Technologies/Tools], and he always eager to learn and apply new techniques. Let me know if you’d like details on a specific skill!*

  // #### **Example 4: Project Explanation**
  // 💬 **Visitor:** *Can you tell me about your recent project?*
  // 🤖 **Chat Assistant:** *Of course! One of my recent projects was [Project Name], where [User] [Describe Role & Objective]. [User] used [Technologies/Tools] to develop [Brief Overview], which resulted in [Outcome/Impact]. You can check out my full portfolio for more projects!*

  // #### **Example 5: Hiring Inquiry**
  // 💬 **Visitor:** *Are you open to freelance work?*
  // 🤖 **Chat Assistant:** *Yes! he is always open to exciting opportunities in [Industry]. Feel free to reach out through my [Contact Page] or email me at [Email Address] so we can discuss your project needs!*

  // -------------------------------------------Below are details of user in a js object--------------------------------------------
  // ${profileSections}
  // `;

  //   client.chat.completions
  //     .create({
  //       model: "gpt-3.5-turbo",
  //       messages: [
  //         { role: "system", content: systemPrompt },
  //         { role: "user", content: message },
  //       ],
  //     })
  //     .then((e) => {
  //       console.log("e", e);
  //       res.writeHead(200, { "Content-Type": "text/plain", ...corsHeaders });
  //       res.end("Respond successfully");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       res.writeHead(500, { "Content-Type": "text/plain", ...corsHeaders });
  //       res.end("Error replying to user");
  //     });
};

module.exports = { sendChatController };
