import React, { useEffect,useRef } from 'react'
import {Card} from 'antd'
import Typing from '../../../..//utils/typing.ts'


const TypingCard = (userProps) => {
  const defaultProps = {
    title: '何时使用',
    source:'',
    height:136
  }
  const props ={...defaultProps,...userProps}
  const {source,output,height,id,title } = props

  const outPutEle = useRef(null);
  const sourceEle = useRef(null)

  useEffect(()=>{
    const typing = new Typing({
      source: sourceEle.current,
      output:outPutEle.current,
      delay:30
    })
    console.log('2')
    typing.start()
  },[])
  return (
    <Card hoverable={true} bordered={false} className='card-item' title={title} style={{minHeight:height}} id={id}>
      <div style={{display:'none'}} ref={sourceEle} dangerouslySetInnerHTML={{__html:source}}/>
      <div ref={outPutEle}/>
    </Card>
  )
}

export default TypingCard