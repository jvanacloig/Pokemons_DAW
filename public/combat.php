<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="tipos.css">
    <link rel="stylesheet" href="general.css">
    <!-- <script src="functions.js"></script> -->
</head>

<body style="background-image: url('Ă­ndice.jpg'); background-size: cover">
    <?php
		$servername="127.0.0.1";
		$database = "pokemonapitest";
		$username="root";
		$password="";
		// crear conexion
		$conn = mysqli_connect($servername, $username, $password, $database);
		// Check connection
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		//echo "Connected successfully";

		//consulta
		$consulta = "SELECT * FROM combat";
		$resultado = mysqli_query( $conn, $consulta );
		
		$i = 1;
		$arrayResultat = [];
		while ($row = $resultado->fetch_array()){
			if($i == $_GET["combat"]){
				$consultaPokemonGuanyador = 'SELECT PokemonId FROM usuari WHERE Id = ' . $row['Guanyador'];
				$resultat2 = mysqli_query( $conn, $consultaPokemonGuanyador);
				$row2 = $resultat2->fetch_array();
				$nomPokemon = 'SELECT Nom FROM pokemon WHERE id = ' . $row2[0];
				$resultat3 = mysqli_query( $conn, $nomPokemon);
				$row3 = $resultat3->fetch_array();
				$j = 0;
				$ArrayAccions = explode("#", $row['accions']);
				$nom = [];
				while ($j < count($ArrayAccions)){
					$nom = explode("@", $ArrayAccions[$j]);
					echo "En " . $nom[0] . " executa l'atac";
					echo "<br />";
					$j++;
				}
				echo "<h2> Guanyador ". $nom[0] ." amb el pokemon " . $row3[0] . "<h2>";
			}
			$i++;
		}
		



		//cerrarconexion
		mysqli_close( $conn );
	?>

</body>

</html>