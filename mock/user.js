
export default {
  // 支持值为 Object 和 Array
  'GET /api/admin/info': {

    status: 0,
    data: {
      created_at: "2018-08-09T09:52:19+08:00",
      id: 1,
      login: "admin",
      role: "admin",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwicGFzc3dvcmQiOiI0ODUxMmEwZThlM2YzZTc4YzRiZmJiYzA4ZjIxNzViZiIsImV4cCI6MTYyODE1NTEwNSwiaXNzIjoiY3JhcGkifQ.mPWwEcktD7Dg80sZDBQdmlEtBWE2gtNWJetwQE_UCp8",
      updated_at: "0001-01-01T00:00:00Z",
    }

  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],

  'POST /api/login': (req, res) => {
    const { password, login } = req.body;

    if (password === 'admin' && login === 'admin') {
      res.send({
        status: 0,
        data: {
          created_at: "2018-08-09T09:52:19+08:00",
          id: 1,
          login: "admin",
          role: "admin",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwicGFzc3dvcmQiOiI0ODUxMmEwZThlM2YzZTc4YzRiZmJiYzA4ZjIxNzViZiIsImV4cCI6MTYyODE1NTEwNSwiaXNzIjoiY3JhcGkifQ.mPWwEcktD7Dg80sZDBQdmlEtBWE2gtNWJetwQE_UCp8",
          updated_at: "0001-01-01T00:00:00Z",
        }
      });
      return;
    }

    res.send({
      status: '10001',
      message: '用户名密码错误'
    });
  },


'POST /api/users/changePassword': (req, res) => {
    const { oldPwd, password } = req.body;

    if (oldPwd === 'admin') {
      res.send({
        status: 0,
        data: {
          created_at: "2018-08-09T09:52:19+08:00",
          id: 1,
          login: "admin",
          role: "admin",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwicGFzc3dvcmQiOiI0ODUxMmEwZThlM2YzZTc4YzRiZmJiYzA4ZjIxNzViZiIsImV4cCI6MTYyODE1NTEwNSwiaXNzIjoiY3JhcGkifQ.mPWwEcktD7Dg80sZDBQdmlEtBWE2gtNWJetwQE_UCp8",
          updated_at: "0001-01-01T00:00:00Z",
        }
      });
      return;
    }

    res.send({
      status: '10002',
      message: '当前密码错误'
    });
  },


  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
