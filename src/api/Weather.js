import AppConfig from '../config/App'
import moment from 'moment'

export const weather = ({city, date}) =>
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${AppConfig.WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(response  => {
            if(response.list) {
                const dayForecasts = response.list.filter(weather => moment(date).isSame(weather.dt_txt, 'd'))
                const dayWeather = dayForecasts[0].weather[0]
                return {
                    weather: dayWeather.description, 
                    icon: `http://openweathermap.org/img/wn/${dayWeather.icon}@2x.png`
                }
            } else return {weather: "no weather info", icon: "00"}
        })
        .catch(error => ({ error }))