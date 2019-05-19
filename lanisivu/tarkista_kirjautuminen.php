 <?php
session_start();//aloitetaan istuntoid
//kirjastot käyttöön
require "./tietokanta/tkfunktiot.php";
require "./kirjastot/funktiot.php";

//lomakkeen käsittelijä
if(!empty($_POST["nimi"]) && !empty($_POST["salasana"]))
{
	//tiedot muuttujiin
	$nimi = $_POST["nimi"];
	$salasana = $_POST["salasana"];
	//siivotaan ja muutetaat tiedot oikeaan muotoon
	$nimi = putsaa($nimi);
	$salasana=muunna_salasana($salasana);

	require "./tietokanta/yhteys.php";//yhteys kantaan
	//haetaan id tietokannasta
	$id = hae_id_kannasta($yhteys,$nimi,$salasana);
	
	if(!empty($id))//jos id löytyi
	{
		$_SESSION["admin_id"] = $id;
		$_SESSION["istuntoid"] = session_id();
		$_SESSION["salasana"]=$salasana;
		header("Pragma: No-Cache");
		header("Location: admin.php");//ohjaus ylläpitoon
		die();
	}
	//jos id:tä ei ole, uudelleenohjaus lomakkeeseen, kysymysmerkkijonoon tieto vääristä kirjautumistiedoista
	else header("Location: index.php?sivu=kirjaudu&vaarin=true");
}
//lomakkeesta puuttuu tietoja, uudelleenohjaus ja kysymysmerkkijonoon tieto puuttuvista kirjautumistiedoista
else header("Location: index.php?sivu=kirjaudu&puuttuu=true");