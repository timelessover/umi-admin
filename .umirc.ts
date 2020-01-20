import { IConfig } from "umi-types";
const path = require('path');


// ref: https://umijs.org/config/
const config: IConfig = {
  history: 'hash',
  treeShaking: true,
  // "proxy": {
  //   "/api": {
  //     "target": "http://jsonplaceholder.typicode.com/",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api" : "" }
  //   }
  // },
  routes: [
    {
      path: '/index',
      component: '../layouts/main/index',
      Routes: ['./src/routes/MainPrivateRoute.js'],
      routes: [
        { path: '/index/home', component: '../pages/main/Home', icon: 'home', title: '首页' },
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
          path: '/index/navigation', icon: 'bars', title: '导航',
          routes: [
            { path: '/index/navigation/dropdown', component: '../pages/main/Navigation/DropdownDemo/index', icon: '', title: '下拉菜单' },
            { path: '/index/navigation/menu', component: '../pages/main/Navigation/MenuDemo/index', icon: '', title: '导航菜单' },
            { path: '/index/navigation/steps', component: '../pages/main/Navigation/StepsDemo/index', icon: '', title: '步骤条' },
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
    },
    {
      path: '/',
      redirect: '/login',
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './layouts/components/PageLoading/index',
        // level: 3,
      },
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
  alias: {
    utils: path.resolve(__dirname, 'src/utils'),
  }
}

export default config;
