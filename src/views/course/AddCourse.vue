<template>
  <div class="add-course">
    <el-form ref="courseForm" :model="course" label-width="120px">
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="course.name" />
      </el-form-item>
      <el-form-item label="学分" prop="credit">
        <el-input v-model="course.credit" />
      </el-form-item>
      <el-form-item label="教师Id" prop="teacherId">
        <el-input v-model="course.teacherId" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('courseForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addCourse } from '@/api/course'

export default {
  name: 'AddCourse',
  data() {
    return {
      course: {
        name: '',
        credit: '',
        teacherId: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addCourse(this.course).then(response => {
            this.$message.success('课程添加成功')
          }).catch(error => {
            this.$message.error('课程添加失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.add-course {
  padding: 20px;
}
</style>
