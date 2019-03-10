import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {Kirjaudu: true};
		this.handleClick = this.handleClick.bind(this);
		this.handleTunnus = this.handleTunnus.bind(this);
		this.handlePassu = this.handlePassu.bind(this);
	}
	
	handleTunnus(event) {
		this.setState({Tunnus: event.target.value});
	}
  
	handlePassu(event) {
		this.setState({Passu: event.target.value});
	}
	
	handleClick() {
		if(this.state.Tunnus === "proto" && this.state.Passu === "proto") {
			this.setState({Kirjaudu: true});
		}
		else {
			alert("Väärät tiedot!");
		}
	}
	
	render() {
		if(this.state.Kirjaudu == true) {
			return(<Sivu />);
		}
		return(
		<div>
			<h1>Kirjautuminen</h1>
			
			Käyttäjätunnus <input type="text" onChange={this.handleTunnus}/><br />
			
			Salasana <input type="password" onChange={this.handlePassu}/><br />
			
			<button onClick={this.handleClick}>Kirjaudu</button>
		</div>
		);
	}
}

class Sivu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {Tuote: "1", Ostoskori: false};
		this.handleTuote = this.handleTuote.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleOstoskori = this.handleOstoskori.bind(this);
	}
	
	handleTuote(event) {
		this.setState({Tuote: event.target.value});
	}
	
	handleClick() {
		switch (this.state.Tuote) {
			case "1":
				window.Volvo = 1;
				break;
			case "2":
				window.Saab = 1;
				break;
			case "3":
				window.Mercedes = 1;
				break;
			case "4":
				window.Audi = 1;
				break;
		}
	}
	
	handleOstoskori() {
		this.setState({Ostoskori: true});
	}
	
	render() {
		switch (this.state.Tuote) {
			case "1":
				var Hinta = "1500€";
				var kuva="http://www.imcdb.org/i678528.jpg";
				break;
			case "2":
				var Hinta = "2000€";
				var kuva="https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/800x450/format/jpg/quality/85/http://www.blogcdn.com/www.autoblog.com/media/2012/05/saabwinstta.jpg";
				break;
			case "3":
				var Hinta = "1700€";
				var kuva="https://www.touringcartimes.com/img/2017/08/Mercedes_C-Class_Heritage_401.jpg?w=785&h=442&fit=crop&fm=pjpg&q=80";
				break;
			case "4":
				var Hinta = "2500€";
				var kuva="https://i.ytimg.com/vi/TdUko-KQICw/maxresdefault.jpg";
				break;
		}
		
		if(this.state.Ostoskori == true) {
			return(<Ostoskori />);
		}
		return (
		<div>
			<h1>Tervetuloa Autokauppaan</h1>
			<select name="tuote" onChange={this.handleTuote}>
				<option value="1">Volvo</option>
				<option value="2">Saab</option>
				<option value="3">Mercedes</option>
				<option value="4">Audi</option>
			</select>
			<p>Hinta = {Hinta}</p>
			<img src={kuva} /><br />
			<button onClick={this.handleClick}>Lisää</button>
			<button onClick={this.handleOstoskori}>Ostoskoriin</button>
		</div>
		);
	}
}

class Ostoskori extends React.Component {
	constructor(props) {
		super(props);
		this.state = {Ostoskori: false, Volvo: window.Volvo, Saab: window.Saab, Mercedes: window.Mercedes, Audi: window.Audi};
		this.handleTakaisin = this.handleTakaisin.bind(this);
		this.handleTilaus = this.handleTilaus.bind(this);
		this.mvolvo = this.mvolvo.bind(this);
		this.pvolvo = this.pvolvo.bind(this);
		this.tvolvo = this.tvolvo.bind(this);
		this.msaab = this.msaab.bind(this);
		this.psaab = this.psaab.bind(this);
		this.tsaab = this.tsaab.bind(this);
		this.mmercedes = this.mmercedes.bind(this);
		this.pmercedes = this.pmercedes.bind(this);
		this.tmercedes = this.tmercedes.bind(this);
		this.maudi = this.maudi.bind(this);
		this.paudi = this.paudi.bind(this);
		this.taudi = this.taudi.bind(this);
	}
	
	handleTakaisin() {
		this.setState({Takaisin: true});
	}
	
	handleTilaus() {
		this.setState({Tilaus: true});
	}
	
