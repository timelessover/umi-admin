
import React, { useState, useEffect } from 'react';
import styles from './style.scss';
import {
  Table, Row, Col, Modal, message, Button, Modal, Tag, Divider, message, Form, Input} from 'antd';
import { getCategories, deleteCategory,addCategory } from '../../api'
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

const ArticleList = (props) => {

  const [list, setList] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const handleUpdateArticle = id => {
    router.push('/index/article/edit/' + id)
  }

  const handleDeleteArticle = async (id) => {
    confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      onOk: async () => {
        const res = await deleteCategory( {_id:id} )
        message.success('删除成功')
        if (!res.code) {
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
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '创建时间',
      dataIndex: 'update_time',
    },

    {
      title: '操作',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleUpdateArticle((record._id))}>修改</Button>
          <Divider type="vertical" />
          <Button type="danger" onClick={() => handleDeleteArticle(record._id)}>删除</Button>
        </span>
      )
    },
  ];

  useEffect(()=>{
    props.form.validateFields();
  },[])

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true)
        const res = await addCategory(values)
        setVisible(false)
        setLoading(false)
        fetchList()
        console.log('Received values of form: ', values);
      }
    });
  };

  const showModal = () => {
    setVisible(true)
  };


  const handleCancel = () => {
    setVisible(false)
  };
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

  // Only show error after a field is touched.
  const direcotyError = isFieldTouched('name') && getFieldError('name');
  const descyError = isFieldTouched('desc') && getFieldError('desc');

  return (
    <div style={{ background: '#fff' }}>
      <Button type="primary" onClick={showModal} className={styles["add_btn"]}>增加选集</Button>
      <Table dataSource={list} columns={columns} rowKey="_id" />


      <Modal
        visible={visible}
        title="Title"
        onCancel={handleCancel}
        footer={null}	
      >
        <Form onSubmit={handleSubmit}>
          <Form.Item validateStatus={direcotyError ? 'error' : ''} help={direcotyError || ''}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入文集名称' }],
            })(
              <Input
                placeholder="请输入文集名称"
                size="large"
              />,
            )}
          </Form.Item>
          <Form.Item validateStatus={descyError ? 'error' : ''} help={descyError || ''}>
          {getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入描述' }],
          })(
            <TextArea
              placeholder="请输入描述"
            />,
          )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" loading={loading}  className={styles['submit_btn']} disabled={hasErrors(getFieldsError())}>
              确定
          </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )

}

export default Form.create({ name: 'directory' })(ArticleList);
