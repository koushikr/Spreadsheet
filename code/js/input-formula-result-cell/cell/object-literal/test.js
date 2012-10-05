var Cell = {};

Cell.FireUnitTests = {};

Cell.FireUnitTests.test1 = function() {
    var c1 = { input : 5, formula : op("*", 3, "x"), result : 15 };
    fireunit.ok(c1.formula.evalExp(c1.input) === c1.result, "c1 ok");

    var c2 = {input : 5, formula : op("*", 3, "x"), result : 0};
    fireunit.ok(c2.formula.evalExp(c2.input) !== c2.result, "c2 ok");
};

