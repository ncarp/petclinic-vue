<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>Veterinarians</h2>

      <table id="vets" class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialties</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vet in vets" :key="vet.id">
            <td>{{ vet.firstName }} {{ vet.lastName }}</td>
            <td>
              <span v-if="vet.specialties.length === 0">none</span>
              {{vet.specialties.map(s => s.name).join(', ')}}
            </td>
            <td>
              <button class="btn btn-primary me-2" @click="editVet(vet.id)">Edit Vet</button>
              <button class="btn btn-danger" @click="deleteVet(vet.id)">Delete Vet</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <!--
        <button *ngIf="isVetDataReceived" class="btn btn-primary" (click)="gotoHome()">Home</button>
        <button *ngIf="isVetDataReceived" class="btn btn-primary" (click)="addVet()">
          Add Vet
        </button>
      -->
        <button class="btn btn-secondary me-2" @click="gotoHome">Home</button>
        <button class="btn btn-primary" @click="addVet">Add Vet</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

const vets = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const response = await api.getVets()
    vets.value = response.data
  } catch (error) {
    console.error('Error fetching vets:', error)
  }
})

const editVet = (vetId) => {
  router.push({ name: 'edit vet', params: { vetId } })
}

const deleteVet = async (vetId) => {
  const confirmDelete = confirm('Are you sure you want to delete this vet?')
  if (confirmDelete) {
    try {
      await api.deleteVet(vetId)
      vets.value = vets.value.filter(v => v.id !== vetId)
    } catch (error) {
      console.error('Error deleting vet:', error)
    }
  }
}

const gotoHome = () => {
  router.push({ name: 'home' })
}

const addVet = () => {
  router.push({ name: 'add vet' })
}

</script>

<style scoped></style>
