import React, { useEffect, useRef,useState } from 'react'
import { Card } from 'antd'
import echarts from 'echarts'


const BarLine = (userProps) => {

    const { option} = userProps

    const charts = useRef(null)

    let container;

    useEffect(() => {
        echarts.init(charts.current).setOption(option)
    }, [option])

    return (
        <div id="main" style={{ width: '600px',height: '400px'}} ref={charts}/>
    )
}


export default BarLine