import { IConfig } from "umi-types";

// ref: https://umijs.org/config/
const config: IConfig = {
  history: 'hash',
  treeShaking: true,
  routes: [
    {
      path: '/index',
      icon: 'laptop',
      component: '../layouts/main/index',
      Routes: ['./src/routes/MainPrivateRoute.js'],
      routes: [
        { path: '/index/home', component: '../pages/main/Home', icon: 'laptop', title: '首页' },
        {
          path: '/index/general', icon: 'laptop', title: '基本组件',
          routes: [
            { path: '/index/general/icon', component: '../pages/main/General/IconDemo/index', icon: '', title: '图标' },
            {
              path: '/index/general/button', component: '../pages/main/General/ButtonDemo/index', icon: '', title: '按钮'
            },
          ]
        },

        {
          path: '/index/text', component: '../pages/main/index', icon: 'laptop', title: 'test', routes: [
            { path: '/index/text/icon', component: '../pages/main/index', icon: '', title: 'test' },
          ]
        },
      ]
    },
    {
      path: '/login',
      component: '../layouts/login/index',
      routes: [
        { path: '/login', component: '../pages/login/index' },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'umi',
      dll: true,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
