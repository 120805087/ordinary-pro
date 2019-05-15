import { parse } from 'qs';
//截取字符首字母， 转换大写
export const getFirstChart = (char) => {
    return char ? char.charAt(0).toUpperCase() : ''
}

// 获取链接参数
export const getPageQuery = () => {
    return parse(window.location.href.split('?')[1])
}
