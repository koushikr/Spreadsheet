var instantiate = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
};


// ======
//   List
//   ----
// A List is either Nil or a  Pair

// List = Nil + Pair

var List = new Object();

List.isList = function() {
    return (this.isNil() || this.isPair());
};

// ======
//   Nil
// ======

var Nil = instantiate(List);

Nil.hd = function() {
    alert("Nil.hd() -> error");
};

Nil.tl = function() {
    alert("Nil.tl() -> error");
};

// =============
// Pair
// =============

var Pair = instantiate(List);

Pair.hd = function() {
    return this.h;
};


Pair.tl = function() {
    return this.t;
};



// cons : [Any List] -> Pair
var cons = function(h,t) {
    var a = instantiate(Pair);
    a.h = h;
    a.t = t;
    return a;
};


var a = cons(2, Nil);   // pair(2, Nil);
var b = cons(3, a);     // pair(3, a);

// isNil
// ------

Nil.isNil = function() {
    return true;
};

Pair.isNil = function() {
    return false;
};

// isPair
// ------
Nil.isPair = function() {
    return false;
};

Pair.isPair = function() {
    return true;
};


// Length
// ------
Nil.length = function() {
    return 0;
};

Pair.length = function() {
    return 1 + this.tl().length();
};


// Another way of defining length, in a procedure oriented
// way.
var length = function(o) {
    if (o.isNil) {
        return 0;
    };
    return 1 + length(o.tl());
};

// show
// ----
Nil.show = function() {
    return "()";
};

Pair.show = function() {
    var s =  "(" + this.hd() + " . " + this.tl().show() + ")";
    return s;
};

// toArray
// -------

Nil.toArray = function() {
    return [];
};

Pair.toArray = function() {
    var s =  [];
    s = this.tl().toArray();
    s.unshift(this.hd());
    return s; 
};


// isMember
// --------

Nil.isMember = function(x)  {
    return false;
};

Pair.isMember = function(x) {
    if (this.hd() === x) {
        return true;
    };
    return this.tl().isMember(x);
};


// occurrences
// -----------

Nil.occurrences = function(x)  {
    return 0;
};

Pair.occurrences = function(x) {
    var a = (this.hd() === x) ? 1 : 0;
    return a + this.tl().occurrences(x);
};



// Map
// ---
Nil.map = function(f) {
    return Nil;
};

Pair.map = function(f) {
    return cons(f(this.hd()), this.tl().map(f));
};

var add1 = function(x) {
    return x+1;
};

// create a list of length n;
// with hd set to 0.
List.create = function(n) {
    var ls = Nil;
    for (var j = 0; j < n; j++)  {
	ls = cons(0, ls);
    };
    return ls;
};
	
    
    








    
    

