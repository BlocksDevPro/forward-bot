const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const client = new Client();

app.use(bodyParser.json());

client.on("qr", (qrCode) => {
  console.log("Scan the QR code with your phone:");
  qrcode.generate(qrCode, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
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

app.listen(3000, () => {
  client.initialize();
  console.log("Node.js server listening on port 3000");
});
