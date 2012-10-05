// Cell with state variables  and view objects.

var Cell = {};

Cell.make = function(initInput, initFormula) {

    var a = {};

    var initExp = coerceToExp(initFormula);

    // state variables
    var input   = StateVar.make("input", initInput);

    var formula = StateVar.make("formula", 
                    {initValue: initExp, 
                     show: function() {return this.getValue().show();}});

    var result  = StateVar.make("result", initExp.evalExp(initInput));


    // Box elements for view
    var inputBox = DOM.dom("input", 
                {type: "text", 
		 readOnly: false,
		 style: "background-color: white;",
		 value: input.getValue()}, []);

    var resultBox = DOM.dom("input", 
                {type: "text",   
		 style: "background-color: white;",
		 readOnly: true,
		 value: result.getValue()}, []);


    var formulaBox = DOM.dom("input", 
                {type: "text",   
		 style: "background-color: white;",
		 readOnly: true,
		 value: formula.getValue().show()}, []);


    // initialisation
    var init = function() {

	// handlers

	var recomputeResult = function() {
	    result.setValue(formula.getValue().evalExp(input.getValue()));
	};

	var recomputeResultHandler = 
	Handler.make("recomputeResultHandler", recomputeResult);


	var redisplayResult = function() {
	    resultBox.value = result.getValue();
	};

	var redisplayResultHandler = 
	Handler.make("redisplayResult", redisplayResult);


	var redisplayFormula = function() {
	    formulaBox.value = formula.getValue().show();
	};

	var redisplayFormulaHandler = 
	Handler.make("redisplayFormula", redisplayFormula);

	var redisplayInput = function() {
	    inputBox.value = input.getValue();
	};

	var redisplayInputHandler = 
	Handler.make("redisplayInput", redisplayInput);


	// wiring of handlers

	input.addHandler("change", redisplayInputHandler);
	input.addHandler("change", recomputeResultHandler);

	formula.addHandler("change", redisplayFormulaHandler);
	formula.addHandler("change", recomputeResultHandler);

	result.addHandler("change", redisplayResultHandler);


	// wiring of DOM elements

	document.body.appendChild(DOM.dom("div", null, ["input"]));
	document.body.appendChild(inputBox);

	document.body.appendChild(DOM.dom("div", null, ["formula"]));
	document.body.appendChild(formulaBox);

	document.body.appendChild(DOM.dom("div", null, ["result"]));
	document.body.appendChild(resultBox);
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
	formula.setValue(f);
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


// Implementation Notes
// --------------------


// The model (cell) is too closely coupled with the view.