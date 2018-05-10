#!/usr/bin/env python
 
import sys
import time
import RPi.GPIO as GPIO
import subprocess
import uinput
 
GPIO.setmode(GPIO.BCM)  # GPIO port numbering
SHUTOFF_DELAY = 20  # seconds

# Pins of the Infrared sensors
# See https://pinout.xyz/ for the pinout of the Raspberry Pi
PINS = [17, 27, 22, 23] #  Pins 11, 13, 15, 16 on the board
PIN_STATUS = [False, False, False, False]

keyboard = uinput.Device([uinput.KEY_LEFT, uinput.KEY_RIGHT])

is_on = False
last_motion_time = time.time()

class GestureLeft:
    
    def __init__(self):
        self.state = 0

    def update(self, PIN_STATUS):
        if self.state == 0:
            detectPin(self, PIN_STATUS, 0)

    def detectPin(self, PIN_STATUS, pin):
        detected = False
        for p in range(PIN_STATUS):
            if p == pin:
                detected = detected and PIN_STATUS[p]
            else:
                detected = detected and not PIN_STATUS[p]

def main():
    global is_on
    print("Gesture sensor running, SHUTOFF DELAY = {}".format(SHUTOFF_DELAY))

    setupPins()
    last_motion_time = time.time()
 
    while True:
        read_pin_status()
        detect_motion()
        if is_on:
            detect_gesture()
        time.sleep(.1)

def setupPins():
    global PINS
    for i in range(4):
        GPIO.setup(PINS[i], GPIO.IN, pull_up_down = GPIO.PUD_DOWN)

def read_pin_status():
    global PIN_STATUS
    global PINS
    for i in range(4):
        PIN_STATUS[i] = GPIO.input(PINS[i])

    print("{}:{} {}:{} {}:{} {}:{}".format(PINS[0], PIN_STATUS[0], PINS[1], PIN_STATUS[1], PINS[2], PIN_STATUS[2], PINS[3], PIN_STATUS[3]))

def detect_gesture():
    global gesture

def detect_motion():
    global PIN
    global PIN_STATUS
    global is_on

    motionDetected = PIN_STATUS[0] == GPIO.HIGH or PIN_STATUS[1] == GPIO.HIGH or PIN_STATUS[2] == GPIO.HIGH or PIN_STATUS[3] == GPIO.HIGH
    if motionDetected:
        last_motion_time = time.time()        
        if not is_on:
            print("{} {} {} {}".format(PIN_STATUS[0], PIN_STATUS[1], PIN_STATUS[2], PIN_STATUS[3]))
            print("Motion detected, powering monitor")
            is_on = True
            turn_on()
    else:
        if is_on and time.time() > (last_motion_time + SHUTOFF_DELAY):
            print("No motion detected for SHUTOFF_DELAY, powering off monitor")
            is_on = False
            turn_off()

def turn_on():
    subprocess.call("sh monitor_on.sh", shell=True)
 
def turn_off():
    subprocess.call("sh monitor_off.sh", shell=True)
 
if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        GPIO.cleanup()
