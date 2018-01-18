import React, { Component } from 'react';
import { CircularProgress }from 'material-ui';
import PropTypes from 'prop-types';
import Location from './Location';
import WeatherData from './WeatherData';
import transformWeather from '../../services/TransformWeather';
import './styles.css';

const KEY = 'd24d39755797057718a76c80d8a72ffd';
const URL = 'http://api.openweathermap.org/data/2.5/weather';



class WeatherLocation extends Component {
    constructor({ city }){
        super();
        this.state = {
            city: city,
            data: null
        };
    }
    handleUpdateClick = () => {
        const { city } = this.state;
        const api_weather = `${URL}?q=${city}&appid=${KEY}`;
        fetch(api_weather)
            .then( data => {
                return data.json();
            })
            .then( weather_data => {
                const data = transformWeather(weather_data);
                this.setState({ data });
            })
    }
    componentWillMount() {
        this.handleUpdateClick();
    }
    render(){
        const { onWeatherLocationClick } = this.props;
        const { city, data } = this.state;
        return (
            <div className='weatherLocationCont' onClick={onWeatherLocationClick}>
                <Location city={city}/>
                { data ? <WeatherData data={data}/> 
                : <CircularProgress size={60} thickness={7}/> }
            </div>
        )
    }
}
WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func
}
export default WeatherLocation;