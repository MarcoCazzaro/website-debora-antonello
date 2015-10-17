<?php
	
	try
	{
		include realpath('../').'/db/connessione.php';
		if (isset($_GET['priorita'])) {
			$priorita = $_GET['priorita'];
		}
		else
		{
			$priorita = "";
		}
	  
		//$dbFile = realpath('../').'/db/dati.db' ;
		
		//open the database
		$db = new ConnessioneDB();
		if (!$db->connetti())
		{
			echo "niente connessione";
			die();
		}
		else	
		{
			echo "OK<br />";
		}
		
		$sql = "SELECT * FROM articoli";
		$result = $db->query($sql);
		
		foreach($result as $row)
    	{
			echo "id: " . $row["id_articolo"]. " - id sezione: " . $row["id_sezione"]. "<br>";
		}

		$db->disconnetti();
		$db = NULL;
	}
	catch(Exception $e)
	{
		print 'Exception : '.$e->getMessage();
	}
?>
