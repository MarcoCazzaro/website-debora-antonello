<?php
	include realpath('../').'/db/connessione.php';
	try
	{
		if (isset($_GET['priorita'])) {
			$priorita = $_GET['priorita'];
		}
		else
		{
			$priorita = "";
		}
		if (isset($_GET['idimmagine'])) {
			$idimmagine = substr($_GET['idimmagine'], 5);
		}
		else
		{
			$idimmagine = "";
		}
	  
		$db = new ConnessioneDB();
		if ($db->connetti())
		{			
			print " <html>
			<head>
				<meta charset=\"Unicode UTF-8\"/>
				<meta name=\"keywords\" CONTENT=\"debora antonello, debora, antonello, deboraantonello\">
				<title>DEBORA ANTONELLO</title>
			</head>
			<body>
				<div style=\"display:none;\">
			";
			$SQL = "";
			if ($idimmagine == "")
			{
				$SQL = 'SELECT cartella, nome_file FROM preloader WHERE priorita = '.$priorita.' ORDER BY ordine;';
			}
			else
			{
				$SQL = 'SELECT sezioni.id_sezione, sezioni.descrizione_sezione, articoli.nome_immagine FROM articoli INNER JOIN sezioni ON articoli.id_sezione = sezioni.id_sezione WHERE articoli.id_articolo = '.$idimmagine.';';
			}
			$result = $db->query($SQL);
			foreach($result as $row)
			{
		    	if ($idimmagine == "")
				{
					$percorsofile = $db->cartellaRoot()."ge/images/".rawurlencode ($row['cartella']).'/'.rawurlencode ($row['nome_file'])  ;
				}
				else
				{
					$percorsofile = $db->cartellaRoot()."ge/images/works/mid/".rawurlencode ($row['id_sezione'].' - '.$row['descrizione_sezione']).'/'.rawurlencode ($row['nome_immagine'])  ;
				}			        	
				print "<img src=\"".$percorsofile."\"></img>";
			    
			}
			print "</div></body></html>";
	
			$db->disconnetti();
		}
		$db = NULL;
	}
	catch(Exception $e)
	{
		print 'Exception : '.$e->getMessage();
	}
?>