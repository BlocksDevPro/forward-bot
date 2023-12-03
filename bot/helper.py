import requests



def sendMessage(chatId: str, text: str):
    try:
        data = {
            "chatId": chatId,
            "text": text
        }
        return requests.post('http://localhost:3000/sendMessage', json=data)
    except: pass