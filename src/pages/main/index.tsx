import React, { useEffect } from 'react';
import styles from './index.scss';
import Link from 'umi/link';
import { connect } from 'dva';

const MainPage = (props) => {
  // useEffect(() => {
  //   console.log(props)
  // }, [])
  return (
    <div className={styles.container}>
      <div>登陆成功{props.username}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.user, ...state.count }
}

 
export default connect(mapStateToProps)(MainPage);