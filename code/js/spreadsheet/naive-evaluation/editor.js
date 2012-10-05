var View = {};

var Editor = {};

Editor.make = function(initVal) {

    var editor = DOM.dom("input",
                {type     : "text", 
		 readOnly : false,
		 style    : "background-color: white;",
		 value    : initVal}, []);

    return editor;
};


    
