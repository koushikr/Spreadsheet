var Cell = {};

Cell.make = function(input, formula) {
    var a = {};
    var exp = coerceToExp(formula);

    a.input = input;
    a.formula = exp;
    a.result = exp.evalExp(input);
    return a;
};


    
        



  





























var Cell_0 = function(initValue, initFormula) {

    // result = evalExp(value, formula)      // invariant

    return {
	
     value:   initValue,
     formula: initFormula, 
     result:  evalExp(initFormula, initValue)

    };

};


