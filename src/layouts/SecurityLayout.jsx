import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';

import request from '@/utils/request';
import {getAccessToken} from '@/utils/authority'
import cookie from '@/utils/cookie'


class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({ isReady: true });
    const { dispatch } = this.props;
    const accessToken = getAccessToken();

    if (accessToken) {
      request.extendOptions({
        headers: { token: accessToken || '' },
      });

      if (dispatch) {
        dispatch({
          type: 'user/fetchCurrent',
        });
      }
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    const isLogin = currentUser && currentUser.id;

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login`} />;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
