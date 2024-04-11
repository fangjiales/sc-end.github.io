import request from '@/utils/request'

export const getClassifyList = (params) => {
  return request({
    url: '/classify/list',
    method: 'get',
    params
  })
}

export const getById = (id) => {
  return request({
    url: `/classify/getById/${id}`,
    method: 'get'
  })
}

export const saveClassify = (classify) => {
  return request({
    url: '/classify/save',
    method: 'post',
    data: classify
  })
}

export const updateClassify = (classify) => {
  return request({
    url: '/classify/update',
    method: 'put',
    data: classify
  })
}

export const removeClassify = (id) => {
  return request({
    url: `/classify/remove/${id}`,
    method: 'delete'
  })
}