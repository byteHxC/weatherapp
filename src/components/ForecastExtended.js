import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';
import ForecastItem from './ForecastItem';

import './styles.css';

const renderForecastItemDays = (forecastData) => { 
    return forecastData.map( forecast => (
            <ForecastItem
                key={`${forecast.weekDay}${forecast.hour}`}
                weekDay={forecast.weekDay} 
                hour={forecast.hour} data={forecast.data}/>))
}
const renderProgress = () => {
    return (<CircularProgress size={60} thickness={7}/>)
}

const ForecastExtended = ({ city, forecastData }) =>  
        (
            <div>
                <h4 className='forecast-title'>Pronostico extendido para {city}</h4>
                { forecastData ? 
                    renderForecastItemDays(forecastData) : 
                    renderProgress()}
            </div>
        )


ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
    forecastData: PropTypes.array
}
export default ForecastExtended;