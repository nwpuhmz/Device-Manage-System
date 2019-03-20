import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/computer/special/list',
    method: 'post',
    params
  })
}
export function deleteItem(params) {
  return request({
    url: '/computer/special/delete',
    method: 'post',
    params
  })
}
export function addItem(params) {
  return request({
    url: '/computer/special/add',
    method: 'post',
    params
  })
}
export function updateItem(params) {
  return request({
    url: '/computer/special/update',
    method: 'post',
    params
  })
}