var Cell = {};

Cell.make =  function(initInput, initFormula) {

    var a = {};


    var initExp = coerceToExp(initFormula);

    // state variables

    var sv = StateVector.make({
	input   : {initValue: initInput, 
		   show: function() {return this.getValue();}},
	formula : {initValue: initExp, 
		   show: function() {return this.getValue().show();}},
	result  : {initValue: initExp.evalExp(initInput),
	           show: function() {return this.getValue();}}});

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

    var getInput  = function() { 
	return input.getValue(); 
    };

    var getResult = function() { 
	return result.getValue();
    };
	
    var setInput = function(v) {
	//	alert("cell: input set to " + v);
	input.setValue(v);
    };

    var setFormula = function(f) {
	formula.setValue(coerceToExp(f));
    };

    var showFormula = function() {
	return formula.getValue().show();
    };

    var getStateVector = function() {
	return sv;
    };

    var getVar = function(name) {
	return sv[name];
    };
	
    // interface methods

    a.getVar      = getVar;
    a.getInput    = getInput;
    a.getResult   = getResult;
    a.showFormula = showFormula;
    a.setInput    = setInput;
    a.setFormula  = setFormula;


    // should be accessible only to controller
    a.getStateVector  = getStateVector;

    // debugging interface
    a.input = input;
    a.formula = formula;
    a.result = result;
    a.sv   = sv;

    init();
    return a;
};



