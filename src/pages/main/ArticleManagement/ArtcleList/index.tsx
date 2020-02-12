
import React, { useState, useEffect } from 'react';
import './style.scss'
import { Table, Row, Col, Modal, message, Button, Switch, Tag, Divider,message  } from 'antd';
import { findArticles,deleteArticle } from '../../api'
import {timestampToTime} from 'utils/utils' 
import router from 'umi/router';

const { confirm } = Modal;
const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const ArticleList = (props) => {

  const [list, setList] = useState([])

  const fetchList =  async ()=> {
    const res = await findArticles()
    res.map((item:any)=>{
      return item.update_time = timestampToTime(item.update_time,true)
    })
    setList(res)
  }

  useEffect(()=>{
    fetchList()
  }, [])

  const handleUpdateArticle = id => {
    router.push('/index/article/edit/' + id)
  }

  const handleDeleteArticle = async (id) => {
    confirm ({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      onOk: async()=> {
        const res = await deleteArticle({ id })
        message.success('删除成功')
        if(!res.code){
          fetchList()
        }
      },
      onCancel() {
        message.success('取消成功')
      },
    });
  }
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      
    },
    {
      title: '简介',
      dataIndex: 'introduce',
    },
    {
      title: '类别',
      dataIndex: 'category[0].name',
    },
    {
      title: '最近修改时间',
      dataIndex: 'update_time',
    },
    {
      title: '点赞数',
      dataIndex: 'likes_count',
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
    },
   
   
    {
      title: '操作',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleUpdateArticle((record._id))}>修改</Button>
          <Divider type="vertical" />
          <Button type="danger" onClick={() => handleDeleteArticle(record._id)}>删除 </Button>
        </span>
      )
    },
  ];

  return (
    <div style={{ background: '#fff'}}>
      <Table dataSource={list} columns={columns} rowKey="_id"/>
    </div>
  )

}

export default ArticleList
