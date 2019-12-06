import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.scss';
import { connect } from 'dva';
import Link from 'umi/link';

const RegisterForm = (props) => {
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.dispatch({ type: 'users/getUser', payload: values })
                console.log(props)
                console.log('Received values of form: ', values);
            }
        });
    };

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
                    <Link to="/register" className={styles['link']}>注册</Link>
                </div>
            </Form>
        </>
    );
}

function mapStateToProps(state) {
    return state.users
}


export default connect(mapStateToProps)(Form.create({ name: 'userLogin' })(RegisterForm))

