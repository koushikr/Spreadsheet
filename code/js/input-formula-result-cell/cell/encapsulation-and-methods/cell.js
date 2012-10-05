var Cell = {};

Cell.make = function(initValue, initFormula) {

    var a = {};
    var input   = initValue;          
    var formula = coerceToExp(initFormula);
    var result  = "uninitialized";    

    var compute = function() {
	result = formula.evalExp(input);  
    };
    var getInput  = function() { 
	return input;
    };
    var getResult = function() { 
	return result; 
    };
    var setInput = function(v) {
	input = v;                    
	compute();
    };

    var showFormula = function() {
	return formula.show();
    };

    var setFormula = function(f) {
	formula = coerceToExp(f);                  
	compute();                    
    };

    // initialisation
    compute();

    // interface

    a.getInput  =  getInput;
    a.setInput  =  setInput;
    a.getResult =  getResult;
    a.showFormula = showFormula;
    a.setFormula  = setFormula;

    return a;

};



