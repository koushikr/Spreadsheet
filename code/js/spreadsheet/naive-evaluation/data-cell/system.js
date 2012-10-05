var System  = {};
System.make = function() {

    var a = {};

    // components

    var c = Cell.make();
    var inputView = InputController.make(c);

    var init = function() {
	// wiring the views
	var body = document.body;
	inputView.init(body);
    };

    var getCell = function() {
	return c;
    };

    a.getCell = getCell;

    // debugging interface
    a.cell = c;
    a.inputView = inputView;
    init();
    return a;
};


    

    

