<html>
<head>
<script type = "text/javascript">





var save = function()
{

<?sjs

var filename   =  pow_server.REQUEST['filename']; 
filename =  unescape(filename.replace(/\+/g," "));

var filedata   =  pow_server.REQUEST['filedata']; 

 
pow_file_put_contents(filename, filedata, "w" );

?>

}

</script>
</head>
<body onload = "save()"></body>
</html>
