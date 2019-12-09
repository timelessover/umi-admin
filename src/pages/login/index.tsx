import React, { useState, useEffect } from 'react';
import Link from 'umi/link';
import { Button, Card } from 'antd';
import { connect } from 'dva';
import styles from './index.scss'
import RegisterForm from './components/registerForm/index';
import LoginForm from './components/loginForm/index'


const IndexPage = (props) => {

  useEffect(()=>{
    console.log(props)
  },[])

  return (
    <div className={styles.container}>
      <div className={styles['bg-color']} />
      <Card  style={{ width: 300 }} hoverable={true}>
        {props.status === 0 ?<LoginForm />:<RegisterForm />}
      </Card>   
    </div>      
  );
}

function mapStateToProps(state) {
  return state.login
}


export default connect(mapStateToProps)(IndexPage);
