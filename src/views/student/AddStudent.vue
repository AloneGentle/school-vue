<template>
  <div class="add-student">
    <el-form ref="studentForm" :model="student" label-width="120px">
      <el-form-item label="学生名称" prop="name">
        <el-input v-model="student.name" />
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="student.email" />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="student.birthday"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="入学年份" prop="startYear">
        <el-input v-model.number="student.startYear" />
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
        email: '',
        birthday: '', // 添加出生日期字段
        startYear: '' // 添加入学年份字段
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addStudent(this.student).then(response => {
            this.$message.success('学生添加成功')
            // 清空表单数据
            this.resetForm(formName)
          }).catch(error => {
            this.$message.error('学生添加失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      // 重置表单数据和校验状态
      this.$refs[formName].resetFields()
      this.student = {
        name: '',
        email: '',
        birthday: '',
        startYear: ''
      };
    }
  }
}
</script>

<style scoped>
.add-student {
  padding: 20px;
}
</style>
