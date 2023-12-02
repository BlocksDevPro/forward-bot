import time
import config
from helper import whatsapp
from telebot import TeleBot
from telebot.types import Message

whatsapp = whatsapp()

bot = TeleBot(config.TELEGRAM_BOT_TOKEN)

def message_handler(message: Message):
    while whatsapp.is_working:
        time.sleep(1)
    return whatsapp.send_message(config.WHATSAPP_CHAT_ID, message.text)


bot.register_message_handler(message_handler, func=lambda message: (str(message.chat.id) == config.TELEGRAM_CHAT_ID) and message.text)

if __name__ == "__main__":
    bot.infinity_polling()