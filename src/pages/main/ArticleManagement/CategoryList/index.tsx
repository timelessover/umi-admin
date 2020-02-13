
import React, { useState, useEffect } from 'react';
import styles from './style.scss';
import {
  Table, Row, Col, Modal, message, Button, Modal, Tag, Divider, message, Form, Input
} from 'antd';
import { getCategories, deleteCategory, addCategory, getCategoryById, updateCategory } from '../../api'
import { timestampToTime } from 'utils/utils'
import router from 'umi/router';

const { confirm } = Modal;
const { Column, ColumnGroup } = Table;
const { TextArea } = Input

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

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

const CategoryList = (props) => {

  const [list, setList] = useState([]) // 文章列表
  const [visible, setVisible] = useState(false) // 模态框显示
  const [loading, setLoading] = useState(false) // 请求loading
  const [isModify, setIsModify] = useState(false) // 是否为修改
  const [cateName, setCateName] = useState('')
  const [cateDesc, setCateDesc] = useState('')
  const [cateId, setCateId] = useState('')

  const fetchList = async () => {
    const res = await getCategories()
    res.map((item: any) => {
      return item.update_time = timestampToTime(item.update_time, true)
    })
    setList(res)
  }


  useEffect(() => {
    fetchList()
  }, [])


  const handleDeleteCategory = async (id) => {
    confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      onOk: async () => {
        const res = await deleteCategory({ _id: id })
        message.success('删除成功')
        if (!res.code) {
          fetchList()
        }
      },
      onCancel() {
        message.fail('操作取消')
      },
    });
  }

  const fetchCategory = async (id) => {
      const res = await getCategoryById({ _id: id })
      console.log(res)
      setCateName(res.name)
      setCateDesc(res.desc)
  }



  const handleModify = (id) => {
    console.log(id)
    setCateId(id)
    fetchCategory(id)
    setIsModify(true)
    setVisible(true)

  }

  const handleAdd = () => {
    setIsModify(false)
    setVisible(true)
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '文章数量',
      dataIndex: 'article_num',
    },
    {
      title: '创建时间',
      dataIndex: 'update_time',
    },

    {
      title: '操作',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleModify(record._id)}>修改</Button>
          {/* <Divider type="vertical" /> */}
          {/* <Button type="danger" onClick={() => handleDeleteCategory(record._id)}>删除</Button> */}
        </span>
      )
    },
  ];

 

  const handleAddSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true)
        const res = await addCategory(values)
        setLoading(false)
        setVisible(false)
        fetchList()
        message.success('添加成功')
      }
    });
  };

  const handleModifySubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('修改', values)
        values._id = cateId
        setLoading(true)
        const res = await updateCategory(values)
        setLoading(false)
        setVisible(false)
        fetchList()
        message.success('修改成功')
      }
    });
  };



  const { getFieldDecorator } = props.form;

  return (
    <div style={{ background: '#fff' }}>
      <Button type="primary" onClick={handleAdd} className={styles["add_btn"]}>增加选集</Button>
      <Table dataSource={list} columns={columns} rowKey="_id" />


      <Modal
        visible={visible}
        title={isModify ? "修改文集" : "添加文集"}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form onSubmit={isModify ? handleModifySubmit : handleAddSubmit}>
          <Form.Item >
            {getFieldDecorator('name', {
              initialValue: isModify ? cateName : '',
              rules: [{ required: true, message: '请输入文集名称' }],
            })(
              <Input
                placeholder="请输入文集名称"
                size="large"
              />,
            )}
          </Form.Item>
          <Form.Item >
            {getFieldDecorator('desc', {
              initialValue: isModify ? cateDesc : '',
              rules: [{ required: true, message: '请输入描述' }]
            })(
              <TextArea
                placeholder="请输入描述"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" loading={loading} className={styles['submit_btn']}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )

}

export default Form.create({ name: 'category' })(CategoryList);
