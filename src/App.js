import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Paper, AppBar} from 'material-ui';
import './App.css';
import LocationListContainer from './containers/LocationListContainer';
import ForecastExtendedContainer from './containers/ForecastExtendedContainer';

const cities = [
  'Buenos Aires,ar',
  'Guerrero,mx',
  'Bogota, col',
  'Ciudad de México,mx',
  'Madrid,es',
];

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Grid className="App">
          <Row>
            <Col xs={12}>
              <AppBar title="WeatherApp" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <LocationListContainer 
                cities={cities} />
            </Col>
            <Col xs={12} md={6}>
              <Paper zDepth={4} >
                <div className='detail'>
                  <ForecastExtendedContainer />
                </div>
              </Paper>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}
export default App;
