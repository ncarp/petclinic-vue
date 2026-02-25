<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>Edit Pet</h2>

      <form @submit.prevent="onSubmit" class="form-horizontal was-validated">

        <div class="form-group mb-3 row">
          <label class="col-sm-2 col-form-label">Owner</label>
          <div class="col-sm-10">
            <input type="text" class="form-control-plaintext" readonly :value="ownerName" />
          </div>
        </div>

        <div class="form-group mb-3 row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="pet.name" required minlength="2" />
          </div>
        </div>

        <div class="form-group mb-3 row">
          <label class="col-sm-2 col-form-label">Birth Date</label>
          <div class="col-sm-10">
            <input type="date" class="form-control" v-model="pet.birthDate" required />
            <small class="text-muted">Format: YYYY-MM-DD</small>
          </div>
        </div>

        <div class="form-group mb-3 row">
          <label class="col-sm-2 col-form-label">Type</label>
          <div class="col-sm-10">
            <select class="form-control" v-model="pet.type" required>
              <option disabled value="">Please select a type</option>
              <option v-for="t in petTypes" :key="t.id" :value="t">
                {{ t.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group mb-3 row">
          <div class="col-sm-10 offset-sm-2">
            <button class="btn btn-secondary me-2" type="button" @click="goBack">Back</button>
            <button class="btn btn-primary" type="submit">Add Pet</button>
          </div>
        </div>
      </form>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//import { Pet, PetType, Owner } from '../types/PetModels';
import api from '@/services/api';

const route = useRoute();
const router = useRouter();

// State
const pet = ref({
  id: null,
  name: '',
  birthDate: '',
  type: '', // This will hold the full type object selected from dropdown
  ownerId: route.params.ownerId
});

const petTypes = ref([]);
const ownerName = ref('');

const error = ref('');

onMounted(async () => {
  const ownerId = route.params.ownerId;

  try {
    // 1. Fetch Pet Types for the dropdown
    const typesResponse = await api.getPetTypes();
    petTypes.value = typesResponse.data;

    // 2. Fetch Owner details to display the name
    const ownerResponse = await api.getOwnerById(ownerId);
    ownerName.value = `${ownerResponse.data.firstName} ${ownerResponse.data.lastName}`;

  } catch (err) {
    error.value = 'Failed to load form data.' + (err.message || '');
    console.error(err);
  }
});

const onSubmit = async () => {
  try {
    // We pass the ownerId explicitly if the API requires it in the URL
    // Payload usually just needs name, birthDate, and type object
    const payload = {
      name: pet.value.name,
      birthDate: pet.value.birthDate,
      type: pet.value.type
    };

    // Assuming the endpoint is POST /owners/{ownerId}/pets
    await api.createPetForOwner(route.params.ownerId, payload);

    // Redirect back to owner details
    router.push(`/owners/${route.params.ownerId}`);
  } catch (err) {
    error.value = 'Failed to create pet. Please check inputs.' + (err.message || '');
    console.error(err);
  }
};

const goBack = () => {
  // Navigate back to the owner details page
  router.push(`/owners/${route.params.ownerId}`);
};
</script>

<style scoped>
/* Scoped CSS specific to this component */
.form-horizontal .control-label {
  text-align: left;
}
</style>
