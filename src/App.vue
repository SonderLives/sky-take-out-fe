<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import request from './utils/request'

// 苍穹外卖管理端登录接口：POST /admin/employee/login
// 账号 admin / 123456（后端按明文校验），成功返回 data.token
function handleLogin() {
  request({
    url: '/admin/employee/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '123456',
    },
  }).then((res: any) => {
    if (res?.data?.token) {
      localStorage.setItem('token', res.data.token)
      ElMessage({ type: 'success', message: '登录成功' })
    }
  })
}
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="app-wrapper">
      <el-button @click="handleLogin"> 登录 </el-button>
      <router-view />
    </div>
  </el-config-provider>
</template>

<style scoped></style>
