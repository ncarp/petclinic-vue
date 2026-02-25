<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>Pet Types</h2>

      <table id="pettypes" class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pettype in pettypes" :key="pettype.id">
            <td>{{ pettype.name }}</td>
            <td>
              <button class="btn btn-primary me-2" @click="showEditPettypeComponent(pettype.id)">Edit</button>
              <button class="btn btn-danger" @click="deletePettype(pettype.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button class="btn btn-secondary me-2" @click="gotoHome">Home</button>
        <button class="btn btn-primary" @click="addPettype">Add</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

const pettypes = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const response = await api.getPetTypes()
    pettypes.value = response.data
  } catch (error) {
    console.error('Error fetching pet types:', error)
  }
})

function showEditPettypeComponent(petTypeId) {
  router.push({ name: 'edit pettype', params: { petTypeId } })
}

const deletePettype = async (petTypeId) => {
  if (!confirm('Are you sure you want to delete this pet type?')) {
    return
  }
  await api.deletePetType(petTypeId)
    .then(() => {
      pettypes.value = pettypes.value.filter(pt => pt.id !== petTypeId)
    })
    .catch(error => {
      console.error('Error deleting pet type:', error)
    })
}

const gotoHome = () => {
  router.push({ name: 'home' })
}

const addPettype = () => {
  router.push({ name: 'add pettype' })
}

</script>

<style scoped></style>
