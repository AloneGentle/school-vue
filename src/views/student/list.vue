<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电子邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="生日">
        <template slot-scope="scope">
          <span>{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="入学时间">
        <template slot-scope="scope">
          <span>{{ scope.row.startYear }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="editDialogVisible" title="编辑学生">
      <el-form ref="editForm" :model="editForm">
        <el-form-item label="学生名称">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="editForm.birthday" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="入学时间">
          <el-input-number v-model="editForm.startYear" :min="2000" :max="2030" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, deleteStudent, updateStudent } from '@/api/student'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      editDialogVisible: false,
      editForm: {
        id: null,
        name: '',
        email: '',
        birthday: '',
        startYear: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteStudent(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData() // 重新获取列表数据
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit(row) {
      this.editForm = { ...row }
      this.editDialogVisible = true
    },
    submitEdit() {
      updateStudent(this.editForm.id, {
        name: this.editForm.name,
        email: this.editForm.email,
        birthday: this.editForm.birthday,
        startYear: this.editForm.startYear
      }).then(() => {
        this.$message({
          type: 'success',
          message: '编辑成功!'
        })
        this.editDialogVisible = false
        this.fetchData()
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '编辑失败'
        })
      })
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}
</style>
