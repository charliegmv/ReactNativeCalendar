import moment from 'moment'
import AppConfig from '../config/App'
import { nextMultipleOf3Hour } from '../utils/helpers'

export const weather = ({city, date, time}) =>
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${AppConfig.WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(response  => {
            if(response.list) {
                const dt = moment(`${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm")}`)
                const dt_utc = moment.utc(dt)
                const next_dt = nextMultipleOf3Hour(dt_utc).format("YYYY-MM-DD HH:mm:ss")

                const dayForecast = response.list.find(weather => weather.dt_txt == next_dt)
                if(!dayForecast) return {weather: "no forecast available", icon: "00"}

                const dayWeather = dayForecast.weather[0]
                return {
                    weather: dayWeather.description, 
                    icon: `http://openweathermap.org/img/wn/${dayWeather.icon}@2x.png`
                }
            } else return {weather: "no weather info", icon: "00"}
        })
        .catch(error => ({ error }))