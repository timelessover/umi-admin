import React, { useState, useEffect } from 'react';
import { Layout, Icon } from 'antd';
import BasicMenu from '../BasicMenu'
import styles from './index.scss';

const { Sider } = Layout;

const BasicSider = (props) => {

    const { collapsed, toggle, menus, location } = props

    return (
        <Sider trigger={null} collapsible={true} collapsed={collapsed}>
            <div className={styles['logo']} />
            <BasicMenu menus={menus} location={location} collapsed={collapsed} />
        </Sider>
    )
}

export default BasicSider