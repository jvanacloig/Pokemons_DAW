<?php
$servername="127.0.0.1";
$database = "pokemons_daw";
$username="root";
$password="";
// crear conexion
$conn = mysqli_connect($servername, $username, $database);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
mysqli_close($conn);
//consulta
$consulta = "SELECT * FROM alumnos";
$resultado = mysqli_query( $conexion, $consulta );
$sql = "INSERT INTO Jugador (idJugador, Nombre, Id_Pokemons_api) VALUES ('1', 'Proba', '23')";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<br> id: ". $row["idJugador"]. " - Name: ". $row["Nombre"]. " " . $row["Id_Pokemon_api"] . "<br>";
    }
} else {
    echo "0 results";
}



//cerrarconexion
mysqli_close( $conexion );
?>