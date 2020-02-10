import React, { useState, useEffect, useCallback } from 'react'
import { Carousel } from 'antd';
import styles from './index.scss';
import { Table, Divider, Tag, Card } from 'antd';
import { post } from 'utils/request'
import BarLine from '../components/BarLine'
import ReactEcharts from 'echarts-for-react';


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

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }]
};

const option1 = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [100, 200, 300, 400, 1290, 1330, 1320],
    type: 'line'
  }]
}




const Home = () => {
  const [list, setList] = useState([])
  const [tab,setTab] = useState(0)
  const [ tabList,setTabList ] = useState(option)

  // const fetchUser = useCallback(
  //   async () => {
  //     const res = await post('/admin/getAllUser')
  //     setList(res) 
  //   },
  //   []
  // )

  // useEffect(() => {
  //   // const fetchData = async ()=> {
  //   //   const res = await post('/admin/getAllUser')
  //   //   setList(res)
  //   // }
  //   fetchUser()
  // }, [])

  

  const loggle = ()=> {
    if(tab === 0){
      setTimeout(() => {
        setTabList(option1)
        setTab(1)
      }, 2000);
      
    }else{
      setTabList(option)
      setTab(0)
    }
  }

  return (
    <div className={styles['home']}>
      <button onClick={loggle}>切换option</button>
      {/* <BarLine option={tabList}/> */}
      <ReactEcharts
        option={tabList}
        
        className='react_for_echarts' />
      <Card title="用户管理" bordered={false}>
        <Table columns={columns} dataSource={list} />
      </Card>
    </div>
  )
}
export default Home