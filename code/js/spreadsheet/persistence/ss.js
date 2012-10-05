/*
 * Spreadsheet implementation. 
 *
 */
 
var SpreadSheet = {};

// invariants:

// noRows === rowHeaders.length
// (for var i=0, i< noRows) 
//  { noCols === rowHeaders[i].cells.length}


SpreadSheet.make = function(name, noRows, noCols) {

    var ss = {};
    var noRows = noRows;
    var noCols = noCols;

   
	function createColumns(ss,nCols) {
		return Array.create(nCols, 
			  function(j) { 
				var c = Cell.make(ss);
				return c;
			});
	}

    
    var rowHeaders = 
    Array.create(noRows,
                 function(i) {
        	 	    var rh = RowHeader.make(i);
		     		rh.cells = createColumns(ss,noCols);
		    		return rh;
                 });

   
    var colHeaders = 
    Array.create(noCols,
                 function(j) {
                     var ch = ColHeader.make(j, ss);
                     return ch;
                 });


    var getName = function() {return this.name;}

    var setName = function(nam) { 

		this.name = nam;
		this.setHeading(false);
	}

    var getNoRows = function() {
        return rowHeaders.length;
    };

    var getNoCols = function() {
		if (rowHeaders.length == 0)//if there are no rows then there can be no cols
			return 0;
        return rowHeaders[0].cells.length;
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

    // interface
	ss.name = name;
    ss.getName = getName;
    ss.setName = setName;
	//ss.setHeading = setHeading;
	//ss.setHeading(false);

    ss.getNoRows = getNoRows;
    ss.getNoCols = getNoCols;
    ss.getCell = getCell;
    ss.indexOf = indexOf;
    ss.indexOfRowHeader = indexOfRowHeader;
    return ss;
};

    
    
    
    
