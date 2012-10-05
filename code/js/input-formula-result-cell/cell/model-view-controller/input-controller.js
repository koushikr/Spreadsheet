var InputController = {};

InputController.make = function(cell) {
    var a = {};

    var input = View.make("input", cell);
    var editor = input.getEditor();

    // should be made a state variable
    var isBeingEdited = false;

    var getValue = function() {
	return input.getValue();
    };

    var handleDblclick = function(e) {
	if (isBeingEdited) {
	    // dblclick on an input already being edited. Ignore.
	}
	else {
	    isBeingEdited = true;
	    editor.readOnly = false;  
	    editor.style.backgroundColor="yellow";
	};
    };

    var handleKeypress = function(e) {
	if (e.keyCode == 13) { // newline
	    isBeingEdited = false;
	    var newValue =parseInt(editor.value); 
	    editor.readOnly = true;
	    editor.style.backgroundColor="white";
	    if (isNaN(newValue)) {
		alert("handleKeypress: input NaN, restoring to " + 
		      cell.getInput());
		editor.value = cell.getInput();
	    }
	    else {
		cell.setInput(newValue);
	    };
	};
    };

    var init = function(el) {
	input.init(el);

	// editor delegates event handling to the the input
	// controller.
	editor.addEventListener("dblclick", handleDblclick, false);
	editor.addEventListener("keypress", handleKeypress, false);
    };

    // API
    a.init  = init;

    // Debugging Interface
    a.editor = editor
    a.input  = input

    return a;
};