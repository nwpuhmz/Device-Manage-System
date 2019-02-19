import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/oauth/token',
    method: 'post',
    auth: {
      username: 'client',
      password: 'security'
    },
    params: {
      grant_type: 'password',
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/currentUser',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
