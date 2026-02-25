<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>Specialties</h2>

      <table id="specialties" class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="specialty in specialties" :key="specialty.id">
            <td>{{ specialty.name }}</td>
            <td>
              <button class="btn btn-primary me-2" @click="showEditSpecialtyComponent(specialty.id)">Edit</button>
              <button class="btn btn-danger" @click="deleteSpecialty(specialty.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button class="btn btn-secondary me-2" @click="gotoHome">Home</button>
        <button class="btn btn-primary" @click="showAddSpecialtyComponent">Add</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

const specialties = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const response = await api.getSpecialties()
    specialties.value = response.data
  } catch (error) {
    console.error('Error fetching vets:', error)
  }
})

function showEditSpecialtyComponent(specialtyId) {
  router.push({ name: 'edit specialty', params: { specialtyId } })
}

const deleteSpecialty = async (specialtyId) => {
  if (!confirm('Are you sure you want to delete this specialty?')) {
    return
  }
  try {
    await api.deleteSpecialty(specialtyId)
    specialties.value = specialties.value.filter(s => s.id !== specialtyId)
  } catch (error) {
    console.error('Error deleting specialty:', error)
  }
}

function gotoHome() {
  router.push({ name: 'home' })
}

function showAddSpecialtyComponent() {
  router.push({ name: 'add specialty' })
}

</script>

<style scoped></style>
