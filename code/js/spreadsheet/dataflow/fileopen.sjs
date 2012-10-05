<?sjs
var filename   =  pow_server.REQUEST['filename']; 
filename =  unescape(filename.replace(/\+/g," "));
var contents = pow_file(filename);
document.write(contents);
?>

