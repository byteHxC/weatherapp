import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';
import TransformForecast from '../services/TransformForecast';
import ForecastItem from './ForecastItem';

import './styles.css'
/*
const days = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes'
]
const data = {
    temperature: 10,
    humidity: 10,
    weatherState: 'normal',
    wind: 'normal'
} */
const KEY = 'd24d39755797057718a76c80d8a72ffd';
const URL = 'http://api.openweathermap.org/data/2.5/forecast';

class ForecastExtended extends Component {
    constructor(){
        super();
        this.state = {
            forecastData: null
        }
    }
    componentDidMount() {
        const { city } = this.props;
        this.updateCity(city);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.city !== this.props.city){
            this.setState({ forecastData: null });
            this.updateCity(nextProps.city);
        }
    }
    updateCity = city => {
        const url_forecast = `${URL}?q=${city}&appid=${KEY}`;
        fetch(url_forecast)
            .then(data => (data.json()))
            .then(weather_data => {
                const forecastData = TransformForecast(weather_data);
                this.setState({ forecastData });
            })
    }
    renderForecastItemDays (forecastData){
        return forecastData.map( forecast => (
                <ForecastItem
                    key={`${forecast.weekDay}${forecast.hour}`}
                    weekDay={forecast.weekDay} 
                    hour={forecast.hour} data={forecast.data}/>))
    }
    renderProgress = () => {
        return (<CircularProgress size={60} thickness={7}/>)
    }
    render(){
        const { city } = this.props;
        const { forecastData } = this.state;
        return (
            <div>
                <h4 className='forecast-title'>Pronostico extendido para {city}</h4>
                { forecastData ? 
                    this.renderForecastItemDays(forecastData) : 
                    this.renderProgress()}
            </div>
        )
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired
}
export default ForecastExtended;