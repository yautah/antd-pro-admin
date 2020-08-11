import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/admin/info');
}
export async function queryNotices() {
  return request('/api/notices');
}


export async function changePassword(data) {
  return request('/users/changePassword', {
    method: "POST",
    data
  });
}
