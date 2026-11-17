<script setup lang="ts">
import { getEmployeeList } from '@/api/employee'

function pageQuery() {
  getEmployeeList({ name: 'itcast', page: 1, pageSize: 10 })
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar">
        <label style="margin-right: 5px"> 员工姓名： </label>
        <el-input placeholder="请输入用户姓名" style="width: 15%"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="pageQuery()">查询</el-button>
        <el-button type="primary" style="float: right">+添加员工</el-button>

        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
