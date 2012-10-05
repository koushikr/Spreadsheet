// Simple language for formula  expressions that are 1 level deep.

// Adapted from David van Horn
// http://dvanhorn.lambda-calcul.us/2008/04/22/interpretation-in-scheme-and-javascript/

// Atomic := varExp() | numExp(n: number)
// Op     := "+" | "-" | "*" | "/"
// Exp    := Atomic | opExp(bop: Op, left: Exp, right: Exp)

// AtomicFormula ::= number | Var
// Var           ::= string
// Formula       ::= AtomicFormula |  op(Op, AtomicFormula, AtomicFormula)


var Exp = new Object();
// NumExp
var NumExp = instantiate(Exp);
NumExp.expType = "NumExp";

var numExp = function(n) {
    var a = instantiate(NumExp);
    a.number = n;
    return a;
};

var nm = numExp;

var VarExp  = instantiate(Exp);
VarExp.expType = "VarExp";

var varExp = function() {
    var a = instantiate(VarExp);
    return a;
};

var vr = varExp;

var OpExp = instantiate(Exp);
OpExp.expType = "OpExp";

var opExp = function(op, el, er) {
    var a = instantiate(OpExp);
    a.op = op;
    a.left = el;
    a.right = er;
    return a;
};

var coerceToExp = function(f) {
    switch (typeof(f)) {
    case "number": return numExp(f);
    case "string": return varExp();
    default : return f;
    };
};

var op = function(op, el, er) {
    var a = instantiate(OpExp);
    a.op = op;
    a.left = coerceToExp(el);
    a.right = coerceToExp(er);
    return a;
};

// Show

NumExp.show = function() {
    return this.number + "";
};

VarExp.show = function() {
    return "x";
};

OpExp.show = function() {
    var ans =   "(" + this.op + " " +
                this.left.show() + " " + 
                this.right.show() + ")";
    return ans;
};


// isEqualTo

NumExp.isEqualTo = function(e) {
    return (e.expType === "NumExp" &&
            this.number === e.number);
};


VarExp.isEqualTo = function(e) {
    return (e.expType === "VarExp");
};

OpExp.isEqualTo = function(e) {
    return (e.expType === "OpExp" &&
            this.op === e.op &&
            this.left.isEqualTo(e.left) &&
            this.right.isEqualTo(e.right));
};

// Evaluation
// -----------
NumExp.evalExp = function() {
    return this.number;
};

VarExp.evalExp = function(input) {
    return input;
};

OpExp.evalExp = function(input) {
    v1 = this.left.evalExp(input);
    v2 = this.right.evalExp(input);
    return applyOperation(this.op, v1, v2);
};

var applyOperation  = function(op, n1, n2) {
    switch (op) {
    case "+": return n1+n2;
    case "-": return n1-n2;
    case "*": return n1*n2;
    case "/": return n1/n2;
    };
};

// Examples

// opExp("+", numExp(5), varExp()).show() // => (+ 5 x)
// opExp("+", numExp(5), varExp()).evaluate(3) // => 8


// op("+", 5, "x").show() // => (+ 5 x)
// op("+", 5, "x").evalExp(3) // => 8









