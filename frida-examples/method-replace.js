Java.perform(function () {

    var MainActivity = Java.use("com.github.myzhan.fridatest.MainActivity");

    MainActivity.alwaysTrue.implementation = function () {
        return "false";
    }

});