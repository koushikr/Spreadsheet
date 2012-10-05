// MVC

var Cell = {};

Cell.make =  function(initInput, initFormula) {

    var a = {};
    var initExp = coerceToExp(initFormula);

    // state variables

    var sv = StateVector.make({
	input   : initInput,
	formula : {initValue: initExp, 
		   show: function() {return this.getValue().show();}},
	result  : initExp.evalExp(initInput)});


    var input   = sv.input;
    var formula = sv.formula;
    var result  = sv.result;

    // initialisation
    var init = function() {

	// handlers

	var recomputeResult = function() {
	    result.setValue(formula.getValue().evalExp(input.getValue()));
	};

	var recomputeResultHandler = 
	Handler.make("recomputeResultHandler", recomputeResult);

	// wiring the handlers

	input.addHandler("change", recomputeResultHandler);
	formula.addHandler("change", recomputeResultHandler);
    };

    // methods

    var getInput  = function() { 
	return input.getValue(); 
    };

    var getResult = function() { 
	return result.getValue();
    };
	
    var setInput = function(v) {
	input.setValue(v);
    };

    var setFormula = function(f) {
	formula.setValue(coerceToExp(f));
    };

    var showFormula = function() {
	return formula.getValue().show();
    };

    var getVar = function(name) {
	return sv[name];
    };


    // interface methods


    a.getInput    = getInput;
    a.getResult   = getResult;
    a.showFormula = showFormula;
    a.setInput    = setInput;
    a.setFormula  = setFormula;
    a.getVar      = getVar;

    init();
    return a;
};


