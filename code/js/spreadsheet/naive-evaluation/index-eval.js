// Evaluation
// ===========

// Evaluation
// -----------
NumExp.evalExp = function(ss) {
    return this.number;
};


StrExp.evalExp = function(ss) {
    return this.string;
};


Exp.evalExpException = function(s) {
    this.type = "Exp.evalExpException";
    this.msg = s;
};

IndexExp.isOutOfRange = function(ss) {
    return (!(0 <= this.row && this.row < ss.getNoRows() &&
              0 <= this.col && this.col < ss.getNoCols()));
};

IndexExp.evalExp = function(ss) {
    if (this.isOutOfRange(ss)) {
        throw new Exp.evalExpException("index " + this.show() + 
                                       " out of range in spreadsheet " + 
                                       ss.getName());
    };
    var v = ss.getCell(this.row, this.col).getResult();
    if (v === "error")  {
        throw new Exp.evalExpException("result is error");
    };
    return v;
};


OpExp.evalExp = function(ss) {
    vals = this.rands.mapMethod("evalExp", ss);
    return applyOperation(this.rator, vals);
};
