from threading import Timer
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setup(4, GPIO.OUT)
GPIO.output(4, GPIO.LOW)


def hello():
    	GPIO.output(4,GPIO.HIGH)
        time.sleep(2)
        GPIO.output(4,GPIO.LOW)
t = Timer(5.0, hello)
t.start()
