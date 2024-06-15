<template>
  <div class="teacher-list">
    <!-- 搜索框 -->
    <el-input
      v-model="searchQuery"
      placeholder="搜索教师姓名"
      style="margin-bottom: 20px; width: 300px;"
      @input="fetchData"
    >
      <el-button slot="append" icon="el-icon-search" @click="fetchData" />
    </el-input>
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
      <el-table-column align="center" label="教师名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="年龄">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="editDialogVisible" title="编辑教师">
      <el-form ref="editForm" :model="editForm">
        <el-form-item label="教师名称">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="editForm.age" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>import { getList, deleteTeacher, updateTeacher } from '@/api/teacher'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      editDialogVisible: false,
      editForm: {
        id: null,
        name: '',
        age: ''
      },
      searchQuery: ''
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
      }).catch(error => {
        console.error('获取教师列表失败:', error)
        this.listLoading = false
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTeacher(id).then(() => {
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
      updateTeacher(this.editForm.id, {
        name: this.editForm.name,
        age: this.editForm.age
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
.teacher-list {
  padding: 20px;
}
</style>
