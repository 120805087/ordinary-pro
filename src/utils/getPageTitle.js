import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import pathToRegexp from 'path-to-regexp';
import { title } from '../defaultSetting';


export const mathParamsPath = (pathname, breadcrumbNameMap) => {
    const pathkey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathkey]
}

const getPageTitle = (pathname, breadcrumbNameMap) => {
    const currRouterData = mathParamsPath(pathname, breadcrumbNameMap);
    if(!currRouterData) {
        return title
    }

    return `${currRouterData.name}-${title}`;
}

export default memoizeOne(getPageTitle, isEqual);
