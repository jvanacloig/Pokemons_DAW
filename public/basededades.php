<?php
$servername="172.24.1.173";
$database = "pokemons_daw";
$username="root";
$password="";
//crear conexion
$conn = mysqli_connect($servername, $username, $database);
//Check connection
if(!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
mysqli_close($conn);
//añadir jugador  
$consulta = "SELECT * FROM sala";
$resultado = mysqli_query( $conn, $consulta );
$sql = "INSERT INTO jugador (idJugador, Nombre, Id_Pokemons_api) VALUES ('2', 'Proba2', '23')";
//$result = $conn->query($sql);
//ver jugadores
$consulta = "SELECT * FROM sala";
$resultado = mysqli_query( $conn, $consulta );
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $resultado->fetch_assoc()) {
        echo "<br> id: ". $row["idJugador"]. " - Name: ". $row["Nombre"]. " " . $row["Id_Pokemon_api"] . "<br>";
    }
} else {
    echo "0 results";
}
//cerrarconexion
mysqli_close( $conexion );
?>