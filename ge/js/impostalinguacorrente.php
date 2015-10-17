<?php
  try
  {
	$cookie_lingua = "lingua_sito";
	if (isset($_GET['lingua'])) {
		$lingua_corrente = $_GET['lingua'];
	}
	else
	{
		if(isset($_COOKIE[$cookie_lingua])) 
		{
			print "<div id=\"IDlingua\">" . $_COOKIE[$cookie_lingua] . "</div>";
			die();
		}
		else
		{
			$lingua_corrente = "it";
		}
	}
	setcookie($cookie_lingua, $lingua_corrente, time() + (86400 * 3650), "/");
	print "<div id=\"IDlingua\">" . $lingua_corrente . "</div>";
  }
  catch(Exception $e)
  {
    print 'Exception : '.$e->getMessage();
  }
?>