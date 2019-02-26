import React, { Component } from 'react';
import './App.css';

//Components
import Weather from './components/Weather';

class App extends Component {
	render() {
		return (
			<div className="App container">
				<h2>Weather app</h2>
				<Weather />
			</div>
		);
	}
}

export default App;
