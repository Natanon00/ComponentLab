<script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue'
defineProps<{
    event: Event
}>()
</script>
<template>
<div class="event-meta">
  <p class="meta-text">{{ event.category }}</p>
  <p class="meta-text">{{ event.organizer }}</p>
</div>
</template>

<style scoped>
.event-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 250px;
}

.meta-text {
  font-size: 14px;
  text-align: right;
  margin: 2px 0;
}
</style>
