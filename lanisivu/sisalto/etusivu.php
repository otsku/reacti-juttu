<?php
/* Ohjelma tulostaa viisi viimeistä juttua tietokannasta */

$nyt=time();//hakee tämän hetken ajankohdan timestampin
$sql="SELECT * FROM juttu WHERE poistamispvm > '".date('Y-m-j',$nyt)."' ORDER BY lisayspvm desc";
//date muuttaa timestampi mysql:n ymmärtämään muotoon
//desc alentavasti eli uusin ensin

require "./tietokanta/yhteys.php";
$kysely=$yhteys->query($sql);

$rivit = $kysely->rowCount();//laskettu tulosksen rivien (tietueiden) määrä
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
	echo "<h1><a href=\"./index.php?sivu=juttu&jid=$jid\">".$otsikko."</a></h1>\n";
	echo "<h2><a href=\"./index.php?sivu=kirjoittajan_jutut&kid=$kid\">".$kirjoittaja."</a> ".$lisayspvm." </h2>\n";
	//tekee linkit kirjoittajan_jutut.php:hen, parametri kirjoittajan id
	echo "<p>".substr($kpl,0,100);
	echo " .... <a href=\"./index.php?sivu=juttu&jid=$jid\">Lue lisää</a></p>\n";//tekee linkin juttu.php:hen, jutun id on parametri
}
?>