import React, { useState, useEffect } from 'react';
import { Button, Card, message } from 'antd';
import { connect } from 'dva';
import styles from './index.scss'
import RegisterForm from './components/registerForm/index';
import LoginForm from './components/loginForm/index'
import router from 'umi/router';
import Redirect from 'umi/redirect';


const IndexPage = (props) => {
  

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.replace('/index/home')
    }
    if (props.location.state && !localStorage.getItem('token')) {
      message.error('请先登录')
    }
  }, [props.location.pathname])


  return (
    <div className={styles.container}>
      <div className={styles['bg-color']} />
      <Card style={{ width: 300 }} hoverable={true}>
        {props.status === 0 ? <LoginForm /> : <RegisterForm />}
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return state.login
}


export default connect(mapStateToProps)(IndexPage);
