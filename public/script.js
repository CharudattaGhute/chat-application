document.addEventListener("DOMContentLoaded", function () {
  const socket = io();
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const chatOutput = document.getElementById("chat-output");
  sendButton.addEventListener("click", sendMessage);
  socket.on("chat-message", function (data) {
    displayMessage(data);
  });
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== "") {
      socket.emit("chat-message", {
        user: "You",
        message: message,
        server1: "AI",
        messageAI: serverFunction(message),
      });
      messageInput.value = "";
    }
  }
  function serverFunction(message) {
    const keywords = [
      "hello",
      "price",
      "camera",
      "display",
      "os",
      "ram",
      "brand",
    ];
    const messageWords = message.split(" ");
    let ans = "";
    let keywordFound = false;
    for (let i = 0; i < messageWords.length; i++) {
      const keywordIndex = keywords.indexOf(messageWords[i].toLowerCase());
      if (keywordIndex !== -1 && !keywordFound) {
        ans = generateAnswer(keywords[keywordIndex]) + " ";
        keywordFound = true;
      } else if (!keywordFound) ans += "Ask a correct question.  ";
    }
    return ans.trim();
  }
  function generateAnswer(keyword) {
    switch (keyword) {
      case "hello":
        return "welcome to our company";
      case "price":
        return "the price of the product is $500.";
      case "os":
        return "The operating system of the product is vanilla.  ";
      case "ram":
        return "The RAM of the product is 500GB";
      case "camera":
        return "The camera of the product is 160px";
      case "brand":
        return "The  brand name is APPLE";
      case "display":
        return "The diaplay of the product is oxygen 4.1";
      default:
        return "Ask a correct question.";
    }
  }
  function displayMessage(data) {
    const messageElement = document.createElement("div");
    const timestamp = new Date().toLocaleTimeString();
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}<br><strong>${data.server1}:</strong> ${data.messageAI}<br>
    <span class="timestamp">${timestamp}</span>`;
    messageElement.classList.add("incoming");
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }
});
