var InputController = {};

// the cell here refers to the cellController object
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
	else if (cell.getVar("busy").getValue()) {
	    alert("cell is busy.  Please try editing later.");
	}
	else {
	    cell.getVar("busy").setValue(true);
	    isBeingEdited = true;
	    editor.readOnly = false;  
	    editor.style.backgroundColor="yellow";
	};
    };

    var handleKeypress = function(e) {
	if (e.keyCode == 13) { // newline
	    //	    alert("handleKeypress: input is " + editor.value);
	    var newValue =parseInt(editor.value); 
	    //	    alert("handleKeypress: newValue is " + newValue);
	    editor.readOnly = true;
	    editor.style.backgroundColor="white";
	    isBeingEdited = false;
            //	    alert("handleKeypress: isBeingEdited set to " + isBeingEdited);
	    if (isNaN(newValue)) {
		alert("handleKeypress: input NaN, restoring to " + 
		      cell.getInput());
		editor.value = cell.getInput();
	    }
	    else {
		cell.setInput(newValue);
	    };
	    cell.getVar("busy").setValue(false);
	};
    };

    var handleCellBusy  = 
    Handler.make("cellBusyView", 
		 function() {
		     if (!isBeingEdited) {
			 editor.style.backgroundColor="pink";
		     }
		 });


    var handleCellNotBusy  = 
    Handler.make("cellNotBusyView", 
		 function() {
		     editor.style.backgroundColor="white";
		 });
		 
    var init = function(el) {
	input.init(el);
	editor.addEventListener("dblclick", handleDblclick, false);
	editor.addEventListener("keypress", handleKeypress, false);
	cell.getVar("busy").addHandler("changeToTrue", handleCellBusy);
	cell.getVar("busy").addHandler("changeToFalse", handleCellNotBusy);
    };

    var getBeingEdited = function() {
        return isBeingEdited;
    };

    // API
    a.init  = init;

    // Debugging Interface
    a.editor = editor
    a.input  = input
    a.getBeingEdited = getBeingEdited;

    return a;
};