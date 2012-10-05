var System  = {};
System.make = function(initInput, initFormula) {

    var a = {};

    // components
    //    var c = CellController.make(initInput, initFormula);
    var c = Cell.make(initInput, initFormula);
    var inputView   = InputController.make(c);
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

    a.getCell = getCell;

    // debugging interface
    a.cell = c;
    a.inputView = inputView;
    a.formulaView  = formulaView;
    a.resultView = resultView;

    init();
    return a;
};


    

    

