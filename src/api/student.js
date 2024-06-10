import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/student/list',
    method: 'get',
    params
  })
}

export function addStudent(data) {
  return request({
    url: '/student/add-student',
    method: 'post',
    data
  })
}

export function deleteStudent(id) {
  return request({
    url: `/student/delete-student/${id}`,
    method: 'delete'
  })
}
