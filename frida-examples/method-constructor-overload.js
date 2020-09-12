Java.perform(function x() {
    var secret_key_spec = Java.use("javax.crypto.spec.SecretKeySpec");
    secret_key_spec.$init.overload("[B", "java.lang.String").implementation  = function(x , y){
        send('{"my_type" : "KEY"}', new Uint8Array(x));
        return this.$init(x , y);
    }
});