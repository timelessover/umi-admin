import React from 'react';
import styles from './index.scss';
import Link from 'umi/link';

export default function() {
  return (
    <div className={styles.container}>
      <Link to="/index/users" className={styles.font}>go to /users</Link>
      <Link to="/login/register">go to /register</Link>
    </div>
  );
}
