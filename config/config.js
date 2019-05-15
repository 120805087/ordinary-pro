import router from './router.config.js';
import defaultSetting from '../src/defaultSetting';

const { primaryColor } =  defaultSetting;

export default {
    // 插件
    plugins: [
        [
            "umi-plugin-react",
            {
                antd: true,
                dva: {
                    hmr: true
                },
                dynamicImport: {
                    webpackChunkName: true,
                    loadingComponent: './components/pageLoading/index',
                    level: 3
                }
            }
        ]
    ],
    // 路由配置
    routes: router,
    // 禁止 redirect 提前
    disableRedirectHoist: true,
    // antd 主题色
    theme: {
        'primary-color': primaryColor
    }
}
