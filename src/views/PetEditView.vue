<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>Edit Pet</h2>

      <form v-if="pet && owner" @submit.prevent="onSubmit" class="form-horizontal was-validated">

        <div class="form-group mb-3 row">
          <label class="col-sm-2 col-form-label">Owner</label>
          <div class="col-sm-10">
            <p class="form-control">{{ owner.firstName }} {{ owner.lastName }}</p>
          </div>
        </div>

        <div class="form-group mb-3 row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="pet.name" required />
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
              <option v-for="t in petTypes" :key="t.id" :value="t">
                {{ t.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group mb-3 row">
          <div class="col-sm-10 offset-sm-2">
            <button class="btn btn-secondary me-2" type="button" @click="goBack">Back</button>
            <button class="btn btn-primary" type="submit">Update Pet</button>
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
import { Pet, PetType, Owner } from '../types/PetModels';
import api from '@/services/api';

const route = useRoute();
const router = useRouter();

// State
const pet = ref<Pet | null>(null);
const owner = ref<Owner | null>(null);
const petTypes = ref<PetType[]>([]);
const error = ref<string>('');

// Get IDs from the URL (e.g., /owners/:ownerId/pets/:id/edit)
const petId = route.params.petId as string;
//const ownerId = route.params.ownerId as string;

onMounted(async () => {
  try {
    // 1. Load available Pet Types for the dropdown
    petTypes.value = (await api.getPetTypes()).data;

    // 2. Load the Pet data
    const petData = (await api.getPetById(petId)).data;

    // Ensure the date is formatted for <input type="date"> (YYYY-MM-DD)
    if (petData.birthDate) {
      petData.birthDate = petData.birthDate.split('T')[0];
    }

    pet.value = petData;

    // 3. Load Owner data (to display name)
    // Note: If your Pet API returns the full Owner object inside Pet, you can skip this.
    owner.value = (await api.getOwnerById(petData.ownerId)).data;

  } catch (err: any) {
    error.value = 'Failed to load pet details.' + (err.message || '');
    console.error(err);
  }
});

const onSubmit = async () => {
  if (!pet.value) return;

  try {
    // Angular's 'pet.service.updatePet' logic
    await api.updatePet(petId, pet.value);
    goBack();
  } catch (err: any) {
    error.value = 'Failed to update pet. Please try again.';
  }
};

const goBack = () => {
  // Navigate back to the owner details page
  if (owner.value) {
    router.push(`/owners/${owner.value.id}`);
  } else {
    router.back();
  }
};
</script>

<style scoped>
/* Scoped CSS specific to this component */
.form-horizontal .control-label {
  text-align: left;
}
</style>
