import { Form, Input, Button, Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect } from 'umi';
import styles from './style.less';


const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting } = props;
  const { status  } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);

  const handleSubmit = values => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, autoLogin },
    });
  };

  return (
    <div className={styles.main}>
      <Form size="large"  onFinish={handleSubmit}>
        {status >0 &&   !submitting && (
          <LoginMessage content="账户或密码错误（admin/ant.design）" />
        )}

          <Form.Item
            name="login"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}>
            <Input placeholder="用户名: admin" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}>
            <Input type="password" placeholder="密码: admin" />
          </Form.Item>

          <Form.Item>
            <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }}>忘记密码</a>
          </Form.Item>
          <Form.Item>
            <Button  style={{ width: '100%' }}
              type="primary"
              htmlType="submit" loading={submitting}>登录</Button>
          </Form.Item>
        </Form>
      </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
