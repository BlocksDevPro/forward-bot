import time
import webbrowser
from pyautogui import click, hotkey, press, size, typewrite

WIDTH, HEIGHT = size()


class whatsapp:
    def __init__(self):
        self.is_working = None
        pass
    def open_chat(self, receiver: str):
        webbrowser.open(f"https://web.whatsapp.com/accept?code={receiver}")
        time.sleep(7)
        
    def enter_message(self, message: str):
        click(WIDTH / 2, HEIGHT / 2)
        for char in message:
            if char == "\n":
                hotkey("shift", "enter")
            else:
                typewrite(char)
        
    def send_message(self, receiver: str, message: str):
        self.is_working = True
        self.open_chat(receiver)
        self.enter_message(message)
        press("enter")
        self.is_working = False
        
        


