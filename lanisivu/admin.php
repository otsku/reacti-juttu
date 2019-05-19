<?php
session_start(); //aloittaa session, huom, pelkkää html:ää ei saa tulostaa ennen tämän lähettämistä
/*
jos ei ole olemassa istunnossa muuttujaa kid tai istuntoid on eri kuin nykyinen istuntoid, tekee uudelleenohjauksen kirjautumissivulle
*/
if(!isset($_SESSION['admin_id']) || $_SESSION['istuntoid'] != session_id())
{
	header("Location: ./index.php?sivu=kirjaudu");
	die(); // tärkeä, sivua ei voi ladata uudestaan
}
else
{
	$_SESSION["istuntoid"] = session_regenerate_id();//vaihtaa istunnon tunnuksen, tietoturvaa

	$sivu="admin_etusivu";
	if(isset($_GET["sivu"])) $sivu=$_GET["sivu"];

	require "./kirjastot/funktiot.php";//ulkoasufunktiot käyttöön
	require "./tietokanta/yhteys.php";//tietokantayhteys käyttöön
	require "./tietokanta/tkfunktiot.php";//tietokantafuntiot käyttöön

	tulosta_admin_alku();

	tulosta_admin_sisalto($sivu);

	tulosta_admin_loppu();
}
?>