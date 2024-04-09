import request from '@/utils/request'

export const getLabelList = (params) => {
  return request({
    url: '/label/list',
    method: 'get',
    params
  })
}

export const getById = (id) => {
  return request({
    url: `/label/getById/${id}`,
    method: 'get'
  })
}

export const saveLabel = (label) => {
  return request({
    url: '/label/save',
    method: 'post',
    data: label
  })
}

export const updateLabel = (label) => {
  return request({
    url: '/label/update',
    method: 'put',
    data: label
  })
}

export const removeLabel = (id) => {
  return request({
    url: `/label/remove/${id}`,
    method: 'delete'
  })
}