import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/teacher/list',
    method: 'get',
    params
  })
}
