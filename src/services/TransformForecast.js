import moment from 'moment';
import 'moment/locale/es';
import TransformWeather from './TransformWeather';

const TransformForecast = data => (
    data.list.filter(item => (
        moment.unix(item.dt).hour() === 6 ||
        moment.unix(item.dt).hour() === 12 ||
        moment.unix(item.dt).hour() === 18
    )).map(item => (
        {
            weekDay: moment.unix(item.dt).format('ddd'),
            hour: moment.unix(item.dt).hour(),
            data: TransformWeather(item)
        }
    ))
)

export default TransformForecast;