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
      <el-table-column align="center" label="学生ID">
        <template slot-scope="scope">
          {{ scope.row.studentId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="课程ID">
        <template slot-scope="scope">
          {{ scope.row.courseId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="成绩">
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.addTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.modTime }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="操作" width="150">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/score'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log('Response data:', response.data)
        this.list = response.data
        this.listLoading = false
      }).catch(error => {
        console.error('获取成绩列表失败:', error)
        this.listLoading = false
      })
    }
    // handleDelete(id) {
    //   this.$confirm('此操作将永久删除该成绩, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     deleteScore(id).then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       })
    //       this.fetchData() // 重新获取列表数据
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}
</style>
