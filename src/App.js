import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			pics: [],
			error: null,
			Details: false,
			id: null,
			currentPage: 1,
          	picsPerPage: 100
		}
		this.handleClick = this.handleClick.bind(this);
		this.handlePage = this.handlePage.bind(this);
	}
	
	componentDidMount() {
		if(this.state.id === null) {
			this.fetchPics();
		}	
	}

	handlePage(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

	fetchPics() {
		// Where we're fetching data from
		fetch(`https://jsonplaceholder.typicode.com/photos`)
			// We get the API response and receive data in JSON format...
			.then(response => response.json())
			// ...then we update the users state
			.then(data =>
				this.setState({
				pics: data,
				isLoading: false,
				})
			)
			// Catch any errors we hit and update the app
			.catch(error => this.setState({ error, isLoading: false }));
	}

	handleClick(pic) {
		this.setState({id: pic});
		this.setState({Details: true});
	}

	render() {
		//const { isLoading, pics, error } = this.state;
		const divStyle = {
			display: 'flex',
			flexWrap: 'wrap',
			margin: '0',
		};
		const cell = {
			display: 'flex',
			flexWrap: 'wrap',
			padding: '4px 4px 4px 4px',
		};
		const pageStyle2 = {
			flexWrap: 'wrap',
			listStyle: 'none',
			display: 'flex',
			paddingRight: '4px',
			color: 'blue',
			userSelect: 'none',
			cursor: 'pointer',
			fontFamily: 'Roboto , Arial, sans-serif',
			fontSize: '1.2em',
		};
		const { pics, currentPage, picsPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastPic = currentPage * picsPerPage;
        const indexOfFirstPic = indexOfLastPic - picsPerPage;
        const currentPics = pics.slice(indexOfFirstPic, indexOfLastPic);

		if(this.state.Details === true) {
			return(<Details pic={this.state.id} />);
		}

		const renderPics = currentPics.map(user => {
			const { id, thumbnailUrl } = user;
			return (
				<div style={cell} key={id}>
					<img value={id} onClick={(e) => this.handleClick(id, e)} src={thumbnailUrl}/>
				</div>
			);
		});
  
		  // Logic for displaying page numbers
		const pageNumbers = [];
		  	for (let i = 1; i <= Math.ceil(pics.length / picsPerPage); i++) {
				pageNumbers.push(i);
		}

		const renderPageNumbers = pageNumbers.map(number => {
			return (
				<li key={number} id={number} onClick={this.handlePage} style={pageStyle2}>{number}</li>
			);
		});

		return (
			<div>
				<h3>Pictures</h3>
				<ul id="page-numbers" style={pageStyle2}>
					{renderPageNumbers}
			  	</ul>
				<p>Current Page: {this.state.currentPage}</p>
			  	<div style={divStyle}>
					{renderPics}
			  	</div>
			  	<ul id="page-numbers" style={pageStyle2}>
					{renderPageNumbers}
			  	</ul>
				<p>Current Page: {this.state.currentPage}</p>
			</div>
		  );
	}
}

class Details extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Loading: true,
			pic: [],
			errors: null,
			Details: true
		}
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.fetchPics();
	}

	fetchPics() {
		// Where we're fetching data from
		const url = 'https://jsonplaceholder.typicode.com/photos?id=' + this.props.pic;
		console.log(url);
		fetch(url)
			// We get the API response and receive data in JSON format...
			.then(response => response.json())
			// ...then we update the users state
			.then(data =>
				this.setState({
				pic: data,
				Loading: false,
				})
			)
			// Catch any errors we hit and update the app
			.catch(errors => this.setState({ errors, Loading: false }));
	}

	handleClick() {
		this.setState({Details: false});
	}

	render() {
		const { Loading, pic, errors } = this.state;
		const back = {
			top: '0px',
		};
		if(this.state.Details === false) {
			return(<App/>);
		}
		return (
		 	<React.Fragment>
				<h1>Pictures</h1>
				<div>
				{errors ? <p>{errors.message}</p> : null}
				{!Loading ? (
					pic.map(user => {
						const { id, url, title } = user;
						return (
							<div key={id}>
								<button style={back} onClick={this.handleClick} >Back</button>
								<p>{title}</p>
								<img value={id} src={url}/>
							</div>
						);
					})
				// If there is a delay in data, let's let the user know it's loading
				) : (
					<h3>Loading...</h3>
				)}
				</div>
		  	</React.Fragment>
		);
	}
}

export default App;