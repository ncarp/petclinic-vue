<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>New Visit</h2>

      <div v-if="pet">
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
          <tbody>
            <tr>
              <td>{{ pet.name }}</td>
              <td>{{ pet.birthDate }}</td>
              <td>{{ pet.type.name }}</td>
              <td>{{ pet.ownerFirstName }} {{ pet.ownerLastName }}</td>
            </tr>
          </tbody>
        </table>

        <form @submit.prevent="onSubmit" class="form-horizontal was-validated">

          <div class="form-group mb-3 row">
            <label class="col-sm-2 col-form-label">Date</label>
            <div class="col-sm-3">
              <input type="date" class="form-control" v-model="visit.date" required />
            </div>
          </div>

          <div class="form-group mb-3 row">
            <label class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="visit.description" required
                placeholder="Description of the visit" />
            </div>
          </div>

          <div class="mb-3 row">
            <div class="col-sm-10 offset-sm-2">
              <button class="btn btn-secondary me-2" type="button" @click="goBack">
                Back
              </button>
              <button class="btn btn-primary" type="submit">
                Add Visit
              </button>
            </div>
          </div>
        </form>

        <b>Previous Visits</b>
        <VisitListView :pet="pet" />
      </div>

      <div v-else-if="!errorMessage" class="text-center">
        Loading pet details...
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

import VisitListView from '@/views/VisitListView.vue';

const route = useRoute();
const router = useRouter();

// State
const pet = ref(null);

// Initialize visit with today's date formatted as YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];
const visit = ref({
  date: today,
  description: '',
  petId: null
});


const errorMessage = ref('');

onMounted(async () => {
  const petId = route.params.petId;
  const ownerId = route.params.ownerId;

  visit.value.petId = petId; // Set the petId for the new visit

  try {
    // 1. Fetch Pet details (including existing visits) to ensure the pet exists and to get the ownerId
    const petData = (await api.getPetById(petId)).data;
    pet.value = petData;

    // We often need owner name for the "Pet Details" table.
    // If the Pet API doesn't return owner name, we might need to fetch the owner separately.
    // Assuming standard PetClinic API behavior where we might need to fetch owner:
    if (ownerId && (!pet.value.ownerFirstName)) {
      const ownerResponse = await api.getOwnerById(ownerId);
      pet.value.ownerFirstName = ownerResponse.data.firstName;
      pet.value.ownerLastName = ownerResponse.data.lastName;
    }

  } catch (error) {
    errorMessage.value = 'Failed loading data.' + (error.message || '');
    console.error(error);
  }
});

const onSubmit = async () => {
  try {
    await api.createVisit(visit.value);
    router.push(`/owners/${route.params.ownerId}`);
  } catch (error) {
    errorMessage.value = 'Failed creating visit.' + (error.message || '');
    console.error(error);
  }
};

const goBack = () => {
  // Navigate back to the Owner Details page
  router.push(`/owners/${route.params.ownerId}`);
};
</script>

<style scoped></style>
