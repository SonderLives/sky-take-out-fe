<template>
  <div>
    <ElButton type="primary" size="default" :icon="Edit"> primary</ElButton>
    <ElButton type="danger" size="small" :icon="Delete"> primary</ElButton>
    <ElButton type="default" size="default" :icon="Search"> primary</ElButton>
    <ElButton type="success" size="default" :icon="Share"> primary</ElButton>
    <ElButton type="info" size="default" :icon="Star"> primary</ElButton>
    <ElButton type="text" size="default" :icon="User"> primary</ElButton>
    <ElButton type="warning" size="large" :icon="Upload"> primary</ElButton>

    <ElPagination layout="prev, pager, next" :total="100" />
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete, Search, Share, Upload, Star, User } from '@element-plus/icons-vue'
</script>

<style scoped></style>
