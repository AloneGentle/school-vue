import request from '@/utils/request'

export function addTeacher(data) {
  return request({
    url: '/teacher/add-teacher',
    method: 'post',
    data
  })
}

export function getList(params) {
  return request({
    url: '/teacher/list',
    method: 'get',
    params
  })
}

export function deleteTeacher(id) {
  return request({
    url: `/teacher/delete-teacher/${id}`,
    method: 'delete'
  })
}

