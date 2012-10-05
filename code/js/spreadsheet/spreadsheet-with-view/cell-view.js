var CellView = {};

CellView.make = function(initValue, cell) {

    var a = {};

    var editor = Editor.make(initValue);

    var wireHandler = function() {
	var redisplayHandler = 
	Handler.make("redisplay-" + name,
		     function() { 
			 alert("running redisplay handler");
			 editor.value = cell.getVar("result").show();
		     });

	cell.getVar("result").addHandler("change", redisplayHandler);
    };

    var getEditor = function() {
	return editor;
    };


    var getValue = function() {
	return editor.value;
    };

    // initialization
    wireHandler();
    a.getEditor = getEditor;
    a.getValue = getValue; 
    return a;
};


    
