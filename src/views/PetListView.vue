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
              <div v-if="!vet.specialties.length">none</div>
              <div v-for="spec in vet.specialties" :key="spec.id">
                {{ spec.name }}
              </div>
            </td>
            <td>
              <button class="btn btn-primary" @click="editVet(vet.id)">Edit Vet</button>
              <button class="btn btn-primary" @click="deleteVet(vet.id)">Delete Vet</button>
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

function editVet(vetId) {
  router.push({ name: 'edit vet', params: { vetId } })
}

function deleteVet(vetId) {
  router.push({ name: 'delete vet', params: { vetId } })
}
</script>

<style scoped></style>
