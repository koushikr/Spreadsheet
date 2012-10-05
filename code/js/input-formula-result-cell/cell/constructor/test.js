Cell.FireUnitTests = {};

Cell.FireUnitTests.test1 = function() {
    var c = Cell.make(5, op("*", 3, "x"));
    fireunit.ok(c.input === 5, "t1 ok");
    fireunit.ok(c.result === 15, "t2 ok");
};


FireUnit.runTests(Cell.FireUnitTests);




    