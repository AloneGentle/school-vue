<template>
  <div class="add-student">
    <el-form ref="studentForm" :model="student" label-width="120px">
      <el-form-item label="学生名称" prop="name">
        <el-input v-model="student.name" />
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="student.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('studentForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addStudent } from '@/api/student'

export default {
  name: 'AddStudent',
  data() {
    return {
      student: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addStudent(this.student).then(response => {
            this.$message.success('学生添加成功')
          }).catch(error => {
            this.$message.error('学生添加失败')
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
.add-student {
  padding: 20px;
}
</style>
