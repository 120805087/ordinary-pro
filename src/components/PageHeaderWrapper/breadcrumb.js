import React from 'react';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import { urlToList } from '../_utils/pathTools';

/**
 *  自定义函数来链接与 react-router 配置使用，  antd  breadcrumb 组件
 */
const  itemRender  = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    // 给 home 加 link
    if (route.path === '/') {
        return <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }
    return last || !route.component ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    )
}

export const getBreadcrumb = (breadcrumbNameMap, url) => {
    // 常规校验
    let breadcrumb = breadcrumbNameMap[url];
    // url 校验
    if (!breadcrumb) {
        Object.keys(breadcrumbNameMap).forEach(item => {
            if (pathToRegexp(item).test(url)) {
                breadcrumb = breadcrumbNameMap[item]
            }
        })
    }

    return breadcrumb || {};
}

const conversionFromLocation = (routerLocation, breadcrumbNameMap, props) => {
    const { home } = props;
    const pathSnippets = urlToList(routerLocation.pathname);

    const extraBreadcrumbItems = pathSnippets
        .map(url => {
            const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
            const name = currentBreadcrumb.name;
            return  name ? {
                path: url,
                breadcrumbName: name
            } : null;
        })
        .filter(item => item);

    if (home) {
        extraBreadcrumbItems.unshift({
            path: '/',
            breadcrumbName: home
        })
    };

    console.log(extraBreadcrumbItems)
    return extraBreadcrumbItems;
}

export const getBreadcrumbProps = props => {
    const { routes, params, location, breadcrumbNameMap } = props;
    return {
        routes,
        params,
        routerLocation: location,
        breadcrumbNameMap
    }
}

/**
 * 生成面包屑
 */
export const conversionBreadcrumbList = props => {
    const { breadcrumbList } = props;
    const { routes, params, routerLocation, breadcrumbNameMap } = getBreadcrumbProps(props);
    console.log(props)

    // 如果传入写入的面包屑
    if (breadcrumbList && breadcrumbList.length) {

    }

    // 如果传入 routes 和 params 属性
    if (routes && params) {

    }

    // 正规根据 location 生成面包屑
    if (routerLocation && routerLocation.pathname) {
        return {
            routes: conversionFromLocation(routerLocation, breadcrumbNameMap, props),
            itemRender
        }
    }

    return {};

}
