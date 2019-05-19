<?php
/*
tulostaa lomakkeen rekisteröitymiseen jos lomaketta ei  ole vielä lähetetty tai lomakkeen tiedoissa on virhe
Jos lomake on lähetetty, ottaa kenttien arvot muuttujiin, tarkistaa syötteet(tunnusta ei ole kannassa, putsaa, muuntaa salasana ja lisää tietueen tietokantaan)
*/

//lomakkeen käsittely
$ok=false; //apumuuttuja, jos false, syötteet eivät ole kunnossa
if(!empty($_POST['nimi']) && !empty($_POST['yhteystiedot']) && !empty($_POST['salasana1']) && !empty($_POST['salasana2']))
{
	$ok=TRUE; //syötteet on tulleet
	//syötteet muuttujiin
	$nimi=$_POST['nimi'];
	$yhteystiedot=$_POST['yhteystiedot'];
	require "./tietokanta/yhteys.php";
	
	//tarkistuksia, ovatko salasanat samat ja tunnusta ei ole kannassa
	if($_POST['salasana1'] != $_POST['salasana2'] || tunnusta_ei_kannassa($yhteys,$nimi)== FALSE) $ok=FALSE;
	else //eli jos kaikki kunnossa
	{
		$nimi=putsaa($nimi);
		$yhteystiedot=putsaa($yhteystiedot);

		$salasana=$_POST['salasana1'];
		$salasana = muunna_salasana($salasana);//suojataan salasana

		$sql="INSERT INTO lani_admin (nimi,salasana,yhteystiedot) VALUES (?,?,?)";
		$kysely = $yhteys->prepare($sql);
		$kysely->execute(array($nimi,$salasana,$yhteystiedot));
		if($kysely!=FALSE) echo "Käyttajä on lisätty!
		";
	}
}

/*
itse lomake alkaa
*/
if(!$_POST || $ok==FALSE) //jos ei lähetetty tai tiedot eivät kunnossa
{
	if(!empty($_POST)) //jos tiedot eivät ole ok, tulostaa ruudulle, mikä on vikana
	{
		if(empty($_POST['nimi'])) echo "Nimi puuttuu!";
		if(empty($_POST['yhteystiedot'])) echo "Yhteystiedot puuttuu!";
		if(empty($_POST['salasana1'])) echo "Toinen salasanoista puuttuu!";
		if(empty($_POST['salasana2'])) echo "Toinen salasanoista puuttuu!";
		if(!empty($_POST['salasana1']) && !empty($_POST['salasana2']))
		{
			if($_POST['salasana1'] != ($_POST['salasana2']) )echo "Salasanat eivät vastaa toisiaan!";
		}
		if(tunnusta_ei_kannassa($yhteys,$nimi)==FALSE) echo "Käyttäjätunnus on jo käytössä, kokeile toista tunnusta.";
	}
	?>
	<form method="post" action = "index.php?sivu=rekisteroidy">
	Nimi <input type="text" name="nimi" value="<?php if(isset($_POST['nimi'])) echo $_POST['nimi']?>"><br>

	Yhteystiedot <input type="text" name="yhteystiedot" value="<?php if(isset($_POST["yhteystiedot"])) echo $_POST['yhteystiedot']?>"><br>

	Salasana <input type="password" name="salasana1" value="<?php if(isset($_POST['salasana1'])) echo $_POST['salasana1']?>"><br>

	Salasana uudelleen <input type="password" name="salasana2" value="<?php if(isset($_POST['salasana2'])) echo $_POST['salasana2']?>"><br>

	<input type="submit" value="Rekisteröidy"><br>
	</form><br>
	<?php
}
?>