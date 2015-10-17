<?php
  try
  {
	$lingua_corrente = "it";
	if(isset($_COOKIE['lingua_sito']))
	{
		$lingua_corrente = $_COOKIE['lingua_sito'];
	}
	
	if (isset($_GET['sezione'])) {
		$nome_sezione = $_GET['sezione'];
	}
	else
	{
		$nome_sezione = "niente";
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
	";    
	$sezioni = $db->query('SELECT * FROM sezioni WHERE nome_sezione=\''.$nome_sezione.'\'');
    foreach($sezioni as $row)
    {
		$id_sezione = $row['id_sezione'] ;
		print "<section class=\"CLSsezione\" id=\"".$row['nome_sezione']."\">\r\n";
		$articoli = $db->query('SELECT * FROM articoli WHERE id_sezione='.$id_sezione.' ORDER BY ordine ASC');
		foreach($articoli as $rowarticolo)
		{
			$solotestostilearticolo = "" ;
			$solotestostileimmagine = "" ;
			$solotestostilecorpo = "" ;
			$testo = "";
			if ($rowarticolo['anno'] !== "")
			{
				$testo = $testo . $rowarticolo['anno'] . "<br />";
			}
			if ($lingua_corrente == "en")
			{
				$testo = $testo . $rowarticolo['descrizione_en'] . "<br />" ;
			}
			else
			{
				$testo = $testo . $rowarticolo['descrizione'] . "<br />" ;
			}
			if (($rowarticolo['dimensioni'] !== "") && ($rowarticolo['dimensioni'] !== NULL))
			{
				$testo = $testo . "cm " . $rowarticolo['dimensioni'] . "<br />";
			}
			
			$solotestostiledescrizione = "" ;
			$solotestocontenitore = "";
			$percorsofile = rawurlencode($row['id_sezione']." - ".$row['descrizione_sezione']) . "/" . rawurlencode($rowarticolo['nome_immagine']) ;
			if ($rowarticolo['solo_testo']==1)
			{
				$solotestostilearticolo = "CLSarticolosezionesolotesto" ;
				$solotestocontenitore = "CLScontenitorearticolosezionesolotesto";
				$solotestostileimmagine = "CLSdisplaynone" ;
				$solotestostilecorpo = "CLSsezionecorposolotesto" ;
				$solotestostiledescrizione = "CLSsezionedescrizionesolotesto" ;
				$percorsofile = realpath("../ge/images/works/big")."/".$row['id_sezione']." - ".$row['descrizione_sezione'] . "/" . $rowarticolo['nome_immagine'] ;
				$testo = file_get_contents($percorsofile);
			}
			print "<article class=\"CLSarticolosezione CLSdisplaynone ".$solotestostilearticolo." \" id=\"IDart".$rowarticolo['id_articolo']."\" percorso=\"".$percorsofile."\" solo_testo=\"".$rowarticolo['solo_testo']."\">
				<div class=\"CLScontenitorearticolosezione ".$solotestocontenitore."\">
					<div class=\"CLScontenitoreimmaginesezione\"><a class=\"CLSlinkimmaginesezione ".$solotestostileimmagine." \" href=\"javascript:void(0);\"><div class=\"CLSimmaginesezione CLSimmaginesezionepiccola\"></div></a></div>
					<div class=\"CLSsezionecorpo ".$solotestostilecorpo."\">
						<h5>".$rowarticolo['etichetta']."</h5>
						<div class=\"CLSsezionedescrizione ".$solotestostiledescrizione." \">".$testo."</div>
					</div>
				</div>
			</article>" ;
		}
		print "</section>\r\n" ;
    }
    print "</body></html>";

    $db->disconnetti();
    $db = NULL;
  }
  catch(Exception $e)
  {
    print 'Exception : '.$e->getMessage();
  }
?>
