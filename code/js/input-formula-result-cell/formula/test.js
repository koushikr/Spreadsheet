Exp.FireUnitTests = {};

Exp.FireUnitTests.tests = function() {
    fireunit.ok(numExp(5).number === 5, "numExp(5).number === 5");
    fireunit.ok(opExp("+", numExp(5), varExp()).show() === "(+ 5 x)", 
                "opExp(+, numExp(5), varExp()).show() === (+ 5 x)");

    fireunit.ok(opExp("+", numExp(5), varExp()).evalExp(3) === 8,
                "opExp(+, numExp(5), varExp()).evalExp(3) === 8");

    fireunit.ok(op("+", 5, "x").evalExp(3) === 8,
                "op(+, 5, x).evalExp(3) === 8");


    // Equality tests
    fireunit.ok(numExp(5).isEqualTo(numExp(5)), "eq1");
    fireunit.ok(!(varExp().isEqualTo(5)), "eq2");
    fireunit.ok(!(numExp(5).isEqualTo(5)), "eq3");
    fireunit.ok(
     opExp("+", numExp(3), varExp()).isEqualTo(opExp("+", numExp(3), varExp())), 
     "eq4");
};

