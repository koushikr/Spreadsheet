var main  = function(initInput, initFormula) {
    
    var c = Cell.make(initInput, initFormula);

    var inputWidget = Widget.make("input", c);
    var formulaWidget = Widget.make("formula", c);
    var resultWidget = Widget.make("result", c);
    