Java.perform(function () {

    var funcAddr = Module.findExportByName("libmqm.so", "Java_com_github_myzhan_fridatest_MainActivity_stringFromJNI");
    console.log("funcAddr is " + funcAddr);

    Interceptor.attach(funcAddr, {
        onEnter: function (args) {
            return 0;
        },
        
        onLeave: function (retval) {
            const dstAddr = Java.vm.getEnv().newStringUtf("false");
            retval.replace(dstAddr);
        },
    });

});