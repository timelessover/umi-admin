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
                post('login', values).then(res => {
                    switch (res.status) {
                        case '0':
                            props.dispatch({ type: 'user/updateUser', payload: { username: res.name } })
                            localStorage.setItem('token','Bearer ' + res.token)
                            router.push('/index/home')
                            break; 
                        case '1':
                            message.error('密码错误');
                            break;
                        case '2':
                            message.error('用户名错误');
                            break;
                        default:
                            break;
                    }
                })
            }
        });
    };

    const goRegister = () => {
        props.dispatch({ type: 'login/changeStatus', payload: { status: 1 } })
    }


    const { getFieldDecorator } = props.form;

    return (
        <>
            <h3 className={styles.title}>管理员登陆{props.user}</h3>
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
                        <Button type="primary" htmlType="submit" className={styles['login-form-button']}>登陆</Button>
                    </Form.Item>
                    <span onClick={goRegister} className={styles['link']}>注册</span>
                </div>
            </Form>
        </>
    );
}

function mapStateToProps(state) {
    return { ...state.login, ...state.user }
}


export default connect(mapStateToProps)(Form.create({ name: 'userLogin' })(RegisterForm))

