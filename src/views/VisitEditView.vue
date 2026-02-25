<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>Edit Visit</h2>

      <b>Pet</b>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tr>
          <td>{{ pet.name }}</td>
          <td>{{ pet.birthDate }}</td>
          <td>{{ pet.type.name }}</td>
          <td>{{ owner.firstName }} {{ owner.lastName }}</td>
        </tr>

      </table>


      <form v-if="visit" @submit.prevent="onSubmit" class="form-horizontal was-validated">

        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label">Date</label>
          <div class="col-sm-3">
            <input type="date" class="form-control" v-model="visit.date" required />
          </div>
        </div>

        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label">Description</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="visit.description" required />
          </div>
        </div>

        <div class="mb-3 row">
          <div class="col-sm-10 offset-sm-2">
            <button class="btn btn-secondary me-2" type="button" @click="goBack">
              Back
            </button>
            <button class="btn btn-primary" type="submit">
              Update Visit
            </button>
          </div>
        </div>
      </form>

      <div v-else-if="!errorMessage" class="text-center">
        Loading visit data...
      </div>

      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import { Visit, Pet, Owner } from '../types/PetModels';
import api from '@/services/api';


const route = useRoute();
const router = useRouter();

const visit = ref({
  id: null,
  date: '',
  description: '',
  petId: null
})

const pet = ref({
  id: null,
  name: '',
  birthDate: '',
  type: { id: null, name: '' },
  ownerId: null
})

const owner = ref({
  id: null,
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  telephone: ''
})

const errorMessage = ref('');

// Get the visit ID from the URL (e.g. /visits/:visitId/edit)
const visitId = route.params.visitId;

onMounted(async () => {
  try {
    // 1. Fetch the Visit Data
    const visitData = (await api.getVisitById(visitId)).data;

    // Ensure date format is compatible with <input type="date"> (YYYY-MM-DD)
    if (visitData.date) {
      visitData.date = visitData.date.split('T')[0];
    }
    visit.value = visitData;

    // 2. Fetch the Pet Data using petId from the visit
    // We need this to display the Pet Name and get the Owner ID for navigation
    const petData = await api.getPetById(visit.value.petId);
    pet.value = petData.data;

    // 3. Fetch the Owner Data using ownerId from the pet
    const ownerData = await api.getOwnerById(pet.value.ownerId);
    owner.value = ownerData.data;

  } catch (error) {
    errorMessage.value = 'Failed to load visit details.' + (error.message || '');
    console.error(error);
  }
});

const onSubmit = async () => {
  if (!visit.value) return;

  try {
    await api.updateVisit(visitId, visit.value);
    goBack();
  } catch (error) {
    errorMessage.value = 'Failed to update visit. Please try again.' + (error.message || '');
  }
};

const goBack = () => {
  // Navigate back to the Owner Details page
  if (owner.value.id) {
    router.push(`/owners/${owner.value.id}`);
  } else {
    // Fallback if ownerId wasn't loaded
    router.back();
  }
};
</script>

<style scoped></style>
