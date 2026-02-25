<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>{{ isEditMode ? 'Edit' : 'New' }} Pet Type</h2>
      <form id="pettype" class="form-horizontal was-validated" @submit.prevent="onSubmit">
        <div class="form-group has-feedback" :class="{ 'has-error': errorMessage }">
          <div class="form-group mb-3 row">
            <label class="col-sm-1 offset-sm-1 col-form-label">Name</label>
            <div class="col-sm-6">
              <input id="name" name="name" class="form-control" minlength="1" maxlength="80"
                pattern="^[A-Za-z0-9].{0,79}$" required type="text" v-model="pettype.name" />
              <span v-if="errorMessage" class="help-block">{{ errorMessage }}</span>
            </div>
            <div class="col-sm-4">
              <button class="btn btn-primary me-2" type="submit">{{ isEditMode ? 'Update' : 'Save' }}</button>
              <button class="btn btn-secondary" @click="onBack()">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const pettype = ref({
  id: null,
  name: ''
})

const isEditMode = computed(() => !!pettype.value.id)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const petTypeId = route.params.petTypeId
  if (petTypeId) {
    try {
      const response = await api.getPetTypeById(petTypeId)
      pettype.value = response.data
    } catch (error) {
      console.error('Error fetching pet type:', error)
    }
  }
})

const onSubmit = async () => {
  try {
    if (isEditMode.value) {
      await api.updatePetType(pettype.value.id, pettype.value)
    } else {
      await api.createPetType(pettype.value)
    }
    router.push({ name: 'pettypes' })
  } catch (error) {
    console.error('Error saving pet type:', error)
  }
}

const onBack = () => {
  router.push({ name: 'pettypes' })
}

</script>

<style scoped></style>
