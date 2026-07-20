<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventMeta from '@/components/EventMeta.vue'
import type { Event } from '@/types'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref<Event[] | null>(null)

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/Natanon00/db/events')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>
<template>
<h1>Event For Good</h1>

<div class="events">
  <div class="event-row" v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventMeta :event="event" />
  </div>
</div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
