import { parse } from 'qs';
import moment from 'moment';
import nzh from 'nzh/cn';

export function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}

//截取字符首字母， 转换大写
export const getFirstChart = (char) => {
    return char ? char.charAt(0).toUpperCase() : ''
}

// 获取链接参数
export const getPageQuery = () => {
    return parse(window.location.href.split('?')[1])
}

/**
 * 获取当前时间
 * eq: today 一天
 * eq: week 一周
 * eq: month 一月
 * eq: year 一年
 * @param {String} type 当前时间
 */
export const getTimeDistance = type => {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === 'today') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
        let day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        if (day === 0) {
            day = 6;
        } else {
            day -= 1;
        }

        const beginTime = now.getTime() - day * oneDay;

        return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }

    if (type === 'month') {
        const year = now.getFullYear();
        const month = now.getMonth();
        const nextDate  = moment(now).add(1, 'months');
        const nextYear = nextDate.year();
        const nextMonth = nextDate.month();

        return [
            moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
            moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
        ];
    }

    const year = now.getFullYear();
    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

/**
 * 将数字转换为大写金额
 */
export function digitUppercase(n) {
    return nzh.toMoney(n);
}
