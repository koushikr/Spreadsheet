var FormulaTest = {};

FormulaTest.FireUnitTests = {};

FormulaTest.FireUnitTests.tests = function() {

    fireunit.ok(numExp(3).isEqualTo(Formula(ps("3")).ast), "f1");

    fireunit.ok(varExp().isEqualTo(Formula(ps("x")).ast), "f2");

    fireunit.ok(opExp("+", numExp(3), varExp()).isEqualTo
                (Formula(ps("(+ 3 x)")).ast), 
                "f3");

};

