var View = {};

View.make = function(name, model) {
    var a = {};

    var editor = DOM.dom("input",
                {type     : "text", 
		 readOnly : true,
		 style    : "background-color: white;",
		 value    : model.getVar(name).show()}, []);

    var wireDisplay = function(el) {
	el.appendChild(DOM.dom("div", null, [name]));
	el.appendChild(editor);
    };

    var wireHandler = function() {
	
	var redisplayHandler = 
	Handler.make("redisplay-" + name,
		     function() { 
			 editor.value = model.getVar(name).show();
		     });

	model.getVar(name).addHandler("change", redisplayHandler);
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


    
