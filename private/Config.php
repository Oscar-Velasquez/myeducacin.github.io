<?php

$servername = "localhost";
$nameuser = "root";
$contrasenia = "";
$BDname = "myeducacin";

$connect = new mysqli($servername, $nameuser, $contrasenia, $BDname);
$connect->set_charset("utf8");
?>