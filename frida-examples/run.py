#! /usr/bin/env python
# coding: utf-8

import frida, sys

package_name = "com.ifengwoo.zyjdkj"

def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'])
    elif message['type'] == 'error':
        print(message['stack'])

def run(script_file):
    script = None
    with open(script_file) as f:
        script = f.read()

    session = frida.get_device_manager().enumerate_devices()[-1].attach(package_name)
    script = session.create_script(script)
    script.on('message', on_message)
    print("load js file")
    script.load()
    sys.stdin.read()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("python run.py example.js")
        sys.exit(1)

    run(sys.argv[1])
