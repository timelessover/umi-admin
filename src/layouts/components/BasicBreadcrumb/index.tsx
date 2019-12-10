import React from 'react'
import {Breadcrumb} from 'antd'
import Link from 'umi/link';

const BasicBreadcrumb = (props)=>(
  <Breadcrumb style={{margin:16,marginBottom:0}}>
    <Breadcrumb.Item><Link to='/index/home'>首页</Link></Breadcrumb.Item>
    {props.arr && props.arr.map(item=>{
      if ((typeof item) === 'object'){
        return <Breadcrumb.Item key={item.title}><Link to={item.to}>{item.title}</Link></Breadcrumb.Item>
      } else {
        return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
      }
    })}
  </Breadcrumb>
)
export default BasicBreadcrumb