Java.perform(function () {

    var MainActivity = Java.use("com.github.myzhan.fridatest.MainActivity");

    // 1. Method requires a jave class instance as parameter.
    //    overload("java.lang.String") = function(str)
    // 2. Method requires two arrays of bytes.
    //    overload("[B", "[B").implementation = function(array1, array2)
    //
    // here, method "add" requires two primitive
    MainActivity.add.overload("int", "int").implementation = function (firse, second) {
        return 0;
    }

});