import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'C:/Users/qs006/study/ordinary-pro/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__userLayout" */'../../layouts/userLayout'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user/login",
        "name": "登录页",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__login" */'../login'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register",
        "name": "注册页",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__register" */'../register'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "name": "注册成功页",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__register__registerResult" */'../register/registerResult'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('C:/Users/qs006/study/ordinary-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__basicLayout" */'../../layouts/basicLayout'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard",
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "首页",
        "icon": "dashboard",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__dashboard__models__chart.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__dashboard" */'../dashboard'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/form",
        "name": "表单页",
        "icon": "form",
        "routes": [
          {
            "path": "/form/basic-form",
            "name": "基础表单",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__forms__models__form.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__forms__basicForm" */'../forms/basicForm'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/form/step-form",
            "name": "分布表单",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__forms__models__form.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__forms__stepForm" */'../forms/stepForm'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/form/step-form",
                "redirect": "/form/step-form/info",
                "exact": true
              },
              {
                "path": "/form/step-form/info",
                "name": "分步表单（填写转账信息）",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__forms__models__form.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__forms__stepForm" */'../forms/stepForm/step1'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/form/step-form/confirm",
                "name": "分步表单（确认转账信息）",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__forms__models__form.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__forms__stepForm" */'../forms/stepForm/step2'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/form/step-form/result",
                "name": "分步表单（完成）",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__forms__models__form.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__forms__stepForm" */'../forms/stepForm/step3'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('C:/Users/qs006/study/ordinary-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('C:/Users/qs006/study/ordinary-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/list",
        "name": "列表页",
        "icon": "table",
        "routes": [
          {
            "path": "/list/table-list",
            "name": "查询表格",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__list__models__list.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p__list__models__rule.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__list__tableList" */'../list/tableList'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/list/basic-list",
            "name": "标准列表",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__list__models__list.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p__list__models__rule.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__list__basicList" */'../list/basicList'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/list/card-list",
            "name": "卡片列表",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__list__models__list.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p__list__models__rule.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__list__cardList" */'../list/cardList'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/list/search",
            "name": "搜索列表",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__list__models__list.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p__list__models__rule.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__list__searchList" */'../list/searchList'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
            "routes": [
              {
                "path": "/list/search",
                "redirect": "/list/search/articles",
                "exact": true
              },
              {
                "path": "/list/search/articles",
                "name": "搜索列表（文章）",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__list__models__list.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p__list__models__rule.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__list__searchList" */'../list/searchList/articles'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/list/search/projects",
                "name": "搜索列表（项目）",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__list__models__list.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p__list__models__rule.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__list__searchList" */'../list/searchList/projects'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/list/search/applications",
                "name": "搜索列表（应用）",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__list__models__list.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p__list__models__rule.js' */'C:/Users/qs006/study/ordinary-pro/src/pages/list/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__list__searchList" */'../list/searchList/applications'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('C:/Users/qs006/study/ordinary-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('C:/Users/qs006/study/ordinary-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404'),
  LoadingComponent: require('C:/Users/qs006/study/ordinary-pro/src/components/pageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('C:/Users/qs006/study/ordinary-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('C:/Users/qs006/study/ordinary-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
