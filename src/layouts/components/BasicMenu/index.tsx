import React, { useEffect, useState } from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';




const BasicMenu = (props) => {

    const [openKeys, setOpenKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])

    useEffect(() => {
        getPath(props.location)
    }, [props.location])

    const getPath = (pathname) => {
        //获取当前所在的目录层级
        const rank = pathname.split('/')
        switch (rank.length) {
            case 2:  //一级目录
                setSelectedKeys(pathname)
                break;
            case 5: //三级目录，要展开两个subMenu
                setSelectedKeys(pathname)
                setOpenKeys([rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')])
                break;
            default:
                setSelectedKeys([pathname])
                setOpenKeys([pathname.substr(0, pathname.lastIndexOf('/'))])
        }
    }

    const onOpenChange = (openKeys) => {
        //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
        if (openKeys.length === 0 || openKeys.length === 1) {
            setOpenKeys(openKeys)
            return
        }
        // 最新展开的菜单
        const latestOpenKey = openKeys[openKeys.length - 1]
        if (latestOpenKey.includes(openKeys[0])) {
            setOpenKeys(openKeys)
        } else {
            setOpenKeys([latestOpenKey])
        }
    }

    const renderMenuItem = ({ path, icon, title }) => {
        return (
            <Menu.Item key={path}>
                <Link to={path}>
                    {icon && <Icon type={icon} />}
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }
    const renderSubMenu = ({ path, icon, title, subs }) => {
        return (
            <Menu.SubMenu key={path} title={<span>{icon && <Icon type={icon} />}<span>{title}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    }

    return (
        <Menu onOpenChange={onOpenChange}
            onClick={({ key }) => setSelectedKeys([key])}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            theme={props.theme ? props.theme : 'dark'}
            mode={props.collapsed ? 'vertical' : 'inline'} >
            {
                props.menus && props.menus.map(item => {
                    return item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
                })
            }
        </Menu>
    )
}

export default BasicMenu