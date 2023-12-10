# forward-bot
A Telegram to whatsapp forwarding bot.

## setup whatsapp-bot
### Install packages and run
```bash
npm install && npm start
```

### Get whatsapp group_id
- Go to <a href="http://localhost:3000/chats">Link</a>
- Find the group name and copy its chat id

## setup telegram-bot
### Install packages 
```bash
pip install -r requirements.txt
```

### Setup config.py
```python
# enter your telegram bot token here
TELEGRAM_BOT_TOKEN = ""

# enter your telegram group id here
TELEGRAM_CHAT_ID = ""

# enter your whatsapp group id here
WHATSAPP_CHAT_ID = ""
```

### Run the program
```bash
python3 main.py
```
