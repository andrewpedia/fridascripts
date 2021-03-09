
console.log("java perform hook")
Java.perform(function hook_loadbuffer() {
    console.log("come in hook function")
    console.log(JSON.stringify(Process.enumerateModules()));
    var libnative_addr = Module.findBaseAddress("/data/app/com.ifengwoo.zyjdkj-iV_ceOoWrAtkEyOmxRuEqw==/lib/arm/libmqm.so")
    console.log("libmqm.so is: " + libnative_addr)

    if (libnative_addr) {
         
        var loadbuffer = resolveAddress('/data/app/com.ifengwoo.zyjdkj-iV_ceOoWrAtkEyOmxRuEqw==/lib/arm/libmqm.so', 0x000E297C);
        console.log("loadbuffer is: " + loadbuffer)
    }

    Interceptor.attach(ptr(loadbuffer)  , {
        
        onEnter: function (args) {
            console.log("loadbuffer args: "  +   args[1].readCString() ,args[2] ,args[3].readCString())
                
            if( args[3].readCString())
                this.fileout = "/sdcard/lua/" + Memory.readUtf8String(args[3]) ;
            else
                this.fileout = "/sdcard/lua/1"

            console.log("write file to: "+ this.fileout);
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
