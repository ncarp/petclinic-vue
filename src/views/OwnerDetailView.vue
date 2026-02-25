<template>
  <div class="container-fluid">
    <div class="container xd-container">

      <div v-if="loading" class="alert alert-info">Loading owner data...</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-if="owner && !loading">
        <h2>Owner Information</h2>

        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 150px;"><strong>Name</strong></td>
              <td>{{ owner.firstName }} {{ owner.lastName }}</td>
            </tr>
            <tr>
              <td><strong>Address</strong></td>
              <td>{{ owner.address }}</td>
            </tr>
            <tr>
              <td><strong>City</strong></td>
              <td>{{ owner.city }}</td>
            </tr>
            <tr>
              <td><strong>Telephone</strong></td>
              <td>{{ owner.telephone }}</td>
            </tr>
          </tbody>
        </table>

        <div class="mb-4">
          <router-link :to="{ name: 'owners' }" class="btn btn-secondary me-2">
            &lt; Back
          </router-link>
          <router-link :to="{ name: 'edit owner', params: { ownerId: owner.id } }" class="btn btn-primary me-2">
            Edit Owner
          </router-link>
          <router-link :to="`/owners/${owner.id}/pets/new`" class="btn btn-success">
            Add New Pet
          </router-link>
        </div>

        <h2>Pets and Visits</h2>

        <table class="table table-striped">
          <tbody>
            <tr v-for="pet in owner.pets" :key="pet.id">
              <td valign="top" style="width: 40%;">
                <dl class="row">
                  <dt class="col-sm-4">Name</dt>
                  <dd class="col-sm-8">{{ pet.name }}</dd>

                  <dt class="col-sm-4">Birth Date</dt>
                  <dd class="col-sm-8">{{ pet.birthDate }}</dd>

                  <dt class="col-sm-4">Type</dt>
                  <dd class="col-sm-8">{{ pet.type.name }}</dd>
                </dl>

                <div class="mt-2">
                  <router-link :to="{ name: 'edit pet', params: { ownerId: owner.id, petId: pet.id } }"
                    class="btn btn-sm btn-outline-success me-2">
                    Edit Pet
                  </router-link>
                  <button class="btn btn-sm btn-outline-danger me-2" @click="deletePet(pet.id)">
                    Delete Pet
                  </button>
                  <router-link :to="`/owners/${owner.id}/pets/${pet.id}/visits/new`"
                    class="btn btn-sm btn-outline-dark">
                    Add Visit
                  </router-link>
                </div>
              </td>

              <td valign="top">
                <VisitListView :pet="pet" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import api from '@/services/api';

import VisitListView from '@/views/VisitListView.vue';

const route = useRoute();

// Reactive State
const owner = ref(null);
const loading = ref(true);
const error = ref('');

// Fetch Data on Mount
onMounted(async () => {
  const ownerId = route.params.ownerId;
  try {
    const response = await api.getOwnerById(ownerId);
    owner.value = response.data;

    // Sort pets/visits if necessary (optional, depending on API order)
    if (owner.value.pets) {
      owner.value.pets.sort((a, b) => a.name.localeCompare(b.name));
    }
  } catch (err) {
    console.error("Error fetching owner details:", err);
    error.value = "Owner not found or internal server error.";
  } finally {
    loading.value = false;
  }
});

const deletePet = async (petId) => {
  const confirmDelete = confirm('Are you sure you want to delete this pet?');
  if (!confirmDelete) {
    return;
  }
  try {
    await api.deletePet(petId);
    owner.value.pets = owner.value.pets.filter(pet => pet.id !== petId);
  } catch (error) {
    console.error('Error deleting pet:', error);
  }
};

// const deleteVisit = async (visitId) => {
//   const confirmDelete = confirm('Are you sure you want to delete this visit?');
//   if (!confirmDelete) {
//     return;
//   }
//   try {
//     await api.deleteVisit(visitId);
//     owner.value.pets.forEach(pet => {
//       pet.visits = pet.visits.filter(visit => visit.id !== visitId);
//     });
//   } catch (error) {
//     console.error('Error deleting visit:', error);
//   }
// };

</script>

<style scoped>
/* Aligning Definition Lists to look like the Angular PetClinic */

dl.row {
  margin-bottom: 0;
}

dt {
  font-weight: bold;
}
</style>
