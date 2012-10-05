Cell.FireUnitTests = {};

Cell.FireUnitTests.test1 = function() {
    var c = Cell.make(5, op("*", 3, "x"));
    fireunit.ok(c.getInput() === 5, "t1 ok");
    fireunit.ok(c.getResult() === 15, "t2 ok");
    fireunit.ok(c.showFormula() === "(* 3 x)", "t3 ok");


    c.setInput(7);

    fireunit.ok(c.getInput() === 7, "t4 ok");
    fireunit.ok(c.getResult() === 21, "t5 ok");
    c.setFormula(op("+", 2, "x"));
    fireunit.ok(c.showFormula() === "(+ 2 x)", "t6 ok");

    fireunit.ok(c.getInput() === 7, "t7 ok");
    fireunit.ok(c.getResult() === 9, "t8 ok");
};


FireUnit.runTests(Cell.FireUnitTests);