	mvolvo() {
		var asd = this.state.Volvo;
		asd = asd - 1;
		window.Volvo = asd;
		this.setState({Volvo: asd});
	}
	pvolvo() {
		var asd = this.state.Volvo;
		asd = asd + 1;
		window.Volvo = asd;
		this.setState({Volvo: asd});
	}
	tvolvo() {
		window.Volvo = 0;
		this.setState({Volvo: 0});
	}
	
	msaab() {
		var asd = this.state.Saab;
		asd = asd - 1;
		window.Saab = asd;
		this.setState({Saab: asd});
	}
	psaab() {
		var asd = this.state.Saab;
		asd = asd + 1;
		window.Saab = asd;
		this.setState({Saab: asd});
	}
	tsaab() {
		window.Saab = 0;
		this.setState({Saab: 0});
	}
	
	mmercedes() {
		var asd = this.state.Mercedes;
		asd = asd - 1;
		window.Mercedes = asd;
		this.setState({Mercedes: asd});
	}
	pmercedes() {
		var asd = this.state.Mercedes;
		asd = asd + 1;
		window.Mercedes = asd;
		this.setState({Mercedes: asd});
	}
	tmercedes() {
		window.Mercedes = 0;
		this.setState({Mercedes: 0});
	}
	
	maudi() {
		var asd = this.state.Audi;
		asd = asd - 1;
		window.Audi = asd;
		this.setState({Audi: asd});
	}
	paudi() {
		var asd = this.state.Audi;
		asd = asd + 1;
		window.Audi = asd;
		this.setState({Audi: asd});
	}
	taudi() {
		window.Audi = 0;
		this.setState({Audi: 0});
	}
	
	render() {
		var vhinta = this.state.Volvo * 1500;
		window.vhinta = vhinta;
		var shinta = this.state.Saab * 2000;
		window.shinta = shinta;
		var mhinta = this.state.Mercedes * 1700;
		window.mhinta = mhinta;
		var ahinta = this.state.Audi * 2500;
		window.ahinta = ahinta;
		var yhinta = 0;
		if(this.state.Takaisin == true) {
			return(<Sivu />);
		}
		
		if(this.state.Tilaus == true) {
			return(<Tilaus />);
		}
		
		if(this.state.Volvo >= 1) {
			var volvo = true;
			var yhinta = yhinta + vhinta;
			window.yhinta = yhinta;
		}
		else {
			volvo = false;
		}
		
		if(this.state.Saab >= 1) {
			var saab = true;
			var yhinta = yhinta + shinta;
			window.yhinta = yhinta;
		}
		else {
			saab = false;
		}
		
		if(this.state.Mercedes >= 1) {
			var mercedes = true;
			var yhinta = yhinta + mhinta;
			window.yhinta = yhinta;
		}
		else {
			mercedes = false;
		}
		
		if(this.state.Audi >= 1) {
			var audi = true;
			var yhinta = yhinta + ahinta;
			window.yhinta = yhinta;
		}
		else {
			audi = false;
		}
		
		if(this.state.Volvo >= 1) {
			var tilaus = true;
		}
		else if(this.state.Saab >= 1) {
			var tilaus = true;
		}
		else if(this.state.Mercedes >= 1) {
			var tilaus = true;
		}
		else if(this.state.Audi >= 1) {
			var tilaus = true;
		}
		else {
			var tilaus = false;
		}
		return(
			<div>
				<h1>Ostoskori</h1>	
			{
				volvo
					? <p>Volvo {this.state.Volvo} kpl {vhinta}€ <button onClick={this.mvolvo}>-</button><button onClick={this.pvolvo}>+</button><button onClick={this.tvolvo}>Tyhjennä</button></p>
					: null
			}
			{
				saab
					? <p>Saab {this.state.Saab} kpl {shinta}€ <button onClick={this.msaab}>-</button><button onClick={this.psaab}>+</button><button onClick={this.tsaab}>Tyhjennä</button></p>
					: null
			}
			{
				mercedes
					? <p>Mercedes {this.state.Mercedes} kpl {mhinta}€ <button onClick={this.mmercedes}>-</button><button onClick={this.pmercedes}>+</button><button onClick={this.tmercedes}>Tyhjennä</button></p>
					: null
			}
			{
				audi
					? <p>Audi {this.state.Audi} kpl {ahinta}€ <button onClick={this.maudi}>-</button><button onClick={this.paudi}>+</button><button onClick={this.taudi}>Tyhjennä</button></p>
					: null
			}
			<p>yhteensä: {yhinta}€</p>
			{
				tilaus
					? <button onClick={this.handleTilaus}>Vahvista tilaus</button>
					: null
			}
				<button onClick={this.handleTakaisin}>Takaisin</button>
			</div>
		);
	}
}

