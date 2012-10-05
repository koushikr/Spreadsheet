var InputView = {};

InputView.make = function(model) {
    var a = {};

    var input = View.make("input", model);
    var editor = input.getEditor();

    var wireEditorEventHandlers = function() {
	editor.addEventListener("dblclick",   
          function(e) {          
	    editor.readOnly=false;  
	    editor.style.backgroundColor="yellow";}, 
          false);

	editor.addEventListener("keypress",     
          function(e) {
	    if (e.keyCode == 13) { // newline
		model.setInput(parseInt(editor.value));
		editor.readOnly=true;          
		editor.style.backgroundColor="white";
	    };
          },
          false);
    };

    var init = function(e) {
	input.init(e);
	wireEditorEventHandlers();
    };

    var getEditor = function() {
	return editor;
    };

    var getValue = function() {
	return input.getValue();
    };
    
    // API
    a.init  = init;

    // Debugging Interface
    a.getEditor = getEditor;
    a.getValue = getValue; 
    return a;
};


    
