<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventMeta from '@/components/EventMeta.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref<number>(0)
const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalEvents.value / 3)
    return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    default:2
  }
})
const page = computed(() => props.page)
const size = computed(() => props.size)

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(3, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
  })
})
</script>
<template>
<h1>Event For Good</h1>

<div class="page-size">
  Events per page:
  <RouterLink :to="{ name: 'event-list-view', query: { page: 1, size: 2 } }">2</RouterLink>
  <RouterLink :to="{ name: 'event-list-view', query: { page: 1, size: 5 } }">5</RouterLink>
  <RouterLink :to="{ name: 'event-list-view', query: { page: 1, size: 10 } }">10</RouterLink>
</div>

<div class="events">
  <div class="event-row" v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventMeta :event="event" />
  </div>
</div>

<div class="pagination">
<RouterLink 
id="page-prev"
:to="{ name: 'event-list-view', query: { page: page - 1, size: size } }"
rel="prev"
v-if="page != 1"
>&#60; Prev Page</RouterLink>

<RouterLink 
id="page-next"
:to="{ name: 'event-list-view', query: { page: page + 1, size: size } }" 
rel="next"
v-if="hasNextPage">
Next Page &#62;</RouterLink>
</div>

</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
  margin: 2rem auto 0;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
.page-size {
  text-align: center;
  margin-bottom: 1rem;
}
.page-size a {
  margin: 0 4px;
}
</style>
