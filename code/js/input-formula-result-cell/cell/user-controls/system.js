var System  = {};

System.make = function(initInput, initFormula) {

    var a = {};

    // components
    var c = Cell.make(initInput, initFormula);
    var inputView   = InputView.make(c);
    var formulaView = View.make("formula", c);
    var resultView  = View.make("result",  c);


    var init = function() {
	// wiring the views
	var body = document.body;
	inputView.init(body);
        formulaView.init(body);
        resultView.init(body);
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


    

    

