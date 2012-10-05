var InputController = {};

InputController.make = function(initValue, cell) {
    var a = {};

    var input = CellView.make(initValue, cell);
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
	    editor.value = cell.showFormula();
	    editor.readOnly = false;  
	    editor.style.backgroundColor="yellow";
	};
    };

    var handleKeypress = function(e) {
	if (e.keyCode == 13) { // newline
	    isBeingEdited = false;
	    var newValue =parseSSExpr(editor.value); 
	    editor.readOnly = true;
	    editor.style.backgroundColor="white";
	    if (!newValue) {
		alert("handleKeypress: input is not valid, restoring to " + 
		      cell.getResult());
		editor.value = cell.getResult();
	    }
	    else {
		cell.setFormula(newValue);
	    };
	};
    };

    var init = function() {
	editor.addEventListener("dblclick", handleDblclick, false);
	editor.addEventListener("keypress", handleKeypress, false);
    };

    var getBeingEdited = function() {
        return isBeingEdited;
    };

    var getEditor  = function() {
        return editor;
    };

    var getValue  = function() {
        return editor.value;
    };


    // API
    a.getEditor = getEditor;
    a.getValue = getValue;

    // Debugging Interface
    a.editor = editor
    a.input  = input
    a.getBeingEdited = getBeingEdited;

    init();

    return a;
};