import time
import config
from telebot import TeleBot
from helper import sendMessage
from telebot.types import Message



bot = TeleBot(config.TELEGRAM_BOT_TOKEN)

def message_handler(message: Message):
    return sendMessage(config.WHATSAPP_CHAT_ID, message.text)


bot.register_message_handler(message_handler, func=lambda message: (str(message.chat.id) == config.TELEGRAM_CHAT_ID) and message.text)

if __name__ == "__main__":
    bot.infinity_polling()