import time
import config
from helper import whatsapp
from telebot import TeleBot
from telebot.types import Message

whatsapp = whatsapp()

bot = TeleBot(config.TELEGRAM_BOT_TOKEN)
print(bot.user.username)

def message_handler(message: Message):
    while whatsapp.is_working:
        time.sleep(1)
    return whatsapp.send_message(config.WHATSAPP_CHAT_ID, message.text)


bot.register_message_handler(message_handler, func=lambda message: (str(message.chat.id) == config.TELEGRAM_CHAT_ID) and message.text)

if __name__ == "__main__":
    while True:
        logged_in = input('You have logged in ? True/False : ')
        if logged_in in ['True', 'False']:
            if logged_in == 'False':
                bot.send_photo(config.TELEGRAM_ADMIN_ID, whatsapp.gen_login_qr())
            else:
                break
        else:
            continue
    
    bot.infinity_polling()