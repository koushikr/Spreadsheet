instantiate = function(o) {
    var F = function() {};
    F.prototype = o;
    var a = new F();
    return a;
};


Object.prototype.parent = function() {
    return this.constructor.prototype;
};



