var CellRefExp = instantiate(Exp);
CellRefExp.expType = "CellRefExp";

var cellRefExp = function(c) {
    var a = instantiate(CellRefExp);
    a.cell = c;
    return a;
};

CellRefExp.isEqualTo = function(e) {
    return (e.expType === "CellRefExp" &&
            this.number === e.number);
};


CellRefExp.show = function() {
    var rc = this.getSpreadSheet().indexOf(this);
    var r = rc[0];
    var c = rc[1];
    return (Exp.unparseColNum(c) + "" + Exp.unparseRowNum(r));
};

// Evaluation
// ----------

CellRefExp.evalExp = function(ss) {
    return this.cell.getResult();
};


// Normalization: 
// --------------

// Converts each index reference in an Exp to a cell in the
// spreadsheet ss.

NumExp.normalize = function(ss) {
    return this;
};

StrExp.normalize = function(ss) {
    return this;
};

IndexExp.normalize = function(ss) {
    var c = ss.getCell(this.row, this.col);
    if (!c) {
        throw("index out of bounds: "  + this.show());
    };
    return cellRefExp(c);
};

OpExp.normalize = function(ss) {
    var nes = this.rands.mapMethod("normalize", ss);
    return opExp(this.rator, nes);
};

CellRefExp.normalize = function(ss) {
    return this;
};


// Collect cells in a normalized formula

// Exp.parents() : set[cell]

NumExp.parents = function() {
    return Set.emptySet;
};

StrExp.parents = function() {
    return Set.emptySet;
};


CellRefExp.parents = function() {
    return this.cell;
};


OpExp.parents = function() {
    var rands = this.rands;
    var rps = rands.map("parents"); // array of sets
    var ans = rps.reduce("union", Set.emptySet);
    return ans;
};









    
    

























