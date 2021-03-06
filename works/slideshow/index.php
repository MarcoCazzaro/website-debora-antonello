﻿<?php
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
	if (isset($_GET['immagine'])) {
		$immagine = substr($_GET['immagine'], 5);
	}
	else
	{
		$immagine = "niente";
	}
	$idimmagineprec = "";
	$idimmaginesucc = "";
	
	include realpath('../../').'/ge/db/clsConnessione.php';
	$db = new ConnessioneDB();
	if (!$db->connetti())
	{
		die("Errore connessione DB");
	}
    print " <html>
	<head>
		<meta charset=\"Unicode UTF-8\"/>
		<meta name=\"description\" content=\"Slideshow opera di Debora Antonello, artista contemporanea, premi sulla lente per visualizzare l'ingrandimento\"/>
		<meta name=\"keywords\" CONTENT=\"debora antonello, debora, antonello, deboraantonello\">
		<title>Debora Antonello - works</title>
		<link rel=\"favicon\" href=\"favicon.ico\" type=\"image/x-icon\">
		<link rel=\"shortcut icon\" href=\"favicon.ico\" type=\"image/x-icon\">
		<style>
			@font-face {
			  font-family: 'fontcorpo';
			  src: url('../../ge/font/OpenSans-Light.eot'); /* IE9 Compat Modes */
			  src: local(\"OpenSans-Light\"),
					url('../../ge/font/OpenSans-Light.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			      url('../../ge/font/OpenSans-Light.woff') format('woff'), /* Pretty Modern Browsers */
			      url('../../ge/font/OpenSans-Light.ttf')  format('truetype'), /* Safari, Android, iOS */
			      url('../../ge/font/OpenSans-Light.svg#OpenSans-Light') format('svg'); /* Legacy iOS */
			}
			@font-face {
			  font-family: 'fonttitoli';
			  src: url('../../ge/font/Intro.eot'); /* IE9 Compat Modes */
			  src: local(\"Intro\"),
					url('../../ge/font/Intro.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			      url('../../ge/font/Intro.woff') format('woff'), /* Pretty Modern Browsers */
			      url('../../ge/font/Intro.ttf')  format('truetype'), /* Safari, Android, iOS */
			      url('../../ge/font/Intro.svg#Intro') format('svg'); /* Legacy iOS */
			}
		</style>
		<script src=\"../../ge/js/jquery-2.1.3.min.js\"></script>
		<script src=\"../../ge/js/jquery-ui.min.js\"></script>
		<script type=\"text/javascript\" src=\"../../ge/js/gestione.js\"></script>
		<link rel=\"stylesheet\" href=\"../../ge/css/struttura.css\" type=\"text/css\"/>
		<link rel=\"stylesheet\" href=\"../../ge/css/colore.css\" type=\"text/css\"/>
		<meta name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0\">
	</head>
	<body>
		<header>
			<div id=\"IDfasciatestata\" class=\"CLStestata CLStestataslideshow\">
				<div class=\"CLSsfondotestata\"></div>
				<a id=\"IDhome\" href=\"javascript:void();\"><div class=\"CLSluna\"></div><div class=\"CLSscrittatestata\">DEBORA ANTONELLO</div></a>
				<div class=\"CLScontenitorepulsantimenu CLScontenitorepulsantimenuslideshow\">				
					<nav>
						<ul class=\"CLSmenu\" id=\"IDgestionemenu\">
							<li class=\"CLSpulsantemenu\"><a class=\"CLSlinkpulsantemenu CLSmenumouseleave\" id=\"IDpulsanteGallery\" href=\"javascript:void(0);\">gallery</a></li>
							<li class=\"CLSpulsantemenu CLSmenuattivo\"><a class=\"CLSlinkpulsantemenu CLSmenumouseleave\" id=\"IDpulsanteWorks\" href=\"javascript:void(0);\">works</a></li>
							<li class=\"CLSpulsantemenu\"><a class=\"CLSlinkpulsantemenu CLSmenumouseleave\" id=\"IDpulsanteBio\" href=\"javascript:void(0);\">bio</a></li>
							<li class=\"CLSpulsantemenu\"><a class=\"CLSlinkpulsantemenu CLSmenumouseleave\" id=\"IDpulsanteContact\" href=\"javascript:void(0);\">contact</a></li>
						</ul>
					</nav>
				</div>
			</div>
			<div class=\"CLSdescrizionepagina\">Slideshow opera di Debora Antonello, artista contemporanea</div>
			<div class=\"CLSdescrizionepagina\">premi sulla lente per visualizzare l'ingrandimento</div>
		</header>
		<div class=\"CLSdisplaynone\" id=\"IDfittizio\">
			<div id=\"IDslideshow\"></div>
		</div>
		<div class=\"CLSpulsantelente\"><a href=\"javascript:void(0)\"></a></div>
	";    
	$sezioni = $db->query('SELECT * FROM sezioni WHERE nome_sezione=\''.$nome_sezione.'\'');
    foreach($sezioni as $row)
    {
		$id_sezione = $row['id_sezione'] ;
		$articoli = $db->query('SELECT * FROM articoli WHERE id_sezione='.$id_sezione.' AND solo_testo <> 1 ORDER BY ordine ASC');
		$idimmagineprec = "";
		$idimmaginesucc = "";
		$trovata = 0;
		foreach($articoli as $rowarticolo)
		{
			if ($immagine == "niente")
			{
				$immagine = $rowarticolo['id_articolo'];
			}
			if ($rowarticolo['id_articolo'] == $immagine)
			{
				$testo = "";
				if ($rowarticolo['anno'] !== "")
				{
					$testo = $testo . " | " . $rowarticolo['anno'] . " ";
				}
				if ($lingua_corrente == "en")
				{
					$testo = $testo . " | " . $rowarticolo['descrizione_en'] . " " ;
				}
				else
				{
					$testo = $testo . " | " . $rowarticolo['descrizione'] . " " ;
				}
				if (($rowarticolo['dimensioni'] !== "") && ($rowarticolo['dimensioni'] !== NULL))
				{
					$testo = $testo . " | cm " . $rowarticolo['dimensioni'] . " ";
				}
				
				$trovata = 1;
				$percorsofile = $db->cartellaRoot()."ge/images/works/mid/".rawurlencode ($row['id_sezione']." - ".$row['descrizione_sezione']) . "/" . rawurlencode($rowarticolo['nome_immagine']) ;
				print "
					<div class=\"CLSslideshowdettagliarticolo CLSdisplaynone\">
						<div class=\"CLSslideshowtitolosezione\">".$row['descrizione_sezione']."</div>
						<div class=\"CLSslideshowtitoloarticolo\">".$rowarticolo['etichetta']."</div>
						<div class=\"CLSslideshowdescrizionearticolo\">".$testo."</div>
					</div>
					<div class=\"CLSslideshowimmagine\">
						<div class=\"CLSslideshowcaricamento CLSdisplaynone\">Caricamento in corso...</div>
						<div class=\"CLSslideshowcontenitoreimmaginecaricata\"><img class=\"CLSslideshowimmaginecaricata CLSdisplaynone\" src=\"".$percorsofile."\" alt=\"".$rowarticolo['etichetta']." ".$testo."\"></img></div>
					</div>
				" ;
			}
			else
			{
				if ($trovata == 0)
				{
					$idimmagineprec = "IDart".$rowarticolo['id_articolo'];
				}
				else
				{
					if ($idimmaginesucc == "")
					{
						$idimmaginesucc = "IDart".$rowarticolo['id_articolo'];
					}
				}
			}
		}
    }
	if ($idimmagineprec !== "")
	{
		print "<div class=\"CLSslideshowfreccia CLSslideshowfrecciasx\"><a id=\"IDimmagineprecedente\" href=\"javascript:void(0)\" sezione=\"".$nome_sezione."\" destinazione=\"".$idimmagineprec."\"><</a></div>";
	}
    if ($idimmaginesucc !== "")
	{
		print "<div class=\"CLSslideshowfreccia CLSslideshowfrecciadx\"><a id=\"IDimmaginesuccessiva\" href=\"javascript:void(0)\" sezione=\"".$nome_sezione."\" destinazione=\"".$idimmaginesucc."\">></a></div>";
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
