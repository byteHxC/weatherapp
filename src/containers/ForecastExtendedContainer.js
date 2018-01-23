import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getForecastDataFromCities, getCity } from './../reducers';
import ForecastExtended from './../components/ForecastExtended';

export class ForecastExtendedContainer extends Component {
  
  render() {
    const { city, forecastData } = this.props;
    return (
        city && 
        <ForecastExtended city={city} forecastData={forecastData} />
    )
  }
}

ForecastExtendedContainer.propTypes = {
    city: PropTypes.string,
    forecastData: PropTypes.array
}

// const mapStateToProps = state => ({ city: state.city });
const mapStateToProps = state => ({ city: getCity(state), forecastData: getForecastDataFromCities(state)});
export default connect(mapStateToProps, null)(ForecastExtendedContainer);
