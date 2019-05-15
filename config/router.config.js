export default [
    {
        path: '/user',
        component: '../layouts/userLayout',
        routes: [
            {
                path: '/user/login',
                name: '登录页',
                component: './login'
            },
            {
                path: '/user/register',
                name: '注册页',
                component: './register'
            },
            {
                path: '/user/register-result',
                name: '注册成功页',
                component: './register/registerResult'
            },
            {
                component: '404'
            }
        ]
    },
    {
        path: '/',
        component: '../layouts/basicLayout',
        routes: [
            {
                path: '/',
                redirect: '/dashboard'
            },
            {
                path: '/dashboard',
                name: '首页',
                icon: 'dashboard',
                component: './dashboard'
            },
            {
                path: '/form',
                name: '表单页',
                icon: 'form',
                routes: [
                    {
                        path: '/form/basic-form',
                        name: '基础表单',
                        component: './forms/basicForm'
                    },
                    {
                        path: '/form/step-form',
                        name: '分布表单',
                        component: './forms/stepForm',
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/form/step-form',
                                redirect: '/form/step-form/info'
                            },
                            {
                                path: '/form/step-form/info',
                                name: '分步表单（填写转账信息）',
                                component: './forms/stepForm/step1'
                            },
                            {
                                path: '/form/step-form/confirm',
                                name: '分步表单（确认转账信息）',
                                component: './forms/stepForm/step2'
                            },
                            {
                                path: '/form/step-form/result',
                                name: '分步表单（完成）',
                                component: './forms/stepForm/step3'
                            }
                        ]
                    }
                ]
            },
            {
                path: 'list',
                name: '列表页',
                icon: 'table',
                routes: [
                    {
                        path: '/list/table-list',
                        name: '查询表格',
                        component: './list/tableList'
                    },
                    {
                        path: '/list/basic-list',
                        name: '标准列表',
                        component: './list/basicList'
                    },
                    {
                        path: '/list/card-list',
                        name: '卡片列表',
                        component: './list/cardList'
                    },
                    {
                        path: '/list/search',
                        name: '搜索列表',
                        component: './list/searchList',
                        routes: [
                            {
                                path: '/list/search',
                                redirect: '/list/search/articles'
                            },
                            {
                                path: '/list/search/articles',
                                name: '搜索列表（文章）',
                                component: './list/searchList/articles'
                            },
                            {
                                path: '/list/search/projects',
                                name: '搜索列表（项目）',
                                component: './list/searchList/projects'
                            },
                            {
                                path: '/list/search/applications',
                                name: '搜索列表（应用）',
                                component: './list/searchList/applications'
                            }
                        ]
                    }
                ]
            },
            {
                component: '404'
            }
        ]
    }
]
