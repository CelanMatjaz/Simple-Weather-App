const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').load();

const app = express();
app.use(express.json());
app.use(cors());
 
const PORT = process.env.PORT || 2000;
const API_KEY = process.env.API_KEY;

app.listen(PORT, () => {
    console.log(`Server started\nListening on port ${PORT}`);
});

app.get('/api/city', (req, res) => {
    console.log(req.query)
    const city = `q=${req.query.city || req.body.city}`;
    const url = 'http://api.openweathermap.org/data/2.5/weather?' + city + API_KEY;
    console.log(url)

    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.cod !== '404'){
            const url2 = 'https://restcountries.eu/rest/v2/alpha/' + data.sys.country;
            
            fetch(url2).then(res => res.json())
            .then(countryData => {
                const dataWeather = {
                    coords: data.coord,
                    weather: data.weather,
                    main: data.main,
                    wind: data.wind,
                    clouds: data.clouds.all,
                    rain: data.rain,
                    snow: data.snow,
                    time: data.dt,
                    country: {
                        code: data.sys.country,
                        sunrise: data.sys.sunrise,
                        sunset: data.sys.sunset,
                        name: countryData.name
                    },
                    city: data.name
                }
    
                res.json(dataWeather);
            });            
        }
        else{
            res.json({ error: data.message });
        }
    })
    .catch(error => {
        console.log(error);
        res.json({ error: 'Error with request' });
    }); 

});

