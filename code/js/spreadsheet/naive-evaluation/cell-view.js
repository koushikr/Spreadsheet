var CellView = {};

CellView.make = function(initValue, cell) {

    var a = {};

    var editor = Editor.make(initValue);
    
    var wireHandler = function() {
	var redisplayHandler = 
	Handler.make("redisplay-" + "cell",
		     function() { 
                         //                         alert("running redisplay handler");
			 editor.value = cell.getVar("result").show();
		     });
        //	cell.getVar("result").addHandler("change", redisplayHandler);
        cell.getVar("result").addHandler("recomputed", redisplayHandler);

	var errorDisplayHandler = 
	Handler.make("error-display" + "cell",
		     function() { 
			 editor.style.backgroundColor="#FFBBAA";
		     });
        cell.getVar("result").addHandler("error", errorDisplayHandler);
    };


    var getEditor = function() {
	return editor;
    };


    var getValue = function() {
	return editor.value;
    };

    wireHandler();


    a.getEditor = getEditor
    a.getValue = getValue; 
    return a;
};


    
