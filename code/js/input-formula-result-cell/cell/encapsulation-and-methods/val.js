// Javascript implementation of a simple object using encapsulation

var mkC = function(initX) {
    var x = initX;
    
    var getVar = function() {
	return x;
    };   

    var setVar = function(v) {
	x = v;
    };
    
    var c = {};

    c.getVar = getVar;
    c.setVar = setVar;
    return c;
};


var c1 = mkC(5);
var c2 = mkC(7);
c1.getVar() // => 5
c2.getVar() // => 7




