var Cell = {};

Cell.make =  function(ss) {

    var a = {};

    // state vector
    var sv = StateVector.make({
	formula : {initValue: numExp(0), 
		   show: function() {return this.getValue().show();}},
	result  : {initValue: 0,
	           show: function() {return this.getValue();}}});

    var formula = sv.formula;
    var result  = sv.result;

    // initialisation
    var init = function() {

        // conditions

        var errorVal = Condition.make("error", 
                                       function(obj) {
                                           return obj.value === "error";
                                       });
        result.setCondition(errorVal);



        var recomputed = Condition.make("recomputed", 
                                       function(obj) {
                                           return true;
                                       });
        result.setCondition(recomputed);


	// handlers

	var recomputeResult = function() {
	    var f = formula.getValue();
            var v = null;
            try {
                v = formula.getValue().evalExp(ss);
                result.setValue(v);
            }
            catch (e if e instanceof Exp.evalExpException) {
                alert(e.msg);
                result.setValue("error");
            }
	};

	var recomputeResultHandler = 
	Handler.make("recomputeResultHandler", recomputeResult);

	// wiring the handler
	formula.addHandler("change", recomputeResultHandler);
    };

    var getResult = function() { 
	return result.getValue();
    };
	
    var setFormula = function(f) {
	formula.setValue(f);
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
    a.getResult   = getResult;
    a.showFormula = showFormula;
    a.setFormula  = setFormula;

    // should be accessible only to controller
    a.getStateVector  = getStateVector;

    // debugging interface
    a.formula = formula;
    a.result = result;
    a.sv   = sv;

    init();
    return a;
};



