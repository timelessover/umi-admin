import React, { useState, useEffect, useCallback } from 'react'
import { Carousel } from 'antd';
import styles from './index.scss';
import { Table, Divider, Tag, Card } from 'antd';
import { post } from 'utils/request'


const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    render: (text) => (
      <a>{text}</a>
    ),
  },
  {
    title: '注册时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>修改</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
    ),
  },
];




const Home = () => {
  const [list, setList] = useState([])

  const fetchUser = useCallback(
    async () => {
      const res = await post('/admin/getAllUser')
      setList(res)
    },
    []
  )

  useEffect(() => {
    // const fetchData = async ()=> {
    //   const res = await post('/admin/getAllUser')
    //   setList(res)
    // }
    fetchUser()
  }, [])

  return (
    <div className={styles['home']}>
      <Card title="用户管理" bordered={false}>
        <Table columns={columns} dataSource={list} />
      </Card>
    </div>
  )
}
export default Home