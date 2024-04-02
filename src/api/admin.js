import request from '@/utils/request'

export const getUserInfo = (data) => {
  return request({
    url: '/user/list',
    method: 'get',
    params: data
  })
}

export function saveUser(user) {
  return request({
    url: '/user/add',
    method: 'post',
    data: user
  })
}

export function getById(id) {
  return request({
    url: `/user/getById/${id}`,
    method: 'get'
  })
}

export function updateUser(user) {
  return request({
    url: '/user/update',
    method: 'put',
    data: user
  })
}

export function batchDelete(ids) {
  return request({
    url: '/user/batchDelete',
    method: 'delete',
    data: ids
  })
}