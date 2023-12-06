const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const client = new Client({
  authStrategy: new LocalAuth(),
});

app.use(bodyParser.json());

client.on("qr", (qrCode) => {
  console.log("Scan the QR code with your phone:");
  qrcode.generate(qrCode, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  if (message.body === "!ping") {
    client.sendMessage(message.from, "pong"); // Reply without quoting
  }
});

app.post("/sendMessage", (req, res) => {
  const { chatId, text } = req.body;

  if (!chatId || !text) {
    return res
      .status(400)
      .json({ error: "Invalid request. Missing parameters." });
  }

  try {
    client.sendMessage(chatId, text).then((response) => {
      const response_data = { success: true, message: response };
      return res.json(response_data);
    });
  } catch (error) {
    const response_data = { success: false, message: error.text };
    return res.json(response_data);
  }
});

app.get("/chats", (req, res) => {
  client.getChats().then((chats) => {
    const groupInfoArray = [];

    chats.forEach((chat) => {
      if (chat.isGroup) {
        groupInfoArray.push({ name: chat.name, id: chat.id._serialized });
      }
    });

    res.json(groupInfoArray);
  });
});

app.listen(3000, () => {
  client.initialize();
  console.log("Node.js server listening on port 3000");
});
