<?php
/* Ohjelma tulostaa yhden kirjoittajan jutut tietokannasta */

$kid="";
if(isset($_GET["kid"])) $kid=$_GET["kid"];
$nyt=time();
$sql="SELECT * FROM juttu WHERE kid=? AND poistamispvm > '".date('Y-m-j',$nyt)."' ORDER BY lisayspvm desc";

require "./tietokanta/yhteys.php";
$kysely=$yhteys->prepare($sql);
$kysely->execute(array($kid));

$rivit = $kysely->rowCount();
$vastaus = $kysely->fetchAll(PDO::FETCH_ASSOC);
if($rivit<=5) $raja=$rivit;//jos rivejä on vähemmän kuin 5, tulostetaan todellinen määrä
else $raja=5;
for($i=0;$i<$raja;$i++)
{
	$jid=$vastaus[$i]["jid"];
	$lisayspvm=$vastaus[$i]["lisayspvm"];
	$otsikko=$vastaus[$i]["otsikko"];
	$kpl=$vastaus[$i]["kpl"];
	$kid=$vastaus[$i]["kid"];
	$kirjoittaja=kayttajan_nimi($kid,$yhteys);
	echo "<h1>".$otsikko."</h1>\n";
	echo "<h2>".$lisayspvm." </h2>\n";
	echo "<p>".$kpl." <p2>\n";
}
?>