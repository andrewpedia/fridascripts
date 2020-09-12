
console.log("java perform hook")
Java.perform(function hook_loadbuffer() {
    console.log("come in hook function")
    // console.log(JSON.stringify(Process.enumerateModules()));
    // var libnative_addr = Module.findBaseAddress("libmqm.so")
    // console.log("libnative_addr is: " + libnative_addr)

    // if (libnative_addr) {
         
        var loadbuffer = resolveAddress('libmqm.so', 0x000E297C);
        console.log("loadbuffer is: " + loadbuffer)
    // }

    Interceptor.attach(loadbuffer, {
        onEnter: function (args) {
            console.log("loadbuffer args: " + args[0], args[1], args[2])
            console.log("writing luac to file ")
            this.fileout = "/sdcard/lua/" + Memory.readCString(args[3]).split("/").join(".");
            console.log("read file from: "+this.fileout);
            var tmp = Memory.readByteArray(args[1], args[2].toInt32());
            var file = new File(this.fileout, "w");
            file.write(tmp);
            file.flush();
            file.close();
        },
        
        // onLeave: function (retval) {
        //     console.log("retval:", retval)
        //     console.log(Java.vm.getEnv().getStringUtfChars(retval, null).readCString())
        //     var newRetval = Java.vm.getEnv().newStringUtf("new retval from hook_native");
        //     retval.replace(ptr(newRetval));
        // }
    })
});

function resolveAddress(name, idaAddr) {
    var baseAddr = Module.findBaseAddress(name);
    console.log('[+] BaseAddr of ' + name + ': ' + baseAddr);
      
    // Calculate offset in memory from base address in IDA database
    // var offset = ptr(idaAddr).sub(idaBase);
      
    // Add current memory base address to offset of function to monitor
    var result = ptr(baseAddr).add(idaAddr).add(1);
      
    // Write location of function in memory to console
    console.log('[+] Address in memory: ' + result);
    return result;
}
