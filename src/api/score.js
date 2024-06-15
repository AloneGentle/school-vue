import request from '@/utils/request'

export function getStudents() {
  return request({
    url: '/students/list',
    method: 'get'
  })
}

export function getStudentCourses(studentId) {
  return request({
    url: `/students/${studentId}/courses`,
    method: 'get'
  })
}

export function addOrUpdateScores(studentId, scores) {
  return request({
    url: '/scores/add-score',
    method: 'post',
    data: {
      studentId,
      scores
    }
  })
}

export function getList() {
  return request({
    url: '/scores/list',
    method: 'get'
  })
}
