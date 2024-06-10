import request from '@/utils/request'

export function addCourse(data) {
  return request({
    url: '/course/add-course',
    method: 'post',
    data
  })
}

export function getList(params) {
  return request({
    url: '/course/list',
    method: 'get',
    params
  })
}

export function deleteCourse(id) {
  return request({
    url: `/course/delete-course/${id}`,
    method: 'delete'
  })
}

