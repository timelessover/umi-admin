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
        { path: '/index/home', component: '../pages/main/Home', icon: 'home', title: '用户统计' },
        {
          path: '/index/article', icon: 'laptop', title: '文章管理',
          routes: [
            { path: '/index/article/edit',  component: '../pages/main/ArticleManagement/ArtcleEdit/index', icon: '', title: '文章编辑' },
            { path: '/index/article/edit/:id', exclude:true, component: '../pages/main/ArticleManagement/ArtcleEdit/index', icon: '', title: '文章编辑' },
            {
              path: '/index/article/list', component: '../pages/main/ArticleManagement/ArtcleList/index', icon: '', title: '文章列表'
            },
          ]
        },

        {
          path: '/index/navigation', icon: 'bars', title: '用户管理',
          routes: [
            { path: '/index/navigation/dropdown', component: '../pages/main/Navigation/DropdownDemo/index', icon: '', title: '留言板信息' },
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
