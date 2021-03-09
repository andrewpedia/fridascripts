#! /usr/bin/env python
# coding: utf-8

import frida, sys

package_name = "com.ifengwoo.zyjdkj"

def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'])
    elif message['type'] == 'error':
        print(message['stack'])

def run(script_file,processesname):
    script = None
    with open(script_file) as f:
        script = f.read()

    device = frida.get_device_manager().enumerate_devices()[-1]
    #print("spawn package")
    #pid = device.spawn(package_name)
    
    #processes = sorted(device.enumerate_processes(), key=lambda d: d.name.lower())
    #print("process list")
    #print(processes)
     
     
    
    session=device.attach(processesname)
    script = session.create_script(script)

    script.on('message', on_message)
    print("load js file")
    script.load()
    sys.stdin.read()

#NOTE:!!!! this processesname is process name str ,not process id
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("python run.py example.js processesname ")
        sys.exit(1)

    run(sys.argv[1],sys.argv[2] )
