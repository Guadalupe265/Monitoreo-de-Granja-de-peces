import pyautogui
import time

# Espera 5 segundos para colocar el cursor en el chat de Discord
time.sleep(5)

# Ejecutar primero !fish 2 y !mine 2
pyautogui.typewrite('!fish 2')
pyautogui.press('enter')
time.sleep(0.5)

pyautogui.typewrite('!mine 2')
pyautogui.press('enter')
time.sleep(0.5)

# Guardar el tiempo de la última ejecución para contar los 5 minutos
last_fish_time = time.time()
last_mine_time = time.time()

while True:
    # Enviar !use 10
    pyautogui.typewrite('!use 10')
    pyautogui.press('enter')
    time.sleep(6.4)

    # Enviar !use 11
    pyautogui.typewrite('!use 11')
    pyautogui.press('enter')
    time.sleep(6.4)

    # Ejecutar !fish 2 si ya pasaron 5 minutos
    if time.time() - last_fish_time >= 300:
        pyautogui.typewrite('!fish 2')
        pyautogui.press('enter')
        last_fish_time = time.time()
        time.sleep(6.4)

    # Ejecutar !mine 2 si ya pasaron 5 minutos
    if time.time() - last_mine_time >= 300:
        pyautogui.typewrite('!mine 2')
        pyautogui.press('enter')
        last_mine_time = time.time()
        time.sleep(6.4)

    # Espera antes de repetir el ciclo
    time.sleep(1)

