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

<div class="flex flex-col items-center">
  <div class="flex items-start gap-4" v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventMeta :event="event" />
  </div>
</div>

<div class="mt-8 flex w-[290px] mx-auto">
<RouterLink
id="page-prev"
class="flex-1 text-left no-underline text-slate-700"
:to="{ name: 'event-list-view', query: { page: page - 1, size: size } }"
rel="prev"
v-if="page != 1"
>&#60; Prev Page</RouterLink>

<RouterLink
id="page-next"
class="flex-1 text-right no-underline text-slate-700"
:to="{ name: 'event-list-view', query: { page: page + 1, size: size } }"
rel="next"
v-if="hasNextPage">
Next Page &#62;</RouterLink>
</div>

</template>
