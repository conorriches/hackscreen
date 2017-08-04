#!/usr/bin/python
from threading import Timer
import RPi.GPIO as GPIO
import mosquitto
import yaml
import pygame
import os
import time
import datetime
import sched

s = sched.scheduler(time.time, time.sleep)

config_f = open('config.yaml')
config = yaml.safe_load(config_f)
config_f.close()

#set pins for alarm
GPIO.setmode(GPIO.BOARD)
GPIO.setup(5, GPIO.OUT)
GPIO.output(5, GPIO.LOW)

alarmQueued = False
alarmTime = 0

def checkFunc(sc): 
    if alarmQueued && datetime.now() > alarmTime
        chirp()
        cancelAlarm()

    s.enter(1, 1, checkFunc, (sc,))

# door left open, key -> door open
def on_message(obj, msg):
    print "Received %s on topic %s" % (msg.payload, msg.topic)
    if msg.topic == 'door/outer':
        if msg.payload == 'opened':
            setAlarm()
        else
            cancelAlarm()

    else

def chirp():
    GPIO.output(5,GPIO.HIGH)
    time.sleep(0.1)
    GPIO.output(5,GPIO.LOW)

def setAlarm:
    alarmTime = datetime.now() + datetime.timedelta(0,5)
    alarmQueued = True

def cancelAlarm:
    alarmQueued = 0
    alarmTime = 0

mqttc = mosquitto.Mosquitto(config['mqtt']['name'])
mqttc.connect(config['mqtt']['server'], 1883, 60, True)
mqttc.subscribe("door/outer")
mqttc.on_message = on_message

while mqttc.loop(timeout=100) == 0:
    pass

s.enter(1, 1, checkFunc, (s,))
s.run()