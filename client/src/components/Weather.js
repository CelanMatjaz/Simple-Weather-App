import React, { Component } from 'react';

//Components
import WeatherInfo from './WeatherInfo';

class Weather extends Component {
	state = {
		city: '',
		data: {},
		error: null,
		gotData: false
	}

	handleChange = e => {
		this.setState({
			city: e.target.value
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		if(this.state.city !== ''){
			fetch('http://localhost:2000/api/city?city=' + this.state.city)
			.then(res => res.json())
			.then(data => {
				if(!data.error){
					this.setState({						
						data,
						gotData: true
					});
				}
				else{
					this.setState({
						error: data.error
					})
				}
			})
			.catch(error => {
				console.log(error);
				this.setState({
					error: 'Error with connecting to server'
				})
			})
		}
	}

	render() {
		return (
			<div>
				<form onSubmit={ this.handleSubmit }>
					<input value={ this.state.value } onChange={ this.handleChange } placeholder="Search for a city"/>
					<button>Search</button>
				</form>
				{ this.state.gotData ? <WeatherInfo data={ this.state.data } /> : '' }
			</div>
		);
	}
}

export default Weather;