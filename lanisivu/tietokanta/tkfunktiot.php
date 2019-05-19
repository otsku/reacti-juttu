<?php
/*
Apukirjasto vieraskirjan tietokantaliittymään
tunnusta_ei_kannassa($yhteys,$ktunnus)
function kayttajan_nimi($admin_id,$yhteys)
*/

/*
Tarkistaa onko käyttäjän kitjoittama ktunnus jo olemassa, jos ei ole palauttaa true
Syötteet $yhteys eli kahva kantaa varten
$ktunnus eli käyttäjän ehdottama ktunnus
*/
function tunnusta_ei_kannassa($yhteys,$nimi)
{
	$kysely = $yhteys->prepare("SELECT * FROM lani_admin WHERE nimi=?");
	$kysely->execute(array($nimi)); $rivimaara = $kysely->rowCount(); //laskee vastauksesta rivien määrän
	
	if($rivimaara == 0) return true;
	else return false;
}

/*
Funktio palauttaa käyttäjän id:n
Syötteet tietokantayhteys, käyttäjätunnus $ktunnus ja salasana $salasana
*/

function hae_id_kannasta($yhteys,$nimi,$salasana)
{

$id=NULL;
$lause = $yhteys->prepare("SELECT * FROM lani_admin WHERE nimi=:nimi AND salasana =:salasana");
$lause->bindParam(':nimi', $tunnari);
$lause->bindParam(':salasana', $passu);

$tunnari = $nimi;
$passu = $salasana;

$lause->execute();

$rivi = $lause->fetchAll(PDO::FETCH_ASSOC);
if(!empty($rivi)) $id = $rivi[0]["admin_id"];
return $id;

}

/*
Syötteet käytääjän id $admin_id ja tietokantayhteys $yhteys
Funktio palauttaa käyttäjän nimen id:n mukaan haettuna tietokannasta
*/

function kayttajan_nimi($admin_id,$yhteys)
{
	$sql="SELECT nimi FROM lani_admin WHERE admin_id=?";

	$teksti="";//palautettava merkkijono

	$kysely=$yhteys->prepare($sql);
	$kysely->execute(array($admin_id));

	$rivi=$kysely->fetchAll(PDO::FETCH_ASSOC);
	if(empty($rivi)) $teksti= "Käyttäjää ei löydy.";
else
{
	$nimi=$rivi[0]["nimi"];
	$teksti.= $nimi;//jos käyttäjä löytyy, sijoittaa muuttajan $teksti nimen kokonaan
}
return $teksti;

}
?>