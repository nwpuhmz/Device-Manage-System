import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/computer/special/list',
    method: 'post',
    params
  })
}
