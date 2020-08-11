import React, { useEffect, useState } from 'react';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import {changePassword} from '@/services/user';
import { history, connect } from 'umi';
import cookie from '@/utils/cookie'

const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const OperationModal = (props) => {
  const [form] = Form.useForm();

  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const { visible, onDone, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      setDone(false);
      form.resetFields();
    }
  }, [props.visible]);

  const handleSubmit = async () => {
    if (!form) return;

    let values = {};
    try {
      values = await form.validateFields();
    } catch (e) {
      console.error(e);
      return;
    }
    setLoading(true);
    const res = await updatePassword({ oldPwd: values.currentPassword, password: values.password });
    setLoading(false);
    if (res.status == 0) {
      setDone(true);
      cookie.remove('accessToken')
    } else {
      console.log('err', res, res.status);
      if (res.status == 10002) {
        console.log('err', res.status);
        form.setFields([
          { name: 'currentPassword', value: values.currentPassword, errors: ['当前密码错误'] },
        ]);
      }
    }
  };

  const updatePassword = async (values) => {
    return await changePassword(values)
  };

  const reLogin = () => {
    const { dispatch } = props;
    dispatch({ type: 'login/logout', payload: {} });
  };

  const closableProps = {
    closable: !(loading || done),
    keyboard: !(loading || done),
    maskClosable: !(loading || done),
  };

  const modalFooter = done
    ? {
        footer: null,
        onCancel: onDone,
      }
    : {
        okText: '修改',
        onOk: handleSubmit,
        onCancel,
      };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="密码修改成功"
          extra={
            <Button type="primary" onClick={reLogin}>
              重新登陆
            </Button>
          }
        />
      );
    }

    return (
      <Form {...formLayout} form={form}>
        <Form.Item
          name="currentPassword"
          label="当前密码"
          rules={[
            {
              required: true,
              message: '请输入当前密码',
            },
          ]}
        >
            <Input placeholder="请输入当前密码" type="password" />
        </Form.Item>
        <Form.Item
          name="password"
          label="新密码"
          rules={[
            {
              required: true,
              message: '请输入新密码',
            },
            {
              pattern: /^([a-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\_\+\[\]\{\}\|\;\:\'\"\,\<\.\>\/\?]){6,14}$/i,
              message: '密码只能是6-14位除空格外的数字、英文、特殊字符',
            }
          ]}
        >
            <Input placeholder="6-14位除空格外的数字、英文、特殊字符" type="password" />
        </Form.Item>
        <Form.Item
          name="passwordConfirmation"
          label="重复新密码"
          rules={[
            {
              required: true,
              message: '请再次输入新密码',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次密码输入不一致');
              },
            }),
          ]}
        >
            <Input placeholder="请再次输入新密码" type="password" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title="修改密码"
      width={640}
      bodyStyle={
        done
          ? {
              padding: '28px 0',
            }
          : {
              padding: '28px 0 0',
            }
      }
      destroyOnClose
      visible={visible}
      confirmLoading={loading}
      {...closableProps}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default connect()(OperationModal);
