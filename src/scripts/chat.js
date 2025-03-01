export default function initChat() {
  const chatButton = document.createElement("button");
  chatButton.className = "chat-button";
  chatButton.innerHTML = '<i class="fa fa-comments"></i>';
  document.body.appendChild(chatButton);

  const chatDialog = document.createElement("div");
  chatDialog.className = "chat-dialog";
  chatDialog.innerHTML = `
    <div class="chat-header">
      <span>Chat with AI</span>
      <span class="close-chat">&times;</span>
    </div>
    <div class="chat-messages"></div>
    <div class="chat-input">
      <input type="text" placeholder="Type your message...">
      <button type="submit">Send</button>
    </div>
  `;
  document.body.appendChild(chatDialog);

  // Get elements
  const closeButton = chatDialog.querySelector(".close-chat");
  const messageContainer = chatDialog.querySelector(".chat-messages");
  const input = chatDialog.querySelector("input");
  const sendButton = chatDialog.querySelector("button");

  // Toggle chat dialog
  chatButton.addEventListener("click", () => {
    chatDialog.classList.add("open");
  });

  closeButton.addEventListener("click", () => {
    chatDialog.classList.remove("open");
  });

  // Add message to chat
  function addMessage(text, isUser = false) {
    const message = document.createElement("div");
    message.className = `message ${isUser ? "user" : "bot"}`;
    message.textContent = text;
    messageContainer.appendChild(message);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  // Handle send message
  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    // Disable input and button while sending
    input.disabled = true;
    sendButton.disabled = true;

    // Add user message to chat
    addMessage(message, true);
    input.value = "";

    try {
      const response = await fetch(
        "https://sunny-unik-server.vercel.app/send-chat",
        {
          method: "POST",
          headers: { Accept: "text/event-stream" },
          body: JSON.stringify({ message }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let currentMessage = document.createElement("div");
      currentMessage.className = "message bot";
      messageContainer.appendChild(currentMessage);
      debugger;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));
            if (data.error) {
              currentMessage.textContent = `Error: ${data.error}`;
            } else {
              debugger;
              currentMessage.textContent += data.text;
            }
            messageContainer.scrollTop = messageContainer.scrollHeight;
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      addMessage("Sorry, I encountered an error. Please try again later.");
    } finally {
      // Re-enable input and button
      input.disabled = false;
      sendButton.disabled = false;
      input.focus();
    }
  }

  // Send message on button click or enter key
  sendButton.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Add initial bot message
  addMessage("Hi! I'm your AI assistant. How can I help you today?");
}
