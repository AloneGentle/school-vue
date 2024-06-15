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
      <el-table-column align="center" label="课程名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="学分" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.credit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教师ID" width="110" align="center"> <!-- 确认此处显示teacher_id -->
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_id }}</span> <!-- 绑定teacher_id字段 -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="editDialogVisible" title="编辑课程">
      <el-form ref="editForm" :model="editForm">
        <el-form-item label="课程名称">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="editForm.credit" />
        </el-form-item>
        <el-form-item label="教师ID">
          <el-input v-model="editForm.teacher_id" />
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
import { getList, deleteCourse, updateCourse } from '@/api/course'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      editDialogVisible: false,
      editForm: {
        id: null,
        name: '',
        credit: '',
        teacher_id: ''
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
        console.log('Response data:', response.data) // 确认此处正确处理返回数据
        this.list = response.data
        this.listLoading = false
      }).catch(error => {
        console.error('获取课程列表失败:', error)
        this.listLoading = false
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCourse(id).then(() => {
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
      updateCourse(this.editForm.id, {
        name: this.editForm.name,
        credit: this.editForm.credit,
        teacher_id: this.editForm.teacher_id
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
