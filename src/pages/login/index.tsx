import React, { useState } from 'react';
import Link from 'umi/link';
import { Button, Card } from 'antd';
import { connect } from 'dva';
import styles from './index.scss'
import RegisterForm from './components/loginForm/index'


const IndexPage = (props) => {


  return (
    <div className={styles.container}>
      <div className={styles['bg-color']} />
      <Card  style={{ width: 300 }} hoverable={true}>
        <RegisterForm />
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps)(IndexPage);
