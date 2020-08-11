import { stringify } from 'querystring';
import { history } from 'umi';
import { login } from '@/services/login';
import {  setAuthority, setAccessToken, removeAccessToken } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

import request from '@/utils/request';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {

      const {autoLogin, ...params} = payload

      const response = yield call(login, params);

      //请求成功，设置登陆页状态
      yield put.resolve({ type: 'setLoginStatus', payload: response });

      if (response.status == 0) {

        const user = response.data

        //请求header中附加 token
        request.extendOptions({ headers: { token: user.token || '' }});

        //保存token到本地，设置是否自动登录
        setAccessToken(user.token, autoLogin)

        //设置用户权限
        setAuthority(user.role);

        //store中设置currentUser
        yield put.resolve({ type: 'user/saveCurrentUser', payload: user });

        history.replace('/');
      }
    },

    *logout(_, {put}) {
      removeAccessToken();
      //请求header中移除 token
      request.extendOptions({ headers: { token: '' }});
      yield put.resolve({ type: 'user/saveCurrentUser', payload: {} });
      history.replace({ pathname: '/user/login' });
    },
  },
  reducers: {
    setLoginStatus(state, { payload }) {
      return { ...state, status: payload.status  };
    },
  },
};
export default Model;
