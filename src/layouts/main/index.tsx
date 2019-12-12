import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import { Layout, Icon } from 'antd';
import BasicMenu from '../components/BasicMenu'
import HeaderPage from '../components/HeaderPage'
import BasicSider from '../components/BasicSider'
import BasicBreadcrumb from '../components/BasicBreadcrumb'



const { Header, Sider, Content } = Layout;

const BasicLayout: React.FC = props => {

  const [collapsed, setCollapsed] = useState(false)
  const [menu, setMenu] = useState([])
  const [bread, setBread] = useState([])

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  useEffect(() => {
    // 需要深拷贝一下
    const routes = JSON.parse(JSON.stringify(props.route.routes))
    getMenu(routes)
  }, [])

  useEffect(() => {
    getBreadCrumb()
  }, [props.location.pathname])

  const getMenu = (routes) => {
    routes.pop()
    const result = getSubMenu(routes)
    setMenu(result)
  }

  const getSubMenu = (routes) => {
    if (!routes) return;
    const result = []
    routes.map(item => {
      let temp = {}
      temp.path = item.path
      temp.icon = item.icon
      temp.title = item.title
      // 去除最后一个umi对象
      item.routes && item.routes.pop()
      temp.subs = item.routes && getSubMenu(item.routes)
      result.push(temp)
    })
    return result
  }


  const getBreadCrumb = () => {
    const mainBread = props.location.pathname.split('/'); 
    const lens = mainBread.length
    let routes = props.route.routes
    const result = []
    const titleArr = []
    let index = 3 // 默认为3
    const getTitle = (routes, path) => {
      return routes.filter(item => item.path === path)[0]
    }
    // 收集所有子标题所有父标题
    while (index <= lens) {
      let temp = []
      for (let i = 0; i < index; i++) {
        temp.push(mainBread[i])
      }
      result.push(temp.join('/'))
      index++
    }
    // 筛选出每个标题的 title
    for (let i = 0; i < result.length; i++) {
      const current = getTitle(routes, result[i])
      titleArr.push(current.title)
      routes = current.routes
    }
    if (titleArr[0] !== '首页') {
      setBread(titleArr)
    } else {
      setBread([])
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <BasicSider collapsed={collapsed} menus={menu} location={props.location.pathname} />
      <Layout className={styles['layout']}>
        <HeaderPage collapsed={collapsed} toggle={toggle} />
        <BasicBreadcrumb arr={bread} />
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 280,
          }}
        >

          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
