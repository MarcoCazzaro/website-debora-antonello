<?php
  try
  {
	$lingua_corrente = "it";
	if(isset($_COOKIE['lingua_sito']))
	{
		$lingua_corrente = $_COOKIE['lingua_sito'];
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
		<meta name=\"description\" content=\"Debora Antonello, artista contemporanea, realizza dipinti, incisioni, gioielli e complementi d'arredo\"/>
		<meta name=\"keywords\" content=\"debora antonello,debora,antonello,arte,arte contemporanea,contemporanea,pittura,dipinti,pittori,pittrici,incisione,incisioni,incisori,gioielli,arredo,complementi arredo\"/>
		<meta name=\"author\" content=\"Marco Cazzaro\"/>
		<title>DEBORA ANTONELLO - news</title>
	</head>
	<body>
		<section>
	";
	
	$sezioni = $db->query('SELECT * FROM news ORDER BY ordine DESC ');
    foreach($sezioni as $row)
    {
		$stilesfondo = "background:#fff url(".$db->cartellaRoot()."ge/images/news/".$row['immagine'].") no-repeat center center; background-size:cover;";
		$indirizzo = "";
		if (trim($row['indirizzo']) !== "")
		{
			$indirizzo = "<div class=\"CLSeventoindirizzo\">".$row['indirizzo']."</div>";
		}
		$link = "";
		if (trim($row['link']) !== "")
		{
			$link = "<div class=\"CLSeventolink\"><a target=\"_blank\" href=\"".$row['link']."\">".$row['titolo_link']."</a></div>";
		}
		$banner = "";
		if (trim($row['banner']) !== "")
		{
			$banner = "<div class=\"CLSeventobanner\"><img src=\"".$db->cartellaRoot()."ge/images/news/".$row['banner']."\"></img></div>";
		}
		$evento = "";
		$etichetta_dal = "dal";
		$etichetta_al = "al";
		$formattazione_data = "d/m/Y";
		if ($lingua_corrente == "it")
		{
			$evento = $row['descrizione'] ;
		}
		else
		{
			$etichetta_dal = "from";
			$etichetta_al = "to";
			$formattazione_data = "m/d/Y";
			if ($row['descrizione_en'] == NULL)
			{
				$evento = $row['descrizione'] ;
			}
			else
			{
				$evento = $row['descrizione_en'] ;
			}
		}
		$stringa_dal_al = "";
		if ($row['data_inizio'] != NULL || $row['data_fine'] != NULL)
		{
			$stringa_dal_al = "<div class=\"CLSeventodalal\"><b>".$etichetta_dal."</b> " . date_format(date_create($row['data_inizio']), $formattazione_data) . " <b>".$etichetta_al."</b> " . date_format(date_create($row['data_fine']), $formattazione_data)."</div>";
		}		
		print 	"<article class=\"CLSnewsarticolo\" id=\"".$row['id_news']."\">
					<div class=\"CLScontenitorearticolo\">
						<div class=\"CLScontenitoreimmaginenews\"><div class=\"CLSimmaginenews CLSimmaginenewsnascosta\" style=\"".$stilesfondo."\"></div></div>
						<div class=\"CLSnewscorpo\">
							<h1>".$row['titolo']."</h1>
							<h2>".$row['sottotitolo']."</h2>
							<br>					
							<div class=\"CLSdescrizioneevento\">
								".$evento."								
							</div>
						</div>
						<div class=\"CLSdettaglievento\">
							".$stringa_dal_al."
							".$indirizzo."
							".$link."
							".$banner."
						</div>
					</div>
				</article>
			";
    }
    print "<br /></section></body></html>";

    $db->disconnetti();
    $db = NULL;
  }
  catch(Exception $e)
  {
    print 'Exception : '.$e->getMessage();
  }
?>
