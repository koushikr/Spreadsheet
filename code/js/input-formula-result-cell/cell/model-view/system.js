var System  = {};

System.make = function(initInput, initFormula) {

    var a = {};

    // components
    var c = Cell.make(initInput, initFormula);
    var inputView   = View.make("input",   c);
    var formulaView = View.make("formula", c);
    var resultView  = View.make("result",  c);

    var init = function() {
	// wiring the views
	inputView.init();
        formulaView.init();
        resultView.init();
    };

    var getCell = function() {
	return c;
    };

    var getInputView = function() {
	return inputView;
    };

    var getFormulaView = function() {
	return formulaView;
    };

    var getResultView = function() {
	return resultView;
    };


    // only for debugging
    a.getCell = getCell;
    a.getInputView = getInputView;
    a.getFormulaView  = getFormulaView;
    a.getResultView = getResultView;

    init();
    return a;
};


    

    