class Tilaus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {Ostoskori: false, Vahvista: false, Volvo: window.Volvo, Saab: window.Saab, Mercedes: window.Mercedes, Audi: window.Audi};
		this.handleNimi = this.handleNimi.bind(this);
		this.handleSosoite = this.handleSosoite.bind(this);
		this.handleLosoite = this.handleLosoite.bind(this);
		this.handlePosoite = this.handlePosoite.bind(this);
		this.handlePtoimipaikka = this.handlePtoimipaikka.bind(this);
		this.handleVahvista = this.handleVahvista.bind(this);
		this.handleOstoskori = this.handleOstoskori.bind(this);
	}
	
	handleNimi(event) {
		this.setState({Nimi: event.target.value});
	}
	
	handleSosoite(event) {
		this.setState({Sosoite: event.target.value});
	}
	
	handleLosoite(event) {
		this.setState({Losoite: event.target.value});
	}
	
	handlePosoite(event) {
		this.setState({Posoite: event.target.value});
	}
	
	handlePtoimipaikka(event) {
		this.setState({Ptoimipaikka: event.target.value});
	}
	
	handleVahvista() {
		this.setState({Vahvista: true});
	}
	
	handleOstoskori() {
		this.setState({Ostoskori: true});
	}
	
	render() {
		if(this.state.Volvo >= 1) {
			var volvo = true;
		}
		else {
			volvo = false;
		}
		
		if(this.state.Saab >= 1) {
			var saab = true;
		}
		else {
			saab = false;
		}
		
		if(this.state.Mercedes >= 1) {
			var mercedes = true;
		}
		else {
			mercedes = false;
		}
		
		if(this.state.Audi >= 1) {
			var audi = true;
		}
		else {
			audi = false;
		}
		
		if(this.state.Ostoskori == true) {
			return(<Ostoskori />);
		}
		
		if(this.state.Vahvista == true) {
			if(this.state.Nimi === "" || this.state.Nimi == null || this.state.Sosoite === "" || this.state.Sosoite == null || this.state.Nimi === "" || this.state.Nimi == null || this.state.Losoite === "" || this.state.Losoite == null || this.state.Posoite === "" || this.state.Posoite == null || this.state.Ptoimipaikka === "" || this.state.Ptoimipaikka == null) {
				alert("Syötä kaikki tiedot kenttiin!");
				this.setState({Vahvista: false});
			}
			else {
				window.Volvo = 0;
				window.Saab = 0;
				window.Mercedes = 0;
				window.Audi = 0;
				alert("Paketti Lähetetty!");
				return(<Sivu />);
			}
		}
		return (
		<div>
			<h1>Tilauksen vahvistus</h1>
			Nimi <input type="text" onChange={this.handleNimi}></input><br/>
			Sähköposti <input type="text" onChange={this.handleSosoite}></input><br/>
			Lähiosoite <input type="text" onChange={this.handleLosoite}></input><br/>
			Postiosoite <input type="text" onChange={this.handlePosoite}></input><br/>
			Postitoimipaikka <input type="text" onChange={this.handlePtoimipaikka}></input><br/>
			
			{
				volvo
					? <p>Volvo {this.state.Volvo} Kpl {window.vhinta}€</p>
					: null
			}
			{
				saab
					? <p>Saab {this.state.Saab} Kpl {window.shinta}€</p>
					: null
			}
			{
				mercedes
					? <p>Mercedes {this.state.Mercedes} Kpl {window.mhinta}€</p>
					: null
			}
			{
				audi
					? <p>Audi {this.state.Audi} Kpl {window.ahinta}€</p>
					: null
			}
			
			<p>Yhteensä: {window.yhinta}€</p>
			
			<button onClick={this.handleVahvista}>Vahvista tilaus</button>
			<button onClick={this.handleOstoskori}>Ostoskoriin</button>
		</div>
		);
	}
}

export default App;
