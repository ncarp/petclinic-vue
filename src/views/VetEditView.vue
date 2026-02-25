<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>{{ vet.id ? 'Edit' : 'Add' }} Veterinarian</h2>
      <form @submit.prevent="handleSubmit" class="was-validated">
        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label">First Name</label>
          <div class="col-sm-10">
            <input v-model="vet.firstName" class="form-control" minlength="1" maxlength="30" pattern="^[A-Za-z]+$"
              required @blur="validateField('firstName')" />
            <span class="invalid-feedback" v-if="vet.firstName.length === 0">First Name is required.</span>
            <span class="invalid-feedback" v-if="!/^[A-Za-z]+$/.test(vet.firstName)">First Name may only consist of
              letters</span>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label">Last Name</label>
          <div class="col-sm-10">
            <input v-model="vet.lastName" class="form-control" minlength="1" maxlength="30" pattern="^[A-Za-z]+$"
              required @blur="validateField('lastName')" />
            <span class="invalid-feedback" v-if="vet.lastName.length === 0">Last Name is required.</span>
            <span class="invalid-feedback" v-if="!/^[A-Za-z]+$/.test(vet.lastName)">Last Name may only consist of
              letters</span>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label">Specialties</label>
          <div class="col-sm-10">
            <select v-model="selectedSpecialties" class="form-select" multiple>
              <option v-for="s in allSpecialties" :key="s.id" :value="s">
                {{ s.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-sm-10 offset-sm-2">
            <button type="button" class="btn btn-secondary me-2" @click="router.push({ name: 'vets' })">
              &lt; Back</button>
            <button type="submit" class="btn btn-primary">Save vet</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const vet = ref({
  id: null,
  firstName: '',
  lastName: '',
  specialties: []
})

const allSpecialties = ref([])
const selectedSpecialties = ref([])

const isEdit = computed(() => !!route.params.vetId);

onMounted(async () => {
  try {
    if (isEdit.value) {
      const [vetResponse] = await Promise.all([
        api.getVetById(route.params.vetId)
      ])
      vet.value = vetResponse.data
      selectedSpecialties.value = vet.value.specialties
    }

    const specialtiesResponse = await api.getSpecialties()
    allSpecialties.value = specialtiesResponse.data
  } catch (error) {
    console.error('Error fetching vet or specialties:', error)
  }
})

const errors = ref({});

const isFirstNameValid = computed(() => vet.value.firstName.trim() !== '');
const isLastNameValid = computed(() => vet.value.lastName.trim() !== '');
// Add more computed properties for other form fields as needed

const validateField = (field) => {
  errors.value[field] = ''; // Clear previous error for the field
  if (field === 'firstName' && !isFirstNameValid.value) {
    errors.value.firstName = 'First Name is required.';
  }
  if (field === 'lastName' && !isLastNameValid.value) {
    errors.value.lastName = 'Last Name is required.';
  }
  // Add more validation checks for other form fields as needed
};

const handleSubmit = () => {
  vet.value.specialties = selectedSpecialties.value
  const save = isEdit.value ? api.updateVet(vet.value.id, vet.value) : api.createVet(vet.value)
  save.then(() => {
    router.push({ name: 'vets' })
  }).catch(error => {
    console.error('Error saving vet:', error)
  })
}

</script>

<style scoped></style>
