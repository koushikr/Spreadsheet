var View = {};

View.make = function(name, model) {
    var a = {};

    var box = DOM.dom("input",
                {type     : "text", 
		 readOnly : false,
		 style    : "background-color: white;",
		 value    : model.getVar(name).show()}, []);

    var wireDisplay = function() {
	document.body.appendChild(DOM.dom("div", null, [name]));
	document.body.appendChild(box);
    };


    var wireHandler = function() {
	
	var redisplayHandler = 
	Handler.make("redisplay-" + name,
		     function() { 
			 box.value = model.getVar(name).show();
		     });

	model.getVar(name).addHandler("change", redisplayHandler);
    };

    var init = function() {
	wireHandler();
	wireDisplay();
    };


    var getValue = function() {
	return box.value;
    };

    
	
    a.init  = init;


    // only for debugging
    a.getValue = getValue; 
    return a;
};


    
