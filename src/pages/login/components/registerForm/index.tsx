import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import styles from './index.scss';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { post } from '../../../../utils/request'


const RegisterForm = (props) => {

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                post('register', values).then(res => {
                    if (res.status === 'ok') {
                        message.success('注册成功');
                        props.dispatch({ type: 'login/changeStatus', payload: { status: 0 } })
                    }else{
                        message.error('注册失败，用户名重复');
                    }
                }).catch(err => {
                    message.error('注册失败，网络出现故障');
                })
            }
        });
    };

    const goLogin = () => {
        props.dispatch({ type: 'login/changeStatus', payload: { status: 0 } })
    }

    const { getFieldDecorator } = props.form;

    return (
        <>
            <h3 className={styles.title}>管理员注册</h3>
            <Form onSubmit={handleSubmit} className={styles['login-form']}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '用户名不能为空' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '密码不能为空' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <div className={styles['register-link-box']}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" className={styles['login-form-button']}>注册</Button>
                    </Form.Item>
                    <span onClick={goLogin} className={styles['link']}>返回登陆</span>
                </div>
            </Form>
        </>
    );
}

function mapStateToProps(state) {
    return state.login
}


export default connect(mapStateToProps)(Form.create({ name: 'userLogin' })(RegisterForm))

