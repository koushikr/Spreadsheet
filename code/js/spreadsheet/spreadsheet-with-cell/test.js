var System = {};
System.FireUnitTests = {};
var ss = {};
System.FireUnitTests.test1 = function() {
    ss = SpreadSheet.make(5, 6);
    fireunit.ok(ss.getNoRows() === 5, "s1 ok");
    fireunit.ok(ss.getNoCols() === 6, "s2 ok");
    fireunit.ok(ss.getCell(1, 2).getResult() === 0, "s3 ok");
    fireunit.ok(ss.indexOf(ss.getCell(1, 2)).isEqualTo([1, 2]), "s4 ok");

    var c12 = ss.getCell(1, 2);
    c12.setFormula(opExp("+", [numExp(2), numExp(3)]));
    fireunit.ok(c12.getResult() === 5, "s5 ok");
};

