var View = {};

View.make = function(initValue, cell) {
    var a = {};

    var editor = DOM.dom("input",
                {type     : "text", 
		 readOnly : false,
		 style    : "background-color: white;",
		 value    : cell.getVar("result").show()}, []);

    var wireDisplay = function(el) {
	el.appendChild(editor);
    };


    var wireHandler = function() {
	var redisplayHandler = 
	Handler.make("redisplay-" + name,
		     function() { 
			 alert("running redisplay handler");
			 editor.value = cell.getVar("result").show();
		     });

	cell.getVar("result").addHandler("change", redisplayHandler);
    };

    var init = function(el) {

	wireHandler();
	wireDisplay(el);
    };

    var getEditor = function() {
	return editor;
    };


    var getValue = function() {
	return editor.value;
    };

    a.init  = init;
    a.getEditor = getEditor

    // only for debugging
    a.getValue = getValue; 
    return a;
};


    
