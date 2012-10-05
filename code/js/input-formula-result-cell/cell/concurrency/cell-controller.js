var CellController = {};

CellController.make =  function(initInput, initFormula) {
    var a = {};

    var cell = Cell.make(initInput, initFormula);

    var sv = instantiate(cell.getStateVector());
    var busy = StateVar.make("busy", false);
    sv.busy = busy; 
    
    var getCell = function() {
	return cell;
    };

    var getVar = function(name) {
	return sv[name];
    };

    var getInput = function() {
        if (sv.busy.getValue()) {
            alert("cell is busy.  Try later.");
        }
        else {
            return cell.getInput();
        }
    };
            

    // cell interface
    a.getVar       = getVar;
    //    a.getInput     = cell.getInput;
    a.getInput     = getInput;
    a.getResult    = cell.getResult;
    a.showFormula  = cell.showFormula;
    a.setInput     = cell.setInput;
    a.setFormula   = cell.setFormula;

    // debugging interface
    a.cell         = cell;
    a.busy         = sv.busy;

    return a;

};
