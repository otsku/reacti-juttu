<?php

/******************
Taulun rakenne
jid int(6) auto_increment (on siis autonumber tai laskuri-tyyppinen), pääavain
otsikko varchar(100)
kpl text
poistamispvm date NOT NULL
lisayspvm date
kid int(6)
**********************/

require "./tietokanta/yhteys.php";//otetaan yhteys kantaan

//lomakkeen käsittely
if (!empty($_POST["otsikko"]) && !empty($_POST["kpl"]))
{
	$lisayspvm = date('Y-m-j');//lisäyspäivä automaattisesti
	$otsikko = $_POST['otsikko'];
	$otsikko = putsaa($otsikko);
	$kpl = $_POST['kpl'];
	$kpl = putsaa($kpl);

	if(!empty($_POST['poistamispvm'])) $poistamispvm = $_POST['poistamispvm'];
	else//jos käyttäjä ei antanut poistamispäivää
	{
		$poistamispvm = strtotime($lisayspvm) + 1209600;//strototime muuntaa päiväyksen timestampiksi, siihen lisätään 14 päivää sekunteina
		$poistamispvm = date('Y-m-j', $poistamispvm);
		//date muuntaa timestampin mysql:n ymmärtämään muotoon
	}

	$kid=$_SESSION["kid"];//käyttäjäid on olemassa istuntomuuttujana

	$sql = "INSERT INTO juttu (otsikko,kpl,poistamispvm,lisayspvm,kid) VALUES (?,?,?,?,?)";//tietosuojattu versio

	$kysely=$yhteys->prepare($sql);
	$kysely->execute(array($otsikko,$kpl,$poistamispvm,$lisayspvm,$kid)); if($kysely!=FALSE) echo "Tiedot lisätty";
else echo "Lisäys ei onnistunut, yritä myöhemmin uudelleen";

}
else

/********************************************************************
Jos tietoja puuttuu tai tullaan ensimmäistä kertaa sovellukseen,
tulostetaan lomake (valmiit tiedot lomakkeeseen). Jos tietoja puuttuu
tulostetaan niistä ilmoitus
********************************************************************/
{
	echo "Täytä lomake kokonaan, pakolliset kentät on merkitty tähdellä.";
	if(isset($_POST["painike"]))
	{
		if (!isset($_POST['otsikko'])) echo "Kirjoita otsikko";
		if (!isset($_POST['kpl'])) echo "Kirjoita itse juttu";
	}
	?>

	<form action="./admin.php?sivu=lisaa_juttu" method="post">

	* Otsikko
	<input type="text" name="otsikko" value="<?php if(isset($_POST["otsikko"])) echo $_POST["otsikko"]?>">

	* Teksti<br />
	<textarea name="kpl" cols="45" rows="5"><?php if(isset($_POST["kpl"])) echo $_POST["kpl"]?></textarea><br />

	Poistamispvm (jos et aseta päiväystä, poistuu automaattisesti kahden viikon kuluttua)<br />
	<input type="text" id="pvm1" name="poistamispvm" <?php if(isset($_POST["poistamispvm"])) echo "value=\"".$_POST["poistamispvm"]."\""?>><br />
	<a href="javascript:NewCal('pvm1','mmddyyyy','','')"><br />
	<img class="kuvake" src="./tyyli/kuvat/cal.gif" width="16" height="16" border="0" alt="Klikkaa valitaksesi päivämäärä"></a><br />
	Huom. Kirjoitettaessa esitysmuoto vvvv-kk-pv <br />

	<input type="submit" value="Lisää juttu" name="painike"><br />
	</form>

	<?php
}
?>