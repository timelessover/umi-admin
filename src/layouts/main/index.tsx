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
    getMenu(props.route.routes)
  }, [props.route.routes])

  useEffect(() => {
    getBreadCrumb()
  }, [props.location.pathname])

  const getMenu = (routes) => {
    const result = []
    const mainMenu = routes.filter(item => item.title && item.path.split('/').length == 3)
    const subMenu = routes.filter(item => item.title && item.path.split('/').length == 4)
    mainMenu.map(item => {
      let temp = {}
      temp.path = item.path
      temp.icon = item.icon
      temp.title = item.title
      temp.subs = subMenu.filter(key => key.path.split('/')[2] == item.path.split('/')[2])
      result.push(temp)
    })
    setMenu(result)
    console.log(menu)
  }

  const getBreadCrumb = () => {
    // 支持两层导航
    const mainBread = props.location.pathname.split('/')
    if (mainBread.length >= 4) {
      mainBread.pop()
      const routes = props.route.routes
      const firstTitle = routes.filter(item => item.path === mainBread.join('/'))[0].title || ''
      const secondTitle = routes.filter(item => item.path === props.location.pathname)[0].title
      setBread([firstTitle, secondTitle])
    }else{
      setBread([])
    }

  }

  return (
    <Layout style={{ height: '100vh' }}>
      <BasicSider collapsed={collapsed} menus={menu} location={props.location.pathname} />
      <Layout>
        <HeaderPage collapsed={collapsed} toggle={toggle} />
        <BasicBreadcrumb arr={bread} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
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
