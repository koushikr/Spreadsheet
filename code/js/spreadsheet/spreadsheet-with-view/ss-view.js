var SSView = {};

SSView.make = function(ss) {

    var a = {};

    var noRows = ss.getNoRows();
    var noCols = ss.getNoCols();

    var table = DOM.tableWithGenerator(
		noRows, 
                noCols,
                function(i) {return RowHeaderView.make(i);},
                function(j) {return ColHeaderView.make(j);},
                function(i,j) {return CellView.make(0, ss.getCell(i,j)).getEditor();});

    document.body.appendChild(table);
    a.table = table;
    // for debugging
    a.ss = ss;
    return a;
};