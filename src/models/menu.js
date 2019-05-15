import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';

/**
 * 初始化routes, 将格式改为可用格式, 去除不需要显示的菜单
 * @param {Object} data 菜单配置
 * @param {*} parentName
 */
function formatter(data) {
    if(!data) {
        return undefined;
    }
    return data
        .map(item => {
            if(!item.name || !item.path) {
                return null
            }

            const result = {
                ...item
            }

            if(item.routes) {
                const children = formatter(item.routes);
                result.children = children;
            }

            delete result.routes;
            return result;
        })
        .filter(item => item)
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);


function getSubMenu(item) {
    if(item.children && !item.hideChildrenInMenu && item.children.some(item => item.name)) {
        return {
            ...item,
            children: filterMenuData(item.children)
        }
    }
    return item;
}

/**
 * 筛选可显示菜单， doc: hideInMenu  hideChildrenInMenu
 * @param {Object} menuData 菜单
 */
function filterMenuData (menuData) {
    if(!menuData) {
        return [];
    }

    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => getSubMenu(item))
        .filter(item => item)
}

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单
 */
function getBreadcrumbNameMap(menuData) {
    if(!menuData) {
        return [];
    }

    const result = {}
    const flattenMenuData = data => {
        data.forEach(item => {
            if(item.children) {
                flattenMenuData(item.children)
            }
            result[item.path] = item
        })
    }

    flattenMenuData(menuData)

    return result;
}

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
    namespace: 'menu',

    state: {
        menuData: [],
        routerData: [],
        breadcrumbNameMap: []
    },

    effects: {
        *getMenuData({ payload }, { put }) {
            const { routes } = payload;
            const originMenuData = memoizeOneFormatter(routes);
            const menuData = filterMenuData(originMenuData);
            const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originMenuData);
            yield put({
                type: 'save',
                payload: {
                    menuData, breadcrumbNameMap
                }
            })
        }
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }
}
