function loadData(URL)
{
// Create the XML request
    

xmlReq = null;
    if(window.XMLHttpRequest) xmlReq = new XMLHttpRequest();
    else if(window.ActiveXObject) xmlReq = new ActiveXObject("Microsoft.XMLHTTP");
    if(xmlReq==null) return ;//Failed to create the request;

// Anonymous function to handle changed request states
    xmlReq.onreadystatechange = function()
    {
        switch(xmlReq.readyState)
        {
        case 0: // Uninitialized
            break;
        case 1: // Loading
            break;
        case 2: // Loaded
            break;
        case 3: // Interactive
            break;
        case 4: // Done!
        // Retrieve the data between the <quote> tags
       load(this.responseText);
            break;
        default:
            break;
        }
    }

// Make the request
    xmlReq.open ('GET', URL, true);
    xmlReq.send (null);
return xmlReq;
}
 
function loadData_save(URL)
{
// Create the XML request
    

xmlReq = null;
    if(window.XMLHttpRequest) xmlReq = new XMLHttpRequest();
    else if(window.ActiveXObject) xmlReq = new ActiveXObject("Microsoft.XMLHTTP");
    if(xmlReq==null) return ;//Failed to create the request;

// Anonymous function to handle changed request states
    xmlReq.onreadystatechange = function()
    {
        switch(xmlReq.readyState)
        {
        case 0: // Uninitialized
            break;
        case 1: // Loading
            break;
        case 2: // Loaded
            break;
        case 3: // Interactive
            break;
        case 4: // Done!
        // Retrieve the data between the <quote> tags

            break;
        default:
            break;
        }
    }

// Make the request
    xmlReq.open ('GET', URL, true);
    xmlReq.send (null);
return xmlReq;
}

function readFile()
{
var filename = prompt("please enter filename","book1");
var request=loadData("fileopen.sjs?filename="+filename);
}

var load =function(data)
{
var ssArray = JSON.parse(data);

var ss = SpreadSheet.make("my-spreadsheet", ssArray.length,ssArray[0].length);
for(var i=0;i<ssArray.length;i++)
for(var j=0;j<ssArray[0].length;j++)
{
 var new_formula = InputController.parseSSExpr(ssArray[i][j], ss);
            if(new_formula)
            {
                //ss.getCell(i,j).updateParents(new_formula.parents());
                InputController.setAndUpdate(ss.getCell(i,j), new_formula);
                //ss.getCell(i,j).setFormula(new_formula);
                //ss.getCell(i,j).updateChildren();
            }
}    


if(tbl !=null)
document.body.removeChild(tbl.table);

tbl = SSView.make(ss);

};


function saveFile(ss)
{
var filename = prompt("please enter filename","book1");
var i,j;
var ssArray = [];
var temp = [];
for(i=0;i<ss.getNoRows();i++)
{
temp = [];
for(j=0;j<ss.getNoCols();j++)
{
temp.push(ss.getCell(i,j).formula.getValue().show());
}
ssArray.push(temp);
}


var jsonString = JSON.stringify(ssArray);
jsonString = encodeURIComponent(jsonString);
var request=loadData_save("filesave.sjs?filename="+filename+"&filedata="+jsonString);

}


