<template>
  <div>
    <h1>Find Owners</h1>
    <ul>
      <li v-for="owner in owners" :key="owner.id">
        {{ owner.firstName }} {{ owner.lastName }} ({{ owner.city }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const owners = ref([])

onMounted(async () => {
  try {
    const response = await api.getOwners()
    owners.value = response.data
  } catch (error) {
    console.error('Error fetching owners:', error)
  }
})
</script>

<style scoped></style>
