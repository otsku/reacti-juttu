<?php
/* Ohjelma tulostaa yhden jutun kannasta */

$jid="";
if(isset($_GET["jid"])) $jid=$_GET['jid'];

$sql="SELECT * FROM juttu WHERE jid=?";

require "./tietokanta/yhteys.php";
$kysely=$yhteys->prepare($sql);
$kysely->execute(array($jid));

$rivi = $kysely->fetchAll(PDO::FETCH_ASSOC);

if(empty($rivi)) echo "Juttua ei löydy ";

else
{
	$lisayspvm=$rivi[0]["lisayspvm"];
	$otsikko=$rivi[0]["otsikko"];
	$kpl=$rivi[0]["kpl"];

	echo "<h1>".$otsikko."</h1>";
	echo "<p>".$lisayspvm."</p>";
	echo "<p>".$kpl."</p>";
}
?>
