import React from 'react';

//CSS
import './css/weatherinfo.css';

const WeatherInfo = props => {
	const weather = props.data.weather.map((weather, index) => {
		const src = 'http://openweathermap.org/img/w/' + weather.icon + '.png';

		return(
			<tr key={ index } className="weather-info">
				<td>{ weather.main }</td>
				<td><img src={ src } alt=""/></td>
			</tr>
		)
	});

	return (
		<div className="weather-info">
			<h4>City: { props.data.city }, { props.data.country.name }({ props.data.country.code })</h4>

			<table id="table">
				<tbody>
					<tr>
						<td>Coordinates:</td>
						<td>{ props.data.coords.lon }°, { props.data.coords.lat }°</td>
					</tr>
					<tr>
						<td>Temperature:</td>
						<td>{ Math.floor(props.data.main.temp - 273) }°C</td>
					</tr>
					<tr>
						<td>Humidity:</td>
						<td>{ props.data.main.humidity }%</td>
					</tr>
					<tr>
						<td>Pressure:</td>
						<td>{ props.data.main.pressure }MB</td>
					</tr>
					<tr>
						<td>Wind:</td>
						<td>{ props.data.wind.speed }m/s</td>
					</tr>
					<tr>
						<td id="weather" colspan="2">
							Weather:
							<table>
								<tbody>
									{ weather }
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>		
		</div>
	);
};

export default WeatherInfo;

