Function.prototype.toEmitter = function () {
  //  "uri":"ds031832.mongolab.com:31832/contact-management"
    var origFunc = this;
    return function () {
        var args = arguments;
        var emitter = new process.EventEmitter();
        process.nextTick(function () {
            origFunc.apply(emitter, args);
        });
        return emitter;
    }
};