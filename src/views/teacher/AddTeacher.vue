<template>
  <div class="add-teacher">
    <el-form ref="teacherForm" :model="teacher" label-width="120px">
      <el-form-item label="教师名称" prop="name">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="teacher.age" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('teacherForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addTeacher } from '@/api/teacher'

export default {
  name: 'AddTeacher',
  data() {
    return {
      teacher: {
        name: '',
        age: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addTeacher(this.teacher).then(response => {
            this.$message.success('教师添加成功')
          }).catch(error => {
            this.$message.error('教师添加失败')
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
.add-teacher {
  padding: 20px;
}
</style>
