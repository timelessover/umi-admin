import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import { Layout, Icon, Badge, Dropdown, Menu, Modal } from 'antd';
import router from 'umi/router';

const { Header } = Layout;

const HeaderPage = (props) => {
    const { collapsed, toggle } = props

    const avatar = require('../../../assets/img/defaultUser.jpg')
    const user = 'chris'

    const [count, setCount] = useState(100)
    const [visible, setVisible] = useState(false)

    const logout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    const menu = (
        <Menu className='menu'>
            <Menu.ItemGroup title='用户中心' className='menu-group'>
                <Menu.Item>你好 - {user}</Menu.Item>
                <Menu.Item>个人信息</Menu.Item>
                <Menu.Item><span onClick={logout}>退出登录</span></Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title='设置中心' className='menu-group'>
                <Menu.Item>个人设置</Menu.Item>
                <Menu.Item>系统设置</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    )
    const login = (
        <Dropdown overlay={menu}>
            <img onClick={() => setVisible(true)} src={avatar} alt="" />
        </Dropdown>
    )

    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
                className={styles['trigger']}
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggle}
            />
            <div style={{ lineHeight: '64px', float: 'right' }}>
                <ul className={styles['header-ul']}>
                    <li onClick={() => setCount(0)}>
                        <Badge count={count} overflowCount={99} style={{ marginRight: -17 }}>
                            <Icon type="notification" />
                        </Badge>
                    </li>
                    <li>
                        {login}
                    </li>
                </ul>
            </div>
            <Modal
                footer={null} closable={false}
                visible={visible}
                wrapClassName="vertical-center-modal"
                onCancel={() => setVisible(false)}>
                <img src={avatar} alt="" width='100%' />
            </Modal>
        </Header>
    )
}

export default HeaderPage