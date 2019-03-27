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
			id: null
		}
		this.handleClick = this.handleClick.bind(this);
	}
	
	componentDidMount() {
		this.fetchPics();
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

	handleClick(id) {
		this.setState({id: id});
		this.setState({Details: true});
	}

	render() {
		const { isLoading, pics, error } = this.state;
		const divStyle = {
			display: 'flex',
			flexWrap: 'wrap',
		};
		const cell = {
			display: 'flex',
			flexWrap: 'wrap',
			padding: '4px 1px 4px 1px',
  			margin: 'auto',
		};
		if(this.state.Details == true) {
			return(<Details pic={this.state.id} />);
		}
		return (
		 	<React.Fragment>
				<h1>Pictures</h1>
				<div style={divStyle}>
				{error ? <p>{error.message}</p> : null}
				{!isLoading ? (
					pics.map(user => {
						const { id, thumbnailUrl } = user;
						return (
							<div style={cell} key={id}>
								<img value={id} onClick={(e) => this.handleClick(id, e)} src={thumbnailUrl}/>
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

class Details extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() {
		const url = 'https://jsonplaceholder.typicode.com/photos?id=' + this.props.pics;
		console.log(url);
		axios.get(url)
    	.then(response => this.setState(response.data))
	}

	render() {
		if(!this.props.title) {
			return <h3>Loading...</h3>
		  }
		  return (
			<article>
			  <h1>{this.props.title}</h1>
			</article>
		  );
	}
}

export default App;