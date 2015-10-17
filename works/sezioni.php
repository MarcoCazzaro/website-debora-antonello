<?php
  try
  {
	if (isset($_GET['modo'])) {
		$modo = $_GET['modo'];
	}
	else
	{
		$modo = "";
	}
  
	include realpath('../').'/ge/db/clsConnessione.php';
	$db = new ConnessioneDB();
	if (!$db->connetti())
	{
		die("Errore connessione DB");
	}
	    
    print " <html>
	<head>
		<meta charset=\"Unicode UTF-8\"/>
		<meta name=\"keywords\" CONTENT=\"debora antonello, debora, antonello, deboraantonello\">
		<title>DEBORA ANTONELLO - sezioni</title>
	</head>
	<body>
		<ul>
	";
	
	$sezioni = $db->query('SELECT * FROM sezioni ');
    foreach($sezioni as $row)
    {
		if ($modo == "menu")
		{
			print "<li class=\"CLSworkssezione CLSworkssezionemenu\"><a class=\"CLSworkslinksezione CLSworkslinksezionemenu\" id=\"".$row['nome_sezione']."\" href=\"javascript:void(0);\">".$row['descrizione_sezione']."</a></li>\r\n";
		}
		else
		{
			print "<li class=\"CLSworkssezione CLSdisplaynone\"><div class=\"CLSworkssezionequadrato\"></div><a class=\"CLSworkslinksezione\" id=\"".$row['nome_sezione']."\" href=\"javascript:void(0);\">".$row['descrizione_sezione']."</a></li>\r\n";
		}
    }
    print "</ul></body></html>";

    $db->disconnetti();
    $db = NULL;
  }
  catch(Exception $e)
  {
    print 'Exception : '.$e->getMessage();
  }
?>