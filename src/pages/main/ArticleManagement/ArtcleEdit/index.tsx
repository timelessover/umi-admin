import React, { useState, useEffect } from 'react';
import marked from 'marked'
import './style.scss'
import { Row, Col, Select, message, Form, Icon, Input, Button } from 'antd'
import { addArticle, getArticleById, updateArticle, getCategories } from '../../api'
import router from 'umi/router';

const { Option } = Select;
const { TextArea } = Input

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
});


const ArtcleEdit = (props) => {

  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        if (articleId){
          values._id = articleId
          const res = await updateArticle(values);
          message.success("更新成功")
        }else{
          const res = await addArticle(values);
          message.success("添加成功")
        }
      }
    });
  };

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改

  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [catatype,setCatatype ] = useState('')
  const [cataInfo, setCataInfo] = useState([]) // 文章类别信息


  const changeContent = (e) => {
    setMarkdownContent(marked(e.target.value))
  }

  const changeIntroduce = (e) => {
    setIntroducehtml(marked(e.target.value))
  }

  const hanleDirectoryManagement = () => {
    router.push('/index/article/directory')
  }

  const fetchArticle = async (id) => {
    const res = await getArticleById(id)
    setCatatype(res.category[0].name)
    setArticleTitle(res.title)
    setArticleContent(res.content)
    setMarkdownContent(marked(res.content))
    setIntroducemd(res.introduce)
    setIntroducehtml(marked(res.introduce))
  }

  const fetchCata = async () => {
    const res = await getCategories()
    setCataInfo(res)
  }

  useEffect(() => {
    fetchCata()
    //获得文章ID
    let tmpId = props.match.params.id
    if (tmpId) {
      setArticleId(tmpId)
      fetchArticle(tmpId)
    }
  }, [])


  return (
    <Form onSubmit={handleSubmit} >
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Form.Item>
                {getFieldDecorator('title', {
                  initialValue: articleTitle,
                  rules: [{ required: true, message: '请输入博客标题' }],
                })(
                  <Input
                    placeholder="博客标题"
                    size="large"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item  >
                {getFieldDecorator('category', {
                  initialValue: articleId ? catatype : cataInfo[0] && cataInfo[0]._id ,
                  rules: [{ required: true, message: '请选择文集' }]
                })(
                  <Select>
                    {cataInfo.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row gutter={10} >
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('content', {
                  initialValue: articleContent,
                  rules: [{ required: true, message: '请输入文章内容' }],
                })(
                  <TextArea
                    className="markdown-content"
                    rows={35}
                    onChange={changeContent}
                    onPressEnter={changeContent}
                    placeholder="文章内容"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }} />
            </Col>
          </Row>

        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button type="primary" size="large" htmlType="submit">发布文章</Button>
              <br />
              <Form.Item>
                {getFieldDecorator('introduce', {
                  initialValue: introducemd,
                  rules: [{ required: true, message: "请输入文章简介" }],
                })(
                  <TextArea
                    rows={4}
                    onChange={changeIntroduce}
                    onPressEnter={changeIntroduce}
                    placeholder="请输入文章文章简介,小于20字"
                  />

                )}
              </Form.Item>
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }} />

            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}
export default Form.create({ name: 'addArticle' })(ArtcleEdit); 