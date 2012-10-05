var Cell = {};

Cell.make = function(initInput, initFormula) {

    var a = {};

    var initExp = coerceToExp(initFormula);

    var input   = StateVar.make("input",initInput);
    var formula = StateVar.make("formula", 
                    {initValue: initExp, 
                     show: function() {return this.getValue().show();}});

    var result  = StateVar.make("result", initExp.evalExp(initInput));

    var recompute = function() {
        result.setValue(formula.getValue().evalExp(input.getValue()));
    };


    // initialisation: wiring the handlers
    var init = function() {
	var recomputeResult = 
	Handler.make("recomputeResult", recompute);

	input.addHandler("change", recomputeResult);
	formula.addHandler("change", recomputeResult);
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


    // interface methods

    a.getInput    = getInput;
    a.getResult   = getResult;
    a.showFormula = showFormula;
    a.setInput    = setInput;
    a.setFormula  = setFormula;

    init();
    return a;
};


