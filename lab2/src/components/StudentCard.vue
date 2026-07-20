<script setup lang="ts">
import type { Student } from '@/types'

defineProps<{
  student: Student
}>()
</script>

<template>
  <div class="student-card">
    <h3>{{ student.name }} {{ student.surname }}</h3>
    <p>GPA: {{ student.gpa }}</p>
  </div>
</template>

<style scoped>
.student-card {
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  width: 300px;
}
</style>