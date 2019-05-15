import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../_utils/pathTools';

/**
 * 获取可点击菜单的所有的key
 * @param {Object} menuData 菜单
 */
export const getFlatMenuKeys = menuData => {
    let keys = []
    menuData.forEach(item => {
        keys.push(item.path)
        if(item.children) {
           keys = keys.concat(getFlatMenuKeys(item.children))
        }
    })
    return keys
}

/**
 * 生成 selectedKey
 * @param {Array} flatMenuKeys 所有可点击的keys
 * @param {String} path 当前路径
 */
export const getMenuMatches = (flatMenuKeys, path) => {
    return flatMenuKeys.filter(item => {
        if(item) {
            return pathToRegexp(item).test(path);
        }
        return false;
    })
}

export const getDefaultCollapsedSubMenus = props => {
    const {
        location: { pathname },
        flatMenuKeys
    } = props;
    return urlToList(pathname)
        .map(item => getMenuMatches(flatMenuKeys, item)[0])
        .filter(item => item)
        .reduce((prev, curr) => [...prev, curr], ['/']);
}
