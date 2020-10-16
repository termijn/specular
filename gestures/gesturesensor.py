# Pre-requisites: 
# - sudo pip install apds9960
# - sudo apt install python-smbus
# - enable i2c in Raspberry PI configuration 

import sys
import time
import subprocess
import uinput

from apds9960.const import *
from apds9960 import APDS9960
import RPi.GPIO as GPIO
import smbus

SHUTOFF_DELAY = 60 * 5  # seconds
port = 1
bus = smbus.SMBus(port)
apds = APDS9960(bus)

subprocess.call("modprobe uinput", shell=True)
keyboard = uinput.Device([uinput.KEY_F5, uinput.KEY_1, uinput.KEY_UP, uinput.KEY_LEFT, uinput.KEY_RIGHT, uinput.KEY_DOWN])

def setup():    
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(7, GPIO.IN)
    GPIO.setup(8, GPIO.OUT)
    GPIO.setup(10, GPIO.OUT)
    GPIO.setup(12, GPIO.OUT)
    GPIO.setup(16, GPIO.OUT)

    GPIO.add_event_detect(7, GPIO.FALLING)

    apds.setProximityIntLowThreshold(50)
    apds.enableGestureSensor()

def main():
    print("Gesture sensing started");
    is_on = True
    last_motion_time = time.time()
    dirs = {
        APDS9960_DIR_NONE: "none",
        APDS9960_DIR_LEFT: "left",
        APDS9960_DIR_RIGHT: "right",
        APDS9960_DIR_UP: "up",
        APDS9960_DIR_DOWN: "down",
        APDS9960_DIR_NEAR: "near",
        APDS9960_DIR_FAR: "far"
    }
    while True:
        if is_on and time.time() > (last_motion_time + SHUTOFF_DELAY):
            print("No motion detected for SHUTOFF_DELAY, powering off monitor")
            is_on = False
            turn_off()

        if apds.isGestureAvailable():            
            motion = apds.readGesture()
            print("Gesture={}".format(dirs.get(motion, "unknown")))
            last_motion_time = time.time()

            if not is_on:
                print("Motion detected, powering on monitor")
                is_on = True
                turn_on()
            else:
                if (motion == APDS9960_DIR_UP):
                    keyboard.emit_click(uinput.KEY_DOWN)
                elif (motion == APDS9960_DIR_DOWN):
                    keyboard.emit_click(uinput.KEY_UP)
                elif (motion == APDS9960_DIR_LEFT):
                    keyboard.emit_click(uinput.KEY_RIGHT)
                elif (motion == APDS9960_DIR_RIGHT):
                    keyboard.emit_click(uinput.KEY_LEFT)
                elif (motion == APDS9960_DIR_NONE):
                    keyboard.emit_click(uinput.KEY_1)

def turn_on():
    keyboard.emit_click(uinput.KEY_F5)
    subprocess.call("sh monitor_on.sh", shell=True)
 
def turn_off():
    subprocess.call("sh monitor_off.sh", shell=True)

setup();            

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("Stopping gesture sensing")
        GPIO.cleanup()