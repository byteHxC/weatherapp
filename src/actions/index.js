import TransformForecast from '../services/TransformForecast';
import transformWeather from '../services/TransformWeather';
export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA';
export const SET_WEATHER_CITY = 'SET_WEATHER_CITY';
export const GET_WEATHER_CITY = 'GET_WEATHER_CITY';

const KEY = 'd24d39755797057718a76c80d8a72ffd';
const URL_FORECAST = 'http://api.openweathermap.org/data/2.5/forecast';
const URL_WEATHER = 'http://api.openweathermap.org/data/2.5/weather';


const setCity = payload => ({ type: SET_CITY, payload});
const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload});
const getWeatherCity = payload => ({ type: GET_WEATHER_CITY, payload});
const setWeatherCity = payload => ({ type: SET_WEATHER_CITY, payload});

export const setSelectedCity = payload => {

    return (dispatch, getState) => {
        const url_forecast = `${URL_FORECAST}?q=${payload}&appid=${KEY}`;
        // activar en el estado un indicador de busqueda de datos
        dispatch(setCity(payload));
        const state = getState();
        const date = state.cities[payload] && state.cities[payload].forecastDataDate;
        const now = new Date();
        if(date && (now - date) < 1*60*1000 ){
            return;
        }
        return fetch(url_forecast)
            .then(data => (data.json()))
            .then(weather_data => {
                const forecastData = TransformForecast(weather_data);
                // modificar el estado con el resultado de la promise (fetch)
                dispatch(setForecastData({ city: payload, forecastData }));
            });

    };
};

export const setWeather = payload => {

    return dispatch => {
        payload.forEach(city => {
            dispatch(getWeatherCity(city));
            const api_weather = `${URL_WEATHER}?q=${city}&appid=${KEY}`;
            fetch(api_weather)
                .then( data => {
                    return data.json();
                })
                .then( weather_data => {
                    const weather = transformWeather(weather_data);
                    dispatch(setWeatherCity({ city, weather }));
                })
        })
    }
};