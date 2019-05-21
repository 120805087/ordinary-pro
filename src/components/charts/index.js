import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field';
import MiniArea from './MiniArea';
import MiniBar from './MiniBar';
import MiniProgress from './MiniProgress';
import Bar from './Bar';
import Pie from './Pie';

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

export {
    yuan,
    Field,
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    Bar,
    Pie
}
