/*
 * Spreadsheet implementation. 
 *
 */

var SpreadSheet = {};

// invariants:

// noRows === rowHeaders.length
// (for var i=0, i< noRows) { noCols === rowHeaders[i].cells.length}

SpreadSheet.make = function(noRows, noCols) {
    var ss = {};
    var noRows = noRows;
    var noCols = noCols;

    var rowHeaders = 
    Array.create(noRows,
                 function(i) {
        	     var rh = RowHeader.make(i);
		     rh.cells = Array.create(noCols, 
				  function(j) { 
						var c = Cell.make(ss);
						return c;
					    });
		     return rh;
                 });

    var colHeaders = 
    Array.create(noCols,
                 function(j) {
                     var ch = ColHeader.make(j, ss);
                     return ch;
                 });




    var getNoRows = function() {
        return noRows;
    };

    var getNoCols = function() {
        return noCols;
    };

    var getCell = function(r,c) {
        return rowHeaders[r].cells[c];
    };

// return the index of c in this spreadsheet, null otherwise
    var indexOf = function(cell) {
        for (var i  = 0; i < rowHeaders.length; i++) {
            var ans = rowHeaders[i].cells.indexOf(cell);
            if (ans !== -1) {
                return [i, ans];
            };
        };
        return null;
    };

// return the index of row header, null otherwise
    var indexOfRowHeader = function(rh) {
        var ans =  rowHeaders.indexOf(rh);
        if (ans !== -1)
            return ans;
        return null;
    };


// return the index of col header, null otherwise
    var indexOfColHeader = function(ch) {
    var ans =  colHeaders.indexOf(ch);
    if (ans !== -1)
	return ans;
    return null;
    };


    // interface
    ss.getNoRows = getNoRows;
    ss.getNoCols = getNoCols;
    ss.getCell = getCell;
    ss.indexOf = indexOf;
    ss.indexOfRowHeader = indexOfRowHeader;
    ss.indexOfColHeader = indexOfColHeader;

    return ss;
};















    
    
    
    
    