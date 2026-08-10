<script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue'
defineProps<{
    event: Event
}>()
</script>
<template>
<div class="flex flex-col items-end w-[250px]">
  <p class="text-sm text-right my-[2px]">{{ event.category }}</p>
  <p class="text-sm text-right my-[2px]">{{ event.organizer }}</p>
</div>
</template>
