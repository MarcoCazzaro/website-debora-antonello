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
		<meta name=\"keywords\" CONTENT=\"debora antonello, debora, antonello, deboraantonello\">
		<title>DEBORA ANTONELLO - bio</title>
	</head>
	<body>
		<section class=\"CLSbio\">
			<article class=\"CLSbioarticle\" id=\"a1\">
				<div class=\"CLSbiosezione\">
					<div class=\"CLScorpobiosezione\">
	";
	
	$tabella = $db->query('SELECT * FROM bioelenco WHERE tipo = \'bio\' AND lingua = \''.$lingua_corrente.'\' ORDER BY ordine DESC');
    foreach($tabella as $row)
    {
		print $row["evento"]."\r\n";
    }
    $temp = "";
	if ($lingua_corrente == "it")
	{
		$temp = "Premi e riconoscimenti";
	}
	else
	{
		$temp = "Awards";
	}
	print "<div class=\"CLSpremibiosezione\">
			<h3>".$temp."</h3>";
	$tabella = $db->query('SELECT * FROM bioelenco WHERE tipo = \'premi\' AND lingua = \''.$lingua_corrente.'\' ORDER BY ordine DESC');
    foreach($tabella as $row)
    {
		print "<h4>".$row['anno']."</h4><div class=\"CLSesposizione\">".$row['evento']."</div><br />";
    }
	
	if ($lingua_corrente == "it")
	{
		$temp = "Esposizioni personali";
	}
	else
	{
		$temp = "Individual exhibitions";
	}
	print "</div></div>
				<div class=\"CLSesposizionibiosezione\">
						<h3>".$temp."</h3>";
	
	$tabella = $db->query('SELECT * FROM bioelenco WHERE tipo = \'personali\' AND lingua = \''.$lingua_corrente.'\' ORDER BY ordine DESC');
    foreach($tabella as $row)
    {
		print "<h4>".$row['anno']."</h4><div class=\"CLSesposizione\">".$row['evento']."</div><br />";
    }
	
	if ($lingua_corrente == "it")
	{
		$temp = "Esposizioni collettive";
	}
	else
	{
		$temp = "Collective exhibitions";
	}
	print "<br /><br /><br /><h3>".$temp."</h3>";
	
	$tabella = $db->query('SELECT * FROM bioelenco WHERE tipo = \'collettive\' AND lingua = \''.$lingua_corrente.'\' ORDER BY ordine DESC');
    foreach($tabella as $row)
    {
		print "<h4>".$row['anno']."</h4><div class=\"CLSesposizione\">".$row['evento']."</div><br />";
    }
	
    print "</div>
						</div>
					</article>
					<article class=\"CLSbioarticle\" id=\"b1\">
						<div class=\"CLSbiosezioneimmagini\">
							<div class=\"CLSsfondobiomezzo CLSsfondobiomezzo1\"></div>
						</div>
					</article>
					<article class=\"CLSbioarticle\" id=\"b2\">
						<div class=\"CLSbiosezioneimmagini\">
							<div class=\"CLSsfondobiomezzo CLSsfondobiomezzo2\">Chiesa di Sant'Anna - Piove di Sacco (PD)</div>
						</div>
					</article>
					<article class=\"CLSbioarticle\" id=\"b3\">
						<div class=\"CLSbiosezioneimmagini\">
							<div class=\"CLSsfondobiomezzo CLSsfondobiomezzo3\">Con l'artista Lee Babel</div>
						</div>
					</article>
					<article class=\"CLSbioarticle\" id=\"b4\">
						<div class=\"CLSbiosezioneimmagini\">
							<div class=\"CLSsfondobiomezzo CLSsfondobiomezzo4\">Saoh Gallery - Tokyo</div>
						</div>
					</article>
					<article class=\"CLSbioarticle\" id=\"b5\">
						<div class=\"CLSbiosezioneimmagini\">
							<div class=\"CLSsfondobiomezzo CLSsfondobiomezzo5\"></div>
						</div>
					</article>
				</section>
			</body>
		</html>";
	$db->disconnetti();
    $db = NULL;
  }
  catch(Exception $e)
  {
    print 'Exception : '.$e->getMessage();
  }
?>